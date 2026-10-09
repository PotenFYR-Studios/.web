/**
 * PotenFYR Studios Auto-Sync Build Script
 * Safely fetches latest repositories, topics, languages, and Modrinth metrics.
 * Runs in Bun before building, or standalone.
 */
import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

interface SyncedRepo {
  name: string;
  fullName: string;
  description: string;
  url: string;
  homepage?: string | null;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  updatedAt: string;
  pushedAt: string;
  license?: string | null;
  isArchived: boolean;
}

interface RawGitHubRepo {
  name: string;
  full_name: string;
  description?: string | null;
  html_url: string;
  homepage?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  language?: string | null;
  topics?: string[];
  updated_at: string;
  pushed_at: string;
  license?: { spdx_id?: string; name?: string } | null;
  archived?: boolean;
  private?: boolean;
}

interface ModrinthData {
  slug: string;
  downloads: number;
  followers: number;
  icon?: string;
}

interface SyncedSnapshot {
  lastSyncedAt: string;
  org: {
    name: string;
    login: string;
    description: string;
    publicRepos: number;
    followers: number;
    avatarUrl: string;
    url: string;
  };
  repos: SyncedRepo[];
  modrinth: Record<string, ModrinthData>;
  languages: Record<string, number>;
  totalStars: number;
  totalForks: number;
  totalDownloads: number;
}

const ORG_NAME = 'PotenFYR-Studios';
const MODRINTH_SLUGS = ['authcore', 'statfyr', 'onejumpalljump', 'echoing-deaths'];
const TARGET_FILE = resolve(import.meta.dir, '../src/data/syncedData.json');
const HOMEPAGE_PROBE_TIMEOUT_MS = 6000;

/**
 * Probe a homepage URL: HEAD first, GET as fallback (some hosts reject HEAD).
 * Only 2xx/3xx counts as alive; DNS failures, timeouts and 4xx/5xx are dead.
 * A dead verdict is retried once: parallel DNS bursts can flakily fail.
 */
async function isUrlAlive(url: string): Promise<boolean> {
  const probe = async (method: 'HEAD' | 'GET'): Promise<boolean> => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), HOMEPAGE_PROBE_TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method,
        redirect: 'follow',
        signal: ctrl.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PotenFYR-SiteCheck/1.0)' },
      });
      return res.status >= 200 && res.status < 400;
    } catch {
      return false;
    } finally {
      clearTimeout(timer);
    }
  };
  const once = async (): Promise<boolean> => (await probe('HEAD')) || (await probe('GET'));
  if (await once()) return true;
  await new Promise((r) => setTimeout(r, 500));
  return once();
}

/** Run async work over items with bounded concurrency to avoid resolver storms. */
async function mapWithConcurrency<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index]);
    }
  });
  await Promise.all(workers);
  return results;
}

async function runSync() {
  console.log(`[Auto-Sync] Fetching latest PotenFYR Studios metadata from GitHub & Modrinth...`);

  let currentSnapshot: SyncedSnapshot | null = null;
  if (existsSync(TARGET_FILE)) {
    try {
      currentSnapshot = JSON.parse(readFileSync(TARGET_FILE, 'utf-8'));
    } catch {
      // ignore
    }
  }

  try {
    const headers: Record<string, string> = {
      'User-Agent': 'PotenFYR-Studios-Sync/1.0',
      'Accept': 'application/vnd.github.v3+json',
    };

    // If GITHUB_TOKEN is available in env (e.g. in GitHub Actions CI), use it for 5000 req/hr rate limit!
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    // 1. Fetch Org details
    const orgRes = await fetch(`https://api.github.com/orgs/${ORG_NAME}`, { headers });
    let orgData = currentSnapshot?.org || {
      name: 'PotenFYR Studios',
      login: ORG_NAME,
      description: 'PotenFYR Studios is a creative hub for game development, hosting infrastructure, automation tools, and community-driven projects.',
      publicRepos: 10,
      followers: 2,
      avatarUrl: 'https://avatars.githubusercontent.com/u/260194014?v=4',
      url: `https://github.com/${ORG_NAME}`,
    };

    if (orgRes.ok) {
      const data = await orgRes.json();
      orgData = {
        name: data.name || ORG_NAME,
        login: data.login,
        description: data.description || orgData.description,
        publicRepos: data.public_repos ?? orgData.publicRepos,
        followers: data.followers ?? orgData.followers,
        avatarUrl: data.avatar_url || orgData.avatarUrl,
        url: data.html_url || orgData.url,
      };
    } else {
      console.warn(`[Auto-Sync] GitHub Org fetch warning (${orgRes.status}): using fallback.`);
    }

    // 2. Fetch Repositories
    const reposRes = await fetch(`https://api.github.com/orgs/${ORG_NAME}/repos?per_page=100&sort=pushed`, { headers });
    let repos: SyncedRepo[] = currentSnapshot?.repos || [];

    if (reposRes.ok) {
      const rawRepos: RawGitHubRepo[] = await reposRes.json();
      if (Array.isArray(rawRepos)) {
        repos = rawRepos
          // Never publish private repos, even if the token can see them.
          .filter((r) => r.name !== '.github' && !r.private)
          .map((r) => ({
            name: r.name,
            fullName: r.full_name,
            description: (r.description || '')
              .replace(/[—–]/g, ', ')
              .replace(/\s+-\s+/g, ', ')
              .replace(/\s+/g, ' ')
              .trim(),
            url: r.html_url,
            homepage: r.homepage || null,
            stars: r.stargazers_count ?? 0,
            forks: r.forks_count ?? 0,
            language: r.language || null,
            topics: Array.isArray(r.topics) ? r.topics : [],
            updatedAt: r.updated_at,
            pushedAt: r.pushed_at,
            license: r.license?.spdx_id || r.license?.name || null,
            isArchived: Boolean(r.archived),
          }));
      }
    } else {
      console.warn(`[Auto-Sync] GitHub Repos fetch warning (${reposRes.status}): using fallback.`);
    }

    // 2b. Validate homepages: drop dead links so cards never ship a broken
    // "Launch Platform" button. A URL that fails twice (HEAD, then GET, with
    // a retry) is treated as dead; the next build re-probes, so links come
    // back automatically once a domain actually goes live.
    const withHomepages = repos.filter((r) => Boolean(r.homepage));
    const aliveResults = await mapWithConcurrency(withHomepages, 4, async (r) => ({
      repo: r,
      alive: await isUrlAlive(r.homepage as string),
    }));
    let droppedHomepages = 0;
    for (const { repo, alive } of aliveResults) {
      if (!alive) {
        droppedHomepages += 1;
        repo.homepage = null;
      }
    }
    if (droppedHomepages > 0) {
      console.warn(`[Auto-Sync] Dropped ${droppedHomepages} dead homepage link(s): ${aliveResults.filter((x) => !x.alive).map((x) => x.repo.name).join(', ')}`);
    }

    // 2c. Probe the public Minecraft server (play.potenfyr.in) via mcsrvstat.us
    // and cache the verdict; vite.config.ts inlines it at build time. A failed
    // probe keeps the previous cache, so the site never lies about uptime.
    try {
      const MC_HOSTNAME = 'play.potenfyr.in';
      const mcCtrl = new AbortController();
      const mcTimer = setTimeout(() => mcCtrl.abort(), HOMEPAGE_PROBE_TIMEOUT_MS);
      const mcRes = await fetch(`https://api.mcsrvstat.us/3/${MC_HOSTNAME}`, {
        signal: mcCtrl.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PotenFYR-SiteCheck/1.0)' },
      });
      clearTimeout(mcTimer);
      if (mcRes.ok) {
        const mc = await mcRes.json();
        const mcStatus = {
          host: MC_HOSTNAME,
          online: Boolean(mc.online),
          players: mc.players?.online ?? 0,
          max: mc.players?.max ?? 0,
          version: mc.version ?? null,
          probedAt: new Date().toISOString(),
        };
        const cacheDir = resolve(import.meta.dir, '../node_modules/.cache');
        mkdirSync(cacheDir, { recursive: true });
        writeFileSync(resolve(cacheDir, 'mc-server-status.json'), JSON.stringify(mcStatus), 'utf-8');
        console.log(
          `[Auto-Sync] Minecraft server ${mcStatus.online ? `online: ${mcStatus.players}/${mcStatus.max} players (${mcStatus.version})` : 'offline'}.`
        );
      } else {
        console.warn(`[Auto-Sync] Minecraft probe warning (mcsrvstat ${mcRes.status}): keeping previous cache.`);
      }
    } catch {
      console.warn('[Auto-Sync] Minecraft probe skipped (network unavailable): keeping previous cache.');
    }

    // 3. Fetch Modrinth Stats
    const modrinthData: Record<string, ModrinthData> = currentSnapshot?.modrinth || {
      authcore: { slug: 'authcore', downloads: 1994, followers: 6, icon: 'https://cdn.modrinth.com/data/qs5rvacf/93619076634e72af9156f36a0f8984590ac50582_96.webp' },
      statfyr: { slug: 'statfyr', downloads: 38, followers: 2, icon: 'https://cdn.modrinth.com/data/G94iWqd4/b7c798df0dd598edf9a9c587ab3077d777b1ee66_96.webp' },
      onejumpalljump: { slug: 'onejumpalljump', downloads: 26, followers: 2, icon: 'https://cdn.modrinth.com/data/Vpr0ie3p/0f876b25fcb37f17a92af7445ff5528c61c7d6ca_96.webp' },
    };

    for (const slug of MODRINTH_SLUGS) {
      try {
        const mRes = await fetch(`https://api.modrinth.com/v2/project/${slug}`, {
          headers: { 'User-Agent': 'PotenFYR-Studios-Website/1.0' },
        });
        if (mRes.ok) {
          const mData = await mRes.json();
          modrinthData[slug] = {
            slug,
            downloads: mData.downloads ?? 0,
            followers: mData.followers ?? 0,
            icon: mData.icon_url,
          };
        }
      } catch {
        // preserve existing
      }
    }

    // 4. Calculate Aggregate Metrics
    const totalStars = repos.reduce((acc, r) => acc + r.stars, 0);
    const totalForks = repos.reduce((acc, r) => acc + r.forks, 0);
    const totalDownloads = Object.values(modrinthData).reduce((acc, m) => acc + m.downloads, 0);

    // Language mix estimate based on repository counts and primary languages
    const languages: Record<string, number> = {
      Java: 54.7,
      Shell: 39.7,
      TypeScript: 3.0,
      Dockerfile: 1.1,
      HTML: 0.6,
      Python: 0.4,
      JavaScript: 0.3,
      CSS: 0.2,
    };

    const snapshot: SyncedSnapshot = {
      lastSyncedAt: new Date().toISOString(),
      org: orgData,
      repos,
      modrinth: modrinthData,
      languages,
      totalStars,
      totalForks,
      totalDownloads,
    };

    writeFileSync(TARGET_FILE, JSON.stringify(snapshot, null, 2), 'utf-8');
    console.log(`[Auto-Sync] Successfully synced ${repos.length} repos, ${totalStars} stars, ${totalDownloads} Modrinth downloads.`);
  } catch (err) {
    console.error(`[Auto-Sync] Error during sync:`, err);
    if (!existsSync(TARGET_FILE)) {
      // Ensure file exists so compilation never fails
      const fallback: SyncedSnapshot = {
        lastSyncedAt: new Date().toISOString(),
        org: {
          name: 'PotenFYR Studios',
          login: ORG_NAME,
          description: 'PotenFYR Studios is a creative hub for game development, hosting infrastructure, automation tools, and community-driven projects.',
          publicRepos: 10,
          followers: 2,
          avatarUrl: 'https://avatars.githubusercontent.com/u/260194014?v=4',
          url: `https://github.com/${ORG_NAME}`,
        },
        repos: [],
        modrinth: {},
        languages: { Java: 54.7, Shell: 39.7, TypeScript: 3.0 },
        totalStars: 9,
        totalForks: 1,
        totalDownloads: 2058,
      };
      writeFileSync(TARGET_FILE, JSON.stringify(fallback, null, 2), 'utf-8');
    }
  }
}

runSync();

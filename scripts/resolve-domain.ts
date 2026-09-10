/**
 * PotenFYR Domain Resolver (postbuild)
 * Adapts every deploy to the domain that is actually live on GitHub Pages:
 * - Custom domain configured in repo Settings -> Pages (e.g. potenfyr.in) is detected
 *   via the GitHub Pages API and locked in with a CNAME file, so branch-based deploys
 *   (peaceiris/actions-gh-pages) stop wiping the setting on every sync.
 * - No custom domain (or detection unavailable) -> falls back to the default
 *   <owner>.github.io/<repo> URL given by GitHub itself.
 * Self-referencing URLs in index.html, robots.txt and sitemap.xml are rewritten to the
 * active origin; external project domains (authcore/lootfyr subdomains) and email
 * addresses are never touched.
 */
import { writeFileSync, readFileSync, existsSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';

const REPO = process.env.GITHUB_REPOSITORY || 'PotenFYR-Studios/.web';
const [owner, name] = REPO.split('/');
const DEFAULT_URL = `https://${owner}.github.io/${name}`.toLowerCase();

// Every origin the committed templates use (or have ever used) for THIS site. Anything
// else in those files (subdomain projects, mailto addresses, CDN links) stays untouched.
const SELF_ORIGINS = ['https://potenfyr.in', DEFAULT_URL, 'https://potenfyr-studios.github.io/potenfyr-web'];

const DIST_DIR = resolve(import.meta.dir, '../dist');
const SEO_FILES = ['index.html', 'robots.txt', 'sitemap.xml'];

interface PagesConfig {
  cname?: string | null;
  html_url?: string | null;
}

function normalizeUrl(raw: string): string {
  let url = raw.trim().replace(/\/+$/, '');
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  return url.toLowerCase();
}

async function detectPagesUrl(): Promise<{ url: string | null; status: number | null }> {
  const token = process.env.GITHUB_TOKEN;
  if (!token || !process.env.GITHUB_REPOSITORY) {
    return { url: null, status: null };
  }

  const res = await fetch(`https://api.github.com/repos/${REPO}/pages`, {
    headers: {
      'User-Agent': 'PotenFYR-Studios-Sync/1.0',
      'Accept': 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) return { url: null, status: res.status };

  const config: PagesConfig = await res.json();
  return {
    // cname is the authoritative custom-domain signal; html_url always reflects the
    // URL GitHub is actually serving (repo defaults can differ from the folder name).
    url: config.cname ? `https://${config.cname}` : config.html_url ? normalizeUrl(config.html_url) : null,
    status: res.status,
  };
}

async function resolveActiveDomain(): Promise<{ siteUrl: string; source: string }> {
  const override = process.env.SITE_DOMAIN;
  if (override?.trim()) {
    return { siteUrl: normalizeUrl(override), source: 'SITE_DOMAIN override' };
  }

  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_REPOSITORY) {
    console.log('[Domain] Not running in CI (no GITHUB_TOKEN); using the default GitHub Pages domain.');
    return { siteUrl: DEFAULT_URL, source: 'default' };
  }

  try {
    const { url, status } = await detectPagesUrl();
    if (url) return { siteUrl: normalizeUrl(url), source: 'GitHub Pages settings' };
    if (status === 404) {
      console.warn('[Domain] GitHub Pages is not enabled yet (404); using the default GitHub Pages domain.');
    } else {
      console.warn(`[Domain] Pages settings unavailable (status ${status}); using the default GitHub Pages domain.`);
    }
  } catch (err) {
    console.warn(`[Domain] Could not query Pages settings (${err instanceof Error ? err.message : err}); using the default GitHub Pages domain.`);
  }
  return { siteUrl: DEFAULT_URL, source: 'default' };
}

function isGitHubPagesUrl(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith('.github.io');
  } catch {
    return false;
  }
}

async function main() {
  const { siteUrl, source } = await resolveActiveDomain();
  // A CNAME file must never contain a github.io host, so only genuinely custom
  // domains get the lock-in file — even if the reported URL drifts from DEFAULT_URL.
  const isCustom = siteUrl !== DEFAULT_URL && !isGitHubPagesUrl(siteUrl);

  // 1. Point every self-reference at the domain that is actually live.
  let rewritten = 0;
  for (const file of SEO_FILES) {
    const filePath = resolve(DIST_DIR, file);
    if (!existsSync(filePath)) continue;
    let content = readFileSync(filePath, 'utf-8');
    for (const origin of SELF_ORIGINS) {
      content = content.split(origin).join(siteUrl);
    }
    writeFileSync(filePath, content, 'utf-8');
    rewritten++;
  }

  // 2. Lock the custom domain: GitHub Pages branch publishing derives the domain from
  //    the CNAME file, so a deploy without it clears the Settings -> Pages entry.
  const cnamePath = resolve(DIST_DIR, 'CNAME');
  if (isCustom) {
    writeFileSync(cnamePath, `${siteUrl.replace(/^https?:\/\//, '')}\n`, 'utf-8');
    console.log(`[Domain] Active: ${siteUrl} (${source}) — CNAME written to lock the custom domain.`);
  } else if (existsSync(cnamePath)) {
    unlinkSync(cnamePath);
    console.log(`[Domain] Active: ${siteUrl} (${source}) — stale CNAME removed so the default GitHub Pages URL stays.`);
  } else {
    console.log(`[Domain] Active: ${siteUrl} (${source}) — no custom domain, staying on the default GitHub Pages URL.`);
  }
  console.log(`[Domain] Rewrote self-referencing URLs in ${rewritten} file(s).`);
}

main().catch((err) => {
  console.error('[Domain] Fatal error during domain resolution:', err);
  process.exit(1);
});

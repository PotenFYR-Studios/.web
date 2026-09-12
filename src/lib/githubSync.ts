import { useState, useEffect, useCallback, useRef } from 'react';
import fallbackData from '../data/syncedData.json';
import { RepoNotification } from '../components/RepoNotificationToast';

export interface SyncedRepo {
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
  isPrivate?: boolean;
  modrinthDownloads?: number;
  modrinthFollowers?: number;
  category?: string;
  isMaintenance?: boolean;
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

export interface SyncedSnapshot {
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
  modrinth: Record<string, { slug: string; downloads: number; followers: number; icon?: string }>;
  languages: Record<string, number>;
  totalStars: number;
  totalForks: number;
  totalDownloads: number;
}

const STORAGE_KEY = 'potenfyr_hq_sync_v2';
const RATE_LIMIT_STORAGE_KEY = 'potenfyr_gh_rate_limit_until';
const AUTO_REFRESH_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes polling to respect rate limits
const MIN_FETCH_THROTTLE_MS = 5 * 60 * 1000; // 5 minutes minimum between automatic focus/visibility syncs

function loadInitialSnapshot(): SyncedSnapshot {
  const fallback = fallbackData as unknown as SyncedSnapshot;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.lastSyncedAt && Array.isArray(parsed.repos)) {
      if (new Date(fallback.lastSyncedAt).getTime() > new Date(parsed.lastSyncedAt).getTime()) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
        return fallback;
      }
      return parsed;
    }
  } catch {
    // ignore
  }
  return fallback;
}

function saveToStorage(data: SyncedSnapshot) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

// Categorize repository based on name, topics, or known metadata
export function categorizeRepo(repo: { name: string; topics?: string[]; description?: string }): string {
  const name = repo.name.toLowerCase();
  const topics = repo.topics || [];
  const desc = (repo.description || '').toLowerCase();

  if (name.includes('egg') || topics.some(t => t.includes('egg') || t.includes('pterodactyl') || t.includes('pelican'))) {
    return 'Hosting Eggs';
  }
  if (name.includes('authcore') || topics.includes('fabric-mod') || topics.includes('minecraft-mod')) {
    return 'Minecraft Mod [Fabric]';
  }
  if (name === 'statfyr' || name === 'ojaj' || name.includes('echoingdeaths') || topics.includes('paper-plugin') || topics.includes('spigot')) {
    return 'Minecraft Plugin [Paper/Spigot]';
  }
  if (name.includes('cordon') || topics.includes('security') || desc.includes('security')) {
    return 'Security & DevSecOps';
  }
  if (name.includes('bot') || topics.includes('discord')) {
    return 'Discord Bot';
  }
  if (name.includes('web') || topics.includes('website') || name.includes('loot')) {
    return 'Web Platform';
  }
  return 'Open-Source Tooling';
}

export function useGitHubSync() {
  const [snapshot, setSnapshot] = useState<SyncedSnapshot>(loadInitialSnapshot);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncStatus, setLastSyncStatus] = useState<'cached' | 'live' | 'fallback'>('cached');
  const [notifications, setNotifications] = useState<RepoNotification[]>([]);

  // Track timestamps to throttle live fetches and respect GitHub limits
  const lastFetchAttemptRef = useRef<number>(0);

  // Ref to track known repo names so we only notify on actual subsequent changes
  const knownRepoNamesRef = useRef<Set<string>>(
    new Set(loadInitialSnapshot().repos.map((r) => r.name.toLowerCase()))
  );
  const isInitialMountRef = useRef<boolean>(true);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const triggerNotification = useCallback((type: 'added' | 'removed', repoName: string, repo?: Partial<SyncedRepo>) => {
    const id = `${type}-${repoName}-${Date.now()}`;
    const newNotif: RepoNotification = {
      id,
      type,
      repoName,
      repo,
      timestamp: Date.now(),
    };
    setNotifications((prev) => [newNotif, ...prev.slice(0, 3)]);

    // Auto-dismiss after 8 seconds
    setTimeout(() => {
      dismissNotification(id);
    }, 8000);
  }, [dismissNotification]);

  const fetchLive = useCallback(async (isManual = false) => {
    const now = Date.now();

    // Check if we are in active cooldown from a previous GitHub rate-limit
    const rateLimitUntil = parseInt(localStorage.getItem(RATE_LIMIT_STORAGE_KEY) || '0', 10);
    if (now < rateLimitUntil && !isManual) {
      setLastSyncStatus('cached');
      return;
    }

    // Throttle automated fetches to avoid burning through the unauthenticated rate limit
    if (!isManual && now - lastFetchAttemptRef.current < MIN_FETCH_THROTTLE_MS) {
      return;
    }

    lastFetchAttemptRef.current = now;
    setIsSyncing(true);

    try {
      const headers: Record<string, string> = {
        Accept: 'application/vnd.github.v3+json',
      };

      const customToken = import.meta.env.VITE_GITHUB_TOKEN;
      if (customToken) {
        headers['Authorization'] = `Bearer ${customToken}`;
      }

      const reposRes = await fetch('https://api.github.com/orgs/PotenFYR-Studios/repos?per_page=100&sort=pushed', {
        headers,
      });

      // Gracefully handle GitHub rate limit (HTTP 403 / 429) without console errors
      if (reposRes.status === 403 || reposRes.status === 429) {
        const resetHeader = reposRes.headers.get('x-ratelimit-reset');
        const resetMs = resetHeader ? parseInt(resetHeader, 10) * 1000 : now + 60 * 60 * 1000;
        localStorage.setItem(RATE_LIMIT_STORAGE_KEY, resetMs.toString());
        setLastSyncStatus('cached');
        setIsSyncing(false);
        return;
      }

      if (!reposRes.ok) {
        setLastSyncStatus('cached');
        setIsSyncing(false);
        return;
      }

      // Clear any prior rate-limit record on successful response
      localStorage.removeItem(RATE_LIMIT_STORAGE_KEY);

      const rawRepos: RawGitHubRepo[] = await reposRes.json();
      if (!Array.isArray(rawRepos)) {
        setLastSyncStatus('cached');
        setIsSyncing(false);
        return;
      }

      const repos: SyncedRepo[] = rawRepos
        .filter((r) => r.name !== '.github')
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
          isPrivate: Boolean(r.private),
        }));

      // Detect additions and deletions if not the first render
      const currentNames = new Set(repos.map((r) => r.name.toLowerCase()));

      if (!isInitialMountRef.current) {
        // Detect additions
        for (const repo of repos) {
          const lower = repo.name.toLowerCase();
          if (!knownRepoNamesRef.current.has(lower)) {
            triggerNotification('added', repo.name, repo);
          }
        }

        // Detect deletions
        for (const prevName of knownRepoNamesRef.current) {
          if (!currentNames.has(prevName)) {
            const prevRepo = snapshot.repos.find((r) => r.name.toLowerCase() === prevName);
            triggerNotification('removed', prevRepo ? prevRepo.name : prevName);
          }
        }
      }

      knownRepoNamesRef.current = currentNames;
      isInitialMountRef.current = false;

      // 2. Fetch Modrinth downloads for supported projects
      const modrinthMap: Record<string, { slug: string; downloads: number; followers: number; icon?: string }> = {
        ...fallbackData.modrinth,
      };

      const slugs = ['authcore', 'statfyr', 'onejumpalljump', 'echoing-deaths'];
      await Promise.all(
        slugs.map(async (slug) => {
          try {
            const mRes = await fetch(`https://api.modrinth.com/v2/project/${slug}`);
            if (mRes.ok) {
              const mData = await mRes.json();
              modrinthMap[slug] = {
                slug,
                downloads: mData.downloads ?? 0,
                followers: mData.followers ?? 0,
                icon: mData.icon_url,
              };
            }
          } catch {
            // keep fallback
          }
        })
      );

      const totalStars = repos.reduce((acc, r) => acc + r.stars, 0);
      const totalForks = repos.reduce((acc, r) => acc + r.forks, 0);
      const totalDownloads = Object.values(modrinthMap).reduce((acc, m) => acc + m.downloads, 0);

      const updatedSnapshot: SyncedSnapshot = {
        lastSyncedAt: new Date().toISOString(),
        org: {
          ...fallbackData.org,
          publicRepos: repos.length,
        },
        repos,
        modrinth: modrinthMap,
        languages: fallbackData.languages,
        totalStars,
        totalForks,
        totalDownloads,
      };

      saveToStorage(updatedSnapshot);
      setSnapshot(updatedSnapshot);
      setLastSyncStatus('live');
    } catch {
      // Keep existing snapshot seamlessly without noisy errors
      setLastSyncStatus('cached');
    } finally {
      setIsSyncing(false);
    }
  }, [snapshot.repos, triggerNotification]);

  useEffect(() => {
    fetchLive(false);

    const intervalId = setInterval(() => {
      fetchLive(false);
    }, AUTO_REFRESH_INTERVAL_MS);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchLive(false);
      }
    };

    const handleFocus = () => {
      fetchLive(false);
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchLive]);

  return {
    snapshot,
    isSyncing,
    lastSyncStatus,
    notifications,
    dismissNotification,
    triggerTestNotification: triggerNotification,
    refreshSync: fetchLive,
  };
}

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
const TOKEN_KEY = 'potenfyr_gh_token';
const AUTO_REFRESH_INTERVAL_MS = 45 * 1000; // 45 seconds live poll

export function getGitHubToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY) || (import.meta.env.VITE_GITHUB_TOKEN as string) || null;
  } catch {
    return null;
  }
}

export function setGitHubToken(token: string | null) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token.trim());
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // ignore
  }
}

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

  const fetchLive = useCallback(async () => {
    setIsSyncing(true);
    try {
      const token = getGitHubToken();
      const headers: Record<string, string> = {
        Accept: 'application/vnd.github.v3+json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // If token is provided, query all repos (public + private), otherwise public
      const endpoint = token
        ? 'https://api.github.com/orgs/PotenFYR-Studios/repos?type=all&per_page=100&sort=pushed'
        : 'https://api.github.com/orgs/PotenFYR-Studios/repos?per_page=100&sort=pushed';

      const reposRes = await fetch(endpoint, { headers });

      if (!reposRes.ok) {
        throw new Error(`GitHub API HTTP ${reposRes.status}`);
      }

      const rawRepos = await reposRes.json();
      if (!Array.isArray(rawRepos)) {
        throw new Error('Invalid repos response format');
      }

      const repos: SyncedRepo[] = rawRepos
        .filter((r: any) => r.name !== '.github')
        .map((r: any) => ({
          name: r.name,
          fullName: r.full_name,
          description: (r.description || '').replace(/[—–]/g, '-').replace(/\s+-\s+/g, ', '),
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
            // Find what the display name was
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

      const slugs = ['authcore', 'statfyr', 'onejumpalljump', 'echoingdeaths'];
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
    } catch (err) {
      console.warn('[PotenFYR Studios] Live sync notice (using cached/fallback):', err);
      setLastSyncStatus((prev) => (prev === 'live' ? 'live' : 'cached'));
    } finally {
      setIsSyncing(false);
    }
  }, [snapshot.repos, triggerNotification]);

  useEffect(() => {
    fetchLive();

    const intervalId = setInterval(() => {
      fetchLive();
    }, AUTO_REFRESH_INTERVAL_MS);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchLive();
      }
    };

    window.addEventListener('focus', fetchLive);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', fetchLive);
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

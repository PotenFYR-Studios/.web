import { useState, useEffect, useCallback } from 'react';
import fallbackData from '../data/syncedData.json';

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
  modrinthDownloads?: number;
  modrinthFollowers?: number;
  category?: string;
  isMaintenance?: boolean;
  isPrivate?: boolean;
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

const STORAGE_KEY = 'potenfyr_hq_sync_v1';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes cache TTL

function loadFromStorage(): SyncedSnapshot | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.lastSyncedAt && Array.isArray(parsed.repos)) {
      return parsed;
    }
  } catch {
    // ignore
  }
  return null;
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
  if (name.includes('web') || topics.includes('website')) {
    return 'Web Platform';
  }
  return 'Open-Source Tooling';
}

export function useGitHubSync() {
  const [snapshot, setSnapshot] = useState<SyncedSnapshot>(() => {
    const cached = loadFromStorage();
    if (cached) return cached;
    return fallbackData as unknown as SyncedSnapshot;
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncStatus, setLastSyncStatus] = useState<'cached' | 'live' | 'fallback'>('cached');

  const fetchLive = useCallback(async (force = false) => {
    const cached = loadFromStorage();
    if (!force && cached) {
      const age = Date.now() - new Date(cached.lastSyncedAt).getTime();
      if (age < CACHE_TTL_MS) {
        setSnapshot(cached);
        setLastSyncStatus('cached');
        return;
      }
    }

    setIsSyncing(true);
    try {
      // 1. Fetch Repos from GitHub REST API
      const reposRes = await fetch('https://api.github.com/orgs/PotenFYR-Studios/repos?per_page=100&sort=pushed', {
        headers: { Accept: 'application/vnd.github.v3+json' },
      });

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
        }));

      // 2. Fetch Modrinth downloads for supported projects
      const modrinthMap: Record<string, { slug: string; downloads: number; followers: number; icon?: string }> = {
        ...fallbackData.modrinth,
      };

      const slugs = ['authcore', 'statfyr', 'onejumpalljump'];
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
      console.warn('[PotenFYR Studios] Live sync warning, fallback active:', err);
      if (!cached) {
        setSnapshot(fallbackData as unknown as SyncedSnapshot);
        setLastSyncStatus('fallback');
      } else {
        setLastSyncStatus('cached');
      }
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    fetchLive(false);

    // Refresh automatically when tab returns to visibility if older than TTL
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const cached = loadFromStorage();
        if (!cached || Date.now() - new Date(cached.lastSyncedAt).getTime() > CACHE_TTL_MS) {
          fetchLive(false);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [fetchLive]);

  return {
    snapshot,
    isSyncing,
    lastSyncStatus,
    refreshSync: () => fetchLive(true),
  };
}

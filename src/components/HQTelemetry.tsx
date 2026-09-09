import React from 'react';
import { RefreshCw, Radio, Star, Download, GitBranch } from 'lucide-react';
import { useGitHubSync } from '../lib/githubSync';


export const HQTelemetry: React.FC = () => {
  const { snapshot, isSyncing, lastSyncStatus, refreshSync } = useGitHubSync();

  const timeAgo = React.useMemo(() => {
    if (!snapshot.lastSyncedAt) return 'recently';
    const diffSec = Math.floor((Date.now() - new Date(snapshot.lastSyncedAt).getTime()) / 1000);
    if (diffSec < 60) return `${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    return `${Math.floor(diffMin / 60)}h ago`;
  }, [snapshot.lastSyncedAt]);

  return (
    <div className="w-full bg-slate-950/80 border-y border-white/[0.08] backdrop-blur-xl relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Status Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono tracking-wider text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold uppercase">SYSTEMS ONLINE</span>
            <span className="text-emerald-500/60 hidden sm:inline">|</span>
            <span className="text-slate-300 hidden sm:inline font-mono">OPERATIONAL</span>
          </div>

          {/* Sync Engine Status */}
          <div className="hidden lg:flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
            <Radio size={12} className="text-cyan-400 animate-pulse" />
            <span>Telemetry:</span>
            <span className={lastSyncStatus === 'live' ? 'text-cyan-300 font-semibold' : 'text-slate-300'}>
              {lastSyncStatus === 'live' ? 'Live GitHub Sync' : 'Cached Snapshot'}
            </span>
            <span className="text-slate-500">({timeAgo})</span>
          </div>
        </div>

        {/* Studio Real-time Metrics Counters */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-slate-300">
          <div className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
            <GitBranch size={13} className="text-cyan-400" />
            <span className="font-bold text-white">{snapshot.repos.length}</span>
            <span className="text-slate-400 hidden sm:inline">Repos</span>
          </div>

          <div className="flex items-center gap-1.5 hover:text-amber-300 transition-colors">
            <Star size={13} className="text-amber-400" />
            <span className="font-bold text-white">{snapshot.totalStars}</span>
            <span className="text-slate-400 hidden sm:inline">Stars</span>
          </div>

          <div className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
            <Download size={13} className="text-emerald-400" />
            <span className="font-bold text-white">{snapshot.totalDownloads.toLocaleString()}+</span>
            <span className="text-slate-400 hidden sm:inline">Downloads</span>
          </div>

          {/* Manual Force Sync Button */}
          <button
            onClick={() => refreshSync()}
            disabled={isSyncing}
            title="Force refresh live metadata from GitHub & Modrinth"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw size={11} className={isSyncing ? 'animate-spin text-cyan-400' : 'text-cyan-400'} />
            <span className="text-[11px] font-semibold">{isSyncing ? 'Syncing...' : 'Sync'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trash2, ExternalLink, X, Lock, GitBranch } from 'lucide-react';
import { SyncedRepo } from '../lib/githubSync';

export interface RepoNotification {
  id: string;
  type: 'added' | 'removed';
  repoName: string;
  repo?: Partial<SyncedRepo>;
  timestamp: number;
}

interface RepoNotificationToastProps {
  notifications: RepoNotification[];
  onDismiss: (id: string) => void;
}

export const RepoNotificationToast: React.FC<RepoNotificationToastProps> = ({
  notifications,
  onDismiss,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-[calc(100vw-3rem)] pointer-events-none">
      <AnimatePresence>
        {notifications.map((notif) => {
          const isAdded = notif.type === 'added';
          const isPrivate = notif.repo?.isPrivate ?? false;

          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`pointer-events-auto rounded-2xl p-4 shadow-2xl backdrop-blur-2xl border transition-all ${
                isAdded
                  ? isPrivate
                    ? 'bg-slate-950/95 border-purple-500/50 shadow-purple-950/40'
                    : 'bg-slate-950/95 border-cyan-500/50 shadow-cyan-950/40'
                  : 'bg-slate-950/95 border-rose-500/50 shadow-rose-950/40'
              }`}
            >
              {/* Header Status Bar */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`p-1.5 rounded-lg text-xs ${
                      isAdded
                        ? isPrivate
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-cyan-500/20 text-cyan-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {isAdded ? (
                      isPrivate ? <Lock size={14} /> : <Sparkles size={14} />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                      isAdded
                        ? isPrivate
                          ? 'text-purple-400'
                          : 'text-cyan-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {isAdded
                      ? isPrivate
                        ? 'Private Repository Detected'
                        : 'New Repository Live'
                      : 'Repository Unlisted'}
                  </span>
                </div>

                <button
                  onClick={() => onDismiss(notif.id)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Dismiss notification"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                  <span>{notif.repoName}</span>
                  {notif.repo?.language && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-white/10 text-slate-300">
                      {notif.repo.language}
                    </span>
                  )}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {isAdded
                    ? notif.repo?.description ||
                      'New repository synchronized into the PotenFYR Studios software ecosystem.'
                    : `Repository "${notif.repoName}" has been removed from GitHub and unlisted from the active catalog.`}
                </p>
              </div>

              {/* Action Buttons */}
              {isAdded && (
                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                  <a
                    href="#projects"
                    onClick={() => onDismiss(notif.id)}
                    className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    <GitBranch size={12} />
                    <span>View in Catalog</span>
                  </a>

                  {notif.repo?.url && !isPrivate && (
                    <a
                      href={notif.repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-white"
                    >
                      <span>GitHub</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

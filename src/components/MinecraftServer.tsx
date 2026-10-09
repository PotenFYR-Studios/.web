import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Skull,
  Flame,
  Copy,
  Check,
  Signal,
  SignalHigh,
  SignalZero,
  SignalLow,
  SignalMedium,
  ExternalLink,
} from 'lucide-react';
import { CardSpotlight } from './ui/CardSpotlight';
import { BorderBeam } from './ui/BorderBeam';
import { TextAnimate } from './ui/TextAnimate';

/**
 * POTENFYR ANARCHY - play.potenfyr.in
 * Minecraft 26.3, near-vanilla, minimal plugins, zero resets.
 */

interface ServerStatus {
  online: boolean;
  players: { online: number; max: number } | null;
  version: string | null;
}

// __MC_SERVER_STATUS__ is declared in src/vite-env.d.ts (injected at build
// time by the mc-server-status plugin in vite.config.ts).

const MC_HOST = 'play.potenfyr.in';
const FALLBACK_STATUS: ServerStatus = {
  online: true,
  players: { online: 0, max: 100 },
  version: '26.3',
};

export const MinecraftServer = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [status, setStatus] = useState<ServerStatus>(() => {
    try {
      return {
        online: __MC_SERVER_STATUS__.online,
        players: { online: __MC_SERVER_STATUS__.players, max: __MC_SERVER_STATUS__.max },
        version: __MC_SERVER_STATUS__.version,
      };
    } catch {
      return { ...FALLBACK_STATUS };
    }
  });
  const [copied, setCopied] = useState(false);
  const [liveConfirmed, setLiveConfirmed] = useState(false);

  // Live confirmation via mcsrvstat.us (open CORS). The API may only CONFIRM
  // build-time state; it never flips a build-time "offline" back to online,
  // and it goes silent on any network error.
  useEffect(() => {
    let cancelled = false;
    fetch('https://api.mcsrvstat.us/3/play.potenfyr.in')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data || typeof data !== 'object') return;
        setStatus((prev) => ({
          online: prev.online || Boolean(data.online),
          players:
            data.online && data.players
              ? { online: data.players.online ?? 0, max: data.players.max ?? 0 }
              : prev.players,
          version: data.version || prev.version,
        }));
        if (data.online) setLiveConfirmed(true);
      })
      .catch(() => {
        /* silent: keep build-time state */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const copyIp = async () => {
    try {
      await navigator.clipboard.writeText('play.potenfyr.in');
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard denied; the address is displayed as text anyway
    }
  };

  // Signal-bar metaphor: empty field -> strong signal. A full field is
  // reported honestly as congestion, not spun as success.
  const playersOnline = status.players?.online ?? 0;
  const playersMax = status.players?.max || 100;
  const bars = Math.min(4, Math.ceil((playersOnline / Math.max(playersMax, 1)) * 4));
  const SignalIcon = [SignalZero, SignalLow, SignalMedium, SignalHigh, Signal][bars];

  return (
    <section id="anarchy" className="relative py-28 bg-slate-950 overflow-hidden">
      {/* Ember field */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-white opacity-[0.06]" />
        <div className="absolute top-1/3 left-1/4 w-[520px] h-[520px] bg-orange-600/[0.07] rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 right-1/5 w-[420px] h-[420px] bg-red-700/[0.05] rounded-full blur-[170px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div ref={ref} className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Skull size={12} />
            <span>Live Season &middot; No Resets</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            <TextAnimate text="One world. No second chances." />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-slate-400 text-base leading-relaxed"
          >
            A near-vanilla anarchy world on Minecraft 26.3. Minimal plugins, no land claims, no
            economy resets: build it, burn it, or lose it. The world persists forever, and every
            scar on the map is permanent history.
          </motion.p>
        </div>

        {/* Server card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 relative max-w-3xl mx-auto"
        >
          <CardSpotlight className="relative p-8 sm:p-10 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl overflow-hidden">
            <BorderBeam size={240} duration={12} colorFrom="#f97316" colorTo="#dc2626" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Status block */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2.5">
                  <span
                    className={`relative flex h-3 w-3 ${status.online ? 'text-emerald-400' : 'text-rose-500'}`}
                  >
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${status.online ? 'bg-emerald-400' : 'bg-rose-500'}`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-3 w-3 ${status.online ? 'bg-emerald-500' : 'bg-rose-600'}`}
                    />
                  </span>
                  <span className="text-lg font-bold text-white">
                    {status.online ? 'Server Online' : 'Server Offline'}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400 text-xs font-mono">
                    <SignalIcon size={13} className="text-orange-400" />
                    {playersOnline}/{playersMax}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-slate-500 font-mono">
                  Minecraft {status.version || '26.3'} &middot; Near-Vanilla Anarchy &middot; Minimal Plugins
                </p>
                <p className="mt-0.5 text-xs text-slate-600 font-mono">
                  {MC_HOST} &middot; SRV routed &middot; Java Edition
                </p>
                {liveConfirmed && (
                  <p className="mt-0.5 text-[10px] uppercase tracking-widest text-emerald-400/80 font-mono">
                    Live-confirmed via mcsrvstat
                  </p>
                )}
              </div>

              {/* Copy IP block */}
              <button
                onClick={copyIp}
                className="group shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/40 hover:border-orange-400/60 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.25)]"
              >
                {copied ? (
                  <Check size={16} className="text-emerald-400" />
                ) : (
                  <Copy size={16} className="text-orange-400" />
                )}
                {copied ? 'Copied!' : 'play.potenfyr.in'}
              </button>
            </div>

            {/* Rules strip */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <Flame size={13} className="text-orange-400 shrink-0" />
                <span>No resets. Ever.</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Flame size={13} className="text-orange-400 shrink-0" />
                <span>No land claims. No safe zones.</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Flame size={13} className="text-orange-400 shrink-0" />
                <span>Griefing allowed. Whining isn't.</span>
              </div>
            </div>
          </CardSpotlight>
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="https://modrinth.com/mod/authcore"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/70 hover:bg-slate-800 border border-white/10 hover:border-orange-400/40 rounded-xl transition-all duration-300"
          >
            <ExternalLink size={13} className="text-orange-400" />
            AuthCore: the framework that guards this world
          </a>
        </motion.div>
      </div>
    </section>
  );
};

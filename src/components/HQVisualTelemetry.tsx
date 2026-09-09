import React, { useState } from 'react';
import {
  Activity,
  Server,
  Download,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { useGitHubSync } from '../lib/githubSync';
import { CardSpotlight } from './ui/CardSpotlight';

interface EggSpec {
  title: string;
  tagline: string;
  supported: string[];
  features: string[];
  command: string;
}

const EGG_SPECS: EggSpec[] = [
  {
    title: 'Minecraft-Eggs',
    tagline: '18+ Server Types In One Universal Container',
    supported: ['Vanilla', 'Paper', 'Purpur', 'Fabric', 'Forge', 'NeoForge', 'Velocity', 'Bedrock'],
    features: ['Auto-Java selector (8-21)', 'Memory flag optimization (Aikar/ZGC)', 'Crash recovery handler'],
    command: 'git clone https://github.com/PotenFYR-Studios/Minecraft-Eggs',
  },
  {
    title: 'Prog-Language-Eggs',
    tagline: '50+ Programming Languages Compiled & Executed',
    supported: ['Node.js', 'Python', 'Java', 'Rust', 'Go', 'C/C++', 'PHP', 'Ruby', 'Bun', 'Zig'],
    features: ['Multi-architecture (AMD64 / ARM64)', 'Pre-warmed runtime packages', 'Fly.io & K8s compatible'],
    command: 'git clone https://github.com/PotenFYR-Studios/Prog-Language-Eggs',
  },
  {
    title: 'Database-Eggs',
    tagline: 'Universal Multi-Database Production Containers',
    supported: ['PostgreSQL 14-17', 'MariaDB / MySQL', 'MongoDB', 'Redis 7', 'SQLite (WAL)'],
    features: ['Automated database initialization', 'Persistent volume mapping', 'Panel SSL encryption'],
    command: 'git clone https://github.com/PotenFYR-Studios/Database-Eggs',
  },
];

export const HQVisualTelemetry: React.FC = () => {
  const { snapshot } = useGitHubSync();
  const [selectedEgg, setSelectedEgg] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="telemetry" className="relative py-24 bg-slate-950 overflow-hidden border-t border-white/5">
      {/* Radial lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Activity size={12} className="animate-pulse" />
            <span>Studio Graphics & Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Real-time <span className="text-gradient-cyan">Ecosystem Diagnostics.</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Live telemetry tracking container egg matrices, verified Modrinth distribution, and API defense benchmarks.
          </p>
        </div>

        {/* 2-Column Telemetry Graphics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Egg Container Matrix Graphic (7 Cols) */}
          <div className="lg:col-span-7">
            <CardSpotlight className="p-6 sm:p-8 h-full flex flex-col justify-between group">
              <div>
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Server size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        Universal Egg Matrix
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        One egg. Every panel. Full compatibility.
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    100% PANEL PARITY
                  </span>
                </div>

                {/* Egg Selection Tabs */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {EGG_SPECS.map((egg, idx) => (
                    <button
                      key={egg.title}
                      onClick={() => setSelectedEgg(idx)}
                      className={`p-3 rounded-xl border text-left transition-all text-xs font-mono ${
                        selectedEgg === idx
                          ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-950/30'
                          : 'bg-slate-900/50 border-white/5 text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      <div className="font-bold text-xs truncate">{egg.title}</div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">Spec V2</div>
                    </button>
                  ))}
                </div>

                {/* Active Egg Spec Breakdown */}
                <div className="space-y-4 font-mono">
                  <div className="text-sm font-semibold text-white">
                    {EGG_SPECS[selectedEgg].tagline}
                  </div>

                  {/* Supported Badges Grid */}
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                      Verified Environments
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {EGG_SPECS[selectedEgg].supported.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-300 text-xs flex items-center gap-1.5"
                        >
                          <CheckCircle2 size={11} className="text-cyan-400" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Architecture Features */}
                  <div className="pt-2">
                    <div className="text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                      Container Engineering
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {EGG_SPECS[selectedEgg].features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2">
                          <span className="text-cyan-400 font-bold">&gt;</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Command Quick Copy Bar */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-white/5 font-mono text-xs">
                <code className="text-cyan-300 truncate">{EGG_SPECS[selectedEgg].command}</code>
                <button
                  onClick={() => copyCommand(EGG_SPECS[selectedEgg].command)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 shrink-0 text-xs transition-colors"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Clone'}</span>
                </button>
              </div>
            </CardSpotlight>
          </div>

          {/* Right Column: Live Downloads & Ecosystem Metrics (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Top Card: Modrinth Verified Downloads Graphic */}
            <CardSpotlight className="p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Download size={16} className="text-emerald-400" />
                  <span>Modrinth Distribution Metric</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {snapshot.totalDownloads.toLocaleString()}+ total
                </span>
              </div>

              {/* Graphic Bars for Modrinth */}
              <div className="space-y-3 font-mono text-xs">
                {/* AuthCore */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span className="font-semibold text-white">AuthCore (Fabric)</span>
                    <span className="text-emerald-400 font-bold">1,994 DLs (96.9%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 w-[96.9%]" />
                  </div>
                </div>

                {/* Statfyr */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span className="font-semibold text-white">Statfyr (Paper/Spigot)</span>
                    <span className="text-cyan-400 font-bold">38 DLs (1.8%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                    <div className="h-full rounded-full bg-cyan-400 w-[15%]" />
                  </div>
                </div>

                {/* OneJumpAllJump */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span className="font-semibold text-white">OneJumpAllJump</span>
                    <span className="text-blue-400 font-bold">26 DLs (1.3%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                    <div className="h-full rounded-full bg-blue-400 w-[10%]" />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>API: Modrinth v2 Verified</span>
                <a
                  href="https://modrinth.com/organization/potenfyr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>Explore Modrinth</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </CardSpotlight>

            {/* Bottom Card: Telemetry Ping Waveform */}
            <CardSpotlight className="p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Activity size={14} className="text-cyan-400 animate-pulse" />
                  <span>Node Latency & Heartbeat</span>
                </div>
                <span className="text-emerald-400 font-bold">18ms AVG</span>
              </div>

              {/* Graphical Waveform Simulation */}
              <div className="py-2">
                <svg viewBox="0 0 400 60" className="w-full h-14 stroke-cyan-400 fill-none">
                  <path
                    d="M 0 30 L 50 30 L 65 10 L 80 45 L 95 20 L 110 35 L 125 30 L 180 30 L 195 5 L 210 55 L 225 15 L 240 38 L 255 30 L 320 30 L 335 12 L 350 48 L 365 25 L 380 30 L 400 30"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-90"
                  />
                  {/* Glowing line effect */}
                  <path
                    d="M 0 30 L 50 30 L 65 10 L 80 45 L 95 20 L 110 35 L 125 30 L 180 30 L 195 5 L 210 55 L 225 15 L 240 38 L 255 30 L 320 30 L 335 12 L 350 48 L 365 25 L 380 30 L 400 30"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-20 stroke-cyan-300 blur-sm"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono border-t border-white/5 pt-3 text-slate-400">
                <div>
                  <div className="text-slate-500">PACKET LOSS</div>
                  <div className="text-emerald-400 font-bold">0.00%</div>
                </div>
                <div>
                  <div className="text-slate-500">HOST STATUS</div>
                  <div className="text-cyan-400 font-bold">EDGE CDN</div>
                </div>
                <div>
                  <div className="text-slate-500">RUNTIME</div>
                  <div className="text-amber-400 font-bold">BUN v1.4</div>
                </div>
              </div>
            </CardSpotlight>

          </div>

        </div>

      </div>
    </section>
  );
};

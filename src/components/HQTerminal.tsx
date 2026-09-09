import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useGitHubSync } from '../lib/githubSync';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
  time: string;
}

export const HQTerminal: React.FC = () => {
  const { snapshot, refreshSync } = useGitHubSync();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'potenfyr init',
      time: '12:00:01',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-semibold">⚡ PotenFYR Studios Command Deck [v1.4.0-bun]</p>
          <p className="text-slate-400">Type <span className="text-cyan-300 font-mono font-bold">help</span> or click the shortcuts below to query the ecosystem.</p>
        </div>
      ),
    },
  ]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const time = new Date().toLocaleTimeString();

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    let out: React.ReactNode;

    switch (trimmed) {
      case 'help':
        out = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-300 font-bold">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 font-mono text-xs">
              <div><span className="text-cyan-400">status</span> : Studio operational telemetry & node status</div>
              <div><span className="text-cyan-400">projects</span> : Live project roster & stats</div>
              <div><span className="text-cyan-400">eggs</span> : Container egg ecosystem specifications</div>
              <div><span className="text-cyan-400">stack</span> : Tech stack matrix & language share</div>
              <div><span className="text-cyan-400">sync</span> : Trigger immediate GitHub & Modrinth sync</div>
              <div><span className="text-cyan-400">clear</span> : Clear terminal history</div>
            </div>
          </div>
        );
        break;

      case 'status':
        out = (
          <div className="space-y-1 text-slate-300 font-mono text-xs">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 size={14} />
              <span className="font-bold">STATUS: ALL SYSTEMS OPERATIONAL</span>
            </div>
            <p>• Node: PotenFYR-Primary (Vite + React 18 + Bun)</p>
            <p>• Public Repositories: {snapshot.repos.length} active</p>
            <p>• Modrinth Downloads: {snapshot.totalDownloads.toLocaleString()}+ verified</p>
            <p>• Security Layer: APICordon PR-Native Active</p>
            <p>• Uptime: 99.99% across ecosystem nodes</p>
          </div>
        );
        break;

      case 'projects':
        out = (
          <div className="space-y-1.5 font-mono text-xs">
            <p className="text-cyan-300 font-bold">Active Projects in Orbit:</p>
            {snapshot.repos.slice(0, 5).map((r) => (
              <div key={r.name} className="flex items-center justify-between text-slate-300 border-b border-white/5 pb-0.5">
                <span className="text-white font-semibold">{r.name}</span>
                <span className="text-cyan-400 text-[11px]">{r.language || 'Multi'}</span>
                <span className="text-slate-400 text-[11px]">★ {r.stars}</span>
              </div>
            ))}
            <p className="text-slate-500 text-[11px]">...and {Math.max(0, snapshot.repos.length - 5)} more in the catalog below.</p>
          </div>
        );
        break;

      case 'eggs':
        out = (
          <div className="space-y-1 font-mono text-xs text-slate-300">
            <p className="text-indigo-400 font-bold">🥚 Universal Egg Ecosystem [One egg. Every panel]:</p>
            <p>• <span className="text-white font-semibold">Minecraft-Eggs</span>: Vanilla, Paper, Fabric, Forge, NeoForge, Bedrock (18+ types)</p>
            <p>• <span className="text-white font-semibold">Prog-Language-Eggs</span>: 50+ languages compiled inside container</p>
            <p>• <span className="text-white font-semibold">Database-Eggs</span>: PostgreSQL, MariaDB, MongoDB, Redis multi-version</p>
            <p className="text-cyan-300 text-[11px]">Panels: Pterodactyl, Pelican, Feather Panel, PufferPanel, Docker</p>
          </div>
        );
        break;

      case 'stack':
        out = (
          <div className="space-y-1 font-mono text-xs text-slate-300">
            <p className="text-cyan-300 font-bold">Language & Architecture Breakdown:</p>
            <div className="space-y-1 mt-1">
              <div className="flex justify-between"><span>Java (Fabric & Spigot engines)</span><span className="text-amber-400 font-bold">54.7%</span></div>
              <div className="flex justify-between"><span>Shell / Docker (Hosting Eggs)</span><span className="text-emerald-400 font-bold">39.7%</span></div>
              <div className="flex justify-between"><span>TypeScript / React (Web & Bots)</span><span className="text-blue-400 font-bold">3.0%</span></div>
              <div className="flex justify-between"><span>Python / Dockerfile</span><span className="text-indigo-400 font-bold">1.5%</span></div>
            </div>
          </div>
        );
        break;

      case 'sync':
        refreshSync();
        out = (
          <div className="font-mono text-xs text-cyan-300 space-y-1">
            <p>🔄 Initiated auto-sync with GitHub REST API & Modrinth v2 API...</p>
            <p className="text-emerald-400">✔ Sync complete. LocalStorage cache updated (15m TTL active).</p>
          </div>
        );
        break;

      default:
        out = (
          <p className="font-mono text-xs text-rose-400">
            Command not recognized: "{trimmed}". Type <span className="text-cyan-300 underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> for available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output: out, time }]);
    setInput('');
  };


  return (
    <section id="terminal" className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Terminal Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <TerminalIcon size={12} />
            <span>Interactive Terminal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Direct interface into <span className="text-gradient-cyan">PotenFYR Studios</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm">
            Execute commands to inspect telemetry, software repositories, and server eggs.
          </p>
        </div>

        {/* Terminal Window Container */}
        <div className="rounded-2xl border border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur-xl overflow-hidden font-mono">
          
          {/* Top Window Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/40" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/40" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/40" />
              <span className="ml-2 text-xs text-slate-400 font-sans font-medium flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-cyan-400" />
                potenfyr-deck (bun / sh)
              </span>
            </div>

            <div className="text-[11px] text-slate-500">
              Session: <span className="text-emerald-400">AUTHENTICATED</span>
            </div>
          </div>

          {/* Terminal Quick Command Chips */}
          <div className="px-4 py-2 bg-slate-900/40 border-b border-white/5 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 text-[11px]">Quick Run:</span>
            {['status', 'projects', 'eggs', 'stack', 'sync', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-0.5 rounded-md bg-white/[0.04] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 transition-all text-[11px]"
              >
                &gt; {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalBodyRef}
            className="p-5 max-h-[360px] overflow-y-auto space-y-4 text-sm text-left overscroll-contain"
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <span className="text-cyan-400 font-bold">&gt;</span>
                  <span className="text-white font-semibold">{item.command}</span>
                  <span className="text-[10px] text-slate-600 ml-auto">{item.time}</span>
                </div>
                <div className="pl-4 border-l-2 border-cyan-500/20">{item.output}</div>
              </div>
            ))}
          </div>

          {/* Command Prompt Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) executeCommand(input);
            }}
            className="p-3 bg-slate-900/70 border-t border-white/[0.08] flex items-center gap-2"
          >
            <span className="text-cyan-400 font-bold pl-2">&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a command (e.g. status, projects, eggs, stack)..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-600 focus:outline-none font-mono"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 transition-colors"
              aria-label="Submit command"
            >
              <CornerDownLeft size={14} />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};

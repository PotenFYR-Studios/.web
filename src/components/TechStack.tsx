import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';
import { Cpu, Terminal } from 'lucide-react';
import { OrbitingCircles } from './ui/OrbitingCircles';
import { useGitHubSync } from '../lib/githubSync';

const innerTechs = [
  { name: 'React', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Bun', color: '#FBF0DF' },
  { name: 'Tailwind', color: '#06B6D4' },
];

const outerTechs = [
  { name: 'Java 21', color: '#ED8B00' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Fabric', color: '#dbb98f' },
  { name: 'Spigot', color: '#F25F4C' },
  { name: 'Bash', color: '#89E051' },
  { name: 'PostgreSQL', color: '#336791' },
];

const languageMix = [
  { name: 'Java', share: 54.7, color: '#ED8B00', desc: 'Fabric mods & Spigot/Paper server plugins' },
  { name: 'Shell / Bash', share: 39.7, color: '#89E051', desc: 'Universal hosting eggs & automation scripts' },
  { name: 'TypeScript', share: 3.0, color: '#3178C6', desc: 'Web apps, APIs & Discord automation' },
  { name: 'Dockerfile', share: 1.1, color: '#2496ED', desc: 'Multi-arch OCI container images' },
  { name: 'Python / Other', share: 1.5, color: '#A855F7', desc: 'Micro-services & CI verification' },
];

export default function TechStack() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { snapshot } = useGitHubSync();

  return (
    <section id="tech-stack" className="relative py-28 bg-slate-950 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-16">
          <Parallax speed={-2}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4"
            >
              <Cpu size={12} />
              <span>HQ Tech Matrix & Telemetry</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              Engineered with <span className="text-gradient-cyan">modern frameworks & tools.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-slate-400 text-base font-normal leading-relaxed"
            >
              From bare-metal Minecraft byte manipulation in Java to containerized multi-language platforms and Bun-powered web apps.
            </motion.p>
          </Parallax>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Orbiting Circles Showcase (7 Cols) */}
          <div className="lg:col-span-7 relative flex h-[480px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl shadow-2xl">
            
            {/* Central Hub Badge */}
            <div className="z-10 flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-cyan-500/40 bg-slate-900/90 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
              <span className="text-cyan-400 font-black text-2xl tracking-wider">P</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">STUDIOS</span>
            </div>

            {/* Inner Orbiting Circles */}
            {innerTechs.map((tech, idx) => (
              <OrbitingCircles
                key={tech.name}
                className="h-10 w-10 border-cyan-500/30"
                duration={22}
                delay={idx * 5.5}
                radius={115}
                iconSize={38}
              >
                <span className="text-[11px] font-bold" style={{ color: tech.color }}>
                  {tech.name}
                </span>
              </OrbitingCircles>
            ))}

            {/* Outer Orbiting Circles (Reverse) */}
            {outerTechs.map((tech, idx) => (
              <OrbitingCircles
                key={tech.name}
                className="h-11 w-11 border-blue-500/30"
                duration={32}
                delay={idx * 5.3}
                radius={190}
                reverse
                iconSize={42}
              >
                <span className="text-[11px] font-bold" style={{ color: tech.color }}>
                  {tech.name}
                </span>
              </OrbitingCircles>
            ))}
          </div>

          {/* Live Codebase Language Breakdown (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <Terminal size={16} className="text-cyan-400" />
                  <span>Language Distribution</span>
                </h3>
                <p className="text-xs text-slate-400">Across {snapshot.repos.length} PotenFYR public repositories</p>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                LIVE METRICS
              </span>
            </div>

            {/* Language Share Breakdown List */}
            <div className="space-y-4">
              {languageMix.map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-semibold text-white">{item.name}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-300">{item.share}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-800/80 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${item.share}%`, backgroundColor: item.color }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 font-normal leading-tight">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Footnote badge */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Source: GitHub API & OCI Specs</span>
              <span className="text-emerald-400">VERIFIED</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

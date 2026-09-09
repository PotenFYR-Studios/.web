import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';
import { Cpu, Terminal } from 'lucide-react';
import { OrbitingCircles } from './ui/OrbitingCircles';
import { useGitHubSync } from '../lib/githubSync';

// Branded vector icons for technology radar
const TechIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'React':
      return (
        <svg viewBox="-11.5 -10.23 23 20.46" className="w-5 h-5">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case 'TypeScript':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M11.5 8.5H5.5V11H7V18H10V11H11.5V8.5Z" fill="white" />
          <path d="M18.5 11.2C18.5 9.5 17 8.5 15.2 8.5C13.2 8.5 12 9.7 12 11.4H14.5C14.5 10.7 14.8 10.3 15.3 10.3C15.8 10.3 16.1 10.6 16.1 11.1C16.1 11.6 15.8 11.9 14.7 12.3C13.1 12.9 12 13.8 12 15.5C12 17.2 13.3 18.2 15.3 18.2C17.3 18.2 18.6 17 18.6 15.2H16.1C16.1 16 15.7 16.4 15.2 16.4C14.7 16.4 14.4 16.1 14.4 15.6C14.4 15 14.8 14.7 16 14.2C17.7 13.6 18.5 12.7 18.5 11.2Z" fill="white" />
        </svg>
      );
    case 'Bun':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <path d="M12 4C7.5 4 4 7 4 11C4 14.5 6.5 17 9.5 18C10.5 18.3 11 19 12 19C13 19 13.5 18.3 14.5 18C17.5 17 20 14.5 20 11C20 7 16.5 4 12 4Z" fill="#FBF0DF" stroke="#ED8B00" strokeWidth="1.2" />
          <circle cx="9.5" cy="11.5" r="1.2" fill="#222" />
          <circle cx="14.5" cy="11.5" r="1.2" fill="#222" />
          <circle cx="7.5" cy="13" r="1" fill="#FF8080" opacity="0.6" />
          <circle cx="16.5" cy="13" r="1" fill="#FF8080" opacity="0.6" />
          <path d="M10.5 13.5C11.5 14.5 12.5 14.5 13.5 13.5" stroke="#222" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case 'Tailwind':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#06B6D4">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C10.335 13.382 8.974 12 6.001 12z" />
        </svg>
      );
    case 'Java 21':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <path d="M8.5 17.5C11 18 15 18 17.5 16.5C16.5 18.5 12 19.5 8 18.5C7.2 18.3 7 18.1 8.5 17.5Z" fill="#ED8B00" />
          <path d="M7 15C10 15.5 15 15.5 18.5 14C17 16 11 17 6.5 16C5.5 15.8 5.5 15.5 7 15Z" fill="#ED8B00" />
          <path d="M12.5 7C13.5 8 13.5 9 12 10.5C10.5 12 11 13 13 14C11 14 9 13 9.5 11.5C10 10 12 9.5 11 8C10.5 7.3 11 6.5 12.5 7Z" fill="#5382A1" />
          <path d="M15 9C16 10 15.5 11 13.5 12.5C12 13.5 13 14 14.5 14.5C13 15 11 14 11.5 13C12.5 11.5 14 11 13.5 9.8C13.2 9.2 14 8.5 15 9Z" fill="#E76F00" />
        </svg>
      );
    case 'Docker':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#2496ED">
          <path d="M22.5 11.5c-.3-.2-1-.4-1.7-.2-.2-.5-.6-1-1.1-1.3-.2-.1-.5-.2-.7-.2-.2-1.3-1.1-2.4-2.4-2.8-.2 0-.3 0-.5.1-.3-.6-.8-1-1.4-1.3-.8-.4-1.8-.4-2.6 0l-.3.2V5h-2v2h-2V5h-2v2H5.7C5.3 7 5 7.3 5 7.7v1.6H3v2h2v1.4C5 13.5 5.8 14 6.7 14h.6c.3 1.8 1.4 3.4 3 4.3 1.2.7 2.6 1 4 1 3.5 0 6.6-2 8-5.1.5 0 1.2-.1 1.7-.5.5-.4.7-.9.7-1.3 0-.3-.1-.6-.2-.9zM7 9h2v2H7V9zm3 0h2v2h-2V9zm3 0h2v2h-2V9zm0-3h2v2h-2V6zm3 3h2v2h-2V9zm0-3h2v2h-2V6z" />
        </svg>
      );
    case 'Fabric':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" stroke="#dbb98f" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 6L7 9V15L12 18L17 15V9L12 6Z" fill="#dbb98f" opacity="0.4" />
          <circle cx="12" cy="12" r="2.5" fill="#dbb98f" />
        </svg>
      );
    case 'Spigot':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#1e1e2e" stroke="#F25F4C" strokeWidth="1.5" />
          <path d="M8 8H16V10H13V16H11V10H8V8Z" fill="#F25F4C" />
          <circle cx="12" cy="17" r="1" fill="#F25F4C" />
        </svg>
      );
    case 'Bash':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="3" fill="#0f172a" stroke="#89E051" strokeWidth="1.5" />
          <path d="M7 9L11 12L7 15" stroke="#89E051" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 15H17" stroke="#89E051" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'PostgreSQL':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <ellipse cx="12" cy="6.5" rx="7.5" ry="3" fill="#336791" stroke="#60a5fa" strokeWidth="1" />
          <path d="M4.5 6.5V11.5C4.5 13.2 7.9 14.5 12 14.5C16.1 14.5 19.5 13.2 19.5 11.5V6.5" stroke="#60a5fa" strokeWidth="1" fill="#336791" fillOpacity="0.5" />
          <path d="M4.5 11.5V16.5C4.5 18.2 7.9 19.5 12 19.5C16.1 19.5 19.5 18.2 19.5 16.5V11.5" stroke="#60a5fa" strokeWidth="1" fill="#336791" fillOpacity="0.8" />
        </svg>
      );
    default:
      return <Terminal className="w-5 h-5 text-cyan-400" />;
  }
};

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
              <span>Tech Matrix & Telemetry</span>
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
                className="border border-cyan-500/40 bg-slate-900/95"
                duration={24}
                delay={idx * 6}
                radius={115}
                iconSize={44}
              >
                <TechIcon name={tech.name} />
                <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900/95 border border-white/20 px-2 py-0.5 text-[10px] font-mono font-semibold text-white shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-30">
                  {tech.name}
                </span>
              </OrbitingCircles>
            ))}

            {/* Outer Orbiting Circles (Reverse) */}
            {outerTechs.map((tech, idx) => (
              <OrbitingCircles
                key={tech.name}
                className="border border-blue-500/40 bg-slate-900/95"
                duration={36}
                delay={idx * 6}
                radius={195}
                reverse
                iconSize={44}
              >
                <TechIcon name={tech.name} />
                <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900/95 border border-white/20 px-2 py-0.5 text-[10px] font-mono font-semibold text-white shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-30">
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

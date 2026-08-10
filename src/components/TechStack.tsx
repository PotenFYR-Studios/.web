import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';
import { Cpu } from 'lucide-react';
import { OrbitingCircles } from './ui/OrbitingCircles';

// Tech stack items with custom SVG path/rendering or text labels
const innerTechs = [
  { name: 'React', color: '#61DAFB', label: 'React' },
  { name: 'JS', color: '#F7DF1E', label: 'JavaScript' },
  { name: 'Node', color: '#5FA04E', label: 'Node.js' },
  { name: 'Tailwind', color: '#06B6D4', label: 'Tailwind' },
];

const outerTechs = [
  { name: 'Python', color: '#3776AB', label: 'Python' },
  { name: 'Java', color: '#ED8B00', label: 'Java' },
  { name: 'Docker', color: '#2496ED', label: 'Docker' },
  { name: 'Nginx', color: '#009639', label: 'Nginx' },
  { name: 'Linux', color: '#FCC624', label: 'Linux' },
  { name: 'NPM', color: '#CB3837', label: 'NPM' },
];

export default function TechStack() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="tech-stack" className="relative py-28 bg-slate-950 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-12">
          <Parallax speed={-2}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4"
            >
              <Cpu size={12} />
              <span>Technology Stack</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              Powered by modern <span className="text-gradient-cyan">tooling & frameworks.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-slate-400 text-base font-normal leading-relaxed"
            >
              From system-level performance in Java to real-time WebSockets and cloud containers.
            </motion.p>
          </Parallax>
        </div>

        {/* Orbiting Circles Showcase */}
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl shadow-2xl">
          
          {/* Central Hub Logo */}
          <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-cyan-500/40 bg-slate-900 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
            <span className="text-cyan-400 font-extrabold text-2xl tracking-widest">P</span>
          </div>

          {/* Inner Orbiting Circles (Radius 120) */}
          {innerTechs.map((tech, idx) => (
            <OrbitingCircles
              key={tech.name}
              className="h-10 w-10 border-cyan-500/30"
              duration={25}
              delay={idx * 6}
              radius={120}
              iconSize={40}
            >
              <span className="text-xs font-bold" style={{ color: tech.color }}>
                {tech.name}
              </span>
            </OrbitingCircles>
          ))}

          {/* Outer Orbiting Circles (Radius 200, Reverse) */}
          {outerTechs.map((tech, idx) => (
            <OrbitingCircles
              key={tech.name}
              className="h-11 w-11 border-blue-500/30"
              duration={35}
              delay={idx * 5.8}
              radius={200}
              reverse
              iconSize={44}
            >
              <span className="text-[11px] font-bold" style={{ color: tech.color }}>
                {tech.name}
              </span>
            </OrbitingCircles>
          ))}

        </div>

      </div>
    </section>
  );
}

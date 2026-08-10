import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';
import { Cpu, Layers, Workflow, Code2, Sparkles, Server } from 'lucide-react';
import { BorderBeam } from './ui/BorderBeam';
import { CardSpotlight } from './ui/CardSpotlight';
import { TextAnimate } from './ui/TextAnimate';

const capabilities = [
  { label: 'Discord Ecosystem Tooling', icon: Workflow, desc: 'Automated bots & moderation systems' },
  { label: 'Minecraft Mods & Plugins', icon: Layers, desc: 'Fabric, Spigot, Bukkit optimization' },
  { label: 'Backend Architecture', icon: Cpu, desc: 'High-concurrency cloud services' },
  { label: 'Developer Solutions', icon: Code2, desc: 'APIs, SDKs, and custom libraries' },
];

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="relative py-28 bg-slate-950 overflow-hidden">
      
      {/* Parallax Background Dots & Glow */}
      <Parallax speed={-5} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-dots-white opacity-30 mask-radial-gradient" />
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />
      </Parallax>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Parallax speed={-2}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4"
            >
              <Sparkles size={12} />
              <span>About The Studio</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              <TextAnimate text="Engineering software with precision & scale." />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-slate-400 text-base font-normal leading-relaxed"
            >
              Potenfyr Studios is a modern development studio built by tech enthusiasts. We craft high-performance mods, automation systems, and developer infrastructure.
            </motion.p>
          </Parallax>
        </div>

        {/* Aceternity Style Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Main Overview Bento Card (Spans full 3 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-3"
          >
            <CardSpotlight className="h-full p-8 md:p-10 flex flex-col md:flex-row items-center justify-between group gap-8">
              <BorderBeam size={300} duration={15} colorFrom="#06b6d4" colorTo="#3b82f6" />
              <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  <Server size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                  Infrastructure Built for Scale & Reliability
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-normal max-w-2xl">
                  Our core mission is delivering developer-first utilities and infrastructure. Whether it’s high-frequency Minecraft authentication mods, automated Discord moderation bots, or real-time analytics platforms, we engineer for maximum throughput and seamless developer UX.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                <span className="px-4 py-2 text-xs font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-800/40 rounded-xl text-center">
                  Minecraft Ecosystem
                </span>
                <span className="px-4 py-2 text-xs font-semibold text-blue-300 bg-blue-950/80 border border-blue-800/40 rounded-xl text-center">
                  Discord Automation
                </span>
                <span className="px-4 py-2 text-xs font-semibold text-indigo-300 bg-indigo-950/80 border border-indigo-800/40 rounded-xl text-center">
                  REST & WebSockets
                </span>
              </div>
            </CardSpotlight>
          </motion.div>

          {/* Capabilities Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2"
          >
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <CardSpotlight key={item.label} className="p-6 group hover:border-cyan-500/40 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all duration-300 mb-4">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight mb-1">
                    {item.label}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </CardSpotlight>
              );
            })}
          </motion.div>

        </div>

      </div>
    </section>
  );
}

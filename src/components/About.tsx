import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';
import { Layers, Workflow, Sparkles, Server, Shield } from 'lucide-react';
import { BorderBeam } from './ui/BorderBeam';
import { CardSpotlight } from './ui/CardSpotlight';
import { TextAnimate } from './ui/TextAnimate';

const capabilities = [
  { label: 'Universal Container Eggs', icon: Server, desc: 'Pterodactyl, Pelican, Feather Panel images' },
  { label: 'Fabric & Spigot Frameworks', icon: Layers, desc: 'Session auth, game stats APIs, curses' },
  { label: 'PR-Native API Security', icon: Shield, desc: 'APICordon automated contract audits' },
  { label: 'Discord Systems & Bots', icon: Workflow, desc: 'Moderation pipelines, ticketing, integrations' },
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
              <span>Studio Strategic Overview</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl text-center sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              <div className="text-center">
                <TextAnimate text="Engineering software with precision & scale." />
              </div>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-center text-slate-400 text-base font-normal leading-relaxed"
            >
              PotenFYR Studios is an open-source engineering headquarters. We craft high-throughput server tooling, universal hosting container eggs, game mod ecosystems, and security layers.
            </motion.p>
          </Parallax>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Main Overview Bento Card */}
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
                  Our core mission is delivering developer-first utilities and infrastructure. From universal container eggs running 50+ languages across panel hosts to Fabric authentication engines deployed on production Minecraft servers, our software is engineered for maximum throughput and 99.99% operational reliability.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
                <span className="px-4 py-2 text-xs font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-800/40 rounded-xl text-center">
                  🥚 Universal Hosting Eggs
                </span>
                <span className="px-4 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-800/40 rounded-xl text-center">
                  🧩 2,000+ Mod Downloads
                </span>
                <span className="px-4 py-2 text-xs font-semibold text-blue-300 bg-blue-950/80 border border-blue-800/40 rounded-xl text-center">
                  🔐 PR-Native API Defense
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

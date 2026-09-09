import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';
import { Cpu, Wrench } from 'lucide-react';

import { services } from '../data/siteData';
import { CardSpotlight } from './ui/CardSpotlight';
import { TextAnimate } from './ui/TextAnimate';

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="services" className="relative py-28 bg-slate-950 overflow-hidden">
      
      {/* Parallax Background Glow */}
      <Parallax speed={-4} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[200px]" />
      </Parallax>

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
              <span>HQ Capabilities & Scope</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              <TextAnimate text="Capabilities designed for extreme scale." />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-slate-400 text-base font-normal leading-relaxed"
            >
              From low-level game engine mods and container egg virtualization to automated PR security scanners.
            </motion.p>
          </Parallax>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, idx) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="h-full"
              >
                <CardSpotlight className="h-full p-7 flex flex-col justify-between group hover:border-cyan-500/40 transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all duration-300">
                        <Icon size={22} />
                      </div>
                      {service.badge && (
                        <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 rounded-full">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>

                    <p className="mt-2.5 text-sm text-slate-400 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-cyan-400 transition-colors">
                    <span className="flex items-center gap-1">
                      <Wrench size={12} />
                      <span>Production Verified</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400/80">99.9% UPTIME</span>
                  </div>
                </CardSpotlight>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

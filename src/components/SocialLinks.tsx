import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Share2, ArrowUpRight } from 'lucide-react';
import { socialLinks } from '../data/siteData';
import { CardSpotlight } from './ui/CardSpotlight';

export default function SocialLinks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div ref={ref} className="text-center max-w-xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3"
          >
            <Share2 size={12} />
            <span>Official Networks</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          >
            Connect across <span className="text-gradient-cyan">PotenFYR channels</span>
          </motion.h2>
          <p className="mt-3 text-slate-400 text-sm">
            Access our GitHub repositories, download verified Modrinth builds, or join our Discord servers.
          </p>
        </div>

        {/* Social Cards Grid (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {socialLinks.map((link, idx) => {
            const Icon = link.icon;

            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
              >
                <CardSpotlight className="p-6 flex items-center justify-between group hover:border-cyan-500/40 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ color: link.color }}
                    >
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {link.name}
                      </div>
                      <div className="text-xs text-slate-400 font-normal mt-0.5">
                        {link.description}
                      </div>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all shrink-0 ml-2">
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </CardSpotlight>
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageCircle, Users, ExternalLink, Radio } from 'lucide-react';
import { CardSpotlight } from './ui/CardSpotlight';

export default function Community() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="community" className="relative py-28 bg-slate-950 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-500/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute inset-0 bg-dots-white opacity-25 pointer-events-none mask-radial-gradient" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Radio size={12} className="animate-pulse" />
            <span>Active Ecosystem</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            Join our <span className="text-gradient-cyan">developer community.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-slate-400 text-base font-normal leading-relaxed"
          >
            Connect directly with developers, get immediate technical support, and preview unreleased software builds.
          </motion.p>
        </div>

        {/* Discord Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Main Community Server */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CardSpotlight className="p-6 md:p-8 flex flex-col justify-between h-full group">
              <div>
                {/* Header bar */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">Community Hub</h3>
                      <p className="text-xs text-slate-400">Updates, Releases & Discussions</p>
                    </div>
                  </div>

                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LIVE
                  </span>
                </div>

                {/* Discord Widget Container */}
                <div className="rounded-xl overflow-hidden border border-white/10 bg-slate-950 mb-6 shadow-inner">
                  <iframe
                    src="https://discord.com/widget?id=1258462644332138700&theme=dark"
                    width="100%"
                    height="420"
                    frameBorder="0"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Join Action CTA */}
              <a
                href="https://discord.gg/zUaN2FPBec"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/40 hover:border-cyan-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-950/20"
              >
                <MessageCircle size={16} className="text-cyan-400" />
                <span>Join Community Server</span>
                <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </CardSpotlight>
          </motion.div>

          {/* Support Server */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <CardSpotlight className="p-6 md:p-8 flex flex-col justify-between h-full group">
              <div>
                {/* Header bar */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Users size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">Support Desk</h3>
                      <p className="text-xs text-slate-400">Technical Tickets & Help</p>
                    </div>
                  </div>

                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    SUPPORT
                  </span>
                </div>

                {/* Discord Widget Container */}
                <div className="rounded-xl overflow-hidden border border-white/10 bg-slate-950 mb-6 shadow-inner">
                  <iframe
                    src="https://discord.com/widget?id=1455889414407327840&theme=dark"
                    width="100%"
                    height="420"
                    frameBorder="0"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Join Action CTA */}
              <a
                href="https://discord.gg/PRJASTKqwD"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-cyan-400/40 text-white font-semibold rounded-xl transition-all duration-300 shadow-md"
              >
                <Users size={16} className="text-cyan-400" />
                <span>Join Support Server</span>
                <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </CardSpotlight>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
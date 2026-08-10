import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';
import { ExternalLink, Github, Sparkles, FolderGit2, AlertTriangle } from 'lucide-react';
import { projects } from '../data/siteData';
import { CardSpotlight } from './ui/CardSpotlight';
import { BorderBeam } from './ui/BorderBeam';
import { TextAnimate } from './ui/TextAnimate';

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="relative py-28 bg-slate-950 overflow-hidden">
      
      {/* Parallax Background Glow */}
      <Parallax speed={-6} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-grid-white opacity-20 mask-radial-gradient" />
      </Parallax>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-16">
          <Parallax speed={-2}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4"
            >
              <FolderGit2 size={12} />
              <span>Featured Software</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              <TextAnimate text="What we're building & shipping." />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-slate-400 text-base font-normal leading-relaxed"
            >
              Explore our ecosystem of open-source Minecraft mods, moderation tools, automation bots, and web platforms.
            </motion.p>
          </Parallax>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => {
            const isFeatured = idx === 0;
            const isMaintenance = project.isMaintenance ?? false;

            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="h-full"
              >
                <CardSpotlight className="h-full p-7 flex flex-col justify-between group hover:border-cyan-500/40 transition-all duration-300">
                  {/* Magic UI Border Beam on Featured Project */}
                  {isFeatured && !isMaintenance && (
                    <BorderBeam size={220} duration={10} colorFrom="#06b6d4" colorTo="#3b82f6" />
                  )}

                  <div>
                    {/* Header Pill & Tags */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-800/50 rounded-md">
                        {project.category}
                      </span>
                      
                      {isMaintenance ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 border border-amber-800/50 px-2.5 py-1 rounded-full animate-pulse">
                          <AlertTriangle size={11} /> Under Maintenance
                        </span>
                      ) : isFeatured ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                          <Sparkles size={10} /> Featured
                        </span>
                      ) : null}
                    </div>

                    {/* Project Title */}
                    <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                      <span>{project.name}</span>
                    </h3>

                    {/* Project Description */}
                    <p className="mt-3 text-sm text-slate-400 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Buttons Action Bar */}
                  <div className="mt-8 pt-5 border-t border-white/10 flex items-center gap-3">
                    {isMaintenance ? (
                      <div className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-amber-400/80 bg-amber-950/40 border border-amber-800/30 rounded-xl cursor-not-allowed select-none">
                        <AlertTriangle size={13} />
                        <span>Under Maintenance</span>
                      </div>
                    ) : (
                      <>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 rounded-xl transition-all duration-300 hover:shadow-md"
                          >
                            <ExternalLink size={13} className="text-cyan-400" />
                            <span>View Project</span>
                          </a>
                        )}

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-white/5 hover:border-white/15 rounded-xl transition-all duration-300"
                          >
                            <Github size={13} />
                            <span>Source Code</span>
                          </a>
                        )}
                      </>
                    )}
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

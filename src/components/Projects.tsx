import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Parallax } from 'react-scroll-parallax';
import {
  ExternalLink,
  Github,
  Sparkles,
  FolderGit2,
  AlertTriangle,
  Search,
  Star,
  Download,
  GitBranch,
  Lock,
} from 'lucide-react';
import { projects as staticProjects } from '../data/siteData';
import { useGitHubSync, categorizeRepo } from '../lib/githubSync';
import { CardSpotlight } from './ui/CardSpotlight';
import { BorderBeam } from './ui/BorderBeam';
import { TextAnimate } from './ui/TextAnimate';

const CATEGORIES = [
  'All',
  'Flagship',
  'Hosting Eggs',
  'Minecraft Tooling',
  'Security & APIs',
  'Discord & Web',
  'Auto-Discovered',
];

interface DisplayProject {
  name: string;
  description: string;
  category: string;
  link?: string;
  github?: string;
  isMaintenance?: boolean;
  isPrivate?: boolean;
  isFlagship?: boolean;
  isAutoDiscovered?: boolean;
  isUpcoming?: boolean;
  stars?: number;
  forks?: number;
  downloads?: string | number;
  language?: string | null;
  tags: string[];
}

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { snapshot } = useGitHubSync();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Merge static curated projects with live GitHub and Modrinth synced metrics,
  // AND dynamically auto-discover any new/future repositories from GitHub!
  const allProjects = useMemo(() => {
    const list: DisplayProject[] = [];
    const processedRepoNames = new Set<string>();

    // 1. Process curated projects
    for (const p of staticProjects) {
      const syncedRepo = snapshot.repos.find(
        (r) =>
          r.name.toLowerCase() === p.name.toLowerCase() ||
          (p.github && p.github.toLowerCase().endsWith(r.name.toLowerCase()))
      );

      // Auto-prune safety: If a project links to an open-source PotenFYR repo that was deleted from GitHub, omit it
      const isPotenFyrPublic = p.github?.toLowerCase().includes('github.com/potenfyr-studios/');
      if (isPotenFyrPublic && !p.isPrivate && snapshot.repos.length > 0 && !syncedRepo) {
        continue;
      }

      if (syncedRepo) {
        processedRepoNames.add(syncedRepo.name.toLowerCase());
      }

      const modrinthInfo = p.modrinthSlug ? snapshot.modrinth[p.modrinthSlug] : undefined;
      const downloads = modrinthInfo ? `${modrinthInfo.downloads.toLocaleString()}+` : p.downloads;
      const stars = syncedRepo ? syncedRepo.stars : p.stars ?? 0;
      const forks = syncedRepo ? syncedRepo.forks : 0;
      const language = syncedRepo?.language;

      list.push({
        ...p,
        stars,
        forks,
        downloads,
        language,
      });
    }

    // 2. Auto-discover ANY new or upcoming repositories from GitHub not in curated list
    for (const repo of snapshot.repos) {
      if (processedRepoNames.has(repo.name.toLowerCase())) {
        continue;
      }

      // Check if it's an upcoming or WIP project
      const descLower = repo.description.toLowerCase();
      const isUpcoming =
        repo.topics.includes('upcoming') ||
        repo.topics.includes('wip') ||
        descLower.includes('in development') ||
        descLower.includes('upcoming');

      const category = categorizeRepo(repo);
      const tags = repo.topics.length > 0 ? repo.topics : [repo.language || 'Software'];

      list.push({
        name: repo.name,
        description: repo.description || 'Open-source project from PotenFYR Studios on GitHub.',
        category,
        github: repo.url,
        link: repo.homepage || undefined,
        stars: repo.stars,
        forks: repo.forks,
        language: repo.language,
        isAutoDiscovered: true,
        isUpcoming,
        tags,
      });
    }

    return list;
  }, [snapshot]);

  // Filter projects by category and search
  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      const matchesCategory =
        activeCategory === 'All' ||
        (activeCategory === 'Flagship' && p.isFlagship) ||
        (activeCategory === 'Auto-Discovered' && p.isAutoDiscovered) ||
        (activeCategory === 'Hosting Eggs' && p.category === 'Hosting Eggs') ||
        (activeCategory === 'Minecraft Tooling' && (p.category.includes('Minecraft') || p.category === 'Minecraft Tooling')) ||
        (activeCategory === 'Security & APIs' && (p.category.includes('Security') || p.category.includes('API'))) ||
        (activeCategory === 'Discord & Web' && (p.category.includes('Discord') || p.category.includes('Web')));

      const matchesSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [allProjects, activeCategory, searchQuery]);

  return (
    <section id="projects" className="relative py-28 bg-slate-950 overflow-hidden">
      
      {/* Parallax Background Glow */}
      <Parallax speed={-6} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-grid-white opacity-20 mask-radial-gradient" />
      </Parallax>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-12">
          <Parallax speed={-2}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4"
            >
              <FolderGit2 size={12} />
              <span>Software Catalog</span>
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
              Auto-synced with GitHub & Modrinth. Any new repositories or tool releases published by the studio automatically register here.
            </motion.p>
          </Parallax>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 p-1 bg-slate-900/80 border border-white/10 rounded-2xl backdrop-blur-md">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Instant Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog or tags..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900/80 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>

        </div>

        {/* Projects Grid */}
        <motion.div layout="position" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isFeatured = project.isFlagship ?? false;
              const isMaintenance = project.isMaintenance ?? false;
              const isPrivate = project.isPrivate ?? false;
              const isAutoDiscovered = project.isAutoDiscovered ?? false;
              const isUpcoming = project.isUpcoming ?? false;

              return (
                <motion.div
                  key={project.name}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    opacity: { duration: 0.15 },
                    scale: { duration: 0.15 },
                    layout: { type: 'spring', stiffness: 450, damping: 32 },
                  }}
                  className="h-full"
                >
                  <CardSpotlight className="h-full p-7 flex flex-col justify-between group hover:border-cyan-500/40 transition-all duration-300">
                    {/* Magic UI Border Beam on Flagships */}
                    {isFeatured && !isMaintenance && (
                      <BorderBeam size={220} duration={10} colorFrom="#06b6d4" colorTo="#3b82f6" />
                    )}

                    <div>
                      {/* Header Pill & Status Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-800/50 rounded-md">
                          {project.category}
                        </span>
                        
                        {isPrivate ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-purple-300 bg-purple-950/80 border border-purple-800/50 px-2.5 py-1 rounded-full">
                            <Lock size={10} className="text-purple-400" /> Private Repo
                          </span>
                        ) : isMaintenance ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 border border-amber-800/50 px-2.5 py-1 rounded-full animate-pulse">
                            <AlertTriangle size={11} /> Maintenance
                          </span>
                        ) : isUpcoming ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-2.5 py-0.5 rounded-full">
                            <Sparkles size={10} /> Upcoming
                          </span>
                        ) : isAutoDiscovered ? (
                          <span className="flex items-center gap-1 text-[10px] font-mono tracking-widest text-cyan-300 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded-full">
                            <GitBranch size={10} /> GitHub Sync
                          </span>
                        ) : isFeatured ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                            <Sparkles size={10} /> Flagship
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

                      {/* Tags Cloud */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] font-medium text-slate-400 bg-slate-900 border border-white/5 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Metrics & Actions */}
                    <div className="mt-6 pt-5 border-t border-white/10 space-y-4">
                      
                      {/* Live Telemetry stats if applicable */}
                      <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                        {project.stars !== undefined && project.stars > 0 && (
                          <span className="flex items-center gap-1 text-amber-300" title="GitHub Stars">
                            <Star size={12} className="fill-amber-400/20 text-amber-400" />
                            {project.stars}
                          </span>
                        )}
                        {project.downloads && (
                          <span className="flex items-center gap-1 text-emerald-400" title="Verified Modrinth Downloads">
                            <Download size={12} />
                            {project.downloads}
                          </span>
                        )}
                        {project.language && (
                          <span className="flex items-center gap-1 text-cyan-400 text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            {project.language}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        {isMaintenance ? (
                          <div className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-amber-400/80 bg-amber-950/40 border border-amber-800/30 rounded-xl cursor-not-allowed select-none">
                            <AlertTriangle size={13} />
                            <span>System Maintenance</span>
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
                                <span>{project.category === 'Discord & Bots' ? 'Add to Discord' : 'Launch Platform'}</span>
                              </a>
                            )}

                            {isPrivate ? (
                              <span
                                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 bg-slate-900/60 border border-white/5 rounded-xl cursor-default select-none"
                                title="Source code is maintained in an internal private repository"
                              >
                                <Lock size={12} className="text-purple-400" />
                                <span>Private Source</span>
                              </span>
                            ) : project.github ? (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-white/5 hover:border-white/15 rounded-xl transition-all duration-300"
                              >
                                <Github size={13} />
                                <span>Source</span>
                              </a>
                            ) : null}
                          </>
                        )}
                      </div>

                    </div>
                  </CardSpotlight>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <p>No projects found matching "{searchQuery}".</p>
          </div>
        )}

      </div>
    </section>
  );
}

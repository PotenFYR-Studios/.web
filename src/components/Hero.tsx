import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { ArrowRight, Users, Terminal, Sparkles, ShieldCheck, Zap, Server } from 'lucide-react';
import { Spotlight } from './ui/Spotlight';
import { ShimmerButton } from './ui/ShimmerButton';
import { Meteors } from './ui/Meteors';
import { LightRays } from './ui/LightRays';
import { AvatarCircles } from './ui/AvatarCircles';
import { contributors } from '../data/siteData';

const teamAvatars = contributors.map((c) => ({
  imageUrl: c.imageUrl,
  profileUrl: c.profileUrl,
  name: `${c.name} (${c.role})`,
}));

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-20 overflow-hidden bg-slate-950">
      
      {/* Magic UI Background Meteors */}
      <Meteors number={25} />

      {/* Magic UI Light Rays */}
      <LightRays />

      {/* Parallax Background Glow & Spotlights */}
      <Parallax speed={-8} className="absolute inset-0 pointer-events-none">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#06b6d4" />
        <Spotlight className="top-10 right-0 md:right-40" fill="#3b82f6" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-transparent rounded-full blur-[140px]" />
      </Parallax>

      {/* Grid Pattern Background overlay */}
      <div className="absolute inset-0 bg-grid-white opacity-40 pointer-events-none mask-radial-gradient" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Shimmer Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs text-slate-300 backdrop-blur-md shadow-lg shadow-cyan-950/20 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="font-medium tracking-wide">PotenFYR Headquarters // Next-Gen Software Studio</span>
          <Sparkles size={13} className="text-cyan-400" />
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-4xl"
        >
          Engineering{' '}
          <span className="text-gradient-cyan">
            High-Performance
          </span>{' '}
          Digital Systems.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-xl text-slate-400 font-normal leading-relaxed max-w-2xl text-balance"
        >
          We architect universal hosting containers, high-frequency Minecraft authentication mods, PR-native API security tooling, and developer infrastructure built for extreme scale.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#projects">
            <ShimmerButton
              shimmerColor="#06b6d4"
              shimmerSize="0.15em"
              background="rgba(6, 182, 212, 0.15)"
              className="px-7 py-3.5 text-sm rounded-full font-semibold border-cyan-500/40"
            >
              <span>Explore Projects & Eggs</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </ShimmerButton>
          </a>

          <a
            href="#terminal"
            className="group inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-white text-sm font-medium rounded-full transition-all duration-300 backdrop-blur-md shadow-md"
          >
            <Terminal size={15} className="text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>Launch Command Deck</span>
          </a>

          <a
            href="#community"
            className="group inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-slate-700 text-slate-300 hover:text-white text-sm font-medium rounded-full transition-all duration-300 backdrop-blur-md"
          >
            <Users size={15} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
            <span>Community</span>
          </a>
        </motion.div>

        {/* Team Avatar Circles Stack with Verified Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3 bg-slate-900/40 px-5 py-2.5 rounded-full border border-white/5 backdrop-blur-md"
        >
          <AvatarCircles avatarUrls={teamAvatars} />
          <span className="text-xs font-medium text-slate-300">
            Engineered by <span className="text-cyan-400 font-semibold">PotenFYR Core Team</span> & Open-Source Contributors
          </span>
        </motion.div>

        {/* Feature Highlights Strip */}
        <Parallax speed={4} className="w-full max-w-3xl mt-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 w-full"
          >
            <div className="glass-card p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Server size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Universal Hosting Eggs</div>
                <div className="text-xs text-slate-400">Pterodactyl & Pelican</div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Battle-Tested Mods</div>
                <div className="text-xs text-slate-400">AuthCore & Statfyr</div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <Zap size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">PR-Native Security</div>
                <div className="text-xs text-slate-400">APICordon Automated</div>
              </div>
            </div>
          </motion.div>
        </Parallax>

      </div>
    </section>
  );
}

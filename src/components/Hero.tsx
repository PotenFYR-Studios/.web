import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { ArrowRight, Users, Terminal, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { Spotlight } from './ui/Spotlight';
import { ShimmerButton } from './ui/ShimmerButton';
import { Meteors } from './ui/Meteors';
import { LightRays } from './ui/LightRays';
import { AvatarCircles } from './ui/AvatarCircles';

const teamAvatars = [
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/67759305?v=4',
    profileUrl: 'https://github.com/DawnOfDedSec',
    name: 'Lead Developer',
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/68150772?v=4',
    profileUrl: 'https://avatars.githubusercontent.com/u/204182523?v=4',
    name: 'Just a guy',
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/204182523?v=4',
    profileUrl: 'https://github.com/opsiialpha',
    name: 'Community Manager',
  },
];

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
          <span className="font-medium tracking-wide">Next-Gen Software & Infrastructure Studio</span>
          <Sparkles size={13} className="text-cyan-400" />
        </motion.div>

        {/* Hero Title with Magic UI Line Shadow Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-4xl"
        >
          Engineering{' '}
          <span className='inline-flex flex-wrap gap-x-[0.25em]'>
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
          We build robust Minecraft ecosystem tools, Discord automation bots, and high-throughput backend infrastructure designed for scale and reliability.
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
              <span>Explore Projects</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </ShimmerButton>
          </a>

          <a
            href="#community"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-slate-700 text-slate-200 text-sm font-medium rounded-full transition-all duration-300 backdrop-blur-md hover:shadow-lg"
          >
            <Users size={16} className="text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Join Community</span>
          </a>
        </motion.div>

        {/* Team Avatar Circles Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-3 bg-slate-900/40 px-5 py-2.5 rounded-full border border-white/5 backdrop-blur-md"
        >
          <AvatarCircles avatarUrls={teamAvatars}/>
          <span className="text-xs font-medium text-slate-300">
            Backed by passionate developers & contributors
          </span>
        </motion.div>

        {/* Parallax Floating Feature Highlights Strip */}
        <Parallax speed={4} className="w-full max-w-3xl mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full"
          >
            <div className="glass-card p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Zap size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Ultra-Low Latency</div>
                <div className="text-xs text-slate-400">Optimized Execution</div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">High Reliability</div>
                <div className="text-xs text-slate-400">Production Tested</div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 text-left col-span-2 md:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <Terminal size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Modern Tech Stack</div>
                <div className="text-xs text-slate-400">Fabric, Bukkit, Node</div>
              </div>
            </div>
          </motion.div>
        </Parallax>

      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Terminal, Radio } from 'lucide-react';
import { navLinks } from '../data/siteData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3 transition-all duration-500"
    >
      <div
        className={`max-w-6xl mx-auto rounded-full transition-all duration-500 px-4 sm:px-6 h-14 flex items-center justify-between ${
          scrolled
            ? 'bg-slate-950/85 backdrop-blur-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] shadow-cyan-950/20'
            : 'bg-slate-900/50 backdrop-blur-md border border-white/[0.08]'
        }`}
      >
        {/* Brand Logo & Indicator */}
        <a href="#" className="flex items-center gap-2.5 group text-white font-bold tracking-tight text-base">
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <img src="./favicon.png" alt="PotenFYR Studios logo" className="w-full h-full object-contain p-[3px]" />
            <div className="absolute inset-0 bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
          </div>
          <span className="font-semibold text-sm sm:text-base text-slate-100 group-hover:text-white transition-colors">
            PotenFYR Studios
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-all duration-300 rounded-full hover:bg-white/[0.06]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5">
          <a
            href="#terminal"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400 rounded-full transition-all duration-300"
          >
            <Terminal size={12} />
            <span>Deck</span>
          </a>

          <a
            href="#community"
            className="inline-flex group relative items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-100 bg-white/[0.08] hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            <Radio size={12} className="text-cyan-400 animate-pulse" />
            <span className="hidden xs:inline">Comms</span>
            <ArrowUpRight size={12} className="text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-slate-300 hover:text-white p-1.5 transition-colors rounded-full hover:bg-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden max-w-6xl mx-auto mt-2 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-white/10 p-4 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 mt-2 border-t border-white/10 flex gap-2">
                <a
                  href="#terminal"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 rounded-xl"
                >
                  <Terminal size={13} />
                  <span>Terminal</span>
                </a>
                <a
                  href="#community"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-800/80 border border-white/10 rounded-xl"
                >
                  <Radio size={13} className="text-cyan-400" />
                  <span>Community</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

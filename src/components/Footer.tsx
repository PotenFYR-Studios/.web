import { GitBranch, MessageCircle} from 'lucide-react';

const footerLinks = [
  { icon: GitBranch, href: 'https://github.com/PotenFYR-Studios', label: 'GitHub' },
  { icon: MessageCircle, href: 'https://discord.gg/zUaN2FPBec', label: 'Discord' },
];

export default function Footer() {
  return (
    <footer className="relative py-14 bg-slate-950 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center sm:items-start gap-1.5">
            <a href="#" className="flex items-center gap-2 text-white font-bold tracking-tight text-base">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                <span className="text-cyan-400 text-xs font-black">P</span>
              </div>
              <span>Potenfyr Studios</span>
            </a>
            <span className="text-xs text-slate-400 font-normal">
              High-performance tools, mods, and developer infrastructure.
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            {footerLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Potenfyr Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

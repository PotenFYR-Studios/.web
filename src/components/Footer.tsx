import { GitBranch, MessageCircle, Layers, Mail, ArrowUp } from 'lucide-react';


const footerSocials = [
  { icon: GitBranch, href: 'https://github.com/PotenFYR-Studios', label: 'GitHub' },
  { icon: Layers, href: 'https://modrinth.com/organization/potenfyr', label: 'Modrinth' },
  { icon: MessageCircle, href: 'https://discord.gg/zUaN2FPBec', label: 'Discord' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 bg-slate-950 border-t border-white/10 text-slate-400">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/5">
          
          {/* Brand & Studio Mission (6 Cols) */}
          <div className="md:col-span-6 space-y-3">
            <a href="#" className="flex items-center gap-2.5 text-white font-bold tracking-tight text-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                <img src="./favicon.png" alt="PotenFYR Studios logo" className="w-full h-full object-contain p-[3px]" />
              </div>
              <span>PotenFYR Studios</span>
            </a>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              High-performance container eggs, robust Minecraft authentication frameworks, automated API defense tooling, and scalable cloud infrastructure.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <Mail size={13} className="text-cyan-400" />
              <a href="mailto:support@potenfyr.in" className="hover:text-cyan-300 transition-colors">
                support@potenfyr.in
              </a>
            </div>
          </div>

          {/* Quick Links (3 Cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Architecture & Ecosystem
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#projects" className="hover:text-cyan-300 transition-colors">Projects & Eggs</a></li>
              <li><a href="#tech-stack" className="hover:text-cyan-300 transition-colors">Tech Matrix</a></li>
              <li><a href="#terminal" className="hover:text-cyan-300 transition-colors">Command Deck</a></li>
              <li><a href="#community" className="hover:text-cyan-300 transition-colors">Community Hub</a></li>
            </ul>
          </div>

          {/* Socials & Status (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Networks
            </div>
            <div className="flex items-center gap-2.5">
              {footerSocials.map((link) => {
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
            <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>DEFCON 1 | ALL SYSTEMS ONLINE</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} PotenFYR Studios. Designed & Engineered with precision.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}

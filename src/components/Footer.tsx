import { GitBranch, MessageCircle, Linkedin } from 'lucide-react';

const footerLinks = [
  { icon: GitBranch, href: 'https://github.com/PotenFYR-Studios', label: 'GitHub' },
  { icon: MessageCircle, href: 'https://discord.gg/zUaN2FPBec', label: 'Discord' },
  { icon: Linkedin, href: 'https://linkedin.com/company/potenfyr', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="relative py-16 bg-brand-black border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <a href="#" className="flex items-center gap-2 text-white font-semibold tracking-tight">
              <div className="w-6 h-6 rounded-md bg-white/[0.06] border border-white/[0.1] flex items-center justify-center">
                <span className="text-accent-cyan text-[10px] font-bold">P</span>
              </div>
              Potenfyr Studios
            </a>
            <span className="text-[12px] text-brand-silver/40 font-light">
              Building powerful digital systems.
            </span>
          </div>

          <div className="flex items-center gap-3">
            {footerLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-brand-silver/40 hover:text-white hover:border-white/[0.12] hover:bg-white/[0.06] transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-brand-silver/30 font-light">
            &copy; {new Date().getFullYear()} Potenfyr Studios. All rights reserved.
          </p>
          <p className="text-[11px] text-brand-silver/20 font-light">
            Designed & engineered with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}

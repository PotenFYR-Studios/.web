import { Zap, SquareCode, Code2 } from 'lucide-react';
import { buildIdeLinks, type IdeLinkId } from '../../lib/ideLinks';

const ICONS: Record<IdeLinkId, typeof Zap> = {
  bolt: Zap,
  vscode: SquareCode,
  stackblitz: Code2,
};

const STYLES: Record<IdeLinkId, string> = {
  bolt: 'hover:text-amber-300 hover:border-amber-400/40 hover:bg-amber-500/10',
  vscode: 'hover:text-blue-300 hover:border-blue-400/40 hover:bg-blue-500/10',
  stackblitz: 'hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-500/10',
};

interface IdeLinksProps {
  githubUrl?: string;
  className?: string;
}

/**
 * One-click "open this repository in ..." row for project cards.
 * Renders nothing when the project has no public GitHub URL.
 */
export function IdeLinks({ githubUrl, className = '' }: IdeLinksProps) {
  if (!githubUrl) return null;

  const links = buildIdeLinks(githubUrl);
  if (links.length === 0) return null;

  return (
    <div
      className={`flex flex-wrap items-center gap-1.5 ${className}`}
      aria-label="Open this repository in an online IDE"
    >
      {links.map((link) => {
        const Icon = ICONS[link.id];
        return (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.title}
            className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-slate-400 bg-slate-900/70 border border-white/5 rounded-md transition-all duration-200 ${STYLES[link.id]}`}
          >
            <Icon size={10} />
            <span>{link.label}</span>
          </a>
        );
      })}
    </div>
  );
}

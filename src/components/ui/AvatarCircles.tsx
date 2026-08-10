import React from 'react';
import { cn } from '../../lib/utils';

export interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: {
    imageUrl: string;
    profileUrl?: string;
    name?: string;
  }[];
}

export const AvatarCircles: React.FC<AvatarCirclesProps> = ({
  numPeople,
  avatarUrls,
  className,
}) => {
  return (
    <div className={cn('z-10 flex items-center -space-x-3 text-white', className)}>
      {avatarUrls.map((url, index) => (
        <a
          key={index}
          href={url.profileUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          title={url.name || 'Team Member'}
          className="relative group transition-transform duration-300 hover:z-30 hover:scale-110"
        >
          <img
            className="h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-800 object-cover shadow-md"
            src={url.imageUrl}
            alt={url.name || `Avatar ${index + 1}`}
          />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block px-2 py-0.5 text-[10px] font-semibold text-white bg-slate-900 rounded border border-white/10 whitespace-nowrap shadow-lg">
            {url.name || 'Contributor'}
          </div>
        </a>
      ))}
      {numPeople && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-900 bg-slate-800 text-center text-xs font-bold text-cyan-400 shadow-md">
          +{numPeople}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { cn } from '../../lib/utils';

export interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
}

export const OrbitingCircles: React.FC<OrbitingCirclesProps> = ({
  className,
  children,
  reverse,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
  iconSize = 30,
}) => {
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 h-full w-full stroke-white/10"
        >
          <circle
            className="stroke-white/10 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}

      <div
        style={
          {
            '--duration': duration,
            '--radius': radius,
            '--delay': -delay,
            '--icon-size': `${iconSize}px`,
          } as React.CSSProperties
        }
        className={cn(
          'absolute flex h-[var(--icon-size)] w-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center rounded-full border border-white/10 bg-slate-900/90 shadow-lg text-white backdrop-blur-md transition-all duration-300 hover:scale-125 hover:border-cyan-400 hover:z-20',
          { '[animation-direction:reverse]': reverse },
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

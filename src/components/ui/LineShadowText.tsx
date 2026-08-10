import React from 'react';
import { cn } from '../../lib/utils';

interface LineShadowTextProps {
  children: string;
  shadowColor?: string;
  className?: string;
}

export const LineShadowText: React.FC<LineShadowTextProps> = ({
  children,
  shadowColor = 'rgba(6, 182, 212, 0.4)',
  className,
}) => {
  return (
    <span
      className={cn(
        'relative inline-block tracking-tight font-extrabold text-white',
        className
      )}
      style={
        {
          '--shadow-color': shadowColor,
        } as React.CSSProperties
      }
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="absolute left-1 top-1 -z-10 select-none opacity-50 blur-[2px] text-cyan-400 font-extrabold"
      >
        {children}
      </span>
    </span>
  );
};

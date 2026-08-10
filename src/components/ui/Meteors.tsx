import React, { useMemo } from 'react';
import { cn } from '../../lib/utils';

export interface MeteorsProps {
  number?: number;
  className?: string;
}

export const Meteors: React.FC<MeteorsProps> = ({ number = 20, className }) => {
  const meteors = useMemo(() => {
    return Array.from({ length: number }).map(() => ({
      left: Math.floor(Math.random() * 800 - 400) + 'px',
      animationDelay: (Math.random() * (0.8 - 0.2) + 0.2).toFixed(2) + 's',
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + 's',
    }));
  }, [number]);

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none z-0', className)}>
      {meteors.map((meteor, idx) => (
        <span
          key={'meteor' + idx}
          className={cn(
            'animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-cyan-400 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]',
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#06b6d4] before:to-transparent"
          )}
          style={{
            top: 0,
            left: meteor.left,
            animationDelay: meteor.animationDelay,
            animationDuration: meteor.animationDuration,
          }}
        />
      ))}
    </div>
  );
};

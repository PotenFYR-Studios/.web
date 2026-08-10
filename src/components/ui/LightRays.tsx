import React from 'react';
import { cn } from '../../lib/utils';

export const LightRays: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden z-0 opacity-40',
        className
      )}
    >
      <svg
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[700px]"
        viewBox="0 0 1200 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.6">
          <path
            d="M600 0L200 700H1000L600 0Z"
            fill="url(#light_ray_1)"
          />
          <path
            d="M600 0L400 700H800L600 0Z"
            fill="url(#light_ray_2)"
          />
        </g>
        <defs>
          <linearGradient
            id="light_ray_1"
            x1="600"
            y1="0"
            x2="600"
            y2="700"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="light_ray_2"
            x1="600"
            y1="0"
            x2="600"
            y2="700"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="1" stopColor="#030712" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

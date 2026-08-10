import React from 'react';
import { cn } from '../../lib/utils';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.1em',
      shimmerDuration = '3s',
      borderRadius = '9999px',
      background = 'rgba(255, 255, 255, 0.05)',
      className,
      children,
      as: Component = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <Component
        style={
          {
            '--shimmer-color': shimmerColor,
            '--shimmer-size': shimmerSize,
            '--shimmer-duration': shimmerDuration,
            '--border-radius': borderRadius,
            '--background': background,
          } as React.CSSProperties
        }
        className={cn(
          'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 border border-white/10 text-white font-medium shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-white/25 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] active:scale-[0.98]',
          'rounded-[var(--border-radius)] bg-[var(--background)]',
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Shimmer Effect */}
        <div
          className={cn(
            '-z-30 absolute inset-0 overflow-visible [container-type:size]'
          )}
        >
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-spin [aspect-ratio:1] [border-radius:0] [mask:none]">
            <div className="absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--shimmer-size)*0.5)),transparent_0,var(--shimmer-color)_var(--shimmer-size),transparent_calc(var(--shimmer-size)*2))]" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center gap-2">{children}</div>

        {/* Backdrop Glow */}
        <div
          className={cn(
            '-z-20 absolute inset-px rounded-[calc(var(--border-radius)-1px)] bg-black/80 transition-all duration-300 group-hover:bg-black/70'
          )}
        />
      </Component>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';

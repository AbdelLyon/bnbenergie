'use client';

import { LazyMotionDiv } from '@/components/LazyComponents';
import { Zap } from 'lucide-react';

interface LogoProps {
  isScrolled?: boolean;
  showRGEBadge?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function Logo({
  isScrolled = false,
  showRGEBadge = true,
  size = 'md',
  animated = true,
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const containerSizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  };

  return (
    <div className="relative inline-block">
      <LazyMotionDiv
        whileHover={animated ? { scale: 1.08 } : {}}
        transition={{ duration: 0.2 }}
        className={`rounded-xl transition-all duration-300 ${containerSizeClasses[size]} ${
          isScrolled
            ? 'bg-secondary/15'
            : 'border border-white/20 bg-white/10 backdrop-blur-sm'
        }`}
      >
        <Zap
          className={`${sizeClasses[size]} ${isScrolled ? 'text-secondary' : 'text-amber-300'}`}
          strokeWidth={2.5}
          fill={isScrolled ? 'rgb(245 158 11 / 0.3)' : 'rgb(252 211 77 / 0.2)'}
        />
      </LazyMotionDiv>

      {showRGEBadge && (
        <div
          className={`absolute -right-2 -bottom-1.5 rounded-full text-[7px] font-black tracking-wide uppercase px-1.5 py-0.5 ${
            isScrolled
              ? 'bg-secondary text-white'
              : 'bg-amber-400/90 text-black'
          }`}
        >
          RGE
        </div>
      )}
    </div>
  );
}

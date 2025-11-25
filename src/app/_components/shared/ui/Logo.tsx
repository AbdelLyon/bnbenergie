'use client';

import { motion } from 'framer-motion';
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
    lg: 'p-3',
  };

  const badgeSizeClasses = {
    sm: 'text-[7px] px-1 py-0.5',
    md: 'text-[8px] px-1.5 py-0.5',
    lg: 'text-[9px] px-2 py-0.5',
  };

  const LogoContent = (
    <div className="relative inline-block">
      <motion.div
        whileHover={animated ? { rotate: 180, scale: 1.1 } : {}}
        transition={{ duration: 0.4 }}
        className={`rounded-xl transition-all duration-300 ease-out ${
          containerSizeClasses[size]
        } ${
          isScrolled
            ? 'bg-linear-to-br from-blue-600 via-cyan-500 to-blue-600'
            : 'border border-white/20 bg-white/10 backdrop-blur-sm'
        }`}
      >
        <Zap className={sizeClasses[size]} color="#FBBF24" />
      </motion.div>
      {showRGEBadge && (
        <div
          className={`absolute -right-2.5 -bottom-2 rounded-full font-bold uppercase ${
            badgeSizeClasses[size]
          } ${
            isScrolled ? 'bg-amber-500 text-white' : 'bg-amber-400 text-black'
          }`}
        >
          RGE
        </div>
      )}
    </div>
  );

  return LogoContent;
}

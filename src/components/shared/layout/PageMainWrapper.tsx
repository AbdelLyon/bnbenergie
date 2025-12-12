'use client';

import { ReactNode } from 'react';

interface PageMainWrapperProps {
  children: ReactNode;
  variant?: 'purple' | 'green' | 'teal' | 'blue' | 'amber' | 'transparent';
  className?: string;
}

const colorVariants = {
  purple: {
    gradient:
      'from-white via-purple-50/10 to-white dark:from-background dark:via-purple-950/5 dark:to-background',
    orbs: [
      'from-purple-400/10 to-pink-400/10',
      'from-blue-400/5 to-cyan-400/5',
      'from-green-400/5 to-emerald-400/5',
    ],
  },
  green: {
    gradient:
      'from-white via-green-50/10 to-white dark:from-background dark:via-green-950/5 dark:to-background',
    orbs: [
      'from-green-400/10 to-emerald-400/10',
      'from-blue-400/5 to-cyan-400/5',
      'from-amber-400/5 to-orange-400/5',
    ],
  },
  teal: {
    gradient:
      'from-white via-teal-50/10 to-white dark:from-background dark:via-teal-950/5 dark:to-background',
    orbs: [
      'from-teal-400/10 to-cyan-400/10',
      'from-blue-400/5 to-sky-400/5',
      'from-emerald-400/5 to-green-400/5',
    ],
  },
  blue: {
    gradient:
      'from-white via-blue-50/10 to-white dark:from-background dark:via-blue-950/5 dark:to-background',
    orbs: [
      'from-blue-400/10 to-cyan-400/10',
      'from-purple-400/5 to-pink-400/5',
      'from-teal-400/5 to-emerald-400/5',
    ],
  },
  amber: {
    gradient:
      'from-white via-amber-50/10 to-white dark:from-background dark:via-amber-950/5 dark:to-background',
    orbs: [
      'from-amber-400/10 to-orange-400/10',
      'from-blue-400/5 to-cyan-400/5',
      'from-green-400/5 to-emerald-400/5',
    ],
  },
  transparent: {
    gradient: 'bg-transparent',
    orbs: [], // aucun orb
  },
};

export function PageMainWrapper({
  children,
  variant = 'blue',
  className = '',
}: PageMainWrapperProps) {
  const colors = colorVariants[variant];

  return (
    <main
      className={`relative min-h-screen overflow-x-hidden ${
        variant === 'transparent'
          ? colors.gradient
          : `bg-linear-to-b ${colors.gradient}`
      } ${className}`}
    >
      {variant !== 'transparent' && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Gradient orbs */}
          {colors.orbs[0] && (
            <div
              className={`absolute -top-40 -right-40 h-96 w-96 rounded-full bg-linear-to-br ${colors.orbs[0]} blur-2xl`}
            />
          )}
          {colors.orbs[1] && (
            <div
              className={`absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-linear-to-br ${colors.orbs[1]} blur-2xl`}
            />
          )}
          {colors.orbs[2] && (
            <div
              className={`absolute bottom-20 right-1/4 h-80 w-80 rounded-full bg-linear-to-br ${colors.orbs[2]} blur-2xl`}
            />
          )}

          {/* Dot pattern très discret */}
          <div
            className="absolute inset-0 pointer-events-none
            [background-image:radial-gradient(circle,_#9991_0.6px,_transparent_1px)]
            [background-size:32px_32px]
            [background-position:0_0,_16px_16px]
            [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,_black_40%,_transparent_100%)]"
          />
        </div>
      )}

      {children}
    </main>
  );
}

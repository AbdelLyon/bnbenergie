'use client';

import { ReactNode } from 'react';

interface PageMainWrapperProps {
  children: ReactNode;
  variant?: 'purple' | 'green' | 'teal' | 'blue' | 'amber';
  className?: string;
}

const colorVariants = {
  purple: {
    gradient: 'from-white via-purple-50/20 to-white dark:from-background dark:via-purple-950/10 dark:to-background',
    orbs: [
      'from-purple-400/20 to-pink-400/20',
      'from-blue-400/10 to-cyan-400/10',
      'from-green-400/10 to-emerald-400/10',
    ],
  },
  green: {
    gradient: 'from-white via-green-50/20 to-white dark:from-background dark:via-green-950/10 dark:to-background',
    orbs: [
      'from-green-400/20 to-emerald-400/20',
      'from-blue-400/10 to-cyan-400/10',
      'from-amber-400/10 to-orange-400/10',
    ],
  },
  teal: {
    gradient: 'from-white via-teal-50/20 to-white dark:from-background dark:via-teal-950/10 dark:to-background',
    orbs: [
      'from-teal-400/20 to-cyan-400/20',
      'from-blue-400/10 to-sky-400/10',
      'from-emerald-400/10 to-green-400/10',
    ],
  },
  blue: {
    gradient: 'from-white via-blue-50/20 to-white dark:from-background dark:via-blue-950/10 dark:to-background',
    orbs: [
      'from-blue-400/20 to-cyan-400/20',
      'from-purple-400/10 to-pink-400/10',
      'from-teal-400/10 to-emerald-400/10',
    ],
  },
  amber: {
    gradient: 'from-white via-amber-50/20 to-white dark:from-background dark:via-amber-950/10 dark:to-background',
    orbs: [
      'from-amber-400/20 to-orange-400/20',
      'from-blue-400/10 to-cyan-400/10',
      'from-green-400/10 to-emerald-400/10',
    ],
  },
};

/**
 * Wrapper pour les pages principales avec fond décoratif
 * Évite la duplication du code de fond animé sur chaque page
 */
export function PageMainWrapper({
  children,
  variant = 'blue',
  className = '',
}: PageMainWrapperProps) {
  const colors = colorVariants[variant];

  return (
    <main
      className={`relative min-h-screen overflow-x-hidden bg-gradient-to-b ${colors.gradient} ${className}`}
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div
          className={`absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br ${colors.orbs[0]} blur-3xl`}
        />
        <div
          className={`absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-gradient-to-br ${colors.orbs[1]} blur-3xl`}
        />
        <div
          className={`absolute bottom-20 right-1/4 h-80 w-80 rounded-full bg-gradient-to-br ${colors.orbs[2]} blur-3xl`}
        />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none
          [background-image:radial-gradient(circle,_#9991_0.8px,_transparent_1px)]
          [background-size:24px_24px]
          [background-position:0_0,_12px_12px]
          [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,_black_50%,_transparent_100%)]"
        />
      </div>

      {children}
    </main>
  );
}

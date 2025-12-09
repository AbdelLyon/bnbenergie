'use client';

import type { ReactNode } from 'react';

interface ThemeTextProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'muted';
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Composant Text qui s'adapte automatiquement au thème
 * Utilise les tokens CSS variables au lieu de classes dark: répétées
 */
export function ThemeText({
  children,
  className = '',
  variant = 'primary',
  as: Component = 'p',
}: ThemeTextProps) {
  const colorClass = {
    primary: 'text-[var(--text-primary)]',
    secondary: 'text-[var(--text-secondary)]',
    tertiary: 'text-[var(--text-tertiary)]',
    muted: 'text-[var(--text-muted)]',
  }[variant];

  return (
    <Component className={`${colorClass} transition-colors duration-300 ${className}`}>
      {children}
    </Component>
  );
}

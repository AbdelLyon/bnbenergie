'use client';

import { getLucideIcon } from '@/utils/getLucideIcon';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@heroui/theme';

interface IconBadgeProps {
  /** Nom de l'icône Lucide ou composant d'icône */
  icon: string | LucideIcon;
  /** Classes de gradient Tailwind (ex: "from-blue-500 to-cyan-500") */
  gradient: string;
  /** Taille de l'icône - sm: 4, md: 8, lg: 12 */
  size?: 'sm' | 'md' | 'lg';
  /** Taille du padding du badge - sm: 2, md: 4, lg: 6 */
  padding?: 'sm' | 'md' | 'lg';
  /** Rayon de bordure - sm: rounded-lg, md: rounded-xl, lg: rounded-2xl */
  rounded?: 'sm' | 'md' | 'lg';
  /** Classes CSS additionnelles */
  className?: string;
  /** Largeur du stroke de l'icône */
  strokeWidth?: number;
}

const SIZE_MAP = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
} as const;

const PADDING_MAP = {
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
} as const;

const ROUNDED_MAP = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
} as const;

/**
 * Badge d'icône avec gradient réutilisable.
 * Utilisé pour afficher des icônes avec un fond dégradé cohérent dans toute l'app.
 *
 * @example
 * ```tsx
 * <IconBadge icon="Zap" gradient="from-blue-500 to-cyan-500" size="md" />
 * ```
 */
export function IconBadge({
  icon,
  gradient,
  size = 'md',
  padding = 'md',
  rounded = 'md',
  className,
  strokeWidth = 2,
}: IconBadgeProps) {
  const Icon = typeof icon === 'string' ? getLucideIcon(icon) : icon;

  return (
    <div
      className={cn(
        'shrink-0',
        ROUNDED_MAP[rounded],
        PADDING_MAP[padding],
        `bg-linear-to-br ${gradient}`,
        className
      )}
    >
      <Icon className={cn(SIZE_MAP[size], 'text-white')} strokeWidth={strokeWidth} />
    </div>
  );
}

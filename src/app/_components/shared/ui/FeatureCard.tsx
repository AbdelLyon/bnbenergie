'use client';

import { ANIMATION_DURATIONS } from '@/app/_config/constants';
import type { BaseCardProps } from '@/app/_types';
import {
  createFadeInUpAnimation,
  getStaggerDelay,
  SCROLL_VIEWPORT,
} from '@/app/_utils/animations';
import { getLucideIcon } from '@/app/_utils/getLucideIcon';
import { cn } from '@heroui/theme';
import { motion } from 'framer-motion';

interface FeatureCardProps extends BaseCardProps {
  icon: string;
  title: string;
  description: string;
  items?: string[];
  gradient?: string;
  iconColor?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  items,
  gradient = 'from-blue-500 to-cyan-500',
  iconColor = 'text-blue-600',
  index,
  className,
}: FeatureCardProps) {
  const Icon = getLucideIcon(icon);
  const animation = createFadeInUpAnimation(
    ANIMATION_DURATIONS.normal,
    getStaggerDelay(index)
  );

  return (
    <motion.div
      {...animation}
      viewport={SCROLL_VIEWPORT}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl',
        className
      )}
    >
      {/* Icon avec gradient background */}
      <div
        className={`mb-6 inline-flex rounded-xl bg-linear-to-br ${gradient} p-4`}
      >
        <Icon className="h-8 w-8 text-white" />
      </div>

      {/* Titre */}
      <h3 className="font-display mb-4 text-xl font-bold text-neutral-900">
        {title}
      </h3>

      {/* Description */}
      <p className="mb-6 text-base leading-relaxed text-neutral-600">
        {description}
      </p>

      {/* Liste optionnelle d'items */}
      {items && items.length > 0 && (
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-${iconColor.replace('text-', '')}-100`}
              >
                <span className={`text-xs ${iconColor}`}>✓</span>
              </div>
              <span className="text-sm text-neutral-700">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Effet de hover gradient */}
      <div
        className={`absolute inset-0 -z-10 bg-linear-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
      />
    </motion.div>
  );
}

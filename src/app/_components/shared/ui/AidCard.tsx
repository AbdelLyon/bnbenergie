'use client';

import { ANIMATION_DURATIONS } from '@/app/_config/constants';
import type { BaseCardProps } from '@/app/_types';
import {
  createFadeInUpAnimation,
  getStaggerDelay,
  SCROLL_VIEWPORT,
} from '@/app/_utils/animations';
import { getLucideIcon } from '@/app/_utils/getLucideIcon';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface AidAmount {
  range?: string;
  power?: string;
  amount: string;
  example?: string;
  bestFor?: string;
}

interface AidCardProps extends BaseCardProps {
  icon: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  conditions?: string[];
  amounts?: AidAmount[];
}

export function AidCard({
  icon,
  badge,
  title,
  subtitle,
  description,
  gradient,
  conditions,
  amounts,
  index,
  className = '',
}: AidCardProps) {
  const Icon = getLucideIcon(icon);
  const animation = createFadeInUpAnimation(
    ANIMATION_DURATIONS.medium,
    getStaggerDelay(index)
  );

  return (
    <motion.div
      {...animation}
      viewport={SCROLL_VIEWPORT}
      className={`rounded-2xl border border-neutral-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
    >
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Icône */}
        <div
          className={`shrink-0 self-start rounded-xl bg-linear-to-br ${gradient} p-6 text-white`}
        >
          <Icon className="h-12 w-12" />
        </div>

        {/* Contenu */}
        <div className="flex-1">
          {/* En-tête */}
          <div className="mb-4">
            <span
              className={`mb-2 inline-block bg-linear-to-r ${gradient} bg-clip-text text-xs font-bold text-transparent`}
            >
              {badge}
            </span>
            <h3 className="font-display mb-2 text-2xl font-bold text-neutral-900">
              {title}
            </h3>
            <p
              className={`mb-4 bg-linear-to-r ${gradient} bg-clip-text text-sm font-semibold text-transparent`}
            >
              {subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="mb-6 leading-relaxed text-neutral-600">{description}</p>

          {/* Conditions d'éligibilité */}
          {conditions && conditions.length > 0 && (
            <div className="mb-6">
              <h4 className="mb-3 text-sm font-bold text-neutral-900">
                Conditions d&apos;éligibilité :
              </h4>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {conditions.map((condition, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: ANIMATION_DURATIONS.fast,
                      delay: idx * 0.05,
                    }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <span className="text-sm text-neutral-700">{condition}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Montants */}
          {amounts && amounts.length > 0 && (
            <div className="mb-4 rounded-xl bg-linear-to-br from-neutral-50 to-blue-50 p-6">
              <h4 className="mb-4 text-sm font-bold text-neutral-900">
                Montants 2025 :
              </h4>
              <div className="space-y-3">
                {amounts.map((amount, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b border-neutral-200 pb-3 last:border-0"
                  >
                    <span className="text-sm text-neutral-700">
                      {amount.range}
                    </span>
                    <span className="text-base font-bold text-blue-600">
                      {amount.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

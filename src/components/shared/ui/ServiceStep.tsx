'use client';

import { ANIMATION_DURATIONS } from '@/config/constants';
import type { BaseCardProps } from '@/types';
import { SCROLL_VIEWPORT } from '@/utils/animations';
import { getLucideIcon } from '@/utils/getLucideIcon';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock } from 'lucide-react';

interface ServiceStepProps extends BaseCardProps {
  number: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  duration?: string;
  gradient?: string;
  isEven?: boolean;
}

export function ServiceStep({
  icon,
  title,
  subtitle,
  description,
  items,
  duration,
  gradient = 'from-blue-500 to-cyan-500',
  isEven = false,
  index,
  className = '',
}: ServiceStepProps) {
  const Icon = getLucideIcon(icon);

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={SCROLL_VIEWPORT}
      transition={{ duration: ANIMATION_DURATIONS.medium, delay: index * 0.1 }}
      className={`group relative ${className}`}
    >
      <div className="rounded-3xl border border-neutral-200 dark:border-divider bg-white dark:bg-content1 p-8 shadow-lg transition-all duration-300 hover:shadow-2xl md:p-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          {/* Numéro et icône */}
          <div className="shrink-0">

              <div
                className={`relative z-10 rounded-2xl bg-linear-to-br ${gradient} p-6 text-white`}
              >
                <Icon className="h-12 w-12" />
              </div>
            </div>

          {/* Contenu */}
          <div className="flex-1">
            <div className="mb-4">
              <span
                className={`mb-2 inline-block bg-linear-to-r ${gradient} bg-clip-text text-sm font-bold text-transparent`}
              >
                {subtitle}
              </span>
              <h3 className="font-display mb-2 text-2xl font-bold text-neutral-900 dark:text-foreground md:text-3xl">
                {title}
              </h3>
              {duration && (
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-default-500">
                  <Clock className="h-4 w-4" />
                  <span>{duration}</span>
                </div>
              )}
            </div>

            <p className="mb-6 leading-relaxed text-neutral-600 dark:text-default-500">
              {description}
            </p>

            {items && items.length > 0 && (
              <ul className="space-y-2">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-sm text-neutral-700 dark:text-default-600">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

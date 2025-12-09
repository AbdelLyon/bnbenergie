'use client';

import { TRANSITIONS } from '@/config/constants';
import type { BaseCardProps } from '@/types';
import { getLucideIcon } from '@/utils/getLucideIcon';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-content2 bg-white dark:bg-content1 p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl',
        className
      )}
    >
      <motion.div
        className={`mb-6 inline-flex rounded-xl bg-linear-to-br ${gradient} p-4`}
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: TRANSITIONS.smooth,
        }}
      >
        <Icon className="h-8 w-8 text-white" />
      </motion.div>

      <h3 className="font-display mb-4 text-xl font-bold text-neutral-900 dark:text-foreground">
        {title}
      </h3>

      <p className="mb-6 text-base leading-relaxed text-neutral-600 dark:text-default-500">
        {description}
      </p>

      {items && items.length > 0 && (
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-${iconColor.replace('text-', '')}-100`}
              >
                <span className={`text-xs ${iconColor}`}>✓</span>
              </div>
              <span className="text-sm text-neutral-700 dark:text-default-600">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

'use client';

import type { BaseCardProps } from '@/types';
import { getLucideIcon } from '@/utils/getLucideIcon';
import { motion } from 'framer-motion';

interface StatCardProps extends BaseCardProps {
  icon: string;
  value: string;
  label: string;
  gradient?: string;
  description?: string;
}

export function StatCard({
  icon,
  value,
  label,
  description,
  index = 0,
  className = '',
}: StatCardProps) {
  const Icon = getLucideIcon(icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`group relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm transition-all duration-200 hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 ${className}`}
    >
      <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
        {/* Icon simple */}
        <div className="mb-4 inline-flex rounded-xl bg-neutral-100 dark:bg-neutral-800 p-3">
          <Icon className="size-7 text-neutral-700 dark:text-neutral-300" strokeWidth={2.5} />
        </div>

        {/* Value */}
        <div className="font-display mb-2 text-3xl font-black tracking-tight text-neutral-900 dark:text-white md:text-4xl">
          {value}
        </div>

        {/* Label */}
        <div className="text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {label}
        </div>

        {/* Optional description */}
        {description && (
          <p className="mt-4 text-sm font-medium leading-relaxed text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

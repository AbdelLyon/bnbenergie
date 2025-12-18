'use client';

import { LazyMotionDiv } from '@/components/LazyComponents';
import type { BaseCardProps } from '@/types';
import { getLucideIcon } from '@/utils/getLucideIcon';

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
    <LazyMotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-neutral-100 bg-white p-5 text-center shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-primary-100 hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.08)] dark:border-neutral-800 dark:bg-neutral-900 ${className}`}
    >
      {/* Decorative background gradient blob */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary-50/50 blur-2xl transition-all group-hover:bg-primary-100/50 dark:bg-primary-900/10" />

      {/* Icon */}
      <div className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100 group-hover:scale-110 group-hover:text-primary-700 dark:bg-primary-900/20 dark:text-primary-400">
        <Icon className="h-6 w-6" strokeWidth={2.5} />
      </div>

      {/* Value */}
      <div className="font-display relative mb-1 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
        {value}
      </div>

      {/* Label */}
      <div className="relative text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        {label}
      </div>

      {/* Optional description */}
      {description && (
        <p className="relative mt-3 text-sm font-medium leading-relaxed text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      )}
    </LazyMotionDiv>
  );
}

export default StatCard;

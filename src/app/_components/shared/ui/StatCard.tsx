'use client';

import type { BaseCardProps } from '@/app/_types';
import { getLucideIcon } from '@/app/_utils/getLucideIcon';
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
  gradient = 'from-blue-500 to-cyan-500',
  description,
  index = 0,
  className = '',
}: StatCardProps) {
  const Icon = getLucideIcon(icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl border border-amber-500/60 bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-amber-500 hover:shadow-2xl ${className}`}
    >
      {/* Gradient hover effect */}
      <div className="absolute inset-0 bg-linear-to-br from-amber-50/0 to-blue-50/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
        {/* Icon */}
        <div
          className={`mb-4 rounded-xl bg-linear-to-br ${gradient} p-3.5 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl`}
        >
          <Icon className="h-7 w-7 text-white" strokeWidth={2.5} />
        </div>

        {/* Value */}
        <div className="font-display mb-2 text-2xl font-black text-neutral-900 transition-colors duration-300 group-hover:text-blue-600 md:text-3xl">
          {value}
        </div>

        {/* Label */}
        <div className="text-sm font-semibold tracking-wide text-neutral-600 uppercase transition-colors duration-300 group-hover:text-neutral-900">
          {label}
        </div>

        {/* Optional description */}
        {description && (
          <p className="mt-3 text-xs leading-relaxed text-neutral-500">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

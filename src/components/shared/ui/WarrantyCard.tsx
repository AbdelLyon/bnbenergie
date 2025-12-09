'use client';

import type { BaseCardProps } from '@/types';

import { getLucideIcon } from '@/utils/getLucideIcon';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface Warranty {
  label: string;
  duration: string;
  description: string;
}

interface WarrantyCardProps extends BaseCardProps {
  icon: string;
  title: string;
  description: string;
  gradient: string;
  warranties: Warranty[];
  features: string[];
}

export function WarrantyCard({
  icon,
  title,
  description,
  gradient,
  warranties,
  features,
  index,
  className = '',
}: WarrantyCardProps) {
  const Icon = getLucideIcon(icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`rounded-2xl border border-neutral-100 dark:border-content2 bg-white dark:bg-content1 p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
    >
      {/* En-tête */}
      <div className="mb-6 flex items-center gap-4">
        <div
          className={`shrink-0 rounded-xl bg-linear-to-br ${gradient} p-4 text-white`}
        >
          <Icon className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <h3 className="font-display mb-1 text-xl font-bold text-neutral-900 dark:text-foreground">
            {title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-default-500">
            {description}
          </p>
        </div>
      </div>

      <div className="mb-6 space-y-3 rounded-xl bg-neutral-50 dark:bg-content2 p-4">
        {warranties.map((warranty, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-900 dark:text-foreground">
                {warranty.label}
              </span>
              <span className="rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm font-bold text-blue-600 dark:text-blue-400">
                {warranty.duration}
              </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-default-500">
              {warranty.description}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
            <span className="text-xs text-neutral-700 dark:text-default-600">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

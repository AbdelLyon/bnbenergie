'use client';

import { ANIMATION_DURATIONS } from '@/app/_config/constants';
import type { BaseCardProps } from '@/app/_types';
import {
  createFadeInUpAnimation,
  getStaggerDelay,
  SCROLL_VIEWPORT,
} from '@/app/_utils/animations';
import { motion } from 'framer-motion';

interface ProcessStepProps extends BaseCardProps {
  number: string;
  title: string;
  description: string;
  showConnector?: boolean;
}

export function ProcessStep({
  number,
  title,
  description,
  showConnector = false,
  index,
  className = '',
}: ProcessStepProps) {
  const animation = createFadeInUpAnimation(
    ANIMATION_DURATIONS.normal,
    getStaggerDelay(index)
  );

  return (
    <motion.div {...animation} viewport={SCROLL_VIEWPORT} className="relative">
      {showConnector && (
        <div className="absolute top-8 left-full -ml-6 hidden h-0.5 w-full bg-linear-to-r from-blue-300 to-transparent lg:block" />
      )}
      <div
        className={`relative z-10 rounded-xl border border-neutral-100 bg-white p-6 transition-all duration-300 hover:border-blue-300 ${className}`}
      >
        <div className="font-display mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-cyan-500 text-xl font-bold text-white">
          {number}
        </div>
        <h3 className="font-display mb-2 text-lg font-bold text-neutral-900">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-600">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

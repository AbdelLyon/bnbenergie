'use client';

import { ANIMATION_DURATIONS } from '@/config/constants';
import { motion } from 'framer-motion';

interface IntroSectionProps {
  title: string;
  description: string;
  className?: string;
}

export function IntroSection({
  title,
  description,
  className = '',
}: IntroSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: ANIMATION_DURATIONS.normal }}
      className={`mx-auto mb-20 max-w-4xl text-center ${className}`}
    >
      <h2 className="font-display mb-6 text-3xl font-bold text-neutral-900 dark:text-foreground md:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-relaxed text-neutral-600 dark:text-default-500 md:text-lg">
        {description}
      </p>
    </motion.div>
  );
}

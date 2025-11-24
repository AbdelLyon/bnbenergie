'use client';

import { ParallaxWrapper } from '@/app/_components/shared/animations/ParallaxWrapper';
import { ANIMATION_DURATIONS } from '@/app/_config/constants';
import type { BaseCardProps, IconCard } from '@/app/_types';
import {
  createFadeInUpAnimation,
  getStaggerDelay,
  SCROLL_VIEWPORT,
} from '@/app/_utils/animations';
import { getLucideIcon } from '@/app/_utils/getLucideIcon';
import { motion } from 'framer-motion';

interface AboutCardProps extends BaseCardProps, IconCard {}

export function AboutCard({
  icon,
  title,
  content,
  stat,
  statLabel,
  index,
  className,
}: AboutCardProps) {
  const Icon = getLucideIcon(icon);
  const fadeInAnimation = createFadeInUpAnimation(
    ANIMATION_DURATIONS.medium,
    getStaggerDelay(index)
  );

  return (
    <motion.article
      {...fadeInAnimation}
      viewport={SCROLL_VIEWPORT}
      className={`group relative h-full ${className || ''}`}
    >
      <ParallaxWrapper speed={0.5} className="h-full">
        <div className="hover:border-primary-300 hover:shadow-primary-500/10 relative h-full rounded-3xl border border-neutral-200 bg-white p-10 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <div className="bg-primary-50 text-primary-600 group-hover:bg-primary-600 mb-8 inline-flex rounded-2xl p-5 shadow-sm transition-colors group-hover:text-white">
            <Icon className="h-8 w-8" />
          </div>

          <div className="absolute top-8 right-8">
            <div className="text-right">
              <div className="text-primary-600 text-3xl font-black">{stat}</div>
              <div className="text-xs font-bold tracking-wider text-neutral-500 uppercase">
                {statLabel}
              </div>
            </div>
          </div>

          <h3 className="group-hover:text-primary-700 mb-4 text-xl font-black text-neutral-900 transition-colors">
            {title}
          </h3>
          <p className="text-base leading-relaxed text-neutral-600">
            {content}
          </p>
        </div>
      </ParallaxWrapper>
    </motion.article>
  );
}

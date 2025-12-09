'use client';

import { ANIMATION_DURATIONS } from '@/config/constants';
import type { BaseCardProps, PricingPack } from '@/types';
import {
  createFadeInUpAnimation,
  getStaggerDelay,
  SCROLL_VIEWPORT,
} from '@/utils/animations';
import { motion } from 'framer-motion';
import { PricingCTA } from './PricingCTA';
import { PricingDetails } from './PricingDetails';
import { PricingFeatures } from './PricingFeatures';
import { PricingHeader } from './PricingHeader';

interface PricingCardProps extends BaseCardProps {
  pack: PricingPack;
}

export function PricingCard({ pack, index, className }: PricingCardProps) {
  const fadeInAnimation = createFadeInUpAnimation(
    ANIMATION_DURATIONS.medium,
    getStaggerDelay(index)
  );

  // Vérifier si le prix est 5 990 ou 13 990 pour ajouter la bordure amber
  const isSpecialPrice = pack.price === '5 990' || pack.price === '13 990';

  return (
    <motion.div
      {...fadeInAnimation}
      viewport={SCROLL_VIEWPORT}
      className={`flex h-full flex-col ${pack.popular ? 'md:scale-105' : ''} ${
        className || ''
      }`}
    >
      <div
        className={`group relative flex h-full flex-col justify-between rounded-2xl bg-white dark:bg-content1 transition-all duration-500 ${
          pack.popular
            ? 'border border-blue-400/50 p-8 shadow-2xl ring-1 shadow-blue-500/20 ring-blue-400/50 md:min-h-[440px]'
            : isSpecialPrice
            ? 'border border-amber-400/50 p-6 ring-1 ring-amber-400/10 hover:border-amber-500/70'
            : 'border-2 border-neutral-200/80 dark:border-content2 p-6 hover:border-blue-300/60'
        }`}
      >
        <PricingHeader pack={pack} isSpecialPrice={isSpecialPrice} />

        <div className="grow">
          <PricingDetails pack={pack} />
          <PricingFeatures features={pack.features} />
        </div>

        <PricingCTA pack={pack} isSpecialPrice={isSpecialPrice} />
      </div>
    </motion.div>
  );
}

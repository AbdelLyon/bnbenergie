'use client';

import {
  SectionContainer,
} from '@/components/shared/layout/SectionWrapper';
import { ThemeText } from '@/components/shared/ui/ThemeText';
import { SPACING } from '@/config/constants';
import type { PricingData } from '@/types';
import { motion } from 'framer-motion';
import { PricingCard } from './components/PricingCard';
import { PricingFooter } from './components/PricingFooter';

export function PricingClient({ data }: { data: PricingData }) {
  return (
    <SectionContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        {data.header.badge && (
          <span className="mb-4 inline-block rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-xs font-bold text-primary-700 dark:text-primary-400 shadow-lg shadow-primary-500/10 backdrop-blur-md md:px-6 md:py-3 md:text-sm">
            {data.header.badge}
          </span>
        )}
        <ThemeText
          as="h2"
          variant="primary"
          className="font-display mb-4 text-3xl font-black sm:text-4xl md:mb-6 md:text-5xl"
        >
          {data.header.title}
        </ThemeText>
        {data.header.subtitle && (
          <ThemeText
            as="p"
            variant="secondary"
            className="text-base leading-relaxed md:text-lg"
          >
            {data.header.subtitle}
          </ThemeText>
        )}
      </motion.div>

      <div className={`grid items-center md:grid-cols-3 ${SPACING.grid.gap}`}>
        {data.packs.map((pack, index) => (
          <PricingCard key={pack.name} pack={pack} index={index} />
        ))}
      </div>

      <PricingFooter note={data.footer.note} tags={data.footer.tags} />
    </SectionContainer>
  );
}

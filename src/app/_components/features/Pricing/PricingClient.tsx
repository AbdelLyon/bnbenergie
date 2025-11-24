'use client';

import {
  SectionContainer,
  SectionHeader,
  SectionWrapper,
} from '@/app/_components/shared/layout/SectionWrapper';
import { ANIMATION_DURATIONS, SPACING } from '@/app/_config/constants';
import type { PricingData } from '@/app/_types';
import { motion } from 'framer-motion';
import { PricingCard } from './components/PricingCard';

export function PricingClient({ data }: { data: PricingData }) {
  return (
    <SectionWrapper id="pricing" className="bg-neutral-50">
      <SectionContainer>
        <SectionHeader
          badge={data.header.badge}
          title={data.header.title}
          subtitle={data.header.subtitle}
        />

        <div
          className={`grid items-center pt-8 md:grid-cols-3 ${SPACING.grid.gap}`}
        >
          {data.packs.map((pack, index) => (
            <PricingCard key={pack.name} pack={pack} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION_DURATIONS.slow, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-neutral-600">{data.footer.note}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {data.footer.tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2"
              >
                <span className="text-success-600">✓</span>
                <span className="text-sm text-neutral-700">{tag}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </SectionContainer>
    </SectionWrapper>
  );
}

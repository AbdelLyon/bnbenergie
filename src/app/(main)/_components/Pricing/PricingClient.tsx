'use client';

import {
  SectionContainer,
  SectionHeader,
  SectionWrapper,
} from '@/components/shared/layout/SectionWrapper';
import { SPACING } from '@/config/constants';
import type { PricingData } from '@/types';
import { PricingCard } from './components/PricingCard';
import { PricingFooter } from './components/PricingFooter';
import { LazyMotionDiv } from '@/components/LazyComponents';

export function PricingClient({ data }: { data: PricingData }) {
  return (
    <SectionWrapper id="pricing" background="gray" className="overflow-x-clip">
      <SectionContainer>
        <LazyMotionDiv
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            badge={data.header.badge}
            title={data.header.title}
            subtitle={data.header.subtitle}
          />
        </LazyMotionDiv>

        <div className={`grid items-center md:grid-cols-3 ${SPACING.grid.gap}`}>
          {data.packs.map((pack, index) => (
            <PricingCard key={pack.name} pack={pack} index={index} />
          ))}
        </div>

        <PricingFooter note={data.footer.note} tags={data.footer.tags} />
      </SectionContainer>
    </SectionWrapper>
  );
}

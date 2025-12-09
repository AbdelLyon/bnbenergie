'use client';

import { BackgroundEffects } from '@/components/shared/effects/BackgroundEffects';
import {
  SectionContainer,
  SectionHeader,
  SectionWrapper,
} from '@/components/shared/layout/SectionWrapper';
import { SPACING } from '@/config/constants';
import type { AboutData } from '@/types';
import { AboutCard } from './components/AboutCard';

export function AboutClient({ data }: { data: AboutData }) {
  return (
    <SectionWrapper id="entreprise" background="gradient">
      <BackgroundEffects variant="full" particleCount={20} />

      <SectionContainer>
        <SectionHeader
          badge={data.header.badge}
          title={
            Array.isArray(data.header.title)
              ? data.header.title.join(' ')
              : data.header.title
          }
          subtitle={data.header.description}
        />

        <div className={`grid grid-cols-1 lg:grid-cols-2 ${SPACING.grid.gap}`}>
          {data.seoContent?.map((item, index) => (
            <AboutCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              content={item.content}
              stat={item.stat}
              statLabel={item.statLabel}
              index={index}
            />
          ))}
        </div>
      </SectionContainer>
    </SectionWrapper>
  );
}

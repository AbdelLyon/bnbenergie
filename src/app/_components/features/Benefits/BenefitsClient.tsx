'use client';

import { BackgroundEffects } from '@/app/_components/shared/effects/BackgroundEffects';
import {
  SectionContainer,
  SectionHeader,
  SectionWrapper,
} from '@/app/_components/shared/layout/SectionWrapper';
import { SPACING } from '@/app/_config/constants';
import type { BenefitsData } from '@/app/_types';
import { BenefitsCTA } from './components/BenefitsCTA';
import { BenefitsList } from './components/BenefitsList';

export function BenefitsClient({ data }: { data: BenefitsData }) {
  return (
    <SectionWrapper id="avantages" background="white">
      <BackgroundEffects variant="default" />

      <SectionContainer>
        <SectionHeader
          badge="✨ NOS AVANTAGES"
          title={data.benefits.title}
          subtitle="Découvrez pourquoi choisir BNB ÉNERGIE pour votre installation solaire"
        />

        <div className={`grid grid-cols-1 items-center lg:grid-cols-2 ${SPACING.grid.gap}`}>
          <BenefitsList benefits={data.benefits.list} />
          <BenefitsCTA
            title={data.cta.title}
            description={data.cta.description}
            button1={data.cta.button1}
            button2={data.cta.button2}
          />
        </div>
      </SectionContainer>
    </SectionWrapper>
  );
}

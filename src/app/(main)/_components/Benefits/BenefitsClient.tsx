"use client";

import { BackgroundEffects } from "@/components/shared/effects/BackgroundEffects";
import { CTASection } from "@/components/shared/ui/CTASection";
import {
  SectionContainer,
  SectionHeader,
  SectionWrapper,
} from "@/components/shared/layout/SectionWrapper";
import { SPACING } from "@/config/constants";
import type { BenefitsData } from "@/types";
import { BenefitsList } from "./components/BenefitsList";

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

        <div
          className={`grid grid-cols-1 items-center lg:grid-cols-3 ${SPACING.grid.gap}`}
        >
          <BenefitsList benefits={data.benefits.list} />
          <CTASection
            title={data.cta.title}
            description={data.cta.description}
            phoneNumber="07 81 25 11 25"
            primaryButton={{
              text: data.cta.button1,
              href: "/contact#contact-form",
            }}
            secondaryButton={{
              text: data.cta.button2,
              href: "/faq-panneaux-solaires",
            }}
            variant="gradient"
            className="h-full lg:col-span-2"
          />
        </div>
      </SectionContainer>
    </SectionWrapper>
  );
}

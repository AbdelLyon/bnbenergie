"use client";

import {
  SectionContainer,
  SectionWrapper,
} from "@/components/shared/layout/SectionWrapper";
import { SPACING } from "@/config/constants";
import type { PricingData } from "@/types";
import { PricingCard } from "./components/PricingCard";
import { PricingFooter } from "./components/PricingFooter";

export function PricingClient({ data }: { data: PricingData }) {
  return (
    <SectionWrapper
      id="pricing"
      background="white"
      className="overflow-x-clip !bg-transparent !pt-16 md:!pt-20"
    >
      <SectionContainer>
        <div
          className={`grid items-center md:grid-cols-3 ${SPACING.grid.gap}`}
        >
          {data.packs.map((pack, index) => (
            <PricingCard key={pack.name} pack={pack} index={index} />
          ))}
        </div>

        <PricingFooter note={data.footer.note} tags={data.footer.tags} />
      </SectionContainer>
    </SectionWrapper>
  );
}

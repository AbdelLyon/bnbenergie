"use client";

import { ANIMATION_DURATIONS } from "@/config/constants";
import type { BaseCardProps, PricingPack } from "@/types";
import { SCROLL_VIEWPORT } from "@/utils/animations";
import { PricingCTA } from "./PricingCTA";
import { PricingDetails } from "./PricingDetails";
import { PricingFeatures } from "./PricingFeatures";
import { PricingHeader } from "./PricingHeader";
import { LazyMotionDiv } from "@/components/LazyComponents";

interface PricingCardProps extends BaseCardProps {
  pack: PricingPack;
}

export function PricingCard({ pack, className }: PricingCardProps) {
  const isSpecialPrice = pack.price === "5 990" || pack.price === "13 990";

  return (
    <LazyMotionDiv
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={SCROLL_VIEWPORT}
      transition={{ duration: ANIMATION_DURATIONS.normal, delay: 0 }}
      className={`flex h-full flex-col ${pack.popular ? "md:scale-[1.03]" : ""} ${className || ""}`}
    >
      <div
        className={`group relative flex h-full flex-col justify-between rounded-2xl bg-content1 transition-all duration-300 hover:-translate-y-0.5 ${
          pack.popular
            ? "border border-primary/25 p-7 shadow-medium ring-1 ring-primary/10 hover:shadow-large md:min-h-110"
            : "border border-default-200 p-6 shadow-small hover:shadow-medium"
        }`}
      >
        <PricingHeader pack={pack} isSpecialPrice={isSpecialPrice} />
        <div className="grow">
          <PricingDetails pack={pack} />
          <PricingFeatures features={pack.features} />
        </div>
        <PricingCTA pack={pack} isSpecialPrice={isSpecialPrice} />
      </div>
    </LazyMotionDiv>
  );
}

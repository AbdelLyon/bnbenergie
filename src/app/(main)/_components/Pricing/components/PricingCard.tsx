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

export function PricingCard({ pack, index, className }: PricingCardProps) {
  const fadeInAnimation = {
    initial: {
      opacity: 0,
      x: index % 3 === 0 ? -10 : index % 3 === 1 ? 0 : 10,
    },
    whileInView: { opacity: 1, x: 0 },
    viewport: SCROLL_VIEWPORT,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      delay: 0,
    },
  };

  const isSpecialPrice = pack.price === "5 990" || pack.price === "13 990";

  return (
    <LazyMotionDiv
      {...fadeInAnimation}
      viewport={SCROLL_VIEWPORT}
      className={`flex h-full flex-col ${pack.popular ? "md:scale-105" : ""} ${
        className || ""
      }`}
    >
     <div
        className={`group relative flex h-full flex-col justify-between rounded-2xl border bg-white dark:bg-content1 transition-all duration-200 hover:shadow-lg ${
          pack.popular
            ? "price-attention border-blue-500/30 hover:border-blue-500/50 p-8 md:min-h-110"
            : isSpecialPrice
              ? "border-amber-400/30 hover:border-amber-400/50 p-6 "
              : "border-neutral-200/40 p-6 shadow-sm hover:border-neutral-300"
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

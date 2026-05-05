"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import { Button } from "@/components/shared/ui/Button";
import { ArrowRight, Phone } from "lucide-react";

interface HeroCTAButtonsProps {
  primaryText: string;
  primaryHref: string;
  secondaryText: string;
  secondaryHref: string;
  primaryClassName?: string;
  secondaryClassName?: string;
}

const DEFAULT_PRIMARY =
  "group relative overflow-hidden border-2 border-primary-500 bg-primary-500 px-6 py-4.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-primary-600 hover:shadow-lg sm:px-7 sm:text-base";

const DEFAULT_SECONDARY =
  "group relative overflow-hidden border border-white/40 bg-white/5 px-6 py-4.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10 sm:px-7 sm:text-base";

export function HomeHeaderCTAButtons({
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
  primaryClassName,
  secondaryClassName,
}: HeroCTAButtonsProps) {
  return (
    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:px-0 justify-center">
      <LazyMotionDiv whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }}>
        <Button
          href={primaryHref}
          className={primaryClassName ?? DEFAULT_PRIMARY}
          endIcon={<ArrowRight className="size-4" />}
        >
          {primaryText}
        </Button>
      </LazyMotionDiv>

      <LazyMotionDiv whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }}>
        <Button
          href={secondaryHref}
          variant="outline"
          className={secondaryClassName ?? DEFAULT_SECONDARY}
          startIcon={<Phone className="size-4" />}
        >
          {secondaryText}
        </Button>
      </LazyMotionDiv>
    </div>
  );
}

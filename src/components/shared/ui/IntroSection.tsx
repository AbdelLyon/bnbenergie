"use client";

import { LazyMotionDiv } from "@/components/LazyComponents";
import { ANIMATION_DURATIONS } from "@/config/constants";
import { Heading } from "@/components/shared/ui/Heading";

interface IntroSectionProps {
  title: string;
  description: string;
  className?: string;
}

export function IntroSection({
  title,
  description,
  className = "",
}: IntroSectionProps) {
  return (
    <LazyMotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: ANIMATION_DURATIONS.normal }}
      className={`mx-auto max-w-4xl text-center ${className}`}
    >
      <Heading className="text-2xl mb-4 text-foreground md:text-3xl">
        {title}
      </Heading>
      <p className="text-base leading-relaxed text-default-600 md:text-lg">
        {description}
      </p>
    </LazyMotionDiv>
  );
}

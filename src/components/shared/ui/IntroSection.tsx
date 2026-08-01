'use client';

import { LazyMotionDiv } from '@/components/LazyComponents';
import { ANIMATION_DURATIONS } from '@/config/constants';
import { Heading } from '@/components/shared/ui/Heading';

interface IntroSectionProps {
  title: string;
  description: string;
  className?: string;
}

export function IntroSection({
  title,
  description,
  className = '',
}: IntroSectionProps) {
  return (
    <LazyMotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: ANIMATION_DURATIONS.normal }}
      className={`mx-auto max-w-4xl text-left ${className}`}
    >
      <Heading className="mb-4 text-[clamp(1.75rem,3vw,2.9rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-neutral-900">
        {title}
      </Heading>
      <p className="max-w-3xl text-base leading-8 text-neutral-600 md:text-lg">
        {description}
      </p>
    </LazyMotionDiv>
  );
}

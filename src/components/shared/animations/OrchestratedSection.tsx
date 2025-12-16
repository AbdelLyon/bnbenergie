'use client';

import { LazyMotionSection } from '@/components/LazyComponents';
import {
  ORCHESTRATION,
  ANIMATION_DURATIONS,
  TRANSITIONS,
} from '@/config/constants';
import type { ReactNode } from 'react';

interface OrchestratedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * OrchestratedSection - Wrapper for page sections that need coordinated entrance
 * Fades in the entire section before children start animating
 *
 * This ensures a smooth, coordinated appearance where:
 * 1. Section container fades in
 * 2. Children animate in sequence (handled by their own animations)
 */
export const OrchestratedSection = ({
  children,
  delay = ORCHESTRATION.sectionDelay,
  className,
}: OrchestratedSectionProps) => {
  return (
    <LazyMotionSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: ANIMATION_DURATIONS.medium,
        delay,
        ...TRANSITIONS.easeOut,
      }}
      className={className}
    >
      {children}
    </LazyMotionSection>
  );
};

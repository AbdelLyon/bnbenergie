'use client';
import { LazyMotionDiv } from '@/components/LazyComponents';
import {
  createContainerVariants,
  createItemVariants,
} from '@/utils/animations';
import type { ReactNode } from 'react';

interface AnimationOrchestratorProps {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  className?: string;
}

/**
 * AnimationOrchestrator - Coordinates animations of multiple children
 * Children animate in sequence with consistent timing
 *
 * Usage:
 * <AnimationOrchestrator stagger={0.1} direction="up">
 *   <Card />
 *   <Card />
 *   <Card />
 * </AnimationOrchestrator>
 */
export const AnimationOrchestrator = ({
  children,
  stagger = 0.1,
  delay = 0,
  direction = 'up',
  distance = 30,
  className,
}: AnimationOrchestratorProps) => {
  const containerVariants = createContainerVariants(stagger, delay);
  const itemVariants = createItemVariants(direction, distance);

  return (
    <LazyMotionDiv
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <LazyMotionDiv key={index} variants={itemVariants}>
              {child}
            </LazyMotionDiv>
          ))
        : children}
    </LazyMotionDiv>
  );
};

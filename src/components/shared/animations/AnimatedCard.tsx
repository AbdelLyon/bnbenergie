'use client';

import { LazyMotionDiv } from '@/components/LazyComponents';
import type { HTMLMotionProps } from 'framer-motion';

interface AnimatedCardProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'whileInView' | 'viewport' | 'transition'> {
  index?: number;
  delay?: number;
  duration?: number;
  initialY?: number;
  viewportMargin?: string;
}

/**
 * Wrapper de carte animée réutilisable avec animation d'apparition standardisée.
 *
 * @param index - Index de la carte pour décalage d'animation (delay = index * 0.1)
 * @param delay - Délai custom (remplace le calcul basé sur index)
 * @param duration - Durée de l'animation (défaut: 0.4s)
 * @param initialY - Position Y initiale (défaut: 20)
 * @param viewportMargin - Marge du viewport pour déclencher l'animation (défaut: '-50px')
 */
export function AnimatedCard({
  children,
  index = 0,
  delay,
  duration = 0.4,
  initialY = 20,
  viewportMargin = '-50px',
  className,
  ...motionProps
}: AnimatedCardProps) {
  const computedDelay = delay !== undefined ? delay : index * 0.1;

  return (
    <LazyMotionDiv
      initial={{ opacity: 0, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{ duration, delay: computedDelay }}
      className={className}
      {...motionProps}
    >
      {children}
    </LazyMotionDiv>
  );
}

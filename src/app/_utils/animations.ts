import { ANIMATION_DURATIONS, TRANSITIONS } from '@/app/_config/constants';
import type { Transition } from 'framer-motion';

/**
 * Animation utility functions for consistent motion across the app
 */

/**
 * Create a staggered animation delay based on index
 * @param index - Item index in the list
 * @param staggerDelay - Delay between items (default: 0.1s)
 * @returns Calculated delay in seconds
 */
export const getStaggerDelay = (index: number, staggerDelay = 0.1): number => {
  return index * staggerDelay;
};

/**
 * Create a fade-in-up animation with custom duration and delay
 * @param duration - Animation duration (default: medium)
 * @param delay - Animation delay (default: 0)
 * @returns Framer Motion variants and transition
 */
export const createFadeInUpAnimation = (
  duration: number = ANIMATION_DURATIONS.medium,
  delay: number = 0
) => {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: {
      duration,
      delay,
      ...TRANSITIONS.easeOut,
    } as Transition,
  };
};

/**
 * Standard viewport configuration for scroll animations
 */
export const SCROLL_VIEWPORT = {
  once: true,
  margin: '-50px',
} as const;

// createStaggerContainer et createStaggerItem retirés car non utilisés

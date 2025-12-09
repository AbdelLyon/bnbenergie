import { ANIMATION_DURATIONS, TRANSITIONS, STAGGER, ORCHESTRATION } from '@/config/constants';
import type { Transition, Variants } from 'framer-motion';

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

/**
 * Enhanced viewport configurations for different animation needs
 */
export const VIEWPORT_CONFIGS = {
  default: SCROLL_VIEWPORT,
  immediate: {
    once: true,
    margin: '0px',
  },
  early: {
    once: true,
    margin: '-100px',
  },
  late: {
    once: true,
    margin: '50px',
  },
  repeating: {
    once: false,
    margin: '-50px',
  },
} as const;

/**
 * Orchestrated animation variants for coordinated page entrances
 */

/**
 * Create orchestrated stagger animation for cards/items
 * Items animate in a wave pattern with coordinated timing
 */
export const createWaveStagger = (
  index: number,
  _totalItems: number,
  options?: {
    stagger?: number;
    duration?: number;
    direction?: 'left' | 'right' | 'top' | 'bottom';
    distance?: number;
  }
) => {
  const stagger = options?.stagger ?? STAGGER.normal;
  const duration = options?.duration ?? ANIMATION_DURATIONS.medium;
  const direction = options?.direction ?? 'bottom';
  const distance = options?.distance ?? 40;

  const directionMap = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    top: { x: 0, y: -distance },
    bottom: { x: 0, y: distance },
  };

  const offset = directionMap[direction];

  return {
    initial: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      scale: 0.95,
    },
    whileInView: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    },
    transition: {
      duration,
      delay: index * stagger,
      ...TRANSITIONS.easeOutExpo,
    } as Transition,
  };
};

/**
 * Create fade-in with blur effect (modern entrance)
 */
export const createFadeInBlur = (delay: number = 0) => {
  return {
    initial: {
      opacity: 0,
      filter: 'blur(10px)',
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
    },
    transition: {
      duration: ANIMATION_DURATIONS.slow,
      delay,
      ...TRANSITIONS.easeOutExpo,
    } as Transition,
  };
};

/**
 * Create slide and fade animation from any direction
 */
export const createSlideIn = (
  direction: 'left' | 'right' | 'top' | 'bottom',
  options?: {
    delay?: number;
    duration?: number;
    distance?: number;
  }
) => {
  const delay = options?.delay ?? 0;
  const duration = options?.duration ?? ANIMATION_DURATIONS.medium;
  const distance = options?.distance ?? 60;

  const offsets = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    top: { x: 0, y: -distance },
    bottom: { x: 0, y: distance },
  };

  const offset = offsets[direction];

  return {
    initial: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    whileInView: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    transition: {
      duration,
      delay,
      ...TRANSITIONS.easeOutQuart,
    } as Transition,
    viewport: SCROLL_VIEWPORT,
  };
};

/**
 * Create scale and fade animation (great for cards)
 */
export const createScaleFade = (
  delay: number = 0,
  options?: {
    duration?: number;
    initialScale?: number;
  }
) => {
  const duration = options?.duration ?? ANIMATION_DURATIONS.medium;
  const initialScale = options?.initialScale ?? 0.9;

  return {
    initial: {
      opacity: 0,
      scale: initialScale,
    },
    whileInView: {
      opacity: 1,
      scale: 1,
    },
    transition: {
      duration,
      delay,
      ...TRANSITIONS.smooth,
    } as Transition,
    viewport: SCROLL_VIEWPORT,
  };
};

/**
 * Orchestrated header animation sequence
 * Returns timing for each header element
 */
export const getHeaderOrchestration = () => {
  return {
    background: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        duration: ANIMATION_DURATIONS.slowest,
        delay: ORCHESTRATION.headerBackground,
      },
    },
    logo: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: ANIMATION_DURATIONS.medium,
        delay: ORCHESTRATION.headerLogo,
        ...TRANSITIONS.easeOutQuart,
      },
    },
    title: {
      initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      transition: {
        duration: ANIMATION_DURATIONS.slow,
        delay: ORCHESTRATION.headerTitle,
        ...TRANSITIONS.easeOutExpo,
      },
    },
    subtitle: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      transition: {
        duration: ANIMATION_DURATIONS.medium,
        delay: ORCHESTRATION.headerSubtitle,
        ...TRANSITIONS.easeOut,
      },
    },
    cta: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: {
        duration: ANIMATION_DURATIONS.normal,
        delay: ORCHESTRATION.headerCTA,
        ...TRANSITIONS.bounce,
      },
    },
    scrollIndicator: {
      initial: { opacity: 0, y: -10 },
      animate: {
        opacity: 1,
        y: 0,
      },
      transition: {
        duration: ANIMATION_DURATIONS.normal,
        delay: ORCHESTRATION.headerScrollIndicator,
      },
    },
  };
};

/**
 * Container animation that orchestrates its children
 */
export const createContainerVariants = (
  staggerChildren: number = STAGGER.normal,
  delayChildren: number = 0
): Variants => {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

/**
 * Item animation for use with container variants
 */
export const createItemVariants = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 30
): Variants => {
  const offsets = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const offset = offsets[direction];

  return {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: TRANSITIONS.easeOutQuart,
    },
  };
};

/**
 * Hover animation variants
 */
export const HOVER_VARIANTS = {
  // Subtle lift
  lift: {
    rest: { y: 0, scale: 1 },
    hover: {
      y: -8,
      scale: 1.02,
      transition: TRANSITIONS.snappy,
    },
  },
  // Scale up
  scale: {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: TRANSITIONS.smooth,
    },
  },
  // Glow effect
  glow: {
    rest: {
      boxShadow: '0 0 0 rgba(59, 130, 246, 0)',
    },
    hover: {
      boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
      transition: TRANSITIONS.smooth,
    },
  },
} as const;

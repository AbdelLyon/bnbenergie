// Constantes retirées car non utilisées: GLOW_SIZES, OPACITIES

export const ANIMATION_DURATIONS = {
  carousel: 5000,
  scroll: 500,
  fast: 0.3,
  normal: 0.4,
  medium: 0.5,
  slow: 0.6,
} as const;

/**
 * Standardized spacing system for consistent margins and paddings
 */
export const SPACING = {
  section: {
    py: 'py-12 md:py-16 lg:py-20',
    px: 'px-4 sm:px-6 lg:px-8',
  },
  header: {
    mb: 'mb-8 md:mb-12 lg:mb-14',
  },
  card: {
    p: 'p-6 md:p-8',
    gap: 'gap-4 md:gap-6',
  },
  grid: {
    gap: 'gap-4 lg:gap-6',
  },
  content: {
    mb: 'mb-4 md:mb-6',
    mt: 'mt-4 md:mt-6',
  },
} as const;

// Constantes retirées car non utilisées: THRESHOLDS, BREAKPOINTS

// MOTION_VARIANTS retiré car non utilisé

/**
 * Standardized transition configurations
 */
export const TRANSITIONS = {
  smooth: {
    type: 'spring',
    stiffness: 100,
    damping: 15,
  },
  easeOut: {
    ease: [0.22, 1, 0.36, 1],
  },
  bounce: {
    type: 'spring',
    bounce: 0.4,
  },
} as const;

// STAGGER retiré car non utilisé

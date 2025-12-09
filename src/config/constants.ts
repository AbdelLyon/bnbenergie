// Constantes retirées car non utilisées: GLOW_SIZES, OPACITIES

export const ANIMATION_DURATIONS = {
  carousel: 5000,
  scroll: 500,
  instant: 0.15,
  fast: 0.3,
  normal: 0.4,
  medium: 0.5,
  slow: 0.6,
  slower: 0.8,
  slowest: 1.0,
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
 * Standardized transition configurations with modern easing curves
 */
export const TRANSITIONS = {
  // Spring physics - natural, bouncy motion
  smooth: {
    type: 'spring',
    stiffness: 100,
    damping: 15,
  },
  snappy: {
    type: 'spring',
    stiffness: 200,
    damping: 20,
  },
  gentle: {
    type: 'spring',
    stiffness: 80,
    damping: 12,
  },
  bounce: {
    type: 'spring',
    bounce: 0.4,
  },

  // Cubic bezier easings - precise timing control
  easeOut: {
    ease: [0.22, 1, 0.36, 1], // Custom easeOut
  },
  easeInOut: {
    ease: [0.4, 0, 0.2, 1], // Material Design standard
  },
  easeOutQuart: {
    ease: [0.25, 1, 0.5, 1], // Strong easeOut
  },
  easeOutExpo: {
    ease: [0.16, 1, 0.3, 1], // Exponential easeOut
  },
  anticipate: {
    ease: [0.68, -0.55, 0.265, 1.55], // Slight overshoot
  },
} as const;

/**
 * Stagger configurations for orchestrated animations
 */
export const STAGGER = {
  instant: 0.05,
  fast: 0.08,
  normal: 0.1,
  medium: 0.15,
  slow: 0.2,
} as const;

/**
 * Page-level animation orchestration timings
 * Defines when different sections should start animating
 */
export const ORCHESTRATION = {
  // Header sequence
  headerBackground: 0,
  headerLogo: 0.2,
  headerTitle: 0.4,
  headerSubtitle: 0.6,
  headerCTA: 0.8,
  headerScrollIndicator: 1.0,

  // Content sections (relative to when section enters viewport)
  sectionDelay: 0.1,
  cardsStart: 0.2,
  backgroundEffects: 0.4,
} as const;


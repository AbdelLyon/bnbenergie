// Constantes retirées car non utilisées: GLOW_SIZES, OPACITIES

export const ANIMATION_DURATIONS = {
  carousel: 5000,
  scroll: 500,
  instant: 0.15,
  fast: 0.2,
  normal: 0.25,
  medium: 0.3,
  slow: 0.35,
  slower: 0.4,
  slowest: 0.5,
} as const;

/**
 * Standardized spacing system for consistent margins and paddings
 */
export const SPACING = {
  section: {
    py: "py-10 md:py-14 lg:py-16",
    px: "px-4 sm:px-6 lg:px-8",
  },
  header: {
    mb: "mb-8 md:mb-12 lg:mb-16",
  },
  card: {
    p: "p-6 md:p-8 lg:p-10",
    gap: "gap-4 md:gap-6 lg:gap-8",
  },
  grid: {
    gap: "gap-6 lg:gap-8 xl:gap-10",
  },
  content: {
    mb: "mb-6 md:mb-8 lg:mb-10",
    mt: "mt-6 md:mt-8 lg:mt-10",
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
    type: "spring",
    stiffness: 100,
    damping: 15,
  },
  snappy: {
    type: "spring",
    stiffness: 200,
    damping: 20,
  },
  gentle: {
    type: "spring",
    stiffness: 80,
    damping: 12,
  },
  bounce: {
    type: "spring",
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
} as const;

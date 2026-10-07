// src/lib/motion.ts — Standardized motion design tokens and Apple fluid springs for Bridle

/**
 * Standard durations in seconds (for motion/react) and milliseconds (for CSS / timers)
 */
export const DURATION = {
  fast: 0.15, // 150ms: micro-interactions, button press, hovers
  base: 0.25, // 250ms: panel switches, toggles, card expands
  slow: 0.4,  // 400ms: scroll reveals, section transitions
} as const;

export const DURATION_MS = {
  fast: 150,
  base: 250,
  slow: 400,
} as const;

/**
 * Emil Kowalski Custom Easing Curves:
 * - ease-out: cubic-bezier(0.23, 1, 0.32, 1) — strong deceleration for UI entrances and button responses
 * - ease-in-out: cubic-bezier(0.77, 0, 0.175, 1) — on-screen movement and morphing
 * - ease-drawer: cubic-bezier(0.32, 0.72, 0, 1) — natural iOS-like sheet momentum
 */
export const EASING = {
  primary: [0.23, 1, 0.32, 1] as [number, number, number, number],
  css: 'cubic-bezier(0.23, 1, 0.32, 1)',
  inOut: [0.77, 0, 0.175, 1] as [number, number, number, number],
  inOutCss: 'cubic-bezier(0.77, 0, 0.175, 1)',
  drawer: [0.32, 0.72, 0, 1] as [number, number, number, number],
  drawerCss: 'cubic-bezier(0.32, 0.72, 0, 1)',
} as const;

/**
 * Apple Fluid Interface Springs (WWDC Designing Fluid Interfaces)
 *
 * - Damping 1.0 (critically damped, bounce: 0) for smooth, non-distracting UI
 * - Light bounce (~0.08) for interactive controls with tactile momentum
 * - Snappy response for quick state changes
 */
export const SPRING = {
  /** Critically damped default spring for layouts, reveals, and panel switches */
  default: {
    type: 'spring',
    bounce: 0,
    duration: 0.35,
  },
  /** Snappy spring for button taps, tab indicators, and pills */
  snappy: {
    type: 'spring',
    bounce: 0.08,
    duration: 0.28,
  },
  /** Smooth spring for sheets, drawers, and modal transitions */
  sheet: {
    type: 'spring',
    bounce: 0,
    duration: 0.4,
  },
} as const;

/**
 * Standardized stagger offsets for lists and grids
 */
export const STAGGER = {
  fast: 0.05, // 50ms between items
  base: 0.1,  // 100ms between items
  slow: 0.15, // 150ms between items
} as const;

/**
 * Standard scroll-reveal configuration
 * Subtle translateY (12px) + fade, hardware-accelerated transform, triggered once
 */
export const SCROLL_REVEAL = {
  initial: { opacity: 0, transform: 'translateY(12px)' },
  animate: { opacity: 1, transform: 'translateY(0px)' },
  viewport: { once: true, margin: '-8% 0px' },
  transition: {
    duration: DURATION.slow,
    ease: EASING.primary,
  },
} as const;

/**
 * Crossfade configuration for tabs and panel transitions
 */
export const CROSSFADE = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: SPRING.default,
} as const;

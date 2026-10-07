// src/components/ui/Reveal.tsx
'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASING, SCROLL_REVEAL } from '@/lib/motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before animation starts */
  delay?: number;
}

/**
 * Reveal — scroll-reveal wrapper.
 * Fades in + translates 12px upward using standardized slow duration (600ms) and natural ease-out.
 * Triggers once, never resets on scroll away.
 * Respects prefers-reduced-motion automatically.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={SCROLL_REVEAL.initial}
      whileInView={SCROLL_REVEAL.animate}
      viewport={SCROLL_REVEAL.viewport}
      transition={{
        duration: DURATION.slow,
        ease: EASING.primary,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASING } from '@/lib/motion';
import { cn } from '@/lib/utils';

type ReinLineOrientation = 'horizontal' | 'vertical';

interface ReinLineProps {
  orientation?: ReinLineOrientation;
  length?: number;
  nodePosition?: number; // 0-1 fraction; default 0.5
  animate?: boolean;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

/**
 * ReinLine — The signature motif of Bridle.
 * Draws on scroll using standardized motion tokens:
 * - Line draws smoothly (600ms)
 * - Central ring node expands with subtle ease (300ms, starting mid-draw)
 * - Trailing line extends to target
 * - Graceful instant render when prefers-reduced-motion is active
 */
export function ReinLine({
  orientation = 'horizontal',
  length = 120,
  nodePosition = 0.5,
  animate = true,
  className,
  color = 'var(--color-brass)',
  strokeWidth = 1,
}: ReinLineProps) {
  const shouldReduceMotion = useReducedMotion();
  const doAnimate = animate && !shouldReduceMotion;

  const nodeRadius = 3;
  const nodeClearance = 3;

  if (orientation === 'horizontal') {
    const w = length;
    const h = Math.max(nodeRadius * 2 + 8, 14);
    const cy = h / 2;
    const nodeX = length * nodePosition;

    return (
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={cn('overflow-visible', className)}
      >
        <motion.line
          x1={0}
          y1={cy}
          x2={Math.max(0, nodeX - nodeRadius - nodeClearance)}
          y2={cy}
          stroke={color}
          strokeWidth={strokeWidth}
          initial={doAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          whileInView={doAnimate ? { pathLength: 1, opacity: 1 } : undefined}
          viewport={{ once: true, margin: '-5% 0px' }}
          transition={{ duration: DURATION.slow, ease: EASING.primary }}
        />
        <motion.circle
          cx={nodeX}
          cy={cy}
          r={nodeRadius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          initial={doAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          whileInView={doAnimate ? { scale: 1, opacity: 1 } : undefined}
          viewport={{ once: true, margin: '-5% 0px' }}
          transition={{
            duration: DURATION.base,
            delay: doAnimate ? DURATION.base : 0,
            ease: EASING.primary,
          }}
        />
        <motion.line
          x1={Math.min(w, nodeX + nodeRadius + nodeClearance)}
          y1={cy}
          x2={w}
          y2={cy}
          stroke={color}
          strokeWidth={strokeWidth}
          initial={doAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          whileInView={doAnimate ? { pathLength: 1, opacity: 1 } : undefined}
          viewport={{ once: true, margin: '-5% 0px' }}
          transition={{
            duration: DURATION.slow,
            delay: doAnimate ? 0.35 : 0,
            ease: EASING.primary,
          }}
        />
      </svg>
    );
  }

  const wVert = Math.max(nodeRadius * 2 + 8, 14);
  const hVert = length;
  const cxVert = wVert / 2;
  const nodeYVert = length * nodePosition;

  return (
    <svg
      width={wVert}
      height={hVert}
      viewBox={`0 0 ${wVert} ${hVert}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('overflow-visible', className)}
    >
      <motion.line
        x1={cxVert}
        y1={0}
        x2={cxVert}
        y2={Math.max(0, nodeYVert - nodeRadius - nodeClearance)}
        stroke={color}
        strokeWidth={strokeWidth}
        initial={doAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        whileInView={doAnimate ? { pathLength: 1, opacity: 1 } : undefined}
        viewport={{ once: true, margin: '-5% 0px' }}
        transition={{ duration: DURATION.slow, ease: EASING.primary }}
      />
      <motion.circle
        cx={cxVert}
        cy={nodeYVert}
        r={nodeRadius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        initial={doAnimate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        whileInView={doAnimate ? { scale: 1, opacity: 1 } : undefined}
        viewport={{ once: true, margin: '-5% 0px' }}
        transition={{
          duration: DURATION.base,
          delay: doAnimate ? DURATION.base : 0,
          ease: EASING.primary,
        }}
      />
      <motion.line
        x1={cxVert}
        y1={Math.min(hVert, nodeYVert + nodeRadius + nodeClearance)}
        x2={cxVert}
        y2={hVert}
        stroke={color}
        strokeWidth={strokeWidth}
        initial={doAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        whileInView={doAnimate ? { pathLength: 1, opacity: 1 } : undefined}
        viewport={{ once: true, margin: '-5% 0px' }}
        transition={{
          duration: DURATION.slow,
          delay: doAnimate ? 0.35 : 0,
          ease: EASING.primary,
        }}
      />
    </svg>
  );
}

'use client';

import * as React from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react';
import { Container, SectionLabel } from '@/components/layout';
import { Reveal } from '@/components/ui';
import { ReinLine } from '@/components/motif';
import { DURATION, EASING } from '@/lib/motion';
import { cn } from '@/lib/utils';

type StageId = 1 | 2 | 3;

interface StageInfo {
  id: StageId;
  label: string;
  phase: string;
  title: string;
  caption: string;
  description: string;
}

const STAGES: StageInfo[] = [
  {
    id: 1,
    label: '01',
    phase: 'DESCRIBE',
    title: 'Describe',
    caption: 'You say what you need.',
    description:
      'Explain what you need done in plain language. Bridle translates your requirements, systems, and control boundaries into an agent blueprint without prompt engineering, code, or tool schemas.',
  },
  {
    id: 2,
    label: '02',
    phase: 'BUILD',
    title: 'Build',
    caption: 'Bridle builds the agent and everything it runs on.',
    description:
      'Bridle configures the agent runtime, manages secure system connections, isolates credentials in hardened sandboxes, and provisions the test suite before anything touches production.',
  },
  {
    id: 3,
    label: '03',
    phase: 'OPERATE',
    title: 'Operate',
    caption:
      'Agents work across your systems, inside boundaries you control.',
    description:
      'Agents execute autonomous work across your tools. Every action is evaluated against policy rules, high-impact steps pause for your approval, and all activity is recorded in an immutable audit log.',
  },
];

interface DirectionItem {
  phase: string;
  status: string;
  headline: string;
  description: string;
}

const DIRECTION_ITEMS: DirectionItem[] = [
  {
    phase: 'Today',
    status: 'In development',
    headline: 'Describe a task, get a safe agent.',
    description:
      'Describe a workflow in plain words. Bridle builds the agent, connects your tools, enforces strict operational guardrails, and sets up human approval checkpoints.',
  },
  {
    phase: 'Next',
    status: 'Roadmap',
    headline: 'Connect any system, test and verify before you deploy.',
    description:
      'Universal app connectors, pre-deployment edge-case stress testing, and real-world outcome verification across production environments.',
  },
  {
    phase: 'Later',
    status: 'Long-term direction',
    headline:
      'Infrastructure for AI workers across businesses, services and other agents.',
    description:
      'A foundational operational fabric where autonomous workers coordinate across company boundaries, execute verified transactions, and uphold institutional policy.',
  },
];

/**
 * Diagram for Stage 1: Describe
 * Prompt node -> plain language synthesis -> Agent specification blueprint
 */
function Stage1Diagram() {
  return (
    <svg
      viewBox="0 0 680 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-h-[340px]"
      aria-hidden="true"
    >
      {/* Background Subtle Grid */}
      <defs>
        <pattern
          id="stage1-grid"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="rgba(255, 255, 255, 0.03)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="680" height="340" fill="url(#stage1-grid)" />

      {/* Connecting Plain Line */}
      <line
        x1="220"
        y1="170"
        x2="460"
        y2="170"
        stroke="var(--color-brass)"
        strokeWidth="1.25"
        strokeDasharray="4 4"
      />

      {/* Center Label: You say what you need */}
      <g transform="translate(340, 150)">
        <rect
          x="-95"
          y="-13"
          width="190"
          height="26"
          rx="3"
          fill="#16181D"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fill="var(--color-brass)"
          fontFamily="var(--font-mono)"
          fontSize="10"
          letterSpacing="0.06em"
        >
          YOU SAY WHAT YOU NEED
        </text>
      </g>

      {/* Left Node: User Prompt */}
      <g transform="translate(140, 170)">
        <rect
          x="-70"
          y="-32"
          width="140"
          height="64"
          rx="4"
          fill="#16181D"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />
        <circle cx="-50" cy="-12" r="3" fill="var(--color-brass)" />
        <text
          x="-40"
          y="-9"
          fill="var(--color-brass)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.08em"
        >
          01 · PROMPT
        </text>
        <text
          x="-50"
          y="12"
          fill="#F6F4EF"
          fontFamily="var(--font-sans)"
          fontSize="13"
          fontWeight="500"
        >
          Plain Language
        </text>
      </g>

      {/* Right Node: Blueprint Spec */}
      <g transform="translate(540, 170)">
        <rect
          x="-70"
          y="-32"
          width="140"
          height="64"
          rx="4"
          fill="#16181D"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />
        <circle cx="-50" cy="-12" r="3" fill="#8A8E97" />
        <text
          x="-40"
          y="-9"
          fill="#8A8E97"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.08em"
        >
          02 · BLUEPRINT
        </text>
        <text
          x="-50"
          y="12"
          fill="#F6F4EF"
          fontFamily="var(--font-sans)"
          fontSize="13"
          fontWeight="500"
        >
          Agent Blueprint
        </text>
      </g>
    </svg>
  );
}

/**
 * Diagram for Stage 2: Build
 * Agent plus Bridle (builds & hosts) plus systems
 */
function Stage2Diagram() {
  return (
    <svg
      viewBox="0 0 680 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-h-[340px]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="stage2-grid"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="rgba(255, 255, 255, 0.03)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="680" height="340" fill="url(#stage2-grid)" />

      {/* Brass Rein Line: Agent to Bridle */}
      <line
        x1="200"
        y1="170"
        x2="280"
        y2="170"
        stroke="var(--color-brass)"
        strokeWidth="1.5"
      />
      <circle cx="240" cy="170" r="3" fill="var(--color-brass)" />

      {/* Brass Rein Line: Bridle to Systems */}
      <line
        x1="400"
        y1="170"
        x2="480"
        y2="170"
        stroke="var(--color-brass)"
        strokeWidth="1.5"
      />
      <circle cx="440" cy="170" r="3" fill="var(--color-brass)" />

      {/* Left Node: Agent */}
      <g transform="translate(130, 170)">
        <rect
          x="-70"
          y="-34"
          width="140"
          height="68"
          rx="4"
          fill="#16181D"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />
        <text
          x="-50"
          y="-12"
          fill="var(--color-brass)"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.08em"
        >
          01 · AGENT
        </text>
        <text
          x="-50"
          y="9"
          fill="#F6F4EF"
          fontFamily="var(--font-sans)"
          fontSize="13"
          fontWeight="500"
        >
          Autonomous Agent
        </text>
        <text
          x="-50"
          y="23"
          fill="#8A8E97"
          fontFamily="var(--font-mono)"
          fontSize="9"
        >
          Built runtime
        </text>
      </g>

      {/* Center Node: Bridle (Builds & Hosts) */}
      <g transform="translate(340, 170)">
        <rect
          x="-60"
          y="-38"
          width="120"
          height="76"
          rx="4"
          fill="#16181D"
          stroke="var(--color-brass)"
          strokeWidth="1.5"
        />
        {/* Ring & Horizontal Rein Mark */}
        <circle
          cx="0"
          cy="-14"
          r="7"
          stroke="var(--color-brass)"
          strokeWidth="1.5"
          fill="none"
        />
        <line
          x1="-16"
          y1="-14"
          x2="16"
          y2="-14"
          stroke="var(--color-brass)"
          strokeWidth="1.5"
        />
        <text
          x="0"
          y="8"
          textAnchor="middle"
          fill="var(--color-brass)"
          fontFamily="var(--font-sans)"
          fontSize="12"
          fontWeight="600"
          letterSpacing="0.02em"
        >
          Bridle
        </text>
        <text
          x="0"
          y="23"
          textAnchor="middle"
          fill="#8A8E97"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.06em"
        >
          BUILDS & HOSTS
        </text>
      </g>

      {/* Right Node: Business Systems */}
      <g transform="translate(550, 170)">
        <rect
          x="-70"
          y="-34"
          width="140"
          height="68"
          rx="4"
          fill="#16181D"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />
        <text
          x="-50"
          y="-12"
          fill="#8A8E97"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.08em"
        >
          02 · SYSTEMS
        </text>
        <text
          x="-50"
          y="9"
          fill="#F6F4EF"
          fontFamily="var(--font-sans)"
          fontSize="13"
          fontWeight="500"
        >
          Connected Tools
        </text>
        <text
          x="-50"
          y="23"
          fill="#8A8E97"
          fontFamily="var(--font-mono)"
          fontSize="9"
        >
          APIs, DBs & Portals
        </text>
      </g>
    </svg>
  );
}

/**
 * Diagram for Stage 3: Operate
 * Multi-agent network through Bridle control points.
 */
function Stage3Diagram() {
  return (
    <svg
      viewBox="0 0 680 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-h-[340px]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="stage3-grid"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="rgba(255, 255, 255, 0.03)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="680" height="340" fill="url(#stage3-grid)" />

      {/* FABRIC OF BRASS REIN LINES */}
      {/* Agent 1 -> Bridle 1 -> System 1 */}
      <line
        x1="160"
        y1="90"
        x2="280"
        y2="105"
        stroke="var(--color-brass)"
        strokeWidth="1.25"
      />
      <line
        x1="310"
        y1="105"
        x2="480"
        y2="90"
        stroke="var(--color-brass)"
        strokeWidth="1.25"
      />

      {/* Agent 2 -> Bridle 2 -> System 2 */}
      <line
        x1="160"
        y1="250"
        x2="280"
        y2="235"
        stroke="var(--color-brass)"
        strokeWidth="1.25"
      />
      <line
        x1="310"
        y1="235"
        x2="480"
        y2="250"
        stroke="var(--color-brass)"
        strokeWidth="1.25"
      />

      {/* Inter-Agent Link: Agent 1 -> Bridle Central -> Agent 3 */}
      <line
        x1="160"
        y1="90"
        x2="330"
        y2="170"
        stroke="var(--color-brass)"
        strokeWidth="1.25"
        strokeDasharray="3 3"
      />
      <line
        x1="350"
        y1="170"
        x2="480"
        y2="170"
        stroke="var(--color-brass)"
        strokeWidth="1.25"
        strokeDasharray="3 3"
      />

      {/* Agent 2 -> Bridle Central */}
      <line
        x1="160"
        y1="250"
        x2="330"
        y2="170"
        stroke="var(--color-brass)"
        strokeWidth="1.25"
        strokeDasharray="3 3"
      />

      {/* Bridle Central -> External Partner Service */}
      <line
        x1="350"
        y1="170"
        x2="480"
        y2="250"
        stroke="var(--color-brass)"
        strokeWidth="1.25"
      />

      {/* NODES: AGENTS (LEFT) */}
      {/* Agent 1: Support Agent */}
      <g transform="translate(100, 90)">
        <rect
          x="-55"
          y="-24"
          width="110"
          height="48"
          rx="4"
          fill="#16181D"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />
        <text
          x="-42"
          y="-7"
          fill="var(--color-brass)"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="0.08em"
        >
          AGENT · 01
        </text>
        <text
          x="-42"
          y="10"
          fill="#F6F4EF"
          fontFamily="var(--font-sans)"
          fontSize="11"
          fontWeight="500"
        >
          Support Agent
        </text>
      </g>

      {/* Agent 2: Operations Agent */}
      <g transform="translate(100, 250)">
        <rect
          x="-55"
          y="-24"
          width="110"
          height="48"
          rx="4"
          fill="#16181D"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />
        <text
          x="-42"
          y="-7"
          fill="var(--color-brass)"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="0.08em"
        >
          AGENT · 02
        </text>
        <text
          x="-42"
          y="10"
          fill="#F6F4EF"
          fontFamily="var(--font-sans)"
          fontSize="11"
          fontWeight="500"
        >
          Operations Agent
        </text>
      </g>

      {/* BRIDLE CONTROL FABRIC NODES */}
      {/* Bridle Control Point 1 */}
      <g transform="translate(295, 105)">
        <circle
          cx="0"
          cy="0"
          r="14"
          fill="#16181D"
          stroke="var(--color-brass)"
          strokeWidth="1.5"
        />
        <circle cx="0" cy="0" r="4" fill="var(--color-brass)" />
      </g>

      {/* Bridle Control Point Central */}
      <g transform="translate(340, 170)">
        <rect
          x="-46"
          y="-20"
          width="92"
          height="40"
          rx="4"
          fill="#16181D"
          stroke="var(--color-brass)"
          strokeWidth="1.5"
        />
        <text
          x="0"
          y="-2"
          textAnchor="middle"
          fill="var(--color-brass)"
          fontFamily="var(--font-sans)"
          fontSize="11"
          fontWeight="600"
        >
          Bridle
        </text>
        <text
          x="0"
          y="11"
          textAnchor="middle"
          fill="#8A8E97"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="0.05em"
        >
          CONTROL POINT
        </text>
      </g>

      {/* Bridle Control Point 2 */}
      <g transform="translate(295, 235)">
        <circle
          cx="0"
          cy="0"
          r="14"
          fill="#16181D"
          stroke="var(--color-brass)"
          strokeWidth="1.5"
        />
        <circle cx="0" cy="0" r="4" fill="var(--color-brass)" />
      </g>

      {/* NODES: SYSTEMS & SERVICES (RIGHT) */}
      {/* System 1: CRM & Helpdesk */}
      <g transform="translate(540, 90)">
        <rect
          x="-55"
          y="-24"
          width="110"
          height="48"
          rx="4"
          fill="#16181D"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />
        <text
          x="-42"
          y="-7"
          fill="#8A8E97"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="0.08em"
        >
          SYSTEM · 01
        </text>
        <text
          x="-42"
          y="10"
          fill="#F6F4EF"
          fontFamily="var(--font-sans)"
          fontSize="11"
          fontWeight="500"
        >
          CRM & Invoicing
        </text>
      </g>

      {/* Service 2: Inter-Agent / External Service */}
      <g transform="translate(540, 170)">
        <rect
          x="-55"
          y="-24"
          width="110"
          height="48"
          rx="4"
          fill="#16181D"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />
        <text
          x="-42"
          y="-7"
          fill="var(--color-brass)"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="0.08em"
        >
          AGENT · 03
        </text>
        <text
          x="-42"
          y="10"
          fill="#F6F4EF"
          fontFamily="var(--font-sans)"
          fontSize="11"
          fontWeight="500"
        >
          Partner Agent
        </text>
      </g>

      {/* System 3: Treasury & ERP */}
      <g transform="translate(540, 250)">
        <rect
          x="-55"
          y="-24"
          width="110"
          height="48"
          rx="4"
          fill="#16181D"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
        />
        <text
          x="-42"
          y="-7"
          fill="#8A8E97"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="0.08em"
        >
          SYSTEM · 02
        </text>
        <text
          x="-42"
          y="10"
          fill="#F6F4EF"
          fontFamily="var(--font-sans)"
          fontSize="11"
          fontWeight="500"
        >
          Banking Rails
        </text>
      </g>
    </svg>
  );
}

export function VisionSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = React.useState<StageId>(1);

  // Desktop tall scroll container ref
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
  });

  // Track scroll progression into 3 stages
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.38) {
      setActiveStage(1);
    } else if (latest < 0.72) {
      setActiveStage(2);
    } else {
      setActiveStage(3);
    }
  });

  const currentStageInfo =
    STAGES.find((s) => s.id === activeStage) || STAGES[0];

  return (
    <section
      id="vision"
      tabIndex={-1}
      className="scroll-mt-24 relative bg-ink text-paper py-24 md:py-32 lg:py-36 border-t border-white/10 focus:outline-none"
      aria-label="Bridle Vision and Trajectory"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-[62ch] mb-16 md:mb-20">
          <Reveal>
            <SectionLabel dark className="mb-6">
              Vision
            </SectionLabel>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="type-h2 text-paper tracking-tight mb-6">
              Businesses shouldn&apos;t need an AI infrastructure team to put AI to work.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="type-body-lg text-mute leading-relaxed max-w-[58ch]">
              From describing a workflow in plain words to operating across business systems — Bridle builds the agent and keeps you in control.
            </p>
          </Reveal>
        </div>

        {/* DESKTOP VIEW: Tall Scroll-driven Section (~250vh) with Sticky Diagram */}
        {/* Hidden on mobile and when reduced motion is preferred */}
        {!shouldReduceMotion && (
          <div
            ref={scrollContainerRef}
            className="hidden xl:block relative h-[250vh] mb-32"
          >
            <div className="sticky top-24 pt-4 pb-12">
              <div className="grid grid-cols-12 gap-10 items-center">
                {/* Left Column: Stage Text & Controls */}
                <div className="col-span-5 space-y-6">
                  {/* Stage Switcher Pills */}
                  <div
                    role="tablist"
                    aria-label="Vision trajectory stages"
                    className="flex items-center gap-1.5 p-1 rounded-full bg-ink-2 border border-white/10 w-fit"
                  >
                    {STAGES.map((stage) => {
                      const isSelected = activeStage === stage.id;
                      return (
                        <button
                          key={stage.id}
                          role="tab"
                          type="button"
                          aria-selected={isSelected}
                          aria-controls={`vision-stage-panel-${stage.id}`}
                          onClick={() => setActiveStage(stage.id)}
                          className={cn(
                            'type-mono-label text-xs px-4 py-1.5 rounded-full active:scale-[0.97] touch-manipulation transition-all duration-100 ease-out outline-none',
                            'focus-visible:ring-1 focus-visible:ring-brass',
                            isSelected
                              ? 'bg-paper text-ink font-semibold shadow-xs'
                              : 'text-mute hover:text-paper'
                          )}
                        >
                          {stage.label} · {stage.phase}
                        </button>
                      );
                    })}
                  </div>

                  {/* Morphing Stage Copy with 250ms crossfade */}
                  <div
                    id={`vision-stage-panel-${currentStageInfo.id}`}
                    role="tabpanel"
                    className="min-h-[220px]"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStageInfo.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: DURATION.base, ease: EASING.primary }}
                        className="space-y-4"
                      >
                        <div className="type-mono-label text-xs text-brass tracking-wider">
                          {`${currentStageInfo.label} // ${currentStageInfo.phase}`}
                        </div>

                        <h3 className="type-h3 text-paper text-2xl font-medium tracking-tight">
                          {currentStageInfo.title}
                        </h3>

                        <p className="font-mono text-sm text-paper/90 bg-white/5 border border-white/10 rounded-[4px] p-3 leading-relaxed">
                          &ldquo;{currentStageInfo.caption}&rdquo;
                        </p>

                        <p className="type-body text-mute text-sm leading-relaxed max-w-[48ch]">
                          {currentStageInfo.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="type-mono-label text-xs text-mute/60 pt-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brass/80" />
                    <span>Scroll down to advance trajectory</span>
                  </div>
                </div>

                {/* Right Column: Sticky Morphing Diagram Canvas */}
                <div className="col-span-7">
                  <div className="relative rounded-[6px] border border-white/10 bg-ink-2/80 p-6 xl:p-8 overflow-hidden shadow-2xl backdrop-blur-xs">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5 text-xs font-mono text-mute">
                      <span>{'// ARCHITECTURE TRAJECTORY SIMULATION'}</span>
                      <span className="text-brass">
                        STAGE {currentStageInfo.id} OF 3
                      </span>
                    </div>

                    <div className="min-h-[340px] flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeStage}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: DURATION.base, ease: EASING.primary }}
                          className="w-full flex items-center justify-center"
                        >
                          {activeStage === 1 && <Stage1Diagram />}
                          {activeStage === 2 && <Stage2Diagram />}
                          {activeStage === 3 && <Stage3Diagram />}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Stage Caption Banner */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs text-mute font-mono">
                        {currentStageInfo.caption}
                      </span>
                      <span className="type-mono-label text-xs text-mute/60 uppercase">
                        Structural view
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MOBILE & REDUCED MOTION VIEW: Three Stacked Stages with Simple Reveals */}
        {(shouldReduceMotion || true) && (
          <div className={cn('space-y-8 mb-24', !shouldReduceMotion && 'xl:hidden')}>
            {STAGES.map((stage, idx) => (
              <Reveal key={stage.id} delay={idx * 0.1}>
                <div className="rounded-[6px] border border-white/10 bg-ink-2/70 p-5 sm:p-7 space-y-6">
                  <div>
                    <div className="type-mono-label text-xs text-brass mb-1.5">
                      {`${stage.label} // ${stage.phase}`}
                    </div>
                    <h3 className="type-h3 text-paper text-xl font-medium tracking-tight mb-2">
                      {stage.title}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-paper/90 bg-white/5 border border-white/10 rounded-[3px] p-2.5 mb-3 leading-relaxed">
                      &ldquo;{stage.caption}&rdquo;
                    </p>
                    <p className="type-body text-mute text-xs sm:text-sm leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  {/* Diagram Container */}
                  <div className="rounded-[4px] border border-white/5 bg-ink p-3 sm:p-4 overflow-x-auto">
                    {stage.id === 1 && <Stage1Diagram />}
                    {stage.id === 2 && <Stage2Diagram />}
                    {stage.id === 3 && <Stage3Diagram />}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* DIRECTION BLOCK: "Where Bridle is heading" */}
        <div className="pt-8 border-t border-white/10">
          <div className="max-w-[62ch] mb-12">
            <Reveal>
              <div className="type-mono-label text-xs text-brass uppercase tracking-wider mb-2">
                Where Bridle is heading
              </div>
              <h3 className="type-h3 text-paper text-xl md:text-2xl font-medium mb-3">
                Roadmap and directional milestones.
              </h3>
              <p className="type-body text-mute text-sm leading-relaxed">
                Direction, not a description of the current product. Our roadmap
                reflects where agentic infrastructure must evolve as autonomy
                expands into critical business workflows.
              </p>
            </Reveal>
          </div>

          {/* Desktop Rein Line Connector with 3 Nodes */}
          <div className="hidden lg:block relative mb-10">
            <div className="w-full flex items-center justify-center relative">
              <div className="w-full max-w-[85%] flex items-center justify-between">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full border border-brass bg-ink flex items-center justify-center shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-brass" />
                  </div>
                  <span className="type-mono-label text-xs text-brass uppercase mt-2">
                    Today
                  </span>
                </div>

                <div className="flex-1 px-4 flex items-center justify-center">
                  <ReinLine
                    orientation="horizontal"
                    length={240}
                    nodePosition={0.5}
                    color="var(--color-brass)"
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full border border-brass bg-ink flex items-center justify-center shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-brass" />
                  </div>
                  <span className="type-mono-label text-xs text-brass uppercase mt-2">
                    Next
                  </span>
                </div>

                <div className="flex-1 px-4 flex items-center justify-center">
                  <ReinLine
                    orientation="horizontal"
                    length={240}
                    nodePosition={0.5}
                    color="var(--color-brass)"
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full border border-brass bg-ink flex items-center justify-center shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-brass" />
                  </div>
                  <span className="type-mono-label text-xs text-brass uppercase mt-2">
                    Later
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Three Columns on Desktop, Stacked on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DIRECTION_ITEMS.map((item, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="h-full rounded-[4px] border border-white/10 bg-ink-2/60 p-6 flex flex-col justify-between hover:border-white/20 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="type-mono-label text-xs text-brass font-medium uppercase">
                        {item.phase}
                      </span>
                      <span className="type-mono-label text-xs text-mute/70 px-2 py-0.5 rounded-[2px] bg-white/5 border border-white/5">
                        {item.status}
                      </span>
                    </div>

                    <h4 className="text-base font-medium text-paper leading-snug mb-3">
                      &ldquo;{item.headline}&rdquo;
                    </h4>

                    <p className="type-body text-mute text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-mute/50">
                    <span>PHASE 0{index + 1}</span>
                    <span>ROADMAP</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Large Closing Philosophy Statement */}
        <div className="pt-20 md:pt-28 mt-16 md:mt-24 border-t border-white/10 text-center">
          <Reveal>
            <div className="type-mono-label text-xs text-brass uppercase tracking-widest mb-4">
              Core Philosophy
            </div>
            <p className="type-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-paper max-w-[28ch] mx-auto leading-tight">
              Give AI autonomy. <br className="hidden sm:inline" />
              <span className="text-paper/70">Keep humans in control.</span>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

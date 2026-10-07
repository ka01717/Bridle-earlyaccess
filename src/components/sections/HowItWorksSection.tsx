'use client';

import * as React from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'motion/react';
import { Container, SectionLabel } from '@/components/layout';
import { Reveal } from '@/components/ui';
import { ReinLine } from '@/components/motif';
import { cn } from '@/lib/utils';
import { SPRING } from '@/lib/motion';

interface StepDef {
  id: number;
  num: string;
  title: string;
  description: string;
  example: string;
  tag: string;
}

const STEPS: StepDef[] = [
  {
    id: 1,
    num: '01',
    title: 'Describe',
    description: 'Say what work you need done, in your own words.',
    example:
      'e.g. "Read incoming customer tickets, verify order records, and issue replacement items for confirmed defects under £100."',
    tag: 'INTENT',
  },
  {
    id: 2,
    num: '02',
    title: 'Connect',
    description: 'Connect your apps. Bridle works out what access the agent actually needs.',
    example:
      'e.g. Connect Shopify. Bridle determines the agent needs to read orders and issue small refunds.',
    tag: 'INTEGRATIONS',
  },
  {
    id: 3,
    num: '03',
    title: 'Build',
    description: 'Bridle builds the agent, the tools it needs, and the rules around them.',
    example:
      'e.g. Generates scoped tool schemas, assigns least-privilege tokens, and sets human approval gates.',
    tag: 'PROVISIONING',
  },
  {
    id: 4,
    num: '04',
    title: 'Test',
    description: 'The agent is tried against failures, bad inputs and dangerous requests before it goes live.',
    example:
      'e.g. Simulates malformed customer requests, edge-case refunds, and unauthorised API calls in a secure sandbox.',
    tag: 'VERIFICATION',
  },
  {
    id: 5,
    num: '05',
    title: 'Prove',
    description: 'Important outcomes are checked against the real systems, not just the agent\'s word.',
    example:
      'e.g. Validates the ERP ledger entry directly via database response, rather than trusting the model\'s self-report.',
    tag: 'GROUNDING',
  },
  {
    id: 6,
    num: '06',
    title: 'Deploy',
    description: 'Go live, stay in control, pause or stop it any time.',
    example:
      'e.g. Monitor every action in real time with an immutable audit log, scoped spend limits, and an instant kill switch.',
    tag: 'MONITORING',
  },
];

export function HowItWorksSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: '80px 0px' });
  const [activeStepIndex, setActiveStepIndex] = React.useState<number>(0);
  const [hasInteracted, setHasInteracted] = React.useState<boolean>(false);

  // Auto-advance optionally every 4.5 seconds until the user interacts or when out of view
  React.useEffect(() => {
    if (shouldReduceMotion || hasInteracted || !isInView) return;

    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, hasInteracted, isInView]);

  const handleSelectStep = (index: number) => {
    setHasInteracted(true);
    setActiveStepIndex(index);
  };

  const activeStep = STEPS[activeStepIndex];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      tabIndex={-1}
      className="scroll-mt-24 relative overflow-hidden bg-paper text-ink py-24 md:py-32 lg:py-36 border-t border-ink/10 focus:outline-none"
      aria-label="How it works"
    >
      {/* Anchor alias so existing #architecture links gracefully scroll here */}
      <div id="architecture" className="scroll-mt-24 pointer-events-none" aria-hidden="true" />

      <Container>
        {/* Section Header */}
        <div className="max-w-[62ch] mb-14 md:mb-18">
          <Reveal>
            <SectionLabel className="mb-6">How it works</SectionLabel>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="type-h2 text-ink tracking-tight mb-4">
              Describe → Connect → Build → Test → Prove → Deploy.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="type-body-lg text-graphite leading-relaxed max-w-[56ch]">
              What happens when you tell Bridle to build an AI worker: six
              disciplined steps from plain-English intent to governed production.
            </p>
          </Reveal>
        </div>

        {/* Steps Track: Desktop Horizontal, Mobile Vertical */}
        <Reveal delay={0.25}>
          {/* Desktop Rein Line indicator across all 6 columns */}
          <div className="hidden lg:block relative mb-4 px-3" aria-hidden="true">
            <div className="w-full h-px bg-ink/10 relative">
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brass border-2 border-paper"
                animate={{
                  left: `calc(${(activeStepIndex / (STEPS.length - 1)) * 100}% - 6px)`,
                }}
                transition={shouldReduceMotion ? { duration: 0 } : SPRING.snappy}
              />
            </div>
          </div>

          {/* 6 Step Cards Selector */}
          <div
            role="tablist"
            aria-label="How it works steps"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 sm:gap-4"
          >
            {STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx;

              return (
                <button
                  key={step.num}
                  type="button"
                  role="tab"
                  id={`step-tab-${step.num}`}
                  aria-selected={isActive}
                  aria-controls={`step-panel-${step.num}`}
                  tabIndex={0}
                  onClick={() => handleSelectStep(idx)}
                  onMouseEnter={() => handleSelectStep(idx)}
                  onFocus={() => handleSelectStep(idx)}
                  className={cn(
                    'group text-left p-4 sm:p-5 rounded-[4px] border min-h-[44px] cursor-pointer transition-all duration-200 select-none relative',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brass)]',
                    isActive
                      ? 'bg-paper-2 border-brass/70 shadow-sm'
                      : 'bg-paper border-ink/10 hover:border-ink/25 hover:bg-paper-2/40'
                  )}
                >
                  {/* Active Indicator Top Notch */}
                  {isActive && (
                    <motion.div
                      layoutId="activeStepNotch"
                      className="absolute top-0 left-0 right-0 h-0.5 bg-brass rounded-t"
                      transition={shouldReduceMotion ? { duration: 0 } : SPRING.snappy}
                    />
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={cn(
                        'type-mono-label font-bold text-xs',
                        isActive ? 'text-brass' : 'text-mute'
                      )}
                    >
                      {step.num}
                    </span>
                    <span className="type-mono-label text-mute text-xs tracking-widest hidden sm:inline">
                      {step.tag}
                    </span>
                  </div>

                  <h3
                    className={cn(
                      'font-sans text-base sm:text-lg font-medium tracking-tight mb-1.5 transition-colors',
                      isActive ? 'text-ink' : 'text-graphite group-hover:text-ink'
                    )}
                  >
                    {step.title}
                  </h3>

                  <p className="type-body text-graphite text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {step.description}
                  </p>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Dynamic Detail Panel: Shows Description and Example for Active Step */}
        <div className="mt-6 md:mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.num}
              id={`step-panel-${activeStep.num}`}
              role="tabpanel"
              aria-labelledby={`step-tab-${activeStep.num}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="rounded-[4px] bg-paper-2 border border-ink/15 p-6 sm:p-7 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-ink/10">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-brass/15 text-brass">
                    STEP {activeStep.num} {'//'} {activeStep.title.toUpperCase()}
                  </span>
                  <span className="type-mono-label text-mute text-xs">
                    {activeStep.tag}
                  </span>
                </div>
                <div className="type-mono-label text-mute text-xs">
                  Press Tab or click any step to explore
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
                <div className="lg:col-span-5">
                  <div className="type-mono-label text-mute text-xs tracking-wider mb-1">
                    WHAT HAPPENS:
                  </div>
                  <p className="type-body text-ink text-base sm:text-lg font-medium leading-relaxed">
                    {activeStep.description}
                  </p>
                </div>

                <div className="lg:col-span-7">
                  <div className="type-mono-label text-brass text-xs tracking-wider mb-1">
                    IN PRACTICE (EXAMPLE):
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-graphite bg-paper border border-ink/10 p-3.5 rounded-[3px] leading-relaxed">
                    {activeStep.example}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Faint Connecting Rein Line drawing into next section */}
        <div className="mt-14 md:mt-20 flex items-center justify-center" aria-hidden="true">
          <ReinLine length={120} nodePosition={0.5} animate={true} />
        </div>
      </Container>
    </section>
  );
}

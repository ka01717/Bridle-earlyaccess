'use client';

import * as React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Container, SectionLabel } from '@/components/layout';
import { Badge, Reveal } from '@/components/ui';
import { ReinLine } from '@/components/motif';
import { cn } from '@/lib/utils';

const TEST_CATEGORIES = [
  'Permission failures',
  'Policy violations',
  'Prompt injection',
  'Tool failures',
  'Authentication failures',
  'Unexpected inputs',
  'Dangerous actions',
  'Approval requirements',
  'Data access boundaries',
  'Recovery scenarios',
];

type VerificationState = 'matches' | 'does_not_match';

export function TestAndProveSection() {
  const shouldReduceMotion = useReducedMotion();
  const [verificationOutcome, setVerificationOutcome] =
    React.useState<VerificationState>('matches');
  const [statusAnnouncement, setStatusAnnouncement] = React.useState<string>(
    'Outcome verification state: matches. Refund found in the payment system. Amount matches. Status: verified.'
  );

  const handleToggleOutcome = (nextOutcome: VerificationState) => {
    setVerificationOutcome(nextOutcome);
    if (nextOutcome === 'matches') {
      setStatusAnnouncement(
        'Outcome verification state: matches. Refund found in the payment system. Amount matches. Status: verified.'
      );
    } else {
      setStatusAnnouncement(
        'Outcome verification state: does not match. No matching refund found. Flagged for review.'
      );
    }
  };

  return (
    <section
      id="prove"
      tabIndex={-1}
      className="scroll-mt-24 focus:outline-none"
      aria-label="Test and prove"
    >
      {/* Anchor alias so any legacy links to #platform gracefully scroll here */}
      <div id="platform" className="scroll-mt-24 pointer-events-none" aria-hidden="true" />

      {/* ================================================================= */}
      {/* PART A — TEST BEFORE DEPLOY (Light Background)                    */}
      {/* ================================================================= */}
      <div className="relative bg-paper text-ink py-24 md:py-32 lg:py-36 border-t border-ink/10">
        <Container>
          {/* Part A Header */}
          <div className="max-w-[58ch] mb-14 md:mb-18">
            <Reveal>
              <SectionLabel className="mb-6">Test</SectionLabel>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="type-h2 text-ink tracking-tight mb-4">
                Built for production, not just demos.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="type-body-lg text-graphite leading-relaxed max-w-[58ch]">
                Before an agent goes live, Bridle is designed to test it the way
                real life will.
              </p>
            </Reveal>
          </div>

          {/* Grid of Ten Test Categories */}
          <Reveal delay={0.25}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5 mb-8">
              {TEST_CATEGORIES.map((category, idx) => {
                const content = (
                  <div
                    key={category}
                    className="rounded-[4px] bg-paper-2/60 border border-ink/10 p-3.5 sm:p-4 flex items-center justify-between gap-3 transition-colors hover:border-ink/20"
                  >
                    <span className="font-mono text-xs text-ink tracking-wide font-medium">
                      {category}
                    </span>
                    <span
                      className="w-5 h-5 rounded-full border border-ink/15 flex items-center justify-center text-xs text-brass shrink-0 bg-paper"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                  </div>
                );

                if (shouldReduceMotion) {
                  return content;
                }

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{
                      duration: 0.25,
                      delay: idx * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {content}
                  </motion.div>
                );
              })}
            </div>
          </Reveal>

          {/* Caption */}
          <Reveal delay={0.3}>
            <div className="type-mono-label text-mute text-xs tracking-wider">
              Designed to run before every deployment. Bridle is building this.
            </div>
          </Reveal>
        </Container>
      </div>

      {/* ================================================================= */}
      {/* PART B — OUTCOME VERIFICATION (Dark Ink Background)                */}
      {/* ================================================================= */}
      <div className="relative bg-ink text-paper py-24 md:py-32 lg:py-40 border-t border-white/10">
        <Container>
          {/* Accessible Live Region */}
          <div className="sr-only" aria-live="polite" role="status">
            {statusAnnouncement}
          </div>

          {/* Part B Header */}
          <div className="max-w-[58ch] mb-14 md:mb-18">
            <Reveal>
              <SectionLabel dark className="mb-6">
                Prove
              </SectionLabel>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="type-h2 text-paper tracking-tight mb-4">
                What an agent says it did isn&apos;t proof.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="type-body-lg text-mute leading-relaxed max-w-[58ch]">
                Agent intention isn&apos;t the same as real-world outcome. Bridle
                is designed to check important actions against the real system.
              </p>
            </Reveal>
          </div>

          {/* Signature Moment Visual Container */}
          <Reveal delay={0.25}>
            <div className="rounded-[4px] bg-ink-2/80 border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl mb-12">
              {/* Top Controls Bar: Toggle Outcome */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="type-mono-label text-mute text-xs tracking-wider">
                    SIMULATION // OUTCOME:
                  </span>
                  <div
                    role="group"
                    aria-label="Outcome state simulation toggle"
                    className="inline-flex rounded-full p-1 bg-ink border border-white/10 gap-1"
                  >
                    <button
                      type="button"
                      onClick={() => handleToggleOutcome('matches')}
                      aria-pressed={verificationOutcome === 'matches'}
                      className={cn(
                        'min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-mono font-medium active:scale-[0.97] touch-manipulation transition-[background-color,border-color,color,transform,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex items-center gap-1.5',
                        verificationOutcome === 'matches'
                          ? 'bg-paper text-ink shadow-sm'
                          : 'text-mute hover:text-paper hover:bg-white/5'
                      )}
                    >
                      <span
                        className={cn(
                          'w-1.5 h-1.5 rounded-full',
                          verificationOutcome === 'matches'
                            ? 'bg-allow'
                            : 'bg-white/20'
                        )}
                      />
                      <span>Matches</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleOutcome('does_not_match')}
                      aria-pressed={verificationOutcome === 'does_not_match'}
                      className={cn(
                        'min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-mono font-medium active:scale-[0.97] touch-manipulation transition-[background-color,border-color,color,transform,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer flex items-center gap-1.5',
                        verificationOutcome === 'does_not_match'
                          ? 'bg-paper text-ink shadow-sm'
                          : 'text-mute hover:text-paper hover:bg-white/5'
                      )}
                    >
                      <span
                        className={cn(
                          'w-1.5 h-1.5 rounded-full',
                          verificationOutcome === 'does_not_match'
                            ? 'bg-block'
                            : 'bg-white/20'
                        )}
                      />
                      <span>Doesn&apos;t match</span>
                    </button>
                  </div>
                </div>

                <Badge dark className="text-xs shrink-0 self-start sm:self-auto">
                  Illustrative
                </Badge>
              </div>

              {/* Two Stacked Lanes Joined by the Rein Line */}
              <div className="max-w-[680px] mx-auto py-2">
                {/* Lane 1: The agent says */}
                <div className="rounded-[3px] bg-ink border border-white/10 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-xs font-mono">
                    <span className="text-mute uppercase tracking-wider">
                      LANE 01 // THE AGENT SAYS
                    </span>
                    <span className="text-mute/60">Self-reported claim</span>
                  </div>
                  <div className="text-base sm:text-lg font-sans font-medium text-paper">
                    &quot;I refunded the customer.&quot;
                  </div>
                  <div className="mt-2 text-xs font-mono text-mute/80">
                    Agent dispatch: support-agent · Action: issue_refund (£120)
                  </div>
                </div>

                {/* Connecting Rein Line */}
                <div className="flex justify-center py-3">
                  <ReinLine
                    orientation="vertical"
                    length={40}
                    nodePosition={0.5}
                    animate={true}
                    color="var(--color-brass)"
                  />
                </div>

                {/* Lane 2: Bridle checks */}
                <div className="rounded-[3px] bg-ink border border-white/15 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/5 text-xs font-mono">
                    <span className="text-brass uppercase tracking-wider font-semibold">
                      LANE 02 // BRIDLE CHECKS
                    </span>
                    <span className="text-mute/60">Target: Payment system API</span>
                  </div>

                  {/* Dynamic Result State */}
                  {shouldReduceMotion ? (
                    <div>
                      {verificationOutcome === 'matches' ? (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <p className="text-sm sm:text-base font-sans text-paper">
                            Refund found in the payment system. Amount matches.
                          </p>
                          <span className="px-2.5 py-1 rounded text-xs font-mono font-medium uppercase bg-allow/15 text-allow border border-allow/30 shrink-0 self-start sm:self-auto">
                            Status: verified
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <p className="text-sm sm:text-base font-sans text-paper">
                            No matching refund found. Flagged for review.
                          </p>
                          <span className="px-2.5 py-1 rounded text-xs font-mono font-medium uppercase bg-block/15 text-block border border-block/30 shrink-0 self-start sm:self-auto">
                            Flagged for review
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <AnimatePresence mode="wait">
                      {verificationOutcome === 'matches' ? (
                        <motion.div
                          key="matches"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div>
                            <p className="text-sm sm:text-base font-sans text-paper">
                              Refund found in the payment system. Amount matches.
                            </p>
                            <div className="mt-1 text-xs font-mono text-mute/80">
                              Transaction ref: #tx_8812 · £120.00 confirmed in ledger
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded text-xs font-mono font-medium uppercase bg-allow/15 text-allow border border-allow/30 shrink-0 self-start sm:self-auto">
                            Status: verified
                          </span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="does_not_match"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div>
                            <p className="text-sm sm:text-base font-sans text-paper">
                              No matching refund found. Flagged for review.
                            </p>
                            <div className="mt-1 text-xs font-mono text-mute/80">
                              Ledger inquiry returned 404 · Workflow paused for human inspection
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded text-xs font-mono font-medium uppercase bg-block/15 text-block border border-block/30 shrink-0 self-start sm:self-auto">
                            Flagged for review
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </div>

              {/* Bottom Note */}
              <div className="mt-8 pt-4 border-t border-white/5 type-mono-label text-mute text-xs tracking-wider text-center">
                Independent reconciliation across external APIs, databases, and third-party ledgers.
              </div>
            </div>
          </Reveal>

          {/* ================================================================= */}
          {/* PART C — DEPLOY (Slim Closing Band)                               */}
          {/* ================================================================= */}
          <Reveal delay={0.3}>
            <div className="rounded-[4px] bg-ink-2/40 border border-white/10 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="type-body text-paper/90 text-sm sm:text-base">
                Then deploy. Monitor activity, review the audit trail, pause or
                stop the agent any time.
              </p>
              <a
                href="#control"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-brass hover:text-paper transition-colors shrink-0 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-[var(--color-brass)] focus-visible:outline-offset-2 py-1"
              >
                <span>See control</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}

'use client';

import * as React from 'react';
import { Container, SectionLabel } from '@/components/layout';
import { Badge, Reveal } from '@/components/ui';

const YOU_STEPS = [
  {
    num: '01',
    text: 'Describe the task in plain language.',
  },
  {
    num: '02',
    text: 'Connect the apps you already use.',
  },
  {
    num: '03',
    text: 'Approve the important things.',
  },
];

const BRIDLE_STEPS = [
  'Understands the task.',
  'Builds the agent and its tools.',
  'Connects your systems.',
  'Sets permissions and policies.',
  'Tests it before it goes live.',
  'Verifies important outcomes.',
  'Deploys and monitors it.',
];

export function ConceptSection() {
  return (
    <section
      id="concept"
      className="relative bg-ink text-paper py-24 md:py-32 lg:py-36 border-t border-white/10 overflow-hidden"
      aria-label="What Bridle does"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-[58ch] mb-14 md:mb-16">
          <Reveal>
            <SectionLabel dark className="mb-6">
              What Bridle does
            </SectionLabel>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="type-h2 text-paper tracking-tight">
              You describe the work. Bridle builds the agent and everything it
              needs.
            </h2>
          </Reveal>
        </div>

        {/* Two-Column Comparison Visual: You vs Bridle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Column 1: You */}
          <div className="lg:col-span-5 flex flex-col">
            <Reveal delay={0.15} className="h-full">
              <div className="h-full rounded-[4px] bg-ink-2/70 border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                    <span className="type-mono-label text-paper font-semibold tracking-wider text-xs">
                      YOU
                    </span>
                    <Badge dark className="text-xs">
                      3 SIMPLE STEPS
                    </Badge>
                  </div>

                  <p className="type-body text-mute text-sm mb-8 leading-relaxed">
                    Your team focuses entirely on intent, domain knowledge, and
                    business judgment.
                  </p>

                  <div className="space-y-5">
                    {YOU_STEPS.map((step) => (
                      <div
                        key={step.num}
                        className="flex items-start gap-4 p-3.5 rounded-[3px] bg-white/[0.03] border border-white/5"
                      >
                        <span className="font-mono text-xs text-brass font-medium pt-0.5 shrink-0">
                          {step.num}
                        </span>
                        <p className="type-body text-paper text-sm sm:text-base font-medium leading-snug">
                          {step.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 type-mono-label text-mute text-xs">
                  ZERO INFRASTRUCTURE OVERHEAD
                </div>
              </div>
            </Reveal>
          </div>

          {/* Column 2: Bridle */}
          <div className="lg:col-span-7 flex flex-col">
            <Reveal delay={0.25} className="h-full">
              <div className="h-full rounded-[4px] bg-ink-2 border border-brass/35 p-6 sm:p-8 flex flex-col justify-between relative shadow-xl">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-brass" />
                      <span className="type-mono-label text-paper font-semibold tracking-wider text-xs">
                        BRIDLE
                      </span>
                    </div>
                    <span className="type-mono-label text-brass text-xs">
                      AUTONOMOUS INFRASTRUCTURE
                    </span>
                  </div>

                  <p className="type-body text-mute text-sm mb-6 leading-relaxed">
                    Bridle absorbs the technical architecture: provisioning the
                    tools, setting policy fences, and verifying outcomes.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BRIDLE_STEPS.map((stepText, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-[3px] bg-white/[0.04] border border-white/10 group hover:border-brass/40 transition-colors"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-brass shrink-0 mt-0.5"
                          aria-hidden="true"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="type-body text-paper/90 text-sm leading-snug">
                          {stepText}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between type-mono-label text-mute text-xs">
                  <span>SAFETY & CONTROL ENGINE</span>
                  <span className="text-brass font-medium">MANAGED AUTOMATICALLY</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Closing Highlight Sentence & Honesty Notice */}
        <div className="mt-14 md:mt-20 pt-8 border-t border-white/10">
          <Reveal delay={0.1}>
            <p className="type-h3 text-paper font-normal text-xl sm:text-2xl md:text-3xl max-w-[48ch] leading-snug">
              The complexity is Bridle&apos;s job, not yours.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="type-mono-label text-mute text-xs tracking-wider mt-5">
              Bridle is building this. Everything shown is illustrative of the intended experience.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

'use client';

import * as React from 'react';
import { Container, SectionLabel } from '@/components/layout';
import { Reveal } from '@/components/ui';
import { ReinLine } from '@/components/motif';

interface PrerequisiteItem {
  id: string;
  title: string;
  description: string;
  glyph: React.ReactNode;
}

const PREREQUISITES: PrerequisiteItem[] = [
  {
    id: 'access',
    title: 'ACCESS',
    description: 'Giving the agent an entry point to the accounts, data, and tools it needs to act.',
    glyph: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="8" cy="15" r="4" />
        <path d="m10.8 12.2 7.2-7.2h3v3l-2 2v2h-2v2l-1.8 1.8" />
      </svg>
    ),
  },
  {
    id: 'permissions',
    title: 'PERMISSIONS',
    description: 'Deciding strictly what the agent may touch, modify, or spend.',
    glyph: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <line x1="7" y1="9" x2="17" y2="9" />
        <circle cx="10" cy="9" r="1.5" fill="currentColor" />
        <line x1="7" y1="15" x2="17" y2="15" />
        <circle cx="14" cy="15" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'connections',
    title: 'CONNECTIONS',
    description: 'Building the API integrations, webhooks, and schemas to run the workflow.',
    glyph: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="12" cy="18" r="2.5" />
        <line x1="8.2" y1="7.2" x2="10.8" y2="15.8" />
        <line x1="15.8" y1="7.2" x2="13.2" y2="15.8" />
      </svg>
    ),
  },
  {
    id: 'security',
    title: 'SECURITY',
    description: 'Securing credentials, isolating runtimes, and shielding internal systems.',
    glyph: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="11" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'testing',
    title: 'TESTING',
    description: 'Testing edge cases, unexpected inputs, and failure states before anything touches real data.',
    glyph: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="m7 9 3 3-3 3" />
        <line x1="12" y1="15" x2="17" y2="15" />
      </svg>
    ),
  },
  {
    id: 'oversight',
    title: 'OVERSIGHT',
    description: 'Keeping humans in the loop for high-risk decisions and maintaining an audit log.',
    glyph: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
];

export function ProblemSection() {
  return (
    <section
      id="problem"
      tabIndex={-1}
      className="scroll-mt-24 relative bg-paper text-ink pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28 border-t border-ink/10 focus:outline-none"
      aria-label="The problem"
    >
      <Container>
        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky on Desktop, Static on Mobile */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <Reveal>
              <SectionLabel className="mb-6">The problem</SectionLabel>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="type-h2 text-ink tracking-tight mb-6 max-w-[18ch]">
                AI can do the work.{' '}
                <span className="text-graphite font-normal">
                  Putting it in charge is the hard part.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="type-body-lg text-graphite max-w-[46ch] leading-relaxed">
                Agents can now take real actions. But before one can safely run a
                real workflow, someone has to give it access, decide what it may
                do, build the connections, secure the secrets, test the edge
                cases, and keep watching it. Most businesses don&apos;t have an
                AI infrastructure team.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Touch Points List */}
          <div className="lg:col-span-7">
            {/* Small Mono Caption */}
            <Reveal delay={0.1}>
              <div className="type-mono-label text-mute text-xs tracking-wider mb-4 pb-2 border-b border-ink/10">
                What sits between an idea and a working AI worker
              </div>
            </Reveal>

            {/* Six Touch Points Rows */}
            <div className="divide-y divide-ink/10">
              {PREREQUISITES.map((item, idx) => (
                <Reveal key={item.id} delay={0.15 + idx * 0.06}>
                  <div className="group flex items-start gap-4 sm:gap-5 py-5 sm:py-6 transition-transform duration-200 hover:translate-x-1 cursor-default">
                    {/* Custom SVG Glyph in hairline boundary */}
                    <div className="w-10 h-10 rounded-[3px] border border-ink/10 flex items-center justify-center shrink-0 text-graphite group-hover:text-brass group-hover:border-brass/50 bg-paper-2/60 transition-colors duration-200">
                      {item.glyph}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="type-mono-label text-ink font-semibold tracking-wider text-xs mb-1 group-hover:text-ink-2 transition-colors">
                        {item.title}
                      </div>
                      <p className="type-body text-graphite text-sm sm:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Closing Statement & Connecting Rein Line */}
        <div className="mt-20 md:mt-28 lg:mt-32 pt-16 border-t border-ink/10">
          <Reveal delay={0.1}>
            <div className="max-w-[56ch]">
              <p className="type-h3 text-ink text-xl sm:text-2xl md:text-3xl leading-snug font-normal">
                You shouldn&apos;t need an infrastructure team to put AI to work.
              </p>
            </div>
          </Reveal>

          {/* Vertical Rein Line drawing down toward architecture boundary */}
          <div className="mt-12 md:mt-16 flex flex-col items-start pl-2">
            <ReinLine
              orientation="vertical"
              length={130}
              nodePosition={0.92}
              animate={true}
            />
            <span className="type-mono-label text-mute text-xs tracking-widest mt-2">
              BOUNDARY // CONTROL_LAYER_INGRESS
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

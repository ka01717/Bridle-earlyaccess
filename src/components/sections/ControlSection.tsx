'use client';

import * as React from 'react';
import { Container, SectionLabel } from '@/components/layout';
import { Reveal, Card, ButtonDark } from '@/components/ui';
import { ArchitectureSimulation } from '@/components/architecture/ArchitectureSimulation';

const CONTROL_CARDS = [
  {
    title: 'Human approval',
    description:
      'Actions above chosen thresholds pause automatically until a person signs off.',
  },
  {
    title: 'Policy controls',
    description:
      'Define clear limits on amounts, data access, and sensitive actions before any agent runs.',
  },
  {
    title: 'Audit trail',
    description:
      'Every decision, check, and executed action is recorded with full timestamps and context.',
  },
  {
    title: 'Pause and emergency stop',
    description:
      'Halt an active agent instantly or trigger an emergency shutdown that revokes all access.',
  },
];

export function ControlSection() {
  return (
    <section
      id="control"
      tabIndex={-1}
      className="scroll-mt-24 relative bg-ink text-paper py-24 md:py-32 lg:py-40 border-t border-white/10 focus:outline-none"
      aria-label="Control"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-[58ch] mb-14 md:mb-18">
          <Reveal>
            <SectionLabel dark className="mb-6">
              Control
            </SectionLabel>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="type-h2 text-paper tracking-tight mb-4">
              Give AI autonomy. Keep humans in control.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="type-body-lg text-mute leading-relaxed max-w-[58ch]">
              Every agent Bridle builds runs inside permissions and policies you
              approve. Important actions can pause for a human, and you can pause
              or stop any agent instantly.
            </p>
          </Reveal>
        </div>

        {/* Simulation Container */}
        <Reveal delay={0.25}>
          <div className="rounded-[4px] bg-ink-2/80 border border-white/10 p-5 sm:p-7 md:p-8 shadow-2xl mb-14">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-white/10">
              <h3 className="type-h3 text-paper text-lg sm:text-xl font-medium">
                See how a single action is handled
              </h3>
              <span className="type-mono-label text-mute text-xs tracking-wider">
                Illustrative simulation. Thresholds are examples.
              </span>
            </div>

            <ArchitectureSimulation />
          </div>
        </Reveal>

        {/* Row of Four Small Cards Below Simulation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {CONTROL_CARDS.map((card, idx) => (
            <Reveal key={card.title} delay={0.1 * idx}>
              <Card
                dark
                className="h-full flex flex-col justify-between p-5 sm:p-6 bg-ink-2/60 border border-white/10"
              >
                <div>
                  <div className="type-mono-label text-brass text-xs mb-2">
                    0{idx + 1}
                  </div>
                  <h4 className="font-sans font-medium text-base text-paper mb-2">
                    {card.title}
                  </h4>
                  <p className="type-body text-xs sm:text-sm text-mute leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Mid-page Lightweight Repeat CTA Band */}
        <Reveal delay={0.35}>
          <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-6 rounded-[4px] bg-white/[0.03] border border-white/10">
            <div>
              <div className="text-paper font-medium text-base sm:text-lg">
                Ready to put AI agents into real business workflows?
              </div>
              <p className="type-body text-mute text-xs sm:text-sm mt-1">
                Join early engineering and operations teams shaping Bridle.
              </p>
            </div>
            <ButtonDark
              href="#early-access"
              size="lg"
              className="flex-shrink-0"
            >
              Get Early Access
            </ButtonDark>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

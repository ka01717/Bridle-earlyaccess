'use client';

import * as React from 'react';
import { Container, SectionLabel } from '@/components/layout';
import { Button, Reveal } from '@/components/ui';
import { HeroVisual } from './HeroVisual';
import { SITE } from '@/content/site';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper text-ink pt-12 pb-24 md:pt-16 md:pb-32 lg:pt-20 lg:pb-36">
      {/* Very faint hairline grid fading out at the edges */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,#000_20%,transparent_90%)] opacity-70"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(13, 14, 17, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(13, 14, 17, 0.045) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Headline, Copy, CTAs (left-aligned on desktop, generous whitespace) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <Reveal>
              <SectionLabel className="mb-6">
                Early access · AI workers for real business work
              </SectionLabel>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="type-display text-ink max-w-[18ch] tracking-tight">
                Describe the work. Bridle builds the{' '}
                <span className="type-serif font-normal text-ink">rest.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="type-body-lg text-graphite max-w-[56ch] mt-7 mb-10 leading-relaxed">
                Tell Bridle what you need done. It builds the AI agent and the
                infrastructure to run it safely: connections, permissions,
                approvals, testing and verification. Designed so you never have to
                touch an API key.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <Button
                  href="#early-access"
                  size="lg"
                  className="w-full sm:w-auto sm:min-w-[190px] text-center justify-center"
                >
                  {SITE.cta.primary}
                </Button>
                <Button
                  href="#how-it-works"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto sm:min-w-[190px] text-center justify-center"
                >
                  {SITE.cta.secondary}
                </Button>
              </div>

              {/* Microcopy below CTAs */}
              <p className="type-mono-label text-mute text-xs tracking-wider mt-4">
                Bridle is in early development. Early access members help shape
                what we build.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Illustrative "Prompt to Agent" Sequence */}
          <div className="lg:col-span-5 w-full">
            <Reveal delay={0.25}>
              <HeroVisual />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

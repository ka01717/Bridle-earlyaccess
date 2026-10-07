import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section, SectionLabel } from '@/components/layout';
import { Button, ButtonDark, Badge, Card, Reveal } from '@/components/ui';
import { ReinLine } from '@/components/motif';

export const metadata: Metadata = {
  title: 'Design System — Bridle',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* --- HEADER --- */}
      <header className="py-8 border-b border-ink/10">
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <div className="type-mono-label text-brass mb-1">INTERNAL REVIEW</div>
              <h1 className="type-h2">Bridle Design System</h1>
              <p className="type-body text-graphite mt-2 max-w-prose">
                Paper and ink palette, thin brass rein line, hairline elevation, and understated enterprise authority.
              </p>
            </div>
            <Link href="/" className="type-mono-label text-graphite hover:text-ink underline">
              ← Back to Home
            </Link>
          </div>
        </Container>
      </header>

      {/* --- SECTION 1: COLOUR TOKENS --- */}
      <Section variant="light">
        <Container>
          <SectionLabel>01 / COLOUR TOKENS</SectionLabel>
          <h2 className="type-h2 mt-4 mb-8">Colour and Surface Tokens</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Paper */}
            <div className="space-y-2">
              <div className="h-24 rounded bg-paper border border-ink/10 shadow-sm" />
              <div className="font-medium text-sm">paper</div>
              <div className="type-mono-label text-mute">#F6F4EF</div>
            </div>

            {/* Paper 2 */}
            <div className="space-y-2">
              <div className="h-24 rounded bg-paper-2 border border-ink/10" />
              <div className="font-medium text-sm">paper-2</div>
              <div className="type-mono-label text-mute">#EFECE4</div>
            </div>

            {/* Ink */}
            <div className="space-y-2">
              <div className="h-24 rounded bg-ink border border-white/10" />
              <div className="font-medium text-sm">ink</div>
              <div className="type-mono-label text-mute">#0D0E11</div>
            </div>

            {/* Ink 2 */}
            <div className="space-y-2">
              <div className="h-24 rounded bg-ink-2 border border-white/10" />
              <div className="font-medium text-sm">ink-2</div>
              <div className="type-mono-label text-mute">#16181D</div>
            </div>

            {/* Brass */}
            <div className="space-y-2">
              <div className="h-24 rounded bg-brass" />
              <div className="font-medium text-sm">brass (&lt; 5%)</div>
            <div className="type-mono-label text-mute">#A8834A</div>
            </div>

            {/* Graphite */}
            <div className="space-y-2">
              <div className="h-24 rounded bg-graphite" />
              <div className="font-medium text-sm">graphite</div>
              <div className="type-mono-label text-mute">#4A4E57</div>
            </div>
          </div>

          {/* Status Colours note */}
          <div className="mt-10 py-4 px-6 bg-paper-2 rounded border border-ink/10">
            <div className="type-mono-label text-graphite mb-2">STATUS COLOURS - USED ONLY INSIDE PRODUCT VISUALS</div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-allow" />
                <span className="type-mono-label">Allow (#2F7D5B)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-approve" />
                <span className="type-mono-label">Approve (#B7791F)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-block" />
                <span className="type-mono-label">Block (#B4443A)</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- SECTION 2: TYPE SCALE --- */}
      <Section variant="light">
        <Container>
          <SectionLabel>02 / TYPOGRAPHY</SectionLabel>
          <h2 className="type-h2 mt-4 mb-12">Precision Type Scale</h2>

          <div className="space-y-10">
            {/* Display */}
            <div className="border-b border-ink/10 pb-6">
              <div className="type-mono-label text-mute mb-2">DISPLAY (clamp 44px to 88px, lh: 1.02)</div>
              <div className="type-display">
                Control <span className="type-serif">Bridle</span> autonomy.
              </div>
            </div>

            {/* H2 */}
            <div className="border-b border-ink/10 pb-6">
              <div className="type-mono-label text-mute mb-2">H2 (clamp 32px to 56px, lh: 1.08)</div>
              <div className="type-h2">
                Where agentic actions meet business boundaries.
              </div>
            </div>

            {/* H3 */}
            <div className="border-b border-ink/10 pb-6">
              <div className="type-mono-label text-mute">H3 (clamp 20px to 28px)</div>
              <div className="type-h3 mt-1">
                Designed for decision-level verification
              </div>
            </div>

            {/* Body Lg */}
            <div className="border-b border-ink/10 pb-6">
              <div className="type-mono-label text-mute">BODY-LG (18-20px)</div>
              <div className="type-body-lg max-w-prose mt-1">
                Bridle is designed to act as the runtime control layer. Every action passes through resolved permissions, policy evaluation, and deterministic recording.
              </div>
            </div>

            {/* Body */}
            <div className="border-b border-ink/10 pb-6">
              <div className="type-mono-label text-mute">BODY (16px)</div>
              <div className="type-body max-w-prose text-graphite mt-1">
                AI agents are moving from summarizing documents to moving capital, updating contracts, and configuring services. Bridle makes their boundaries explicit.
              </div>
            </div>

            {/* Mono Label */}
            <div>
              <div className="type-mono-label text-mute">MONO LABEL (12px, 0.08em tracking)</div>
              <div className="type-mono-label mt-1">
                SYSTEM_RISK_EVALUATION // REQUIRES_HASH
              </div>
            </div>

            {/* Instrument Serif Example */}
            <div>
              <div className="type-mono-label text-mute">INSTRUMENT SERIF (EXPRESSIVE, SPARINGLY USED)</div>
              <div className="text-3xl font-normal mt-1">
                Artificial Intelligence requires <span className="type-serif">direction</span>, not restraint.
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- SECTION 3: UI PRIMITIVES --- */}
      <Section variant="light">
        <Container>
          <SectionLabel>03 / UI PRIMITIVES</SectionLabel>
          <h2 className="type-h2 mt-4 mb-12">Interactive Primitives (Light Surface)</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 baseline">
            {/* Buttons */}
            <Card className="space-y-6">
              <div className="type-mono-label text-graphite">BUTTONS</div>
              <div className="space-y-3">
                <div>
                  <Button variant="primary" size="md">Primary Medium</Button>
                </div>
                <div>
                  <Button variant="primary" size="lg">Primary Large</Button>
                </div>
                <div>
                  <Button variant="secondary" size="md">Secondary Medium</Button>
                </div>
                <div>
                  <Button variant="secondary" size="lg">Secondary Large</Button>
                </div>
              </div>
            </Card>

            {/* Badges */}
            <Card className="space-y-6">
              <div className="type-mono-label text-graphite">BADGES</div>
              <div className="flex flex-wrap gap-3">
                <Badge>AGENT_POLICY</Badge>
                <Badge>RESOLVED</Badge>
                <Badge>DESIGNED TO SCALE</Badge>
                <Badge>ILLUSTRATIVE</Badge>
              </div>
            </Card>

            {/* Cards and Depth */}
            <Card className="space-y-4">
              <div className="type-mono-label text-graphite">CARD and DEPTH</div>
              <p className="type-body text-graphite">
                Hairline borders replace heavy drop shadows. Cards feel bound, understated, and calm.
              </p>
              <div className="type-mono-label text-mute">RING-1 RGBA_HAIRLINE</div>
            </Card>

            {/* Scroll Reveal Wrapper */}
            <Card className="space-y-4">
              <div className="type-mono-label text-graphite">SCROLL REVEAL (MOTION)</div>
              <Reveal delay={0.1}>
                <div className="p-3 bg-paper-2 rounded border border-ink/10">
                  <span className="type-mono-label text-graphite">Fade + 12px Y-translation, 600ms easeOut</span>
                </div>
              </Reveal>
              <div className="type-mono-label text-mute">&lt;Reveal /&gt; REDUCED-MOTION RESPECTFUL</div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* --- SECTION 4: REIN LINE MOTIF --- */}
      <Section variant="light">
        <Container>
          <SectionLabel>04 / MOTIF</SectionLabel>
          <h2 className="type-h2 mt-4 mb-6">The Rein Line</h2>
          <p className="type-body text-graphite max-w-prose mb-10">
            A single thin brass line with one small ring-shaped node. It marks paths, policies, and state transitions without distraction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Horizontal */}
            <Card className="space-y-6">
              <div className="type-mono-label text-graphite">HORIZONTAL (ANIMATED ON SCROLL)</div>
              <div className="py-4 flex items-center">
                <ReinLine length={320} nodePosition={0.35} animate={true} />
              </div>
              <div className="type-mono-label text-mute">LENGTH: 320px // NODE_POS: 35%</div>
            </Card>

            {/* Vertical */}
            <Card className="space-y-6">
              <div className="type-mono-label text-graphite">VERTICAL (ANIMATED ON SCROLL)</div>
              <div className="py-2 flex justify-center">
                <ReinLine orientation="vertical" length={110} nodePosition={0.6} animate={true} />
              </div>
              <div className="type-mono-label text-mute">LENGTH: 110px // NODE_POS: 60%</div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* --- SECTION 5: DARK SURFACE EXAMPLES --- */}
      <Section variant="dark">
        <Container>
          <SectionLabel dark>05 / DARK SURFACES</SectionLabel>
          <h2 className="type-h2 mt-4 mb-4 text-paper">Authoritative Dark Mode</h2>
          <p className="type-body text-mute max-w-prose mb-12">
            Reserved for architecture, compliance policies, and conclusive calls to action.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 baseline">
            {/* Dark Buttons */}
            <Card dark className="space-y-6">
              <div className="type-mono-label text-mute">DARK-SURFACE BUTTONS</div>
              <div className="space-y-3">
                <div>
                  <ButtonDark variant="primary">Primary (Paper Fill)</ButtonDark>
                </div>
                <div>
                  <ButtonDark variant="secondary">Secondary (Hairline)</ButtonDark>
                </div>
              </div>
            </Card>

            {/* Dark Badges */}
            <Card dark className="space-y-6">
              <div className="type-mono-label text-mute">DARK-SURFACE BADGES</div>
              <div className="flex flex-wrap gap-3">
                <Badge dark>ILLUSTRATIVE</Badge>
                <Badge dark>DELEGATED_ACTION</Badge>
                <Badge dark>RING_DARK</Badge>
              </div>
            </Card>

            {/* Dark Rein Line */}
            <Card dark className="space-y-6">
              <div className="type-mono-label text-mute">REIN LINE ON DARK</div>
              <div className="py-4">
                <ReinLine length={200} nodePosition={0.55} animate={true} />
              </div>
              <div className="type-mono-label text-mute">INSTRUMENT_REIN</div>
            </Card>
          </div>
        </Container>
      </Section>
    </main>
  );
}

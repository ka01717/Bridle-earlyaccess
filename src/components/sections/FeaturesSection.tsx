'use client';

import * as React from 'react';
import { Container, SectionLabel } from '@/components/layout';
import { Badge, Reveal } from '@/components/ui';
import { ReinLine } from '@/components/motif';
import { cn } from '@/lib/utils';

export function FeaturesSection() {
  // Interactive Kill Switch state
  const [killSwitchActive, setKillSwitchActive] = React.useState(true);

  return (
    <section
      id="platform"
      tabIndex={-1}
      className="scroll-mt-24 relative bg-paper text-ink py-24 md:py-32 lg:py-40 border-t border-ink/10 focus:outline-none"
      aria-label="Bridle Platform Features"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-[58ch] mb-16 md:mb-20">
          <Reveal>
            <SectionLabel className="mb-6">Platform</SectionLabel>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="type-h2 text-ink tracking-tight mb-6">
              Control, built into every action.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="type-body-lg text-graphite leading-relaxed max-w-[58ch]">
              What Bridle is being built to give every business that deploys AI
              agents.
            </p>
          </Reveal>
        </div>

        {/* Bento Grid: 12 Columns on Desktop, 2 on Tablet, 1 on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-7">
          {/* Card 1: Agent Permissions */}
          <div className="lg:col-span-4">
            <Reveal delay={0.1}>
              <div className="group h-full flex flex-col justify-between rounded-[4px] bg-paper-2/40 border border-ink/10 p-6 sm:p-7 transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2/70">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="type-mono-label text-mute text-xs tracking-wider">
                      01 // PERMISSIONS
                    </span>
                    <span className="type-mono-label text-mute/60 text-xs">
                      Illustrative
                    </span>
                  </div>
                  <h3 className="type-h3 text-ink text-lg font-medium mb-3">
                    Agent Permissions
                  </h3>
                  <p className="type-body text-graphite text-sm leading-relaxed mb-6">
                    Every agent gets explicit permissions: which tools, which
                    systems, which limits. Nothing is assumed.
                  </p>
                </div>

                {/* Matrix Visual */}
                <div className="rounded-[3px] bg-paper border border-ink/10 p-3 space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-ink/5">
                    <span className="text-ink text-xs">read_crm</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-allow/10 text-allow font-medium">
                      ALLOWED
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-ink/5">
                    <span className="text-ink text-xs">issue_refund</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-brass/15 text-brass font-medium">
                      LIMIT: $1,000
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-ink/5">
                    <span className="text-ink text-xs">send_email</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-approve/15 text-approve font-medium">
                      APPROVAL
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-ink text-xs">delete_records</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-block/10 text-block font-medium">
                      DENIED
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Card 2: Policy Engine */}
          <div className="lg:col-span-4">
            <Reveal delay={0.15}>
              <div className="group h-full flex flex-col justify-between rounded-[4px] bg-paper-2/40 border border-ink/10 p-6 sm:p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2/70">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="type-mono-label text-mute text-xs tracking-wider">
                      02 // RULES
                    </span>
                    <span className="type-mono-label text-mute/60 text-xs">
                      Illustrative
                    </span>
                  </div>
                  <h3 className="type-h3 text-ink text-lg font-medium mb-3">
                    Policy Engine
                  </h3>
                  <p className="type-body text-graphite text-sm leading-relaxed mb-6">
                    Write your rules once: what&apos;s allowed, what needs
                    approval, what&apos;s blocked. Bridle applies them to every
                    action.
                  </p>
                </div>

                {/* Policy Rules Visual */}
                <div className="rounded-[3px] bg-paper border border-ink/10 p-3.5 space-y-2.5 font-mono text-xs">
                  <div className="text-xs text-mute mb-1 pb-1 border-b border-ink/5">
                    Example policy: refund_tier_v2
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-allow" />
                      <span className="text-ink">refund &lt; $100</span>
                    </span>
                    <span className="text-allow font-medium">Auto-allow</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-approve" />
                      <span className="text-ink">$100 to $1,000</span>
                    </span>
                    <span className="text-approve font-medium">Human review</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-block" />
                      <span className="text-ink">refund &gt; $1,000</span>
                    </span>
                    <span className="text-block font-medium">Blocked</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Card 3: Action Risk */}
          <div className="lg:col-span-4">
            <Reveal delay={0.2}>
              <div className="group h-full flex flex-col justify-between rounded-[4px] bg-paper-2/40 border border-ink/10 p-6 sm:p-7 transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2/70">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="type-mono-label text-mute text-xs tracking-wider">
                      03 // RISK
                    </span>
                    <span className="type-mono-label text-mute/60 text-xs">
                      Illustrative
                    </span>
                  </div>
                  <h3 className="type-h3 text-ink text-lg font-medium mb-3">
                    Action Risk
                  </h3>
                  <p className="type-body text-graphite text-sm leading-relaxed mb-6">
                    Each action is evaluated before it happens: type, data,
                    value, target system, permissions and context.
                  </p>
                </div>

                {/* Risk Factors Flow Visual */}
                <div className="rounded-[3px] bg-paper border border-ink/10 p-3.5 space-y-3 font-mono text-xs">
                  {/* Factor tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {['Type', 'Data', 'Value', 'Target', 'Perms', 'Context'].map(
                      (f) => (
                        <span
                          key={f}
                          className="px-2 py-0.5 text-xs rounded-[2px] bg-paper-2 border border-ink/10 text-graphite"
                        >
                          {f}
                        </span>
                      )
                    )}
                  </div>

                  {/* 3-segment risk indicator */}
                  <div className="pt-2 border-t border-ink/5">
                    <div className="flex items-center justify-between text-xs text-mute mb-1.5">
                      <span>RISK SCORE: 0.18</span>
                      <span className="text-allow font-medium">LOW RISK</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-paper-2 overflow-hidden flex gap-1">
                      <div className="h-full w-1/3 bg-allow rounded-full" />
                      <div className="h-full w-1/3 bg-ink/10 rounded-full" />
                      <div className="h-full w-1/3 bg-ink/10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Card 4: Human Approval */}
          <div className="lg:col-span-4">
            <Reveal delay={0.25}>
              <div className="group h-full flex flex-col justify-between rounded-[4px] bg-paper-2/40 border border-ink/10 p-6 sm:p-7 transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2/70">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="type-mono-label text-mute text-xs tracking-wider">
                      04 // OVERSIGHT
                    </span>
                    <span className="type-mono-label text-mute/60 text-xs">
                      Illustrative
                    </span>
                  </div>
                  <h3 className="type-h3 text-ink text-lg font-medium mb-3">
                    Human Approval
                  </h3>
                  <p className="type-body text-graphite text-sm leading-relaxed mb-6">
                    High-risk actions pause for a human decision before anything
                    is executed.
                  </p>
                </div>

                {/* Human Approval Mini Card Visual */}
                <div className="rounded-[3px] bg-paper border border-ink/10 p-3.5 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-ink text-xs font-medium truncate">
                      support-agent · $750
                    </span>
                    <span className="text-xs px-1.5 py-0.2 rounded bg-approve/15 text-approve font-medium">
                      PAUSED
                    </span>
                  </div>
                  <p className="text-xs font-sans text-graphite leading-tight">
                    Dual authorisation required for refunds over $100.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      tabIndex={-1}
                      className="flex-1 py-1.5 text-xs font-mono text-center rounded-full bg-ink text-paper"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      tabIndex={-1}
                      className="flex-1 py-1.5 text-xs font-mono text-center rounded-full border border-ink/15 text-ink"
                    >
                      Deny
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Card 5: Kill Switch (Interactive Toggle) */}
          <div className="lg:col-span-4">
            <Reveal delay={0.3}>
              <div className="group h-full flex flex-col justify-between rounded-[4px] bg-paper-2/40 border border-ink/10 p-6 sm:p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2/70">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="type-mono-label text-mute text-xs tracking-wider">
                      05 // EMERGENCY
                    </span>
                    <span className="type-mono-label text-mute/60 text-xs">
                      Illustrative
                    </span>
                  </div>
                  <h3 className="type-h3 text-ink text-lg font-medium mb-3">
                    Kill Switch
                  </h3>
                  <p className="type-body text-graphite text-sm leading-relaxed mb-6">
                    Disable an agent or revoke its access immediately.
                  </p>
                </div>

                {/* Interactive Toggle Visual */}
                <div className="rounded-[3px] bg-paper border border-ink/10 p-3.5 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-mute text-xs">
                      AGENT DISPATCH CONTROL
                    </span>
                    <span
                      className={cn(
                        'text-xs px-1.5 py-0.5 rounded font-medium',
                        killSwitchActive
                          ? 'bg-allow/10 text-allow'
                          : 'bg-block/10 text-block'
                      )}
                    >
                      {killSwitchActive ? 'OPERATIONAL' : 'SUSPENDED'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setKillSwitchActive(!killSwitchActive)}
                    className={cn(
                      'w-full flex items-center justify-between px-3.5 py-2 rounded-full border active:scale-[0.98] touch-manipulation transition-all duration-100 ease-out cursor-pointer',
                      'focus-visible:outline-2 focus-visible:outline-[var(--color-brass)] focus-visible:outline-offset-2',
                      killSwitchActive
                        ? 'bg-paper-2 border-ink/10 text-ink'
                        : 'bg-block/10 border-block/30 text-block'
                    )}
                    aria-label={`Toggle agent kill switch. Current status: ${
                      killSwitchActive ? 'Agent active' : 'Agent disabled'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-mono font-medium">
                      <span
                        className={cn(
                          'w-2 h-2 rounded-full transition-colors',
                          killSwitchActive ? 'bg-allow' : 'bg-block'
                        )}
                      />
                      <span>
                        {killSwitchActive ? 'Agent active' : 'Agent disabled'}
                      </span>
                    </div>

                    {/* Toggle Switch */}
                    <div
                      className={cn(
                        'w-8 h-4 rounded-full p-0.5 transition-colors flex items-center',
                        killSwitchActive ? 'bg-ink' : 'bg-block'
                      )}
                    >
                      <div
                        className={cn(
                          'w-3 h-3 rounded-full bg-paper transition-transform duration-150 ease-out',
                          killSwitchActive ? 'translate-x-4' : 'translate-x-0'
                        )}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Card 6: Audit Trail */}
          <div className="lg:col-span-4">
            <Reveal delay={0.35}>
              <div className="group h-full flex flex-col justify-between rounded-[4px] bg-paper-2/40 border border-ink/10 p-6 sm:p-7 transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2/70">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="type-mono-label text-mute text-xs tracking-wider">
                      06 // LOGGING
                    </span>
                    <span className="type-mono-label text-mute/60 text-xs">
                      Illustrative
                    </span>
                  </div>
                  <h3 className="type-h3 text-ink text-lg font-medium mb-3">
                    Audit Trail
                  </h3>
                  <p className="type-body text-graphite text-sm leading-relaxed mb-6">
                    A record of every action: the agent, the request, the tool,
                    the policy applied, any approval, and the result.
                  </p>
                </div>

                {/* 3-Row Mini Log Visual */}
                <div className="rounded-[3px] bg-paper border border-ink/10 p-3 space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-ink/5">
                    <span className="text-mute truncate">18:42:01 · support</span>
                    <span className="text-allow font-medium">ALLOWED</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-ink/5">
                    <span className="text-mute truncate">18:43:15 · sales</span>
                    <span className="text-approve font-medium">APPROVAL</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-mute truncate">18:45:22 · ops</span>
                    <span className="text-block font-medium">BLOCKED</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Card 7: Action Verification (Wide Featured Bento Card) */}
          <div className="md:col-span-2 lg:col-span-12">
            <Reveal delay={0.4}>
              <div className="group rounded-[4px] bg-paper-2/50 border border-ink/10 p-7 sm:p-9 transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2/70">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-12">
                  {/* Left Column: Copy & Tag */}
                  <div className="lg:max-w-[46ch]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="type-mono-label text-mute text-xs tracking-wider">
                        07 // VERIFICATION
                      </span>
                      <Badge className="bg-brass/10 border-brass/30 text-brass text-xs py-0.5">
                        Roadmap
                      </Badge>
                      <span className="type-mono-label text-mute/60 text-xs ml-auto lg:ml-0">
                        Illustrative
                      </span>
                    </div>

                    <h3 className="type-h3 text-ink text-xl font-medium mb-3">
                      Action Verification
                    </h3>

                    <p className="type-body text-graphite text-sm sm:text-base leading-relaxed">
                      Agents report what they did. Bridle is being built to
                      independently check that the action actually happened, and
                      happened correctly. The step from observing agents to
                      verifying autonomous work.
                    </p>
                  </div>

                  {/* Right Column: Two-Column Verification Visual with Rein Line */}
                  <div className="flex-1 w-full lg:max-w-[560px]">
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 font-mono text-xs">
                      {/* Left: Agent reported */}
                      <div className="w-full sm:flex-1 rounded-[3px] bg-paper border border-ink/10 p-4">
                        <div className="text-xs text-mute uppercase tracking-wider mb-1">
                          AGENT REPORTED
                        </div>
                        <div className="text-ink font-medium text-xs">
                          Refund completed ($750)
                        </div>
                        <div className="text-mute text-xs mt-1 font-sans">
                          Self-attested completion token
                        </div>
                      </div>

                      {/* Connecting Rein Line */}
                      <div className="shrink-0 flex items-center justify-center py-1 sm:py-0">
                        {/* Desktop horizontal rein line */}
                        <div className="hidden sm:block">
                          <ReinLine length={44} nodePosition={0.5} animate={true} />
                        </div>
                        {/* Mobile vertical rein line */}
                        <div className="sm:hidden">
                          <ReinLine orientation="vertical" length={28} nodePosition={0.5} animate={true} />
                        </div>
                      </div>

                      {/* Right: Bridle check */}
                      <div className="w-full sm:flex-1 rounded-[3px] bg-paper border border-allow/30 p-4">
                        <div className="text-xs text-allow uppercase tracking-wider mb-1 flex items-center gap-1.5 font-medium">
                          <span>BRIDLE INDEPENDENT CHECK</span>
                          <span>✓</span>
                        </div>
                        <div className="text-ink font-medium text-xs">
                          Matched ledger record
                        </div>
                        <div className="text-mute text-xs mt-1 font-sans">
                          Verified against Stripe payout event
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

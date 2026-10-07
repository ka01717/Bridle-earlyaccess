'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Container, SectionLabel } from '@/components/layout';
import { Badge, Reveal } from '@/components/ui';
import { ReinLine } from '@/components/motif';
import { cn } from '@/lib/utils';

type AppId = 'shopify' | 'gmail';

interface PermissionScope {
  action: string;
  status: 'allowed' | 'needs_approval' | 'blocked';
  label: string;
}

const APPS: Record<
  AppId,
  {
    name: string;
    description: string;
    connectAction: string;
    scopes: PermissionScope[];
  }
> = {
  shopify: {
    name: 'Shopify',
    description: 'E-commerce storefront & orders',
    connectAction: 'You: Connect Shopify',
    scopes: [
      { action: 'Read orders', status: 'allowed', label: 'allowed' },
      { action: 'Read customers', status: 'allowed', label: 'allowed' },
      { action: 'Issue refunds up to £50', status: 'allowed', label: 'allowed' },
      { action: 'Refunds over £50', status: 'needs_approval', label: 'needs approval' },
      { action: 'Change payment account', status: 'blocked', label: 'blocked' },
    ],
  },
  gmail: {
    name: 'Gmail',
    description: 'Customer inquiries & email delivery',
    connectAction: 'You: Connect Gmail',
    scopes: [
      { action: 'Read incoming requests', status: 'allowed', label: 'allowed' },
      { action: 'Send replies', status: 'allowed', label: 'allowed' },
      { action: 'Delete emails', status: 'blocked', label: 'blocked' },
    ],
  },
};

export function IntegrationsSection() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedApp, setSelectedApp] = React.useState<AppId>('shopify');
  const [statusAnnouncement, setStatusAnnouncement] = React.useState<string>(
    'Showing Shopify integration: 5 permission scopes resolved.'
  );

  const appData = APPS[selectedApp];

  const handleSelectApp = (app: AppId) => {
    setSelectedApp(app);
    setStatusAnnouncement(
      `Showing ${APPS[app].name} integration: ${APPS[app].scopes.length} permission scopes resolved.`
    );
  };

  return (
    <section
      id="integrations"
      tabIndex={-1}
      className="scroll-mt-24 relative bg-paper text-ink py-24 md:py-32 lg:py-36 border-t border-ink/10 focus:outline-none"
      aria-label="Integrations"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-[58ch] mb-14 md:mb-18">
          <Reveal>
            <SectionLabel className="mb-6">Integrations</SectionLabel>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="type-h2 text-ink tracking-tight mb-4">
              Connect your apps. Bridle configures the rest.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="type-body-lg text-graphite leading-relaxed max-w-[58ch]">
              No API keys, OAuth scopes or tool schemas. Bridle is designed to work
              out what your agent needs, and only what it needs.
            </p>
          </Reveal>
        </div>

        {/* Live region for accessibility announcements */}
        <div className="sr-only" aria-live="polite" role="status">
          {statusAnnouncement}
        </div>

        {/* BLOCK A — INVISIBLE INTEGRATIONS (Interactive, Illustrative) */}
        <Reveal delay={0.25}>
          <div className="rounded-[4px] bg-paper-2/60 border border-ink/10 p-6 sm:p-8 lg:p-10 mb-12 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-ink/10">
              <div>
                <span className="type-mono-label text-mute text-xs tracking-wider block mb-1">
                  BLOCK A {'//'} INVISIBLE INTEGRATIONS
                </span>
                <h3 className="type-h3 text-ink text-lg sm:text-xl font-medium">
                  Select an app to see Bridle determine minimum access
                </h3>
              </div>
              <Badge className="text-xs shrink-0 self-start sm:self-auto">
                Examples. Integrations are being built.
              </Badge>
            </div>

            {/* App Selector Generic Tiles */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8"
              role="tablist"
              aria-label="Example apps"
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                  e.preventDefault();
                  handleSelectApp('gmail');
                  document.getElementById('tab-gmail')?.focus();
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                  e.preventDefault();
                  handleSelectApp('shopify');
                  document.getElementById('tab-shopify')?.focus();
                }
              }}
            >
              {/* Tile 1: Shopify */}
              <button
                type="button"
                role="tab"
                id="tab-shopify"
                aria-selected={selectedApp === 'shopify'}
                aria-controls="panel-shopify"
                tabIndex={selectedApp === 'shopify' ? 0 : -1}
                onClick={() => handleSelectApp('shopify')}
                className={cn(
                  'flex items-center gap-3.5 p-4 rounded-[4px] border min-h-[44px] text-left transition-[background-color,border-color,box-shadow,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] cursor-pointer select-none',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brass)]',
                  selectedApp === 'shopify'
                    ? 'bg-paper border-brass text-ink shadow-sm'
                    : 'bg-paper/70 border-ink/10 hover:border-ink/25 text-graphite hover:text-ink'
                )}
              >
                {/* Generic Shopping Bag Mark (NOT real brand logo) */}
                <div
                  className={cn(
                    'w-9 h-9 rounded-[3px] border flex items-center justify-center shrink-0 transition-colors',
                    selectedApp === 'shopify'
                      ? 'border-brass bg-brass/10 text-brass'
                      : 'border-ink/15 bg-paper text-mute'
                  )}
                  aria-hidden="true"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <div>
                  <div className="font-sans font-medium text-sm text-ink">
                    Shopify
                  </div>
                  <div className="type-mono-label text-mute text-xs">
                    Storefront & order adjustments
                  </div>
                </div>
              </button>

              {/* Tile 2: Gmail */}
              <button
                type="button"
                role="tab"
                id="tab-gmail"
                aria-selected={selectedApp === 'gmail'}
                aria-controls="panel-gmail"
                tabIndex={selectedApp === 'gmail' ? 0 : -1}
                onClick={() => handleSelectApp('gmail')}
                className={cn(
                  'flex items-center gap-3.5 p-4 rounded-[4px] border min-h-[44px] text-left transition-[background-color,border-color,box-shadow,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] cursor-pointer select-none',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brass)]',
                  selectedApp === 'gmail'
                    ? 'bg-paper border-brass text-ink shadow-sm'
                    : 'bg-paper/70 border-ink/10 hover:border-ink/25 text-graphite hover:text-ink'
                )}
              >
                {/* Generic Envelope Mark (NOT real brand logo) */}
                <div
                  className={cn(
                    'w-9 h-9 rounded-[3px] border flex items-center justify-center shrink-0 transition-colors',
                    selectedApp === 'gmail'
                      ? 'border-brass bg-brass/10 text-brass'
                      : 'border-ink/15 bg-paper text-mute'
                  )}
                  aria-hidden="true"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-sans font-medium text-sm text-ink">
                    Gmail
                  </div>
                  <div className="type-mono-label text-mute text-xs">
                    Inbound tickets & dispatch
                  </div>
                </div>
              </button>
            </div>

            {/* Resolved Permission Scopes Panel */}
            <div
              id={`panel-${selectedApp}`}
              role="tabpanel"
              aria-labelledby={`tab-${selectedApp}`}
              className="rounded-[3px] bg-paper border border-ink/10 p-5 sm:p-6"
            >
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-ink/10 font-mono text-xs">
                <span className="text-ink font-semibold">
                  {appData.connectAction}
                </span>
                <span className="text-mute">
                  RESOLVED PERMISSIONS ({appData.scopes.length})
                </span>
              </div>

              {/* Scopes list: Staggered reveal or static */}
              <div className="space-y-2.5">
                {appData.scopes.map((scope, idx) => {
                  const content = (
                    <div
                      key={scope.action}
                      className="flex items-center justify-between gap-3 py-2 px-3 rounded-[3px] bg-paper-2/40 border border-ink/5 font-mono text-xs"
                    >
                      <span className="text-ink font-sans text-sm font-medium">
                        {scope.action}
                      </span>
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded text-xs uppercase font-mono font-medium shrink-0',
                          scope.status === 'allowed' &&
                            'bg-allow/15 text-allow border border-allow/30',
                          scope.status === 'needs_approval' &&
                            'bg-approve/15 text-approve border border-approve/30',
                          scope.status === 'blocked' &&
                            'bg-block/10 text-block border border-block/25'
                        )}
                      >
                        {scope.label}
                      </span>
                    </div>
                  );

                  if (shouldReduceMotion) {
                    return content;
                  }

                  return (
                    <motion.div
                      key={`${selectedApp}-${scope.action}`}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.18, delay: idx * 0.05 }}
                    >
                      {content}
                    </motion.div>
                  );
                })}
              </div>

              {/* Caption Note */}
              <div className="mt-5 pt-3.5 border-t border-ink/5 type-mono-label text-mute text-xs tracking-wider text-right">
                Illustrative. Bridle is designed to determine this automatically.
              </div>
            </div>
          </div>
        </Reveal>

        {/* BLOCK B — AGENTS GET THE ACCESS THEY NEED, NOT UNLIMITED ACCESS */}
        <Reveal delay={0.2}>
          <div className="rounded-[4px] bg-paper-2/60 border border-ink/10 p-6 sm:p-8 lg:p-10 mb-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Short Statement */}
              <div className="lg:col-span-5">
                <span className="type-mono-label text-mute text-xs tracking-wider block mb-2">
                  BLOCK B {'//'} SCOPE BOUNDARIES
                </span>
                <h3 className="type-h3 text-ink text-xl sm:text-2xl font-normal leading-snug">
                  Agents get the access they need, not unlimited access.
                </h3>
                <p className="type-body text-graphite text-sm mt-4 leading-relaxed">
                  Traditional agent frameworks require admin API keys with wide-open
                  privileges. Bridle synthesises fine-grained, least-privilege tokens
                  tailored solely to the task at hand.
                </p>
              </div>

              {/* Right Column: Two-Column Visual Comparison */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Column 1: Typical Setup */}
                <div className="rounded-[3px] bg-paper border border-ink/10 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-xs font-mono text-mute">
                      <span className="w-1.5 h-1.5 rounded-full bg-block" />
                      <span>TYPICAL SETUP</span>
                    </div>
                    <div className="font-sans font-medium text-sm text-ink mb-1">
                      Full access, broad keys
                    </div>
                    <p className="text-xs text-graphite leading-relaxed mb-4">
                      Single global API secret with read, write, and deletion
                      privileges across every customer record.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-ink/5 flex items-center justify-between text-xs font-mono text-block">
                    <span>BROAD SCOPE</span>
                    <span>HIGH RISK</span>
                  </div>
                </div>

                {/* Column 2: Bridle Approach */}
                <div className="rounded-[3px] bg-paper border border-brass/40 p-5 flex flex-col justify-between relative shadow-sm">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-xs font-mono text-brass">
                      <span className="w-1.5 h-1.5 rounded-full bg-allow" />
                      <span>BRIDLE</span>
                    </div>
                    <div className="font-sans font-medium text-sm text-ink mb-1">
                      Minimum access, set automatically
                    </div>
                    <p className="text-xs text-graphite leading-relaxed mb-4">
                      Scoped tokens with exact value ceilings, rate limits, and
                      hard blocks on destructive commands.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-brass/20 flex items-center justify-between text-xs font-mono text-allow">
                    <span>MINIMUM SCOPE</span>
                    <span>AUTOMATIC FENCE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* TWO-COLUMN LOWER SECTION: BLOCK C & BLOCK D */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* BLOCK C — CONNECT ANYTHING */}
          <Reveal delay={0.2} className="h-full">
            <div className="h-full rounded-[4px] bg-paper-2/60 border border-ink/10 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-ink/10">
                  <span className="type-mono-label text-mute text-xs tracking-wider">
                    BLOCK C {'//'} ADAPTERS
                  </span>
                  <Badge className="text-xs">
                    Where we&apos;re heading
                  </Badge>
                </div>

                <h3 className="type-h3 text-ink text-lg sm:text-xl font-medium mb-3">
                  Connect anything.
                </h3>

                <p className="type-body text-graphite text-sm sm:text-base leading-relaxed mb-6">
                  Popular apps, APIs, internal systems, MCP servers and custom
                  tools. Bridle is being built to connect them all.
                </p>

                <div className="space-y-3.5 font-mono text-xs">
                  <div className="p-3.5 rounded-[3px] bg-paper border border-ink/10 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-allow mt-1.5 shrink-0" />
                    <div>
                      <span className="text-ink font-semibold">
                        Supported apps:
                      </span>{' '}
                      <span className="text-graphite">
                        connect, sign in, done.
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-[3px] bg-paper border border-ink/10 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brass mt-1.5 shrink-0" />
                    <div>
                      <span className="text-ink font-semibold">
                        Everything else:
                      </span>{' '}
                      <span className="text-graphite">
                        Bridle is designed to help generate the connector from API
                        documentation.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-ink/5 type-mono-label text-mute text-xs flex items-center justify-between">
                <span>SYSTEM TARGETS</span>
                <span>ENTERPRISE & LEGACY</span>
              </div>
            </div>
          </Reveal>

          {/* BLOCK D — FIX IT FOR ME */}
          <Reveal delay={0.25} className="h-full">
            <div className="h-full rounded-[4px] bg-paper-2/60 border border-ink/10 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-ink/10">
                  <span className="type-mono-label text-mute text-xs tracking-wider">
                    BLOCK D {'//'} SELF-HEALING REPAIR
                  </span>
                  <span className="type-mono-label text-mute text-xs">
                    Illustrative
                  </span>
                </div>

                <h3 className="type-h3 text-ink text-lg sm:text-xl font-medium mb-3">
                  Fix it for me.
                </h3>

                <p className="type-body text-graphite text-sm leading-relaxed mb-6">
                  When tokens expire or permissions change, Bridle translates
                  cryptic errors into plain English and pauses the workflow safely.
                </p>

                {/* Before / After Comparison Card */}
                <div className="space-y-3 font-mono text-xs">
                  {/* Instead of state */}
                  <div className="p-3.5 rounded-[3px] bg-paper border border-block/20">
                    <div className="text-mute text-xs uppercase mb-1">
                      INSTEAD OF:
                    </div>
                    <div className="text-block font-mono text-xs">
                      &quot;OAuth scope missing.&quot;
                    </div>
                  </div>

                  {/* Connecting Rein Line */}
                  <div className="flex justify-center py-1">
                    <ReinLine length={44} nodePosition={0.5} animate={true} />
                  </div>

                  {/* Bridle says state */}
                  <div className="p-3.5 rounded-[3px] bg-paper border border-brass/35">
                    <div className="text-brass text-xs uppercase mb-1 font-semibold">
                      BRIDLE SAYS:
                    </div>
                    <p className="text-ink font-sans text-xs sm:text-sm leading-relaxed">
                      &quot;Shopify needs permission to issue refunds. Bridle has
                      paused the agent until the connection is repaired.&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Sub-note */}
              <div className="mt-6 pt-4 border-t border-ink/5 type-mono-label text-graphite text-xs">
                Bridle is designed to resolve safe infrastructure issues automatically.
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

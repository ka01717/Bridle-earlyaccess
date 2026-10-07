'use client';

import * as React from 'react';
import { Container, SectionLabel } from '@/components/layout';
import { Reveal } from '@/components/ui';
import { cn } from '@/lib/utils';

interface UseCase {
  id: string;
  num: string;
  title: string;
  shortLabel: string;
  prompt: string;
  bridleWorksOut: string[];
  youStayInControl: string[];
}

const USE_CASES: UseCase[] = [
  {
    id: 'appointments',
    num: '01',
    title: 'Appointments',
    shortLabel: 'APPOINTMENTS',
    prompt:
      'Handle incoming appointment requests, check availability, book them and send confirmations. Ask me before cancelling.',
    bridleWorksOut: [
      'Calendar API connections, availability checks and double-booking guards',
      'Time zone conversion, booking window logic and automated confirmations',
      'Rescheduling workflows and contextual communication with attendees',
    ],
    youStayInControl: [
      'Approving any appointment cancellation before it is processed',
      'Working hours, buffer times and which calendars the agent may access',
      'Cancellation policies and customer notification templates',
    ],
  },
  {
    id: 'ecommerce-support',
    num: '02',
    title: 'E-commerce support',
    shortLabel: 'SUPPORT',
    prompt:
      'Answer order questions and issue refunds up to £50. Ask me for anything larger.',
    bridleWorksOut: [
      'Store and helpdesk API connections for order lookup and status tracking',
      'Refund eligibility evaluation against your store return policies',
      'Customer communication drafts and automated status dispatch',
    ],
    youStayInControl: [
      'The £50 automatic refund ceiling — strictly enforced on every action',
      'Mandatory human review and approval for any refund above £50',
      'Allowed return windows, brand tone and exception handling rules',
    ],
  },
  {
    id: 'sales-followup',
    num: '03',
    title: 'Sales follow-up',
    shortLabel: 'SALES',
    prompt:
      'Update the CRM after each call and draft follow-ups for me to approve.',
    bridleWorksOut: [
      'Meeting transcript parsing, key takeaway extraction and action item mapping',
      'CRM contact, company, deal stage and field updates',
      'Contextual, personalised follow-up email drafts',
    ],
    youStayInControl: [
      'Reviewing and approving every drafted email before anything is sent',
      'Which CRM fields the agent is permitted to view or update',
      'Deal stage progression criteria and meeting classification tags',
    ],
  },
  {
    id: 'finance-admin',
    num: '04',
    title: 'Finance admin',
    shortLabel: 'FINANCE',
    prompt:
      'Match invoices to purchase orders and prepare payments for my approval.',
    bridleWorksOut: [
      'PDF invoice line-item extraction and OCR data reconciliation',
      'Two-way matching against purchase orders and vendor ledgers',
      'Staging prepared payment drafts in your banking or ERP portal',
    ],
    youStayInControl: [
      'Final human authorisation before any money or payment leaves the bank',
      'Variance tolerances for pricing or quantity discrepancies',
      'Allowed payment accounts, vendor allowlists and approval workflows',
    ],
  },
  {
    id: 'internal-requests',
    num: '05',
    title: 'Internal requests',
    shortLabel: 'INTERNAL',
    prompt:
      'Handle internal access and IT requests, but never touch payroll or HR data.',
    bridleWorksOut: [
      'IT ticketing intake, triage and routine provisioning workflows',
      'Knowledge base search and employee self-service assistance',
      'Strict scope boundaries walling off unauthorised systems',
    ],
    youStayInControl: [
      'Hard exclusion rules: payroll, compensation and HR data remain untouchable',
      'Mandatory manager approval for elevated or admin permissions',
      'Instant access revocation and emergency pause switches',
    ],
  },
];

/**
 * Single Detail Content View
 * Shared between desktop tabpanel and mobile accordion drawer.
 */
function UseCaseDetail({ useCase }: { useCase: UseCase }) {
  return (
    <div className="space-y-6">
      {/* Panel Header */}
      <div>
        <div className="flex items-center gap-3 mb-2.5">
          <span className="type-mono-label text-xs text-brass tracking-wider">
            {`${useCase.num} // ${useCase.shortLabel}`}
          </span>
          <span className="text-ink/20">·</span>
          <span className="type-mono-label text-xs text-mute/80 uppercase">
            Direction
          </span>
        </div>
        <h3 className="type-h3 text-ink text-xl md:text-2xl font-medium tracking-tight">
          {useCase.title}
        </h3>
      </div>

      {/* Illustrative Prompt Box */}
      <div className="rounded-[4px] border border-ink/15 bg-paper p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brass" />
            <span className="type-mono-label text-xs tracking-wider text-mute uppercase">
              Illustrative prompt
            </span>
          </div>
          <span className="type-mono-label text-[11px] tracking-wider px-2 py-0.5 rounded-[2px] bg-ink/5 border border-ink/10 text-mute uppercase">
            Illustrative
          </span>
        </div>

        <div className="font-mono text-xs sm:text-sm text-ink font-medium leading-relaxed bg-paper-2 border border-ink/10 rounded-[3px] p-3.5">
          &ldquo;{useCase.prompt}&rdquo;
        </div>
      </div>

      {/* Two-Column Matrix: Bridle would work out vs You'd stay in control of */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
        {/* Bridle would work out */}
        <div className="rounded-[4px] border border-ink/10 bg-paper/60 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-graphite" />
            <h4 className="type-mono-label text-xs text-ink font-semibold tracking-wide">
              Bridle would work out
            </h4>
          </div>
          <ul className="space-y-3">
            {useCase.bridleWorksOut.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-graphite leading-normal"
              >
                <span
                  className="mt-1 flex-shrink-0 w-3.5 h-3.5 rounded-full border border-ink/20 flex items-center justify-center text-xs text-mute select-none"
                  aria-hidden="true"
                >
                  →
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* You'd stay in control of */}
        <div className="rounded-[4px] border border-brass/30 bg-paper/80 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brass" />
            <h4 className="type-mono-label text-xs text-ink font-semibold tracking-wide">
              You&apos;d stay in control of
            </h4>
          </div>
          <ul className="space-y-3">
            {useCase.youStayInControl.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-graphite leading-normal"
              >
                <span
                  className="mt-1 flex-shrink-0 w-3.5 h-3.5 rounded-full border border-brass/40 bg-brass/10 flex items-center justify-center text-xs text-brass font-bold select-none"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function UseCasesSection() {
  const [activeTabId, setActiveTabId] = React.useState<string>(USE_CASES[0].id);
  const [openAccordionId, setOpenAccordionId] = React.useState<string>(
    USE_CASES[0].id
  );

  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  // Keyboard navigation for desktop tablist (Arrow keys, Home, End)
  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let targetIndex = -1;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        targetIndex = (index + 1) % USE_CASES.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        targetIndex = (index - 1 + USE_CASES.length) % USE_CASES.length;
        break;
      case 'Home':
        e.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        targetIndex = USE_CASES.length - 1;
        break;
      default:
        break;
    }

    if (targetIndex >= 0) {
      const nextCase = USE_CASES[targetIndex];
      setActiveTabId(nextCase.id);
      tabRefs.current[targetIndex]?.focus();
    }
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordionId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="use-cases"
      tabIndex={-1}
      className="scroll-mt-24 relative bg-paper-2 text-ink py-24 md:py-32 lg:py-40 border-t border-ink/10 focus:outline-none"
      aria-label="Built for"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-[58ch] mb-16 md:mb-20">
          <Reveal>
            <SectionLabel className="mb-6">Built for</SectionLabel>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="type-h2 text-ink tracking-tight mb-6">
              Work you could describe.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="type-body-lg text-graphite leading-relaxed max-w-[58ch]">
              Examples of the work Bridle is designed to take on. Bridle is early, so treat these as direction, not current features.
            </p>
          </Reveal>
        </div>

        {/* Desktop View (>= lg): Vertical Tabs on Left, Detail Panel on Right */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
          {/* Vertical Tab List */}
          <div
            role="tablist"
            aria-label="Built for scenarios"
            aria-orientation="vertical"
            className="lg:col-span-4 flex flex-col space-y-2 border-r border-ink/10 pr-6"
          >
            {USE_CASES.map((uc, index) => {
              const isSelected = activeTabId === uc.id;

              return (
                <button
                  key={uc.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  id={`tab-${uc.id}`}
                  role="tab"
                  type="button"
                  tabIndex={isSelected ? 0 : -1}
                  aria-selected={isSelected}
                  aria-controls={`panel-${uc.id}`}
                  onClick={() => setActiveTabId(uc.id)}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                  className={cn(
                    'group relative w-full text-left p-4 rounded-[4px] border active:scale-[0.98] touch-manipulation transition-all duration-100 ease-out outline-none',
                    'focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2',
                    isSelected
                      ? 'bg-paper border-ink/15 text-ink shadow-xs before:absolute before:left-0 before:top-2.5 before:bottom-2.5 before:w-[3px] before:bg-brass before:rounded-r'
                      : 'border-transparent text-graphite hover:text-ink hover:bg-paper/50'
                  )}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={cn(
                        'type-mono-label text-xs transition-colors',
                        isSelected ? 'text-brass font-medium' : 'text-mute'
                      )}
                    >
                      {`${uc.num} // ${uc.shortLabel}`}
                    </span>
                    <span
                      className={cn(
                        'text-xs transition-transform duration-200',
                        isSelected
                          ? 'text-brass translate-x-0.5'
                          : 'text-mute/40 group-hover:text-mute group-hover:translate-x-0.5'
                      )}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>

                  <div className="text-sm font-medium leading-snug">
                    {uc.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Desktop Detail Panels (Right Column) */}
          <div className="lg:col-span-8">
            {USE_CASES.map((uc) => {
              const isSelected = activeTabId === uc.id;

              return (
                <div
                  key={uc.id}
                  id={`panel-${uc.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${uc.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  hidden={!isSelected}
                  className={cn(
                    'rounded-[4px] bg-paper border border-ink/10 p-8 xl:p-10 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-brass transition-opacity duration-200',
                    isSelected ? 'block opacity-100' : 'hidden opacity-0'
                  )}
                >
                  <UseCaseDetail useCase={uc} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View (< lg): Accordion */}
        <div className="lg:hidden flex flex-col space-y-3.5">
          {USE_CASES.map((uc) => {
            const isOpen = openAccordionId === uc.id;

            return (
              <div
                key={uc.id}
                className={cn(
                  'rounded-[4px] border transition-all duration-200 overflow-hidden',
                  isOpen
                    ? 'border-ink/20 bg-paper shadow-xs'
                    : 'border-ink/10 bg-paper/70 hover:bg-paper'
                )}
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  id={`accordion-trigger-${uc.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-region-${uc.id}`}
                  onClick={() => toggleAccordion(uc.id)}
                  className="w-full min-h-[44px] flex items-center justify-between p-4 sm:p-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-brass active:scale-[0.98] touch-manipulation transition-transform duration-100 ease-out"
                >
                  <div className="pr-4">
                    <div className="type-mono-label text-xs text-mute mb-1">
                      {`${uc.num} // ${uc.shortLabel}`}
                    </div>
                    <div className="text-base sm:text-lg font-medium text-ink">
                      {uc.title}
                    </div>
                  </div>

                  <div
                    className={cn(
                      'flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200',
                      isOpen
                        ? 'border-brass bg-brass/10 text-brass rotate-180'
                        : 'border-ink/10 text-mute hover:text-ink'
                    )}
                    aria-hidden="true"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.5 4.5L6 8L9.5 4.5" />
                    </svg>
                  </div>
                </button>

                {/* Accordion Content */}
                <div
                  id={`accordion-region-${uc.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${uc.id}`}
                  hidden={!isOpen}
                  className={cn(
                    'overflow-hidden transition-all duration-200',
                    isOpen ? 'block opacity-100' : 'hidden opacity-0'
                  )}
                >
                  <div className="p-4 sm:p-6 pt-0 border-t border-ink/5 mt-1">
                    <UseCaseDetail useCase={uc} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Audience Statement */}
        <div className="mt-12 pt-8 border-t border-ink/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="type-body text-graphite text-xs sm:text-sm leading-relaxed max-w-[72ch]">
            For startups, operations teams, support teams, e-commerce, healthcare and finance admin, and any team with repetitive workflows.
          </p>
          <span className="type-mono-label text-[11px] text-mute uppercase tracking-wider flex-shrink-0">
            Horizontal platform
          </span>
        </div>
      </Container>
    </section>
  );
}

'use client';

import * as React from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'motion/react';
import { Badge } from '@/components/ui';
import { DURATION, EASING } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface ChecklistStep {
  id: string;
  label: string;
  pill: string;
  status: 'allow' | 'approve';
}

const CHECKLIST_STEPS: ChecklistStep[] = [
  {
    id: 'step-1',
    label: 'Understood the task',
    pill: 'PARSED',
    status: 'allow',
  },
  {
    id: 'step-2',
    label: 'Connect: Google Calendar, Gmail',
    pill: 'CONNECTED',
    status: 'allow',
  },
  {
    id: 'step-3',
    label: 'Permissions set: book and email; cancellations need approval',
    pill: 'APPROVAL GATE',
    status: 'approve',
  },
  {
    id: 'step-4',
    label: 'Tested before deploy',
    pill: 'VERIFIED',
    status: 'allow',
  },
  {
    id: 'step-5',
    label: 'Ready to deploy',
    pill: 'PREPARED',
    status: 'allow',
  },
];

const FULL_PROMPT =
  'Build me an agent that handles appointment requests, checks availability, books appointments, sends confirmation emails, and needs my approval for cancellations.';

export function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '80px 0px' });

  // Safe client hydration check without synchronous setState in effect
  const isMounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // State: typed characters count and resolved checklist steps (0 to 5)
  const [charCount, setCharCount] = React.useState(0);
  const [resolvedSteps, setResolvedSteps] = React.useState(0);
  const [isTyping, setIsTyping] = React.useState(true);

  // Derived values for reduced motion
  const displayCharCount = shouldReduceMotion ? FULL_PROMPT.length : charCount;
  const displayResolvedSteps = shouldReduceMotion
    ? CHECKLIST_STEPS.length
    : resolvedSteps;
  const displayIsTyping = shouldReduceMotion ? false : isTyping;

  // Main animation sequence loop
  React.useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    let timeoutId: NodeJS.Timeout | null = null;
    let intervalId: NodeJS.Timeout | null = null;
    let isCancelled = false;

    function runCycle() {
      if (isCancelled) return;
      let currentChars = 0;
      setCharCount(0);
      setResolvedSteps(0);
      setIsTyping(true);

      intervalId = setInterval(() => {
        if (isCancelled) return;
        currentChars += 2;
        if (currentChars >= FULL_PROMPT.length) {
          if (intervalId) clearInterval(intervalId);
          setCharCount(FULL_PROMPT.length);
          setIsTyping(false);

          let currentStep = 0;
          const resolveNextStep = () => {
            if (isCancelled) return;
            if (currentStep < CHECKLIST_STEPS.length) {
              currentStep += 1;
              setResolvedSteps(currentStep);
              timeoutId = setTimeout(resolveNextStep, 700);
            } else {
              timeoutId = setTimeout(() => {
                if (isCancelled) return;
                runCycle();
              }, 4500);
            }
          };

          timeoutId = setTimeout(resolveNextStep, 500);
        } else {
          setCharCount(currentChars);
        }
      }, 28);
    }

    // Kick off animation cycle asynchronously to avoid synchronous effect setState
    timeoutId = setTimeout(runCycle, 100);

    return () => {
      isCancelled = true;
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [shouldReduceMotion, isInView]);

  return (
    <div ref={containerRef} className="w-full max-w-[560px] mx-auto lg:max-w-none">
      <div
        className={cn(
          'relative rounded-[6px] bg-ink-2 border border-white/10 p-5 sm:p-6 shadow-2xl',
          'focus-within:ring-1 focus-within:ring-[var(--color-brass)]/40 transition-all duration-200'
        )}
      >
        {/* Top Header: Monospace Title & Illustrative Corner Label */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--color-brass)' }}
              aria-hidden="true"
            />
            <span className="type-mono-label text-mute text-xs tracking-wider">
              SPECIFICATION // PROMPT TO AGENT
            </span>
          </div>
          <Badge dark className="text-xs py-0.5 px-2">
            Illustrative
          </Badge>
        </div>

        {/* Prompt Box */}
        <div className="rounded-[4px] bg-ink/90 border border-white/10 p-3.5 sm:p-4 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="type-mono-label text-mute text-xs">
              NATURAL LANGUAGE TASK
            </span>
            <span className="font-mono text-xs text-mute/60">plain words</span>
          </div>
          <p className="font-mono text-xs sm:text-sm text-paper leading-relaxed min-h-[4rem]">
            &ldquo;
            {!isMounted
              ? FULL_PROMPT
              : FULL_PROMPT.slice(0, displayCharCount)}
            &rdquo;
            {isMounted && displayIsTyping && (
              <span
                className="inline-block w-1.5 h-3.5 bg-brass ml-1 animate-pulse align-middle"
                aria-hidden="true"
              />
            )}
          </p>
        </div>

        {/* Resolving Checklist with Rein Line running down the left */}
        <div className="relative pl-7 py-1 min-h-[220px]">
          {/* Vertical brass rein line */}
          <div
            className="absolute left-[7px] top-3 bottom-3 w-px pointer-events-none"
            style={{ backgroundColor: 'rgba(168, 131, 74, 0.45)' }}
            aria-hidden="true"
          />

          {/* Checklist rows */}
          <div className="space-y-3.5">
            {CHECKLIST_STEPS.map((step, idx) => {
              const isResolved = displayResolvedSteps > idx;

              return (
                <div
                  key={step.id}
                  className={cn(
                    'relative flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-[4px] border transition-[background-color,border-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
                    isResolved
                      ? 'bg-ink/70 border-white/10 text-paper'
                      : 'bg-ink/30 border-white/5 text-mute/50'
                  )}
                >
                  {/* Ring Node on Rein Line */}
                  <div
                    className={cn(
                      'absolute -left-[27px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border flex items-center justify-center bg-ink-2 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
                      isResolved ? 'border-brass' : 'border-white/20'
                    )}
                    aria-hidden="true"
                  >
                    <span
                      className={cn(
                        'w-1.5 h-1.5 rounded-full transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
                        isResolved
                          ? 'bg-brass scale-100 shadow-[0_0_6px_rgba(168,131,74,0.8)]'
                          : 'bg-transparent scale-50'
                      )}
                    />
                  </div>

                  {/* Step Description */}
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span
                      className={cn(
                        'font-mono text-xs shrink-0',
                        isResolved ? 'text-brass' : 'text-mute/40'
                      )}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      className={cn(
                        'font-sans text-xs sm:text-sm font-medium leading-snug',
                        isResolved ? 'text-paper' : 'text-mute/50'
                      )}
                    >
                      {step.label}
                    </span>
                  </div>

                  {/* Status Pill (only elements utilizing status colours) */}
                  <div className="shrink-0">
                    <AnimatePresence>
                      {isResolved && (
                        <motion.span
                          initial={
                            shouldReduceMotion
                              ? false
                              : { opacity: 0, scale: 0.95 }
                          }
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: DURATION.fast,
                            ease: EASING.primary,
                          }}
                          className={cn(
                            'type-mono-label text-xs px-2.5 py-0.5 rounded-full font-medium inline-block text-center border',
                            step.status === 'allow' &&
                              'bg-allow/15 border-allow/30 text-allow',
                            step.status === 'approve' &&
                              'bg-approve/15 border-approve/30 text-approve'
                          )}
                        >
                          {step.pill}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {!isResolved && (
                      <span className="type-mono-label text-xs px-2.5 py-0.5 text-mute/30 font-mono">
                        PENDING
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Status Caption */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-mute">
          <span>SAFE HARNESS: DETERMINISTIC</span>
          <span className="text-brass">ZERO API KEYS EXPOSED</span>
        </div>
      </div>
    </div>
  );
}

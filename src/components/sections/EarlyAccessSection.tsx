// src/components/sections/EarlyAccessSection.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Container, SectionLabel } from '@/components/layout';
import { Reveal } from '@/components/ui';
import { ReinLine } from '@/components/motif';
import { submitEarlyAccess, type EarlyAccessResult } from '@/lib/early-access';
import { cn } from '@/lib/utils';

export function EarlyAccessSection() {
  const shouldReduceMotion = useReducedMotion();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [intent, setIntent] = React.useState('');
  const [honeypot, setHoneypot] = React.useState('');

  const [status, setStatus] = React.useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [feedbackMessage, setFeedbackMessage] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [isDevNotice, setIsDevNotice] = React.useState(false);

  const lastSubmitTimeRef = React.useRef<number>(0);
  const successContainerRef = React.useRef<HTMLDivElement>(null);

  // Focus management: move focus to success container when submission succeeds
  React.useEffect(() => {
    if (status === 'success' && successContainerRef.current) {
      successContainerRef.current.focus();
    }
  }, [status]);

  const validateEmail = (val: string): string => {
    const trimmed = val.trim();
    if (!trimmed) {
      return 'Please enter your work email.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return 'Please enter a valid work email address.';
    }
    return '';
  };

  const handleEmailBlur = () => {
    const err = validateEmail(email);
    setEmailError(err);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setIntent('');
    setHoneypot('');
    setEmailError('');
    setFeedbackMessage('');
    setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Anti-spam honeypot
    if (honeypot.trim().length > 0) {
      setStatus('success');
      return;
    }

    // Client-side rate limiting (4s threshold)
    const now = Date.now();
    if (now - lastSubmitTimeRef.current < 4000) {
      setStatus('error');
      setFeedbackMessage('Please wait a few seconds before submitting again.');
      return;
    }

    // Inline email validation check
    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      return;
    }

    setEmailError('');
    setFeedbackMessage('');
    setStatus('submitting');
    lastSubmitTimeRef.current = now;

    try {
      const res: EarlyAccessResult = await submitEarlyAccess({
        name: name.trim() || undefined,
        email: email.trim(),
        company: company.trim() || undefined,
        intent: intent.trim() || undefined,
      });

      if (res.success) {
        setStatus('success');
        setFeedbackMessage(res.message);
        setIsDevNotice(Boolean(res.isDevNotice));
      } else {
        setStatus('error');
        setFeedbackMessage(
          res.message || 'Something went wrong. Please try again.'
        );
      }
    } catch {
      setStatus('error');
      setFeedbackMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section
      id="early-access"
      tabIndex={-1}
      className="scroll-mt-24 relative bg-ink text-paper py-24 md:py-32 lg:py-40 border-t border-white/10 focus:outline-none overflow-hidden"
      aria-label="Get Early Access"
    >
      {/* Background Architectural Rein Line Running Down into the Section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-40">
        <ReinLine
          orientation="vertical"
          length={120}
          nodePosition={0.5}
          color="var(--color-brass)"
        />
      </div>

      <Container className="relative z-10">
        <div className="max-w-[72ch] mx-auto text-center mb-10 md:mb-14">
          <Reveal>
            <div className="flex justify-center mb-6">
              <SectionLabel dark>Early access</SectionLabel>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="type-display text-paper tracking-tight mb-4 font-medium">
              Describe the work. Bridle builds the rest.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="type-body-lg text-mute max-w-[58ch] mx-auto leading-relaxed mb-5">
              Join the early access list. We&apos;re building Bridle now, and early members will help shape it.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-mute font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-brass flex-shrink-0" aria-hidden="true" />
              <span>
                Early access to Bridle as it&apos;s built, occasional product updates, and a say in what we build first. No spam.
              </span>
            </div>
          </Reveal>
        </div>

        {/* Early Access Form Card */}
        <Reveal delay={0.3}>
          <div className="max-w-[560px] mx-auto rounded-[6px] border border-white/15 bg-ink-2/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xs relative">
            {/* Rein line running into the form and ending at a single node beside the action */}
            <div
              className="hidden sm:flex items-center gap-2 absolute -left-20 bottom-12 pointer-events-none"
              aria-hidden="true"
            >
              <div className="w-16 h-px bg-brass/40" />
              <div className="w-2.5 h-2.5 rounded-full border border-brass bg-ink flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-brass" />
              </div>
            </div>

            {status === 'success' ? (
              <motion.div
                ref={successContainerRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="py-8 text-center space-y-4 focus:outline-none"
              >
                <div className="w-12 h-12 rounded-full border border-brass/50 bg-brass/10 text-brass flex items-center justify-center mx-auto text-lg shadow-sm">
                  ✓
                </div>

                <h3 className="type-h3 text-paper text-xl sm:text-2xl font-medium tracking-tight">
                  You&apos;re on the list. We&apos;ll be in touch as Bridle takes shape.
                </h3>

                <p className="type-body text-mute text-sm max-w-[48ch] mx-auto leading-relaxed">
                  Want to tell us more about what you&apos;d automate? Reply to our email when it arrives.
                </p>

                {isDevNotice && (
                  <div className="mt-4 p-3 rounded-[3px] bg-white/5 border border-white/10 text-xs font-mono text-mute/80 text-left max-w-[460px] mx-auto">
                    <span className="text-brass font-semibold">
                      [Dev Notice]:
                    </span>{' '}
                    Endpoint unset. Submission logged to console during local development.
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="type-mono-label text-xs text-mute hover:text-paper underline underline-offset-4 cursor-pointer transition-colors"
                  >
                    Submit another response
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Honeypot anti-spam field */}
                <div aria-hidden="true" style={{ display: 'none' }}>
                  <label htmlFor="early-access-hp">Leave this field blank</label>
                  <input
                    id="early-access-hp"
                    name="_hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* 1. Name Field (Optional) */}
                <div>
                  <label
                    htmlFor="early-access-name"
                    className="block type-mono-label text-xs text-mute mb-1.5 uppercase tracking-wider"
                  >
                    Name <span className="text-mute/50 lowercase">(optional)</span>
                  </label>
                  <input
                    id="early-access-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    disabled={status === 'submitting'}
                    className="w-full px-4 py-2.5 min-h-[44px] rounded-md bg-ink border border-white/15 hover:border-white/30 text-paper placeholder:text-mute/40 text-[16px] font-sans transition-[border-color,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:border-transparent disabled:opacity-60"
                  />
                </div>

                {/* 2. Work Email Field (Required) */}
                <div>
                  <label
                    htmlFor="early-access-email"
                    className="block type-mono-label text-xs text-mute mb-1.5 uppercase tracking-wider"
                  >
                    Work email <span className="text-brass">*</span>
                  </label>
                  <input
                    id="early-access-email"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(emailError)}
                    aria-describedby={emailError ? 'email-error' : undefined}
                    autoComplete="email"
                    value={email}
                    onBlur={handleEmailBlur}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="jane@company.com"
                    disabled={status === 'submitting'}
                    className={cn(
                      'w-full px-4 py-2.5 min-h-[44px] rounded-md bg-ink border text-paper placeholder:text-mute/40 text-[16px] font-sans transition-[border-color,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:border-transparent disabled:opacity-60',
                      emailError
                        ? 'border-block'
                        : 'border-white/15 hover:border-white/30'
                    )}
                  />
                  {emailError && (
                    <p
                      id="email-error"
                      role="alert"
                      aria-live="polite"
                      className="mt-1.5 text-xs text-block font-mono"
                    >
                      {emailError}
                    </p>
                  )}
                </div>

                {/* 3. Company Field (Optional) */}
                <div>
                  <label
                    htmlFor="early-access-company"
                    className="block type-mono-label text-xs text-mute mb-1.5 uppercase tracking-wider"
                  >
                    Company <span className="text-mute/50 lowercase">(optional)</span>
                  </label>
                  <input
                    id="early-access-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Corp"
                    disabled={status === 'submitting'}
                    className="w-full px-4 py-2.5 min-h-[44px] rounded-md bg-ink border border-white/15 hover:border-white/30 text-paper placeholder:text-mute/40 text-[16px] font-sans transition-[border-color,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:border-transparent disabled:opacity-60"
                  />
                </div>

                {/* 4. What would you want Bridle to automate? (Optional textarea, 2 rows) */}
                <div>
                  <label
                    htmlFor="early-access-intent"
                    className="block type-mono-label text-xs text-mute mb-1.5 uppercase tracking-wider"
                  >
                    What would you want Bridle to automate?{' '}
                    <span className="text-mute/50 lowercase">(optional)</span>
                  </label>
                  <textarea
                    id="early-access-intent"
                    name="intent"
                    rows={2}
                    autoComplete="off"
                    value={intent}
                    onChange={(e) => setIntent(e.target.value)}
                    placeholder="For example: handle refund requests, book appointments, update our CRM"
                    disabled={status === 'submitting'}
                    className="w-full px-4 py-2.5 rounded-md bg-ink border border-white/15 hover:border-white/30 text-paper placeholder:text-mute/40 text-[16px] font-sans transition-[border-color,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:border-transparent resize-y disabled:opacity-60"
                  />
                </div>

                {/* Error Banner if submission failed (calm, preserves entered data, offers retry) */}
                {status === 'error' && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="p-3.5 rounded-[3px] bg-block/10 border border-block/30 text-xs text-paper flex items-start gap-2.5"
                  >
                    <span className="text-block font-mono font-bold mt-0.5 select-none">
                      !
                    </span>
                    <div className="flex-1">
                      <p className="font-medium">
                        {feedbackMessage ||
                          'Something went wrong while connecting.'}
                      </p>
                      <p className="text-mute mt-0.5">
                        Your entered details have been preserved. Please try
                        submitting again.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Action Area */}
                <div className="pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className={cn(
                        'group w-full sm:w-auto inline-flex items-center justify-center font-sans font-medium text-base transition-[transform,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] min-h-[48px] px-8 py-2.5 cursor-pointer select-none touch-manipulation rounded-full shadow-xs',
                        'bg-paper text-ink [@media(hover:hover)]:hover:bg-paper-2 active:scale-[0.97]',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
                        status === 'submitting' &&
                          'opacity-70 cursor-not-allowed'
                      )}
                    >
                      {status === 'submitting' ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-ink"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>Joining list...</span>
                        </>
                      ) : (
                        <span>Get Early Access</span>
                      )}
                    </button>

                    <span className="type-mono-label text-xs text-mute/80">
                      Join the early access list
                    </span>
                  </div>

                  {/* Privacy note */}
                  <p className="type-body text-mute text-xs pt-3 leading-relaxed">
                    By submitting this form, you agree to our{' '}
                    <Link
                      href="/privacy"
                      className="underline underline-offset-2 hover:text-paper transition-colors"
                    >
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="/terms"
                      className="underline underline-offset-2 hover:text-paper transition-colors"
                    >
                      Terms of Use
                    </Link>
                    . We&apos;ll only use your email to contact you about Bridle. We will never sell your data.
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

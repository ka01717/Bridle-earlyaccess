'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Container } from './Container';
import { Button } from '@/components/ui';
import { SITE } from '@/content/site';
import { cn } from '@/lib/utils';

export function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const getNavHref = (href: string) => (isHome ? href : `/${href}`);

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>('');
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const drawerRef = React.useRef<HTMLDivElement>(null);

  // Monitor scroll for subtle sticky header transition (> 8px)
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section scroll spy
  React.useEffect(() => {
    if (!isHome) return;

    const sectionIds = [
      'how-it-works',
      'integrations',
      'control',
      'vision',
      'early-access',
    ];

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    handleScrollSpy();
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [isHome]);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileOpen]);

  // Focus trap & Escape key handler for mobile drawer
  React.useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMobileOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements.length) return;

        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  // Auto-focus first link when drawer opens
  React.useEffect(() => {
    if (mobileOpen && drawerRef.current) {
      const firstFocusable = drawerRef.current.querySelector<HTMLElement>('button, [href]');
      firstFocusable?.focus();
    }
  }, [mobileOpen]);

  const closeMenu = () => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-[background-color,border-color,padding,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
          isScrolled
            ? 'bg-paper/85 backdrop-blur-xl saturate-180 border-b border-ink/10 py-3.5 shadow-[0_1px_0_0_rgba(13,14,17,0.03)]'
            : 'bg-transparent border-b border-transparent py-5'
        )}
      >
        <Container className="flex items-center justify-between">
          {/* Wordmark + Rein Mark */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 min-h-[44px] -ml-2 px-2 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brass)]"
            aria-label="Bridle Home"
          >
            {/* Small rein line mark: horizontal line passing through a small ring */}
            <svg
              width="24"
              height="14"
              viewBox="0 0 24 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="flex-shrink-0"
            >
              <line
                x1="1"
                y1="7"
                x2="8"
                y2="7"
                stroke="var(--color-brass)"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
              <circle
                cx="12"
                cy="7"
                r="3"
                stroke="var(--color-brass)"
                strokeWidth="1.25"
                fill="none"
              />
              <line
                x1="16"
                y1="7"
                x2="23"
                y2="7"
                stroke="var(--color-brass)"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-sans font-semibold text-lg tracking-tight text-ink group-hover:text-ink-2 transition-colors">
              {SITE.name}
            </span>
          </Link>

          {/* Desktop Center / Right Links */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium"
            aria-label="Primary navigation"
          >
            {SITE.nav.map((item) => {
              const targetId = item.href.replace('#', '');
              const isActive = isHome && activeSection === targetId;
              const href = getNavHref(item.href);

              return (
                <a
                  key={item.href}
                  href={href}
                  className={cn(
                    'relative transition-colors duration-150 py-2',
                    isActive
                      ? 'text-ink font-semibold'
                      : 'text-graphite hover:text-ink'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brass rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button href={getNavHref('#early-access')} size="lg">
              {SITE.cta.primary}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center w-11 h-11 -mr-2 rounded-full text-ink [@media(hover:hover)]:hover:text-ink-2 active:scale-[0.96] touch-manipulation transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brass)] cursor-pointer"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileOpen ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M5 5L15 15M15 5L5 15" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M4 6H16M4 10H16M4 14H16" />
                </svg>
              )}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Full-Screen Navigation Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: -6 }}
            transition={{
              duration: 0.22,
              ease: [0.32, 0.72, 0, 1], // Emil Kowalski drawer curve
            }}
            className="fixed inset-0 z-50 flex flex-col bg-paper/98 backdrop-blur-2xl saturate-180 text-ink p-6 sm:p-8 overflow-y-auto pt-[max(1.5rem,env(safe-area-inset-top,0px))] pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]"
          >
            {/* Header inside mobile drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-ink/10">
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center gap-2.5"
              >
                <svg
                  width="24"
                  height="14"
                  viewBox="0 0 24 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <line
                    x1="1"
                    y1="7"
                    x2="8"
                    y2="7"
                    stroke="var(--color-brass)"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="3"
                    stroke="var(--color-brass)"
                    strokeWidth="1.25"
                    fill="none"
                  />
                  <line
                    x1="16"
                    y1="7"
                    x2="23"
                    y2="7"
                    stroke="var(--color-brass)"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="font-sans font-semibold text-lg tracking-tight text-ink">
                  {SITE.name}
                </span>
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                className="inline-flex items-center justify-center w-11 h-11 -mr-2 rounded-full text-ink active:scale-[0.96] touch-manipulation transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brass)] cursor-pointer"
                aria-label="Close navigation menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M5 5L15 15M15 5L5 15" />
                </svg>
              </button>
            </div>

            {/* Large Nav Links */}
            <nav
              className="flex-1 flex flex-col justify-center gap-6 py-8"
              aria-label="Mobile navigation links"
            >
              {SITE.nav.map((item) => {
                const targetId = item.href.replace('#', '');
                const isActive = isHome && activeSection === targetId;
                const href = getNavHref(item.href);

                return (
                  <a
                    key={item.href}
                    href={href}
                    onClick={closeMenu}
                    className={cn(
                      'type-h2 transition-colors py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brass)]',
                      isActive ? 'text-brass font-semibold' : 'text-ink hover:text-graphite'
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Bottom CTA in Drawer */}
            <div className="pt-6 border-t border-ink/10 flex flex-col gap-4">
              <Button
                href={getNavHref('#early-access')}
                size="lg"
                className="w-full justify-center"
                onClick={closeMenu}
              >
                {SITE.cta.primary}
              </Button>
              <div className="type-mono-label text-mute text-center pt-2">
                {`Early-stage infrastructure // Describe the work. Bridle builds the rest.`}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

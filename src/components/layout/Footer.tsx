// src/components/layout/Footer.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from './Container';
import { siteConfig } from '@/config';
import { SITE } from '@/content/site';

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const getNavHref = (hash: string) => (isHome ? hash : `/${hash}`);

  const hasContactEmail = Boolean(
    siteConfig.contactEmail && siteConfig.contactEmail.trim().length > 0
  );

  return (
    <footer className="bg-ink text-paper border-t border-white/10 pt-16 pb-[max(4rem,calc(2rem+env(safe-area-inset-bottom,0px)))] text-xs">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Wordmark & Tagline */}
          <div className="md:col-span-6 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brass)]"
              aria-label="Bridle Home"
            >
              {/* Rein line brand mark */}
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
              <span className="font-sans font-semibold text-lg tracking-tight text-paper">
                {SITE.name}
              </span>
            </Link>

            <p className="type-body text-mute text-sm max-w-[36ch] leading-relaxed">
              {SITE.tagline}
            </p>

            {hasContactEmail && (
              <div className="pt-2">
                <span className="type-mono-label text-xs text-mute/80 block mb-1 tracking-wider">
                  Company Contact
                </span>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="font-mono text-xs text-brass hover:underline underline-offset-4"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
            )}

            <div className="flex items-center gap-3 pt-1 text-mute text-xs font-medium">
              <Link
                href="/privacy"
                className="hover:text-paper transition-colors py-1"
              >
                Privacy
              </Link>
              <span className="text-white/20 select-none" aria-hidden="true">
                ·
              </span>
              <Link
                href="/terms"
                className="hover:text-paper transition-colors py-1"
              >
                Terms
              </Link>
            </div>
          </div>

          {/* Col 2: Navigation Anchor Links */}
          <div className="md:col-span-6 flex flex-col md:items-end justify-between space-y-6">
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-center gap-x-6 gap-y-3 font-medium text-mute"
            >
              <a
                href={getNavHref('#how-it-works')}
                className="hover:text-paper transition-colors py-1"
              >
                How it works
              </a>
              <a
                href={getNavHref('#integrations')}
                className="hover:text-paper transition-colors py-1"
              >
                Integrations
              </a>
              <a
                href={getNavHref('#control')}
                className="hover:text-paper transition-colors py-1"
              >
                Control
              </a>
              <a
                href={getNavHref('#prove')}
                className="hover:text-paper transition-colors py-1"
              >
                Test & prove
              </a>
              <a
                href={getNavHref('#use-cases')}
                className="hover:text-paper transition-colors py-1"
              >
                Built for
              </a>
              <a
                href={getNavHref('#vision')}
                className="hover:text-paper transition-colors py-1"
              >
                Vision
              </a>
              <a
                href={getNavHref('#early-access')}
                className="text-brass hover:text-paper transition-colors py-1"
              >
                Get Early Access
              </a>
            </nav>

            <div className="flex items-center gap-4 text-mute/60 font-mono text-xs">
              <Link
                href="/design-system"
                className="hover:text-mute transition-colors underline underline-offset-4"
              >
                Design System
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Line: Copyright & Status Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-mute text-xs font-mono">
          <div className="flex items-center gap-2">
            <span>© 2026 Bridle</span>
            <span>·</span>
            <span>All rights reserved.</span>
          </div>

          <div className="text-mute/80">
            Bridle is in early development.
          </div>
        </div>
      </Container>
    </footer>
  );
}

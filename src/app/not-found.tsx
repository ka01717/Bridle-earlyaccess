import * as React from 'react';
import Link from 'next/link';
import { Container, SectionLabel } from '@/components/layout';
import { Button } from '@/components/ui';
import { ReinLine } from '@/components/motif';
import { SITE } from '@/content/site';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between selection:bg-brass/20 selection:text-ink">
      {/* Minimal Top Header */}
      <header className="border-b border-ink/10 py-5">
        <Container className="flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2.5 min-h-[44px] -ml-2 px-2 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brass)]"
            aria-label="Bridle Home"
          >
            {/* Small rein line mark */}
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

          <Link
            href="/"
            className="type-mono-label text-xs text-graphite hover:text-ink transition-colors underline underline-offset-4"
          >
            Back to site
          </Link>
        </Container>
      </header>

      {/* Main 404 Hero */}
      <main className="flex-1 flex items-center justify-center py-20">
        <Container className="max-w-[560px] text-center">
          <div className="flex justify-center mb-6">
            <SectionLabel>404 // Not found</SectionLabel>
          </div>

          <h1 className="type-display text-ink font-medium tracking-tight mb-4">
            Page not found
          </h1>

          <p className="type-body text-graphite text-base leading-relaxed mb-8 max-w-[44ch] mx-auto">
            The page you are looking for doesn&apos;t exist or may have been moved.
          </p>

          {/* Visual Rein Line Motif */}
          <div className="my-8 flex justify-center">
            <ReinLine
              orientation="horizontal"
              length={180}
              nodePosition={0.5}
              animate={true}
            />
          </div>

          <div className="flex justify-center">
            <Button href="/" size="lg">
              Return to Home
            </Button>
          </div>
        </Container>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-ink/10 py-6 text-xs font-mono text-mute">
        <Container className="flex items-center justify-between">
          <span>© 2026 Bridle</span>
          <span>404_PAGE_NOT_FOUND</span>
        </Container>
      </footer>
    </div>
  );
}

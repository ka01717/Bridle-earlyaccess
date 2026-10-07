import * as React from 'react';
import type { Metadata } from 'next';
import { Navbar, Footer, Container } from '@/components/layout';
import { siteConfig } from '@/config';

export const metadata: Metadata = {
  title: 'Terms of Use — Bridle',
  description: 'Terms of Use governing the use of the Bridle website and early-access list.',
  alternates: {
    canonical: `${siteConfig.siteUrl}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col selection:bg-brass/20 selection:text-ink">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none py-16 md:py-24">
        <Container className="max-w-[65ch]">
          <header className="mb-12 border-b border-ink/10 pb-8">
            <h1 className="type-h2 font-medium tracking-tight mb-3 text-ink">
              Terms of Use
            </h1>
            <p className="type-mono-label text-xs text-graphite">
              Last updated: [[DATE OF PUBLISH]]
            </p>
          </header>

          <article className="space-y-10 text-graphite text-base leading-relaxed font-sans">
            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                About these terms
              </h2>
              <p>
                These Terms of Use (&quot;Terms&quot;) govern your use of this website, operated by [[LEGAL ENTITY NAME OR &quot;Bridle&quot; IF NOT YET INCORPORATED]] (&quot;Bridle&quot;, &quot;we&quot;, &quot;us&quot;). By using this website, you agree to these Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                What this website is
              </h2>
              <p>
                This website is currently a marketing and early-access website for Bridle. It is not the Bridle product itself, which has not yet launched. Descriptions of Bridle&apos;s planned capabilities on this website describe our vision and what we are building, not features that currently exist or are available for use.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Early access / waitlist
              </h2>
              <p>If you submit your details through our early-access form:</p>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-graphite/60">
                <li>You are joining a list of people interested in Bridle. This does not guarantee you access to any current or future product.</li>
                <li>Access, if and when offered, may be limited, delayed, or subject to change.</li>
                <li>Joining the waitlist is not a purchase and does not create any contract for goods or services.</li>
                <li>Product features, timelines, and availability described on this website may change at any time without notice.</li>
                <li>We may contact you about your early-access request and about Bridle&apos;s development. We will handle any separate marketing communications in accordance with our Privacy Policy.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Acceptable use
              </h2>
              <p>You agree not to use this website to:</p>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-graphite/60">
                <li>Submit false, misleading, or fraudulent information</li>
                <li>Attempt to gain unauthorized access to any part of the website or its underlying systems</li>
                <li>Interfere with the operation of the website (for example, through automated scraping, spam, or denial-of-service attempts)</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Intellectual property
              </h2>
              <p>
                The content on this website, including text, design, and branding, belongs to Bridle unless otherwise stated. You may not copy, reproduce, or use it without our permission, except as necessary to view the website normally.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Information you submit
              </h2>
              <p>
                Any information you submit through our forms is handled as described in our Privacy Policy. By submitting the early-access form, you confirm the information you provide is accurate to your knowledge.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Third-party services
              </h2>
              <p>
                This website may use third-party services to operate (for example, email delivery). We are not responsible for the practices of third-party services beyond our use of them as described in our Privacy Policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Availability
              </h2>
              <p>
                We do not guarantee that this website will be available at all times or free of errors. We may change, suspend, or discontinue any part of the website at any time.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Disclaimers
              </h2>
              <p>
                This website and its content are provided &quot;as is&quot; without warranties of any kind, to the extent permitted by law. We do not guarantee that any planned Bridle product feature will be built, launched, or work as described.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Limitation of liability
              </h2>
              <p>
                To the extent permitted by applicable law, Bridle will not be liable for any indirect, incidental, or consequential damages arising from your use of this website. Nothing in these Terms limits liability that cannot legally be limited.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Changes to these terms
              </h2>
              <p>
                We may update these Terms as Bridle develops. We will update the &quot;Last updated&quot; date when we do.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Governing law
              </h2>
              <p>
                These Terms are governed by the laws of [[GOVERNING LAW / JURISDICTION — e.g. &quot;England and Wales&quot; — TO BE CONFIRMED]], without regard to conflict of law principles.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Contact
              </h2>
              <p>
                Questions about these Terms can be sent to{' '}
                <a
                  href="mailto:k.bridleteam@gmail.com"
                  className="text-brass hover:underline underline-offset-4"
                >
                  k.bridleteam@gmail.com
                </a>
                .
              </p>
            </section>

            <div className="pt-8 border-t border-ink/10 text-mute text-sm italic">
              <p>
                This is a lightweight Terms of Use appropriate for an early-stage marketing and early-access website. It will be expanded as Bridle&apos;s product and company structure develop. This is not a substitute for professional legal advice.
              </p>
            </div>
          </article>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

import * as React from 'react';
import type { Metadata } from 'next';
import { Navbar, Footer, Container } from '@/components/layout';
import { siteConfig } from '@/config';

export const metadata: Metadata = {
  title: 'Privacy Policy — Bridle',
  description: 'Privacy Policy for the Bridle website and early-access list.',
  alternates: {
    canonical: `${siteConfig.siteUrl}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col selection:bg-brass/20 selection:text-ink">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none py-16 md:py-24">
        <Container className="max-w-[65ch]">
          <header className="mb-12 border-b border-ink/10 pb-8">
            <h1 className="type-h2 font-medium tracking-tight mb-3 text-ink">
              Privacy Policy
            </h1>
            <p className="type-mono-label text-xs text-graphite">
              Last updated: 29/09/2026
            </p>
          </header>

          <article className="space-y-10 text-graphite text-base leading-relaxed font-sans">
            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Who we are
              </h2>
              <p>
                Bridle (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates this website at [[WEBSITE DOMAIN]]. Bridle is an early-stage company building AI agent infrastructure. This website is currently a marketing and early-access site; the full Bridle product has not yet launched.
              </p>
              <p>
                If you have questions about this policy or your personal information, contact us at{' '}
                <a
                  href="mailto:k.bridleteam@gmail.com"
                  className="text-brass hover:underline underline-offset-4"
                >
                  k.bridleteam@gmail.com
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Information we collect
              </h2>
              <p>If you join our early-access list, we collect:</p>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-graphite/60">
                <li>Your name (optional)</li>
                <li>Your email address (required)</li>
                <li>Your company name (optional)</li>
                <li>A free-text description of what you&apos;d want to automate, if you choose to provide one (optional)</li>
              </ul>
              <p>
                We do not currently use analytics, tracking cookies, or advertising technology on this website.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                How we collect it
              </h2>
              <p>
                We collect this information directly from you when you submit the early-access form on this website.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Why we collect it
              </h2>
              <p>We use this information to:</p>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-graphite/60">
                <li>Respond to your early-access request</li>
                <li>Contact you about Bridle&apos;s development and early access</li>
                <li>Understand what kinds of work people want to automate, to help guide what we build</li>
              </ul>
              <p>
                We do not sell your personal information, and we do not use it for advertising.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Legal basis for processing
              </h2>
              <p>
                Where applicable law requires a legal basis for processing (for example, under UK GDPR or EU GDPR), we rely on:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-graphite/60">
                <li>Your consent, when you voluntarily submit the early-access form</li>
                <li>Our legitimate interest in responding to your request and developing our product</li>
              </ul>
              <p>
                You can withdraw consent at any time by contacting us at{' '}
                <a
                  href="mailto:k.bridleteam@gmail.com"
                  className="text-brass hover:underline underline-offset-4"
                >
                  k.bridleteam@gmail.com
                </a>{' '}
                and asking us to delete your information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                How we store and share your information
              </h2>
              <p>
                Submissions are stored securely and are only accessible to the Bridle team. We use the following third-party service to help operate this website:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-graphite/60">
                <li>
                  <strong className="font-medium text-ink">Resend</strong> (resend.com), to send email notifications when someone joins the early-access list. [[CONFIRM: any other third-party service actually used, e.g. a webhook destination — name it here, or remove this line if none.]]
                </li>
              </ul>
              <p>
                We do not share your information with any other third party, and we do not sell it.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                International processing
              </h2>
              <p>
                Depending on where you are located and where our service providers operate, your information may be processed in a country other than your own, including the United States or United Kingdom. Where required by applicable law, we take reasonable steps to ensure appropriate safeguards are in place for such transfers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                How long we keep your information
              </h2>
              <p>
                We keep early-access information for as long as we are actively developing Bridle and may reasonably want to contact you about it, or until you ask us to delete it, whichever comes first.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Security
              </h2>
              <p>
                We take reasonable steps to protect your information, including restricting access to submitted data and not exposing it publicly. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Your privacy rights
              </h2>
              <p>
                Depending on where you live, you may have rights under applicable law, which may include the right to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-graphite/60">
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to or restrict certain processing</li>
                <li>Request a copy of your information in a portable format</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p>
                This may include rights under UK GDPR, EU GDPR, and certain US state privacy laws (such as California, Virginia, Colorado, Connecticut, or Utah), to the extent those laws apply to you. To exercise any of these rights, contact us at{' '}
                <a
                  href="mailto:k.bridleteam@gmail.com"
                  className="text-brass hover:underline underline-offset-4"
                >
                  k.bridleteam@gmail.com
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Children
              </h2>
              <p>
                This website is intended for business use and is not directed at children. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Changes to this policy
              </h2>
              <p>
                We may update this policy as Bridle develops. We will update the &quot;Last updated&quot; date above when we do. Continued use of the website after changes means you accept the updated policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="type-h3 text-ink font-medium tracking-tight">
                Contact us
              </h2>
              <p>
                If you have any questions about this policy or your personal information, contact us at{' '}
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
                This policy describes our current practices as an early-stage startup. It will be expanded as Bridle&apos;s product and company structure develop. This is not a substitute for professional legal advice.
              </p>
            </div>
          </article>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

import type { Metadata } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import { siteConfig } from '@/config';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: 'Bridle — Describe the work. Bridle builds the rest.',
    template: '%s | Bridle',
  },
  description:
    'Tell Bridle what you need done. It builds the AI agent and the infrastructure to run it safely: connections, permissions, approvals, testing and verification. Designed so you never have to touch an API key.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Bridle — Describe the work. Bridle builds the rest.',
    description:
      'Tell Bridle what you need done. It builds the AI agent and the infrastructure to run it safely: connections, permissions, approvals, testing and verification.',
    url: siteConfig.siteUrl,
    siteName: 'Bridle',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bridle — Describe the work. Bridle builds the rest.',
    description:
      'Tell Bridle what you need done. It builds the AI agent and the infrastructure to run it safely: connections, permissions, approvals, testing and verification.',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {/* Accessible Skip-to-Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-2.5 focus:bg-ink focus:text-paper focus:border focus:border-brass focus:rounded-full focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-brass text-sm font-medium transition-all"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

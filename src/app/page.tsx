import * as React from 'react';
import { Navbar, Footer } from '@/components/layout';
import { Hero } from '@/components/hero';
import {
  ProblemSection,
  ConceptSection,
  HowItWorksSection,
  IntegrationsSection,
  ControlSection,
  TestAndProveSection,
  UseCasesSection,
  VisionSection,
  EarlyAccessSection,
} from '@/components/sections';

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col selection:bg-brass/20 selection:text-ink">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* Hero Section */}
        <Hero />

        {/* 1) The Problem Section */}
        <ProblemSection />

        {/* 2) The Bridle Concept Section (You vs Bridle) */}
        <ConceptSection />

        {/* 3) How It Works Section (Describe → Connect → Build → Test → Prove → Deploy) */}
        <HowItWorksSection />

        {/* 4) Integrations Section (Invisible Integrations, Scope Boundaries, Connect Anything, Fix It For Me) */}
        <IntegrationsSection />

        {/* 5) The Control Section (Give AI autonomy. Keep humans in control.) */}
        <ControlSection />

        {/* 6) Test and Prove Section (Test Before Deploy, Outcome Verification, Deploy) */}
        <TestAndProveSection />

        {/* The Use Cases Section */}
        <UseCasesSection />

        {/* The Vision Section */}
        <VisionSection />

        {/* The Early Access CTA Section */}
        <EarlyAccessSection />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}

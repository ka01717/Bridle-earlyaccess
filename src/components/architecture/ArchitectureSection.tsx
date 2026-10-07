'use client';

import * as React from 'react';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';

/**
 * =========================================================================
 * ARCHITECTURE SECTION (PREVIOUS LEAD) -> RETIRED IN FAVOR OF HOW IT WORKS
 * =========================================================================
 * As specified in the updated BRIDLE_BRIEF positioning, the lead story is now
 * the 6-step How It Works flow (Describe -> Connect -> Build -> Test -> Prove -> Deploy).
 * 
 * The interactive ArchitectureSimulation component has been preserved and moved
 * to the Control section (src/components/sections/UseCasesSection.tsx #control-simulation)
 * where it will be reused in the upcoming prompt sequence.
 * 
 * This component delegates to HowItWorksSection as a compatibility layer so nothing breaks.
 */
export function ArchitectureSection() {
  return <HowItWorksSection />;
}

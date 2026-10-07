// src/content/site.ts — Shared copy constants

export const SITE = {
  name: 'Bridle',
  tagline: 'Describe the work. Bridle builds the rest.',
  description:
    'Tell Bridle what you need done. It builds the AI agent and the infrastructure to run it safely: connections, permissions, approvals, testing and verification. Designed so you never have to touch an API key.',

  coreLines: {
    hero: 'Describe the work. Bridle builds the rest.',
    control: 'Give AI autonomy. Keep humans in control.',
  },

  nav: [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'Control', href: '#control' },
    { label: 'Vision', href: '#vision' },
  ],

  cta: {
    primary: 'Get Early Access',
    secondary: 'See how it works',
  },
} as const;

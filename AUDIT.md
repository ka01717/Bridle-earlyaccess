# Bridle Website — Comprehensive Audit Report

**Date:** 2026-09-28  
**Scope:** Architecture, Section Structure, Copy, Navigation, Forms, Component Inventory, Motion & Animation, Responsiveness (1440px, 768px, 390px), and Honesty/Compliance.

---

## 1. Current Section Order

The landing page follows a unified single-page layout within `<main id="main-content">` wrapped by a sticky `<Navbar />` and `<Footer />`:

1. **Header / Navbar** (`fixed top-0 z-50`, scroll-reactive backdrop blur & saturation, desktop nav + accessible mobile slide drawer).
2. **Hero Section** (`#main-content`, two-column: headline `"Describe the work. Bridle builds the rest."`, subcopy, CTAs, and interactive typing prompt with resolved checklist visual).
3. **Problem Section** (`#problem`, light paper: `"The problem"` — `"AI can do the work. Putting it in charge is the hard part."` with 6 prerequisite rows: Access, Permissions, Connections, Security, Testing, Oversight).
4. **Concept Section** (`#concept`, dark ink: `"What Bridle does"` — `"You describe the work. Bridle builds the agent and everything it needs."` with two-column `"You"` vs `"Bridle"` comparison).
5. **How It Works Section** (`#how-it-works`, light paper: `"How it works"` — `"From description to safe deployment in six steps."` with 6 interactive steps: 01 Describe, 02 Connect, 03 Build, 04 Test, 05 Prove, 06 Deploy).
6. **Integrations Section** (`#integrations`, light paper: `"Integrations"` — `"Connect your apps. Bridle configures the rest."` with Block A Invisible Integrations, Block B Scope Boundaries, Block C Connect Anything, Block D Fix It For Me).
7. **Platform / Features Section** (`#platform`, light paper: `"Platform"` — `"Control, built into every action."` with 7 bento capability cards).
8. **Control Section** (`#control`, dark ink: `"Control"` — `"Give AI autonomy. Keep humans in control."` with the refitted 5-node interactive architecture simulation, £30/£120/£900 scenarios, Pause agent / Emergency stop, Audit trail, and 4 governance cards).
9. **Use Cases Section** (`#use-cases`, light paper-2: `"Use cases"` — `"Designed for the places agents are heading next."` with 5 domain scenarios).
10. **Vision Section** (`#vision`, dark ink: `"Vision"` — `"From AI that answers, to AI that acts, to AI that operates."` with 3-stage sticky progression and directional roadmap).
11. **Early Access Section** (`#early-access`, dark ink: `"Early access"` — `"Give AI the ability to act. Keep control in your hands."` with early access email signup form).
12. **Footer** (Brand wordmark, rein mark, semantic navigation anchors, company contact `ka01717@surrey.ac.uk`, copyright).

---

## 2. All Headline and CTA Copy

| Section | Eyebrow / Label | Primary Headline (H2) | Subtext / Body Summary | Primary CTA | Secondary CTA |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero** | `Early access · AI workers for real businesses` | *"Describe the work. Bridle builds the rest."* | "Tell Bridle what you need done. It builds the AI agent and the infrastructure to run it safely: connections, permissions, approvals, testing and verification. Designed so you never have to touch an API key." | "Get Early Access" (`#early-access`) | "See how it works" (`#how-it-works`) |
| **Problem** | `The problem` | *"AI can do the work. Putting it in charge is the hard part."* | "Agents can now take real actions. But before one can safely run a real workflow, someone has to give it access, decide what it may do, build the connections, secure the secrets, test the edge cases, and keep watching it. Most businesses don't have an AI infrastructure team." | — | — |
| **Concept** | `What Bridle does` | *"You describe the work. Bridle builds the agent and everything it needs."* | Two-column contrast: You do 3 simple steps; Bridle handles understanding, building, connecting, configuring, testing, verifying, and deploying. | — | — |
| **How It Works** | `How it works` | *"From description to safe deployment in six steps."* | "How Bridle takes an agent from a plain-English request to running in production." Interactive step-through of Describe → Connect → Build → Test → Prove → Deploy. | — | — |
| **Integrations** | `Integrations` | *"Connect your apps. Bridle configures the rest."* | "No API keys, OAuth scopes or tool schemas. Bridle is designed to work out what your agent needs, and only what it needs." | Interactive App Selector (Shopify / Gmail) | — |
| **Platform** | `Platform` | *"Control, built into every action."* | "What Bridle is being built to give every business that deploys AI agents." | Interactive kill switch demo | — |
| **Control** | `Control` | *"Give AI autonomy. Keep humans in control."* | "Every agent Bridle builds runs inside permissions and policies you approve. Important actions can pause for a human, and you can pause or stop any agent instantly." | Interactive simulation: Refund £30, £120, £900, Pause agent, Emergency stop | — |
| **Use Cases** | `Use cases` | *"Designed for the places agents are heading next."* | "Scenarios Bridle is being built for. Every business decides what its agents may do." | 5 Tabbed Domain Scenarios | — |
| **Vision** | `Vision` | *"From AI that answers, to AI that acts, to AI that operates."* | "As AI moves deeper into real operations, the infrastructure around it has to move with it." | — | — |
| **Early Access**| `Early access` | *"Give AI the ability to act. Keep control in your hands."* | "Bridle is in early development. Join the early access list to follow progress and help shape what we build." | Form Submit: "Get Early Access" | — |

---

## 3. Navigation

- **Desktop Navigation Links (`src/content/site.ts` & `src/components/layout/Navbar.tsx`):**
  - `How it works` → `#how-it-works`
  - `Integrations` → `#integrations`
  - `Control` → `#control`
  - `Vision` → `#vision`
  - CTA Button: `Get Early Access` → `#early-access`
- **Mobile Drawer Navigation:**
  - Mirrors desktop navigation anchors with full touch target heights ($\ge 44\text{px}$).
  - Trap-focus support, ESC key dismiss, and smooth scroll handling.
- **Footer Navigation (`src/components/layout/Footer.tsx`):**
  - Semantic list linking to `#how-it-works`, `#integrations`, `#platform`, `#control`, `#use-cases`, `#vision`, and `#early-access`.

---

## 4. Early-Access Form and Fields

- **Form Fields:**
  1. `email` (Required string, client & server regex validation: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
  2. `company` (Optional text string)
  3. `intent` (Optional text string: "What would you want your agents to do?")
- **Submission Architecture:**
  - Client: `src/lib/early-access.ts` issues a `fetch` POST to `/api/early-access`.
  - Server: `src/app/api/early-access/route.ts` appends submissions to `data/early-access-submissions.json`.
  - Email notification: Integrates with Resend if `RESEND_API_KEY` is present; avoids third-party activation email traps.
- **Form States:**
  - `idle`: Ready for user input.
  - `submitting`: Disabled inputs, reduced opacity, button shows submitting indicator.
  - `success`: Displays confirmation: *"Thanks. We'll be in touch."* with lead details.
  - `error`: Inline accessible error banner with retry option.

---

## 5. Existing Components File Inventory

### Layout & Page Roots
- `src/app/layout.tsx` — Global root layout, font definitions (Geist Sans, Geist Mono, Instrument Serif), SEO metadata, OpenGraph, Canonical tags, viewport configuration.
- `src/app/page.tsx` — Main single-page application orchestrating all sections.
- `src/app/globals.css` — Tailwind v4 `@theme inline` design tokens (Paper, Ink, Brass, Status colors, type scales).
- `src/components/layout/Navbar.tsx` — Sticky header, scroll spy, backdrop blur, mobile drawer.
- `src/components/layout/Footer.tsx` — Site footer, copyright, navigation anchors, contact email.
- `src/components/layout/Container.tsx` — Max-width container (`max-w-[75rem]` / 1200px) with responsive horizontal padding.
- `src/components/layout/Section.tsx` — Section boundary wrapper with standard vertical rhythm.
- `src/components/layout/SectionLabel.tsx` — Monospace eyebrow with brass hairline tick accent.

### Sections
- `src/components/hero/Hero.tsx` — Two-column hero container.
- `src/components/hero/HeroVisual.tsx` — Interactive typed prompt and checklist state loop.
- `src/components/sections/ProblemSection.tsx` — 6 prerequisite rows (Access, Permissions, Connections, Security, Testing, Oversight).
- `src/components/sections/ConceptSection.tsx` — Dark ink You vs Bridle comparative visual.
- `src/components/sections/HowItWorksSection.tsx` — 6-step interactive workflow with step detail drawer.
- `src/components/sections/IntegrationsSection.tsx` — Interactive generic app tiles (Shopify/Gmail), scope boundaries, connect anything, and fix-it-for-me card.
- `src/components/sections/FeaturesSection.tsx` — Bento grid of core platform features.
- `src/components/sections/ControlSection.tsx` — Dark ink Control section housing the refitted simulation and 4 governance cards.
- `src/components/sections/UseCasesSection.tsx` — Tabbed domain scenarios (Customer support, Finance, Enterprise).
- `src/components/sections/VisionSection.tsx` — Sticky 3-stage visual & directional roadmap.
- `src/components/sections/EarlyAccessSection.tsx` — Early access conversion card and signup form.
- `src/components/sections/index.ts` — Barrel export for all page sections.

### Architecture & Simulation
- `src/components/architecture/ArchitectureSimulation.tsx` — Interactive 5-node pipeline simulation (Agent → Bridle → Rules you set → Safety checks → Your systems), £30/£120/£900 scenarios, Pause agent & Emergency stop controls, Decision checks panel, and Audit trail.
- `src/components/architecture/ArchitectureSection.tsx` — Backward-compatibility export delegating to HowItWorksSection.
- `src/components/architecture/index.ts` — Barrel export.

### Motif & UI Primitives
- `src/components/motif/ReinLine.tsx` — The signature brass rein line motif with ring-node.
- `src/components/ui/Button.tsx` — Oval capsule buttons (`rounded-full`) with active pointer physics and dark variants (`ButtonDark`).
- `src/components/ui/Card.tsx` — Hairline border card container (`dark` and `light` surfaces).
- `src/components/ui/Badge.tsx` — Monospace badge tag with hairline border.
- `src/components/ui/Reveal.tsx` — Scroll-triggered fade & 12px translation respecting reduced motion.
- `src/components/ui/index.ts` — Barrel export.

### Libraries & Content
- `src/lib/motion.ts` — Spring physics, durations, easing curves.
- `src/lib/utils.ts` — `cn` class merger (clsx + tailwind-merge).
- `src/lib/early-access.ts` — Client-side API client for early access form.
- `src/content/site.ts` — Core copy, brand lines, metadata, and navigation anchors.

---

## 6. Animation Approach

- **Token Foundation (`src/lib/motion.ts`):**
  - Standardized durations: `fast` (150ms), `base` (300ms), `slow` (600ms).
  - Apple-inspired smooth easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
  - Spring configurations: `SPRING.default` (critically damped, bounce 0), `SPRING.snappy` (bounce 0.08, duration 0.35s).
- **Reduced Motion Support (`useReducedMotion`):**
  - Consistently queried across `HeroVisual`, `HowItWorksSection`, `IntegrationsSection`, `ArchitectureSimulation`, and `Reveal`.
  - Renders complete, static states immediately when `prefers-reduced-motion` is active.
- **Physical Feel & Micro-interactions:**
  - Oval buttons use `active:scale-[0.97]` with `duration-100 ease-out` and `touch-manipulation` for immediate tactile feedback.

---

## 7. Responsiveness Review (1440px, 768px, 390px)

- **Desktop (1440px):**
  - Full multi-column grids, horizontal rein-line connections, spacious reading measures (`max-w-[58ch]` to `62ch`), 5-node horizontal simulation layout.
- **Tablet (768px):**
  - Seamless 2-column breakdowns for bento grids, app selector tiles, and comparison columns. No clipped cards.
- **Mobile (390px):**
  - Single-column linear stacking for Blocks A through D in Integrations and Nodes 01 through 05 in Control simulation.
  - All interactive tap targets (buttons, tabs, inputs) satisfy the minimum $\ge 44\text{px}$ touch boundary.
  - Zero horizontal overflow (`document.documentElement.scrollWidth === window.innerWidth`).

---

## 8. Honesty & Ethical Presentation Review

- **Zero Synthetic Customer/Partner Logos:** No fake logos from Google, Stripe, Apple, or Salesforce. All third-party references (Shopify, Gmail) use generic, minimalist text and custom geometric marks with explicit labels (*"Examples. Integrations are being built."*).
- **Zero Fictitious Certifications:** No unearned claims of SOC 2 Type II, ISO 27001, HIPAA, or FedRAMP compliance.
- **Truth in Staging:**
  - Hero visual explicitly labelled `"Illustrative"`.
  - Integrations app tiles labelled `"Examples. Integrations are being built."`
  - Integration resolution panel labelled `"Illustrative. Bridle is designed to determine this automatically."`
  - Roadmap capabilities labelled `"Where we're heading"`.
  - Control simulation labelled `"Illustrative simulation. Thresholds are examples."`
- **Future-Tense Phrasing:** Consistently employs *"Bridle is designed to..."*, *"being built"*, and *"will"*.

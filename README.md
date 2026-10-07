# Bridle

> Describe the work. Bridle builds the rest. Tell Bridle what you need done: it builds the AI agent and the infrastructure to run it safely: connections, permissions, approvals, testing and verification. Designed so you never have to touch an API key.

Bridle is built with Next.js (App Router), TypeScript, Tailwind CSS, and Motion.

---

## Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Configuration & Environment Variables

Bridle uses standard environment variables for deployment configuration. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL for SEO, sitemap, and Open Graph | `https://bridle.ai` |
| `NEXT_PUBLIC_EARLY_ACCESS_ENDPOINT` | Webhook or API route that receives early-access form submissions via `POST` JSON | `""` (logs to console in dev) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional contact email displayed in the footer | `""` (hidden if empty) |

#### Early Access Form Handling
- In **development**, if `NEXT_PUBLIC_EARLY_ACCESS_ENDPOINT` is unset, submissions are logged directly to the browser console with an on-screen dev notice.
- In **production**, if unconfigured, the form warns that submissions are temporarily offline rather than simulating a deceptive success state.
- Submissions send a JSON payload with `{ email, company, intent, submittedAt }`.

---

## Build & Quality Assurance

```bash
# Typecheck
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build

# Start production server locally
npm run start
```

---

## Deployment on Vercel

1. Push this repository to GitHub or GitLab.
2. Import the project into [Vercel](https://vercel.com/new).
3. Under **Environment Variables**, set:
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.com`)
   - `NEXT_PUBLIC_EARLY_ACCESS_ENDPOINT` (e.g. your CRM/Airtable/Slack webhook URL)
   - `NEXT_PUBLIC_CONTACT_EMAIL` (e.g. `contact@your-domain.com`)
4. Click **Deploy**.

---

## Architecture & Design System

- **Brand & Tokens**: Defined in `src/app/globals.css` (paper `#F6F4EF`, ink `#0D0E11`, brass `#A8834A`).
- **Layout Landmarks**: Sticky header navigation (`src/components/layout/Navbar.tsx`), main content anchor (`#main-content`), and footer (`src/components/layout/Footer.tsx`).
- **Interactive Simulations**:
  - `HeroVisual.tsx`: Live-cycling deterministic action stream.
  - `ArchitectureSimulation.tsx`: Multi-stage interactive execution pipeline simulation with kill-switch toggle, human approval review, and audit trail generation.
- **Accessibility**: Semantic HTML5, WCAG AA contrast, keyboard focus rings, touch targets `>= 44px`, and iOS zoom prevention (`>= 16px` inputs).
- **SEO & Sharing**: Dynamic Open Graph images (`src/app/opengraph-image.tsx`), `sitemap.xml` (`src/app/sitemap.ts`), and `robots.txt` (`src/app/robots.ts`).

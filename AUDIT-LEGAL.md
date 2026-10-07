# Technical, Privacy & Secrets Audit Report (AUDIT-LEGAL.md)

**Target System:** Bridle Marketing & Early Access Application  
**Audit Date:** 2026-09-28  
**Scope:** Full codebase audit covering framework, hosting, forms, data storage, external communications, analytics, cookies, CDN assets, secrets, error handling, legal posture, contact information, and abuse prevention.

---

> [!WARNING]
> ### CRITICAL PRIVACY & SECURITY VULNERABILITIES IDENTIFIED
>
> 1. **UNAUTHENTICATED PUBLIC DATA EXPOSURE (`GET /api/early-access`)**  
>    **File:** `src/app/api/early-access/route.ts` (lines 178–186)  
>    The Route Handler exports an unauthenticated public `GET` handler:
>    ```ts
>    export async function GET() {
>      const submissions = readSubmissions();
>      return NextResponse.json({
>        total: submissions.length,
>        notificationEmail: process.env.NOTIFICATION_EMAIL || 'khalidmohaleb8@gmail.com',
>        companyEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'ka01717@surrey.ac.uk',
>        submissions,
>      });
>    }
>    ```
>    **Risk:** Any visitor or web scraper making a `GET` request to `/api/early-access` receives an unauthenticated plain-text JSON dump of all stored early-access applicants, including their email addresses, companies, intended use cases, submission timestamps, and internal notification routing addresses. Under GDPR and UK Data Protection Act 2018, this represents a severe personal data leak vulnerability.
>
> 2. **SUBMISSION DATA DIRECTORY NOT EXCLUDED FROM VERSION CONTROL (`data/`)**  
>    **Files:** `data/early-access-submissions.json` and `.gitignore`  
>    The `data/` directory where applicant records are appended is **not** listed in `.gitignore`.  
>    **Risk:** As early access leads are collected, they are written to `data/early-access-submissions.json`. If developers run `git add .` or commit repository changes, applicant personal data will be committed directly into Git revision history.

---

## 1. Framework & Hosting

| Property | Implementation Detail | Source / Evidence |
| :--- | :--- | :--- |
| **Next.js Version** | `16.3.6` (Turbopack / Webpack dev modes supported) | `package.json` line 14 |
| **React Version** | `19.2.8` (`react` & `react-dom`) | `package.json` lines 15–16 |
| **Deployment Target** | Vercel (standard Next.js serverless architecture) | `.gitignore` line 37 (`.vercel`), `public/vercel.svg` |
| **Custom Server** | None. Standard Next.js runtime (`next dev`, `next build`, `next start`) | `package.json` lines 5–9 |
| **Serverless Functions** | 1 Route Handler: `src/app/api/early-access/route.ts` | Node.js Serverless runtime (default) |
| **Edge Functions** | None. No route or page declares `export const runtime = 'edge'`. | Codebase search: 0 occurrences |
| **Static Pre-rendering** | All pages (`/`, `/_not-found`, `/design-system`, `/robots.txt`, `/sitemap.xml`) are statically pre-rendered (`○ Static`). | `next build` collector output |

---

## 2. Forms & Data Collection

The website contains **exactly one** user-facing form on the entire site: the Early Access form located in `src/components/sections/EarlyAccessSection.tsx`.

### Fields Collected
1. **Anti-Spam Honeypot (`_hp`)**: Hidden input field (`aria-hidden="true" style={{ display: 'none' }}`).
2. **Name (`name`)**: Optional text input (`autoComplete="name"`, placeholder: `"Jane Smith"`).
3. **Work Email (`email`)**: Required email input (`required`, `aria-required="true"`, `autoComplete="email"`, placeholder: `"jane@company.com"`).
4. **Company (`company`)**: Optional text input (`autoComplete="organization"`, placeholder: `"Acme Corp"`).
5. **Intended Automation (`intent`)**: Optional 2-row textarea (placeholder: `"For example: handle refund requests, book appointments, update our CRM"`).

### Validation Logic

#### Client-Side (`EarlyAccessSection.tsx`)
- **Honeypot Enforcement:** If `honeypot.trim().length > 0`, submission immediately short-circuits to fake `status = 'success'` without sending an HTTP request.
- **Client Rate Limit:** Checks `Date.now() - lastSubmitTimeRef.current < 4000` (4-second minimum cooldown). Displays message: *"Please wait a few seconds before submitting again."*
- **Format Validation:** Evaluates `email` against regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` on input blur and form submit. Displays inline alert if invalid.

#### Server-Side (`src/app/api/early-access/route.ts`)
- **JSON Parsing Guard:** Safe JSON parsing via `await req.json().catch(() => ({}))`.
- **Email Validation:** Evaluates `if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))`. Returns HTTP `400 Bad Request` with `{ success: false, message: 'Please enter a valid email address.' }`.
- **Text Trimming:** Calls `.trim()` on `name`, `email`, `company`, and `intent`; empty values convert to `null`.
- **Missing Validations:** No string length caps (e.g. max 255 chars on email/company, max 2,000 chars on intent) and no HTML sanitization exist on the server.

### Data Dispatch & Destinations
Upon receiving a valid POST request:
1. The submission is appended to `data/early-access-submissions.json`.
2. An event is logged to server stdout via `console.info`.
3. If `RESEND_API_KEY` is present in the environment, an HTML notification email is dispatched via Resend.
4. If `EARLY_ACCESS_WEBHOOK_URL` is configured, a JSON payload is forwarded via HTTP POST.

---

## 3. Data Storage & Persistence

| Storage Mechanism | Details | Persistence on Vercel |
| :--- | :--- | :--- |
| **Local File (`data/early-access-submissions.json`)** | Submissions are written synchronously via `fs.writeFileSync` in `appendSubmission()`. | **WILL NOT PERSIST.** On Vercel, the serverless runtime filesystem (`process.cwd()`) is read-only (`/var/task`). In production on Vercel, calling `fs.mkdirSync` or `fs.writeFileSync` will either throw `EROFS: read-only file system` or, if written to `/tmp`, will be discarded upon container recycling. It is completely ephemeral. |
| **Git Exclusions (`.gitignore`)** | Lines 1–42 of `.gitignore` exclude `.env*`, `node_modules`, `.next/`, `/out/`, `/build/`, `.vercel`. | **`data/` IS NOT EXCLUDED.** Files in `data/` will be committed if staged. |
| **Database** | None. No SQL, NoSQL, or KV storage is connected. | N/A |
| **Third-Party Email / Webhook** | Resend API (conditional), Webhook URL (conditional). | External retention depends on Resend log settings and webhook target. |

---

## 4. Email Dispatch

- **Email Provider:** Resend (`https://api.resend.com/emails`).
- **Trigger:** Successful HTTP POST to `/api/early-access` when `process.env.RESEND_API_KEY` is configured.
- **Recipient Address:** `process.env.NOTIFICATION_EMAIL || 'khalidmohaleb8@gmail.com'`.
- **Sender Address:** `process.env.EMAIL_FROM || 'Bridle Access <onboarding@resend.dev>'`.
- **Reply-To:** The applicant's submitted email address (`reply_to: email`).
- **Email Content:** HTML notification summarizing applicant email, company, intended automations, and submission timestamp.
- **API Key Storage & Scope:**
  - `RESEND_API_KEY` is read strictly on the server in `src/app/api/early-access/route.ts` line 95 & 100.
  - The variable does **not** have the `NEXT_PUBLIC_` prefix.
  - It is **not** imported into `src/config.ts` or any client component.
  - In `.env.example` and `.env.local`, the value is set to empty (`RESEND_API_KEY=`).
  - **Confirmation:** The API key does not appear in any client-side JavaScript bundle or public file.

---

## 5. Analytics & Tracking

- **Codebase Search Scope:** Searches conducted for `@vercel/analytics`, `@vercel/speed-insights`, Google Analytics (`gtag`, `ga`), Google Tag Manager (`gtm`), Meta/Facebook Pixel, Plausible, PostHog, Hotjar, Mixpanel, Segment, Clarity, and custom beacons.
- **Findings:** **None found.**
- There are no analytics libraries in `package.json`.
- There are no analytics script tags or tracking pixels in `src/app/layout.tsx` or anywhere else in the application.

---

## 6. Cookies & Local Storage

- **Codebase Search Scope:** Searches conducted for `document.cookie`, `cookies()` from `next/headers`, `localStorage`, `sessionStorage`, and cookie consent banners.
- **Findings:**
  - **`document.cookie`:** None found (0 references).
  - **`next/headers` `cookies()`:** None found (0 references).
  - **Cookie Consent Library:** None found (no cookie banner or consent management tool installed).
  - **Client Storage:** Neither `localStorage` nor `sessionStorage` is used.
- **Platform Cookies:** Because the application does not use Next.js sessions, middleware, or server authentication, no first-party session cookies are issued. Vercel hosting does not set tracking cookies on static assets or basic serverless routes unless analytics packages are active.

---

## 7. Third-Party Scripts, Fonts & External Domains

### Fonts (`next/font/google`)
- In `src/app/layout.tsx`:
  - `Geist` (sans-serif)
  - `Geist_Mono` (monospace)
  - `Instrument_Serif` (serif)
- **Technical Operation:** Next.js `next/font` downloads font files at build time and embeds them as locally hosted static files (`/_next/static/media/...`). The browser **never** connects to Google servers (`fonts.googleapis.com` or `fonts.gstatic.com`) at runtime. This avoids third-party IP address transmission to Google under EU/UK GDPR standards.

### External Scripts / Stylesheets
- **External `<script>` tags:** None found.
- **External `<link rel="stylesheet">` tags:** None found.
- **CSS `@import url(...)`:** None found (`src/app/globals.css` only imports local Tailwind: `@import 'tailwindcss';`).
- **External iframes:** None found.

### External Network Calls Initiated by Server
- `https://api.resend.com/emails` (Only invoked during form submission if `RESEND_API_KEY` is present).
- Any custom URL defined in `EARLY_ACCESS_WEBHOOK_URL` (Only invoked during form submission if present).

---

## 8. Secrets Scan

- **Repository Scan Scope:** Comprehensive pattern matching across all code files, scripts, JSON configs, Markdown documents, and `.env*` files for API tokens (`sk_`, `pk_`, `re_`, `ghp_`, `Bearer`), private keys, certificates (`.pem`, `.key`), and passwords.
- **Git History:** The project folder is currently not an initialized Git repository (no `.git` directory exists).
- **Findings:**
  - **No live API keys, tokens, or credentials were found committed in plain text.**
  - `RESEND_API_KEY=` is blank in both `.env.example` and `.env.local`.
- **Sensitive Items Noted:**
  - Hardcoded personal/academic email addresses are present as code fallbacks in `src/config.ts` and `src/app/api/early-access/route.ts`:
    - `ka01717@surrey.ac.uk`
    - `khalidmohaleb8@gmail.com`
  - Synthetic test submissions are currently saved in `data/early-access-submissions.json`.

---

## 9. Error Handling & Information Leakage

### HTTP API Responses (`src/app/api/early-access/route.ts`)
- **Status 400 (Bad Request):** Returns `{ success: false, message: 'Please enter a valid email address.' }`. Clean user-facing message; no stack trace or internal path leakage.
- **Status 500 (Internal Server Error):** Returns `{ success: false, message: 'Something went wrong. Please try again.' }`. Caught exceptions are not serialized into the client response.

### Logging & Telemetry
- **PII in Server Logs:** Line 88 of `route.ts` logs full applicant records to standard output:
  ```ts
  console.info('[Bridle Early Access Submission Received]', submissionRecord);
  ```
  On Vercel, this logs unencrypted user emails and use-case details into Vercel Runtime Logs.
- **Error Objects in Server Logs:** Lines 39, 51, 143, 146, 159, and 169 log caught error objects (`err`, `error`, `errData`, `resendErr`, `webhookErr`) to server console.
- **Client Console Output:** In `src/lib/early-access.ts` (lines 68–74), when running in non-production (`NODE_ENV !== 'production'`), applicant submission details are logged to the browser console (`console.info`).

---

## 10. Existing Legal & Privacy Content

- **Privacy Policy Page / Route:** **None found** (no `/privacy` page or file exists).
- **Terms of Service Page / Route:** **None found** (no `/terms` page or file exists).
- **Cookie Policy Page / Route:** **None found** (no `/cookies` page or file exists).
- **Footer Legal Links:** The footer (`src/components/layout/Footer.tsx`) contains anchor navigation links (`#how-it-works`, `#integrations`, `#control`, `#prove`, `#use-cases`, `#vision`, `#early-access`) and a link to `/design-system`, but **no legal links**.
- **Form Microcopy:** In `src/components/sections/EarlyAccessSection.tsx` (lines 407–409), the following text appears under the submit button:
  > *"We'll only use your email to contact you about Bridle early access. We will never sell your data."*
  This is plain text with no hyperlink to any formal policy document.

---

## 11. Current Contact & Entity Information

### Contact Information Appearing on the Site
- **Footer (`src/components/layout/Footer.tsx`):**
  - Section header: `"Company Contact"`
  - Displayed email: `ka01717@surrey.ac.uk` (rendered as `mailto:ka01717@surrey.ac.uk`).
  - Sourced from: `siteConfig.contactEmail` (`process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'ka01717@surrey.ac.uk'`).
- **Notification Target in Server Logic (`route.ts`):**
  - Recipient: `khalidmohaleb8@gmail.com` (`process.env.NOTIFICATION_EMAIL || 'khalidmohaleb8@gmail.com'`).
- **Brand / Company Identification:**
  - Brand name: `"Bridle"` (`src/content/site.ts`).
  - Site Tagline: `"Describe the work. Bridle builds the rest."`
  - Legal Entity Name: **None displayed** (no Ltd, LLC, Inc., or registered company name).
  - Registered Address / Jurisdiction: **None displayed**.
  - Company Registration Number / VAT: **None displayed**.
  - Copyright Notice (`©`): **None displayed**.

---

## 12. Spam & Abuse Protection

| Mechanism | Present? | Implementation Details |
| :--- | :--- | :--- |
| **Honeypot Field** | **Yes (Client-side only)** | Hidden field `name="_hp"` in `EarlyAccessSection.tsx`. If filled, client fakes a success response and halts submission. Note: The server route (`route.ts`) does **not** inspect or enforce the honeypot field if a bot posts directly to `/api/early-access`. |
| **Client-Side Rate Limiting** | **Yes** | 4-second cooldown between submission attempts via `lastSubmitTimeRef` in `EarlyAccessSection.tsx`. |
| **Server-Side Rate Limiting** | **No** | There is no IP-based rate limiting, Upstash/Redis limiter, or token bucket middleware on `POST /api/early-access`. |
| **CAPTCHA** | **No** | No Cloudflare Turnstile, Google reCAPTCHA, or hCaptcha is integrated. |

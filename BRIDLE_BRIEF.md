# BRIDLE — PROJECT BRIEF AND BRAND GUIDELINES

> CRITICAL: This document serves as the permanent context and design specification for all future prompts in the Bridle marketing site sequence.

---

## 1. CORE CONCEPT & NEW POSITIONING
Bridle lets a business describe a task in plain language, and Bridle builds the AI agent and everything it needs to do that work safely: integrations, permissions, policies, approvals, testing, verification, deployment and monitoring.

- **The Problem:** Deploying autonomous AI agents into business operations requires enormous technical overhead and carries severe operational risk. Setting up APIs, OAuth tokens, MCP servers, webhook endpoints, data schemas, least-privilege permissions, and human oversight is slow, fragile, and dangerous for non-developers.
- **The Solution:** The user describes what they need done in plain language. Bridle absorbs the technical complexity: it builds the AI agent AND provisions the entire infrastructure required to run it safely. The user never needs to understand APIs, OAuth, API keys, MCP, webhooks or tool schemas.
- **What Bridle Is NOT:**
  - Bridle is NOT another conversational chatbot.
  - Bridle is NOT just an AI agent builder or prompt wrapper.
  - **The Edge:** Bridle builds both the agent AND the robust control infrastructure to run it safely.
- **Core Brand Lines:**
  - *"Describe the work. Bridle builds the rest."*
  - *"Give AI autonomy. Keep humans in control."*
- **Name Origin:** A bridle guides and controls a powerful horse without preventing it from moving forward. Express this subtly in the visual language (direction, control, precision, movement). **NEVER use horse imagery.**

---

## 2. BRAND ATTRIBUTES & TONE
- **Tone:** Sophisticated, calm, trustworthy, technical, premium, enterprise-grade, understated. Confidence and quiet authority, not hype or fear.
- **Explicit Anti-Patterns:** NOT cyberpunk, crypto, generic SaaS, chatbot, antivirus/cybersecurity, childish, or buzzword-laden.
- **Quality Benchmark:** Stripe / Linear / Vercel / Apple polish with an original identity.

---

## 3. PERMANENT HONESTY RULES
Bridle is in early development. Never write or imply:
1. Existing customers, partner logos, case studies, testimonials, revenue, or active usage numbers.
2. Security certifications (SOC 2, ISO 27001, HIPAA, FedRAMP, etc.).
3. "Trusted by", "Production-ready", or "Industry-leading".
4. That any capability is already deployed or live today.
- **Required Phrasing:** Use *"Bridle is building..."*, *"designed to..."*, *"built for..."*, *"will..."*.
- **Product UI:** All product mockups, simulated interactions, and diagrams MUST be clearly labelled **"Illustrative"**.

---

## 4. LANGUAGE & EDITORIAL RULES
- **Plain Words Over Jargon:** Favor clear, direct business language in headlines.
- **Forbidden Buzzwords:** Avoid *"revolutionary"*, *"game-changing"*, *"AI-powered"*, *"magic"*, *"disruptive"*.
- **British Spelling:** Use British English throughout (*colour*, *behaviour*, *optimise*, *organisations*, *programmes*).
- **Currency:** Use **$** (US Dollar) in financial examples and pricing illustrations (e.g. *$60 refund*, *$750 purchase threshold*).

---

## 5. DESIGN SYSTEM TOKENS (Light-first Paper and Ink)
- **Surfaces:**
  - `paper`: `#F6F4EF` (Default light surface)
  - `paper-2`: `#EFECE4` (Subtle secondary light surface)
  - `ink`: `#0D0E11` (Default dark surface and primary text)
  - `ink-2`: `#16181D` (Subtle secondary dark surface)
- **Text and Hairline:**
  - `text-graphite`: `#4A4E57`
  - `text-mute`: `#8A8E97`
  - `hairline-light`: `rgba(13, 14, 17, 0.10)`
  - `hairline-dark`: `rgba(255, 255, 255, 0.10)`
- **Accent:**
  - `brass`: `#A8834A` (Used for the rein line, focus rings, key highlights. Strict limit: well under 5% of any screen).
- **Status Colours (USED ONLY INSIDE PRODUCT VISUALS):**
  - `allow`: `#2F7D5B`
  - `approve`: `#B7791F`
  - `block`: `#B4443A`

---

## 6. TYPOGRAPHY SCALE
- **Geist Sans:** UI and headlines.
- **Geist Mono:** Monospace labels, technical metadata, status indicators (0.08em tracking, uppercase).
- **Instrument Serif:** Used very sparingly, at most one italic word in a headline for warm editorial emphasis.
- **Scales:**
  - `display`: clamp(44px, 5vw + 1rem, 88px), line-height 1.04, tracking -0.035em
  - `h2`: clamp(32px, 3vw + 0.5rem, 56px), line-height 1.1, tracking -0.025em
  - `h3`: clamp(20px, 2vw + 0.25rem, 28px), line-height 1.25, tracking -0.015em
  - `body-lg`: 18–20px, line-height 1.55, tracking -0.006em
  - `body`: 16px, line-height 1.6
  - `mono-label`: 12px, uppercase, tracking 0.08em
  - Max reading width: ~62ch

---

## 7. MOTIFS AND PRIMITIVES
- **The Rein Line (`<ReinLine />`):** A single thin brass line with one small ring-shaped node. Expresses path, guiding control, and precision. Horizontal or vertical, supports scroll-draw animations.
- **Button:** Oval capsule shape (`rounded-full`), instant pointer-down compression (`active:scale-[0.97] duration-100 ease-out`), min 44px touch target, brass focus ring.
- **Card:** Hairline border (`ring-1 ring-inset` or `border border-ink/10`), no heavy drop shadows.
- **Badge:** Monospace font with hairline border.
- **Reveal:** Scroll-reveal wrapper with 12px translation and fade, respecting `prefers-reduced-motion`.
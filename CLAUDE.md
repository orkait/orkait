# Orkait — AI Context & Brand Rules

This file is the single source of truth for any AI/LLM modifying this codebase.
Violating these rules produces copy and code that contradicts Orkait's brand.

---

## Identity

Orkait is an **engineering-first company** that builds:
1. **Reliable client software** — dashboards, web apps, admin panels, scalable backends
2. **Focused SaaS products** — problem-specific tools born from real internal needs

Orkait is NOT a design agency, creative studio, or digital marketing firm.

## Core Values (non-negotiable)

These come from `legal/orkait_core.pdf` and are codified in `src/constants/index.ts` as `CORE_VALUES`.

| Value | Tagline |
|-------|---------|
| Ownership | Own outcomes, not just tasks |
| Reliability | Commitments matter |
| Thoughtful Innovation | Build smart, not just new |
| Craftsmanship | Quality is a habit, not an accident |
| Respect & Clear Communication | Say things clearly and directly |

**Never remove, rename, or reorder these values.** They are the company's foundation.

## Banned Language

Do NOT use these phrases anywhere in the codebase — they contradict engineering-first positioning:

- "craft digital experiences"
- "digital experiences that inspire"
- "empowering businesses to thrive in the digital world"
- "digital transformation"
- "synergy" / "leverage" / "paradigm"
- "game-changer" / "revolutionary" / "disruptive"
- "cutting-edge" (unless describing a specific technology)
- "one-stop shop" / "full-service agency"
- "holistic approach"
- Any sentence that could describe any company in any industry

## Required Tone

- **Direct.** Lead with what we do, not what we aspire to.
- **Technical but clear.** Engineers should nod. Non-engineers should still get it.
- **Confident, not arrogant.** Let the work speak.
- **Short sentences.** If it can be said in fewer words, do it.
- **First person plural.** "We build..." not "Orkait builds..." (except in meta/SEO).
- **No emojis** in production copy (acceptable in chat widget suggestions only).

### Good examples:
- "We engineer software that works."
- "Quality is a habit, not an accident."
- "Built to solve real problems, not chase hype."
- "No fluff. No hype. Just systems that hold up."

### Bad examples:
- "We craft digital experiences that inspire."
- "Empowering businesses to thrive in the digital world."
- "Your trusted partner for digital transformation."
- "We leverage cutting-edge technology to deliver game-changing solutions."

## Problem-Solving Process

Orkait's iterative process (from core values PDF):

```
Problem → Break it Down → Prototype → Feedback → Solution
                                  ↑_______________|
```

This is codified in `src/constants/index.ts` as `PROBLEM_SOLVING_PROCESS`.
When describing how Orkait works, reference this loop — not generic "agile" or "scrum" language.

## Content Data Architecture

All website copy lives in structured data files, NOT hardcoded in components:

| Data | File | Constant |
|------|------|----------|
| Core values | `src/constants/index.ts` | `CORE_VALUES` |
| Process steps | `src/constants/index.ts` | `PROBLEM_SOLVING_PROCESS` |
| Client services | `src/constants/index.ts` | `CLIENT_SERVICES` |
| SaaS principles | `src/constants/index.ts` | `SAAS_PRINCIPLES` |
| Capabilities | `src/constants/index.ts` | `CAPABILITIES_LEFT`, `CAPABILITIES_RIGHT` |
| Features | `src/constants/index.ts` | `FEATURES` |
| Testimonials | `src/constants/index.ts` | `TESTIMONIALS` |
| Services list | `src/constants/index.ts` | `SERVICES` |
| Footer links | `src/constants/index.ts` | `FOOTER_COLUMNS` |
| Team members | `src/data/team.ts` | `TEAM_MEMBERS` |
| Projects | `src/data/projects.ts` | `PROJECTS` |
| Pricing plans | `src/data/pricing.ts` | `PRICING_PLANS` |

**When modifying content, edit the data — not the component JSX.**

## Project Tags

Projects should be tagged with engineering-relevant labels:

**Use:** Strategy, Engineering, Web Engineering, Full-Stack Development, Dashboard, API Engineering, SaaS Platform, Backend Systems, Web App, Infrastructure
**Avoid:** Identity, Webdesign, Branding, Creative Direction

## Testimonials

Testimonials must:
- Reference specific technical outcomes (uptime, performance, architecture decisions)
- Sound like real engineers or technical founders wrote them
- NOT use words like "game-changer", "exceeded expectations", "unmatched"
- NOT follow identical sentence structures across all entries

## Tech Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first, token-driven)
- Custom breakpoints: `phone:`, `tablet:`, `laptop:`, `desktop:` (NOT sm/md/lg/xl)
- Typography tokens: heading, title-1/2/3, subtitle, body-lg, body
- shadcn/ui components (Radix-based)
- Framer Motion for animations
- Lenis for smooth scroll
- Bun as package manager

## Pricing

Pricing must reflect engineering scope, not screen counts or design deliverables:
- Reference API complexity, infrastructure, CI/CD, testing, monitoring
- NOT "Basic UI/UX design" or "Custom UI/UX design"
- Tiers should scale by system complexity, not page count

## Key Principle

> "Products are built to solve real problems, not chase hype."

When in doubt, ask: does this copy sound like it was written by an engineer, or by a marketing intern? Choose the engineer.

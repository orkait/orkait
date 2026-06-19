# DESIGN.md - Orkait Astro Migration Contract

Migration of the Orkait marketing site from Next.js (App Router, `output: export`) to Astro 6, modeled structurally on `~/work/gitdiscovr-monorepo/apps/landing`. This is an **EXTEND** task: the Orkait visual design system is preserved 1:1; only the framework and structural conventions change.

```
WORKSPACE REALITY
- Source stack:  Next.js App Router + Tailwind v4, output: "export" (already static), Cloudflare Pages (nitrogen-orkait)
- Target stack:  Astro 6.4.x + Tailwind v4 (@tailwindcss/postcss), @astrojs/react + @astrojs/sitemap, static output (no adapter)
- Component lib: source = shadcn (Base UI); target = raw Astro + CVA, React islands only for interactive bits
- Design system: PRESERVE - slate monochrome, Satoshi+Poppins, custom 5-bp scale, 4px grid, 72->16 type scale, fade-edge/marquee/process-grid utilities
- Decision:      EXTEND visual system + NEW structural conventions (Astro layout architecture from reference)
```

Grounding note: Hyperstack MCP has no `astro_*` plugin and Context7 quota was exhausted this session. All Astro-specific conventions below are grounded in the **reference repo's real Astro 6.4.6 code** (file:line cited), not memory or docs.

---

## 1. Visual Theme & Atmosphere - PRESERVE

No change. Orkait's identity carries over verbatim. Personality = **Premium Precision** (monochrome, single-weight restraint, sharp-ish radius, motion serves info). Source of truth: `src/app/globals.css` (current). Re-host, do not re-resolve.

| Property | Value (preserved) |
|---|---|
| Personality | Premium Precision (mono + near-black primary) |
| Default mode | Light, with existing `.dark` token set retained |
| Identity | Product-first AI lab; restraint over spectacle (CLAUDE.md brand rules) |

## 2. Color Palette - PRESERVE (port verbatim)

Port the existing `@theme inline` color block from `src/app/globals.css:91-118` and the `.dark` block (`:125-154`) into the new `src/styles/global.css` **unchanged**. Slate-based monochrome, `theme(colors.slate.*)` references, pricing gradients, emerald success, red destructive.

- Do NOT convert to OKLCH or adopt the reference's purple ramp. EXTEND means keep Orkait's commitments.
- Keep `--color-pricing-*` tokens (used by pricing components if retained - see S5).

## 3. Typography - PRESERVE scale, RE-HOST font loading

Type scale is unchanged - port `@theme inline` type tokens verbatim (`globals.css:33-52`): `heading 72/80 · title-1 64/72 · title-2 48/56 · title-3 32/40 · subtitle 24/36 · body-lg 20/30 · body 16/24`.

Font **loading** changes (no `next/font`):

| Font | Source change | Target approach |
|---|---|---|
| Satoshi | local woff2 (`src/assets/fonts/Satoshi-Variable*.woff2`) | copy to `src/assets/fonts/`, `<link rel="preload">` in Layout head + `@font-face` in global.css, `--font-satoshi` var (mirror reference `Layout.astro:103-116`) |
| Poppins | `next/font/google` | self-host via `@fontsource/poppins` (or woff2 + @font-face). No runtime Google fetch. |

`--font-sans: var(--font-satoshi), sans-serif` preserved.

## 4. Spacing & Layout System - PRESERVE tokens, ADOPT container architecture

Spacing tokens unchanged - port the 4px grid (`globals.css:58-74`) and radius scale (`:80-85`) verbatim. Custom breakpoints preserved (`globals.css:12-22`): mobile 320 / tablet 768 / laptop 1024 / base 1440 / large 1920, defaults cleared.

**NEW structural layer - adopt the reference's centered-container pattern, keyed to the user's 1340px:**

```
Container.astro   mx-auto w-full max-w-site px-6 tablet:px-8       (ref: Container.astro:9)
Section.astro     full-bleed bg wrapper + inner Container, CVA variants for bg/spacing/maxWidth
--container-site  83.75rem  ==  1340px       <-- the user's specified width
```

- Add `--container-site: 83.75rem` to `@theme` and a `max-w-site` utility (mirror reference `global.css:197` + `Section.astro:24-39`).
- `Section.astro` CVA `maxWidth` variants: `default` -> `max-w-site` (1340px), `narrow` -> `max-w-3xl`, `wide` -> `max-w-[1536px]`, `full` -> none.
- `Section.astro` spacing variants map to Orkait spacing tokens (`py-12 / py-24 / py-32` -> `--space-12/24/32`).
- All existing page layouts re-expressed as `<Section><Container>...` instead of bespoke per-component max-widths.

## 5. Component & Island Inventory

Static-by-default (Astro `.astro`). React island (`@astrojs/react`, `client:*`) only where interaction or canvas requires it. This is the core migration mapping.

### 5a. Layout shell (static .astro)

| New file | Replaces | Notes |
|---|---|---|
| `layouts/Layout.astro` | `app/layout.tsx` | head, font preload, global.css, sitemap meta; loads client modules |
| `components/layout/SiteHeader.astro` | `navbar.tsx` + `mobile-nav.tsx` | nav from `lib/data/nav.ts`; mobile menu via HTML `popover` API (ref pattern), NOT a JS framework. **Fix:** add active-state to mobile (codemode #8) |
| `components/layout/SiteFooter.astro` | `footer.tsx` | columns from `lib/data` (port `FOOTER_COLUMNS`) |
| `components/layout/Container.astro` | new | 1340px centered |
| `components/layout/Section.astro` | `shared/container.tsx` + `section.tsx` | CVA wrapper |

### 5b. Static content components (.astro)

Hero, Process, Advance, ServicesText copy, StudioText copy, services/about static blocks, ContentPage (terms/privacy), knowledge page (port `lib/markdown`). All pure markup + data -> `.astro`. No island.

### 5c. React islands (`client:visible` unless noted)

| Island | Source | Directive | Why island |
|---|---|---|---|
| `Flash` product showcase (CardSwap) | `home/Flash.tsx` + `ui/card-swap.tsx` | `client:visible` | custom animated 3D carousel, state |
| `Feedback` carousel | `home/Feedback.tsx` | `client:visible` | embla + autoplay |
| `AsciiField` | `shared/ascii-field.tsx` | `client:visible` | canvas sim (IntersectionObserver-gated, already reduced-motion aware) |
| `GameOfLife` | `shared/game-of-life.tsx` | `client:visible` | canvas sim, same |
| `TeamCarousel` | `about/team-carousel.tsx` | `client:visible` | embla mobile carousel |
| `ProjectsInteractive` | `sections/projects/*` | `client:visible` | scroll-tracking / masonry interaction |
| `ContactForm` | `contact/ContactForm.tsx` + `home/ContactUs.tsx` | `client:load` | RHF+zod; **Fix:** wire real submit (codemode #1) |
| `ApplyForm` | `careers/apply-form.tsx` | `client:load` | RHF+zod |
| `ChatWidget` | `layout/chat-widget.tsx` | `client:idle` | framer-motion, talks to Worker |

Shared `ui/*` shadcn primitives used by islands stay as React components under `components/react/ui/` (only those islands actually import - prune the 58-file set to the consumed subset).

### 5d. Forms strategy (constraint-driven, not preference)

Static output everywhere -> no server actions. Forms submit client-side:

```
<ContactForm/> island --fetch POST--> Cloudflare Worker endpoint --server-side--> Resend API
                                       (RESEND_API_KEY stays in Worker env, never client)
```

- Mirrors existing chatbot Worker infra (`chatbot/` + `orkait-chatbot.aconite.workers.dev`).
- Endpoint URL via `PUBLIC_*` env (public, safe). Resend key lives only in Worker secrets.
- **Open decision flagged to user:** extend existing chatbot Worker with `/api/contact` + `/api/apply` routes (recommended, reuses infra) vs new Worker vs third-party (Formspree). Port `app/actions/{contact,apply}.ts` zod schemas + Resend call into the Worker.
- **Fix double-submit (codemode #4):** disable + in-flight lock on both forms.

### 5e. Dead-code disposition (from codemode Phase 6)

Do NOT port: `PricingTable`/`PricingMobile`/`PRICING_PLANS` (unrendered, and agency-package pricing violates CLAUDE.md), `config/navigation.ts`, `config/images.ts`, unused constants (`LAB_THESIS`, `PRODUCT_PILLARS`, `SHIPPING_DISCIPLINE`, `CORE_VALUES`, `SAAS_PRINCIPLES`). Confirm with user before dropping.

## 6. Motion - PRESERVE + close gaps

Carry over: lenis smooth scroll (-> reference `lib/client/smoothScroll.ts` + reduced-motion gate), framer-motion in islands, canvas sims (already reduced-motion + IntersectionObserver gated). Marquee via existing `marquee-track` utility (CSS).

**Fix (codemode #2):** the framer-motion wrappers (`fade-in/slide-up/stagger`) lacked reduced-motion. In Astro, replace scroll-reveal wrappers with the reference's CSS `data-reveal` + `revealOnScroll.ts` pattern (already reduced-motion gated via `reducedMotion.ts`), or wrap island roots in `<MotionConfig reducedMotion="user">` (MCP-confirmed). Net: every animation honors `prefers-reduced-motion`.

## 7. Elevation - PRESERVE

Port existing shadow/border tokens and `fade-edge-*` utilities verbatim. No new elevation system.

## 8. Do's and Don'ts (this migration)

1. DO port tokens verbatim - zero visual regression is the success bar.
2. DO route every page through `Section` + `Container` at 1340px.
3. DO keep JS off static content - islands only where 5c lists.
4. DO keep Resend key server-side (Worker) - never ship it to a client island.
5. DO fix the 4 codemode behaviour bugs while rewriting (forms no-op, reduced-motion, double-submit, mobile active-state) - we are rewriting anyway (Rule 10: deliberate, not speculative).
6. DON'T adopt the reference's purple/OKLCH/Athletics identity - EXTEND Orkait's.
7. DON'T port dead code (5e) without user confirm.
8. DON'T introduce agency-package pricing (CLAUDE.md).
9. DON'T use `requestAnimationFrame` (global Rule 9) - canvas sims already use `setTimeout`; keep it.
10. DON'T break the `data-integrity.test.ts` brand guarantees - port the test to the Astro data layer.

## 9. Responsive - PRESERVE

Keep Orkait's custom breakpoints (mobile/tablet/laptop/base/large). Honor `mobile-home-regression.test.ts` assertions - port them. Content max-width = 1340px via `max-w-site`; prose pages clamp to `max-w-3xl`/65ch.

## 10. Anti-Patterns & Compliance

- AI-slop fingerprint: N/A new aesthetic - preserving an audited system.
- Brand compliance: port `data-integrity.test.ts` (bans agency phrases, caps product cards at 4, pins Rustbox=live / BooleanStack+Zen=coming-soon). It is the migration's regression gate for copy.
- a11y: migration must not regress; actively fixes reduced-motion + mobile active-state gaps.

---

## Route Migration Map (full site)

| Route | Source page | Target | Islands |
|---|---|---|---|
| `/` | `app/page.tsx` | `pages/index.astro` | Flash, Feedback, AsciiField x2, GameOfLife |
| `/projects` | `app/projects/page.tsx` | `pages/projects.astro` | ProjectsInteractive |
| `/contact` | `app/contact/page.tsx` | `pages/contact.astro` | ContactForm |
| `/careers` | `app/careers/page.tsx` | `pages/careers.astro` | ApplyForm |
| `/knowledge` | `app/knowledge/page.tsx` | `pages/knowledge.astro` | none (static markdown) |
| `/terms` | `app/terms/page.tsx` | `pages/terms.astro` | none |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | `pages/privacy-policy.astro` | none |
| global | `layout.tsx` | `Layout.astro` + SiteHeader/Footer | ChatWidget |

Data layer: port `src/data/{projects,team}.ts` and the consumed half of `constants/index.ts` -> `src/lib/data/*.ts` (TS const exports, reference convention). Drop unused exports (5e).

---

## Resolved Decisions (locked 2026-06-20)

1. **Forms endpoint** - EXTEND existing chatbot Cloudflare Worker with `/api/contact` + `/api/apply`. Port `app/actions/{contact,apply}.ts` zod schemas + Resend call into the Worker. Resend key in Worker secrets only.
2. **Dead code (5e)** - DROP during migration: `PricingTable`/`PricingMobile`/`PRICING_PLANS`, `config/navigation.ts`, `config/images.ts`, unused constants (`LAB_THESIS`, `PRODUCT_PILLARS`, `SHIPPING_DISCIPLINE`, `CORE_VALUES`, `SAAS_PRINCIPLES`).
3. **Codemode bugs** - FIX inline during rewrite (#1 form no-op, #2 reduced-motion, #4 double-submit, #8 mobile active-state).

Contract status: **APPROVED / LOCKED**. Proceed to forge-plan.

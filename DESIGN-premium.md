# Orkait DESIGN.md - Premium Refinement (WS1-WS3)

Design contract for the premium refinement pass. All visual implementation must read this file. Produced via `hyperstack:designer`. Decision: **EXTEND** the existing token system, never replace it.

> Relationship to `DESIGN.md`: the root `DESIGN.md` is the completed Next.js -> Astro **migration** contract (LOCKED 2026-06-20). Its visual sections are now **superseded** - the site was reskinned to the warm-clay OKLCH SIGNATURE system after that contract (git: `feat(reskin)`, `signature-deep`). This file is the active **visual** contract; the migration file remains the record for routes, forms-Worker infra, and dead-code disposition. The two do not conflict: migration = structure (done), this = visual refinement (next).

```
WORKSPACE REALITY
- Stack: Astro 6 + React 19 (islands) + Tailwind v4 (@theme) + Base UI
- Component lib: custom (Base UI primitives + CVA Button); NOT shadcn
- Existing design system: YES - warm-editorial, OKLCH tokens in src/styles/global.css,
  one-block SIGNATURE recolor system, 4px grid, 88rem container
- Folder convention: components in src/components/{layout,sections,react,ui,shared};
  tokens in src/styles/global.css; content in src/lib/data/*
- Decision: EXTEND (reconcile against existing tokens; fill gaps only)
```

Reference target: mistral.ai (warm-editorial + premium-precision: editorial serif display, neutral sans body, mono labels, single warm accent on near-monochrome base, generous macro whitespace). Orkait is the same species; this contract closes the gap with an **editorial serif register + precision discipline + WCAG remediation**, without recoloring and without replacing the ownable generative assets.

---

## 1. Visual Theme & Atmosphere

- **Personality:** Warm Editorial x Premium Precision (hybrid). "Reading this should feel like a well-made technical paper - considered, not templated."
- **Emotional target:** premium, intellectually-confident, product-first.
- **System inspiration:** mistral.ai (serif/sans pairing, accent restraint), Stripe/Linear (precision: tight tracking, generous whitespace, single accent).
- **Identity anchors (keep, do not replace):** the three-body gravity canvas hero (`AsciiField.tsx`) and the Game-of-Life bento tile. These are ownable assets that carry visual warmth while UI chrome stays neutral - the same role mistral gives its imagery. Color lives in the generative art; chrome stays restrained.
- **What changes:** type register (sans-only -> serif display + sans body), accent discipline, vertical rhythm, WCAG correctness. **What does not:** the clay signature hue, the canvas hero, the SIGNATURE recolor architecture.

---

## 2. Color Palette (EXTEND existing OKLCH tokens)

Keep every primitive ramp and the SIGNATURE block in `global.css`. Two corrective changes only, both derived by lowering OKLCH L while holding C and H (per `ui_ux:wcag-contrast`).

### Measured contrast (computed from tokens; method validated vs the known 7.19:1)

| Pairing | Now | Verdict | Action |
|---|---|---|---|
| body `ink-950` / `paper-50` | 17.35:1 | AAA | keep |
| subhead `ink-700` / `paper-50` | 7.44:1 | AAA | keep |
| **muted `ink-500` / `paper-50`** | **4.10:1** | **FAIL** | **darken token** |
| primary `clay-700` / `paper-50` | 7.19:1 | AAA | keep |
| **accent `clay-500` as text/small fill+white** | **3.67:1** | **FAIL** | **restrict usage** |
| soft `ink-950` / `clay-300` | 8.85:1 | AAA | keep |
| dark-mode muted | 7.30:1 | AAA | keep |

### Change C1 - muted-foreground (HIGH)
`--color-ink-500` is used as `--color-muted-foreground`. It fails AA for normal text. Point the semantic token at a darker value:

```
--color-muted-foreground: oklch(0.55 0.018 265);   /* was ink-500 0.58 -> 4.65:1 AA */
```
Keep `--color-ink-500` itself (may be used for non-text/decorative); only the semantic `muted-foreground` darkens. Verified: 0.55 = 4.65:1 (pass), 0.56 = 4.46:1 (fail) -> 0.55 is the minimal shift.

### Change C2 - accent-as-text discipline (HIGH)
`--color-signature` / `--color-accent` / `--color-chart-1` = `clay-500` (3.67:1). **Rule:** `clay-500` is a LARGE-FILL / decorative color only (canvas trails, large tiles, charts, fills >=24px). It must NEVER render text, an icon, or a small (<24px) fill with light text.
- Accent **text** or small accent fills -> `clay-700` (`signature-deep`, 7.19:1) or `clay-600` (5.13:1).
- Implementation: grep `accent`, `signature`, `chart-1`, `clay-500` usages; reassign any text/icon/small-fill occurrence to `signature-deep`/`clay-600`.

### Dark mode
Redesigned, not inverted (already correct). Dark muted passes 7.30:1. No change.

---

## 3. Typography (WS1 - the highest-ROI change)

### Family system: from "2 sans + mono" to "serif + sans + mono"
Today: **Satoshi (sans) + Poppins (sans) + Space Mono**. Two sans doing overlapping jobs is the redundancy (AI-slop adjacent). Fix = **retire Poppins, add an editorial serif for display**. Result is 3 families with three DISTINCT jobs (the legitimate editorial+technical pattern mistral uses: PP Editorial Old + Inter + JetBrains Mono), not the redundant-families anti-pattern.

| Family | Role | Token |
|---|---|---|
| **Editorial serif (locked: Fraunces)** | display only (hero h1, section h2) | `--font-display` (new) |
| **Satoshi** | UI, body, buttons, h3 and below | `--font-satoshi` (keep) |
| **Space Mono** | eyebrows, labels, status, code | `--font-mono` (keep) |
| ~~Poppins~~ | RETIRE | remove `--font-poppins`, fontsource dep, `/fonts/poppins`, preload |

> Blast radius of retiring Poppins: **MED**. Grep `font-poppins` / `Poppins` usages first and reassign each to Satoshi (UI) or the serif (display). Do not assert it is unused - verify.

### Serif lock: Fraunces (Regular/Medium)
- **Why Fraunces:** high optical contrast + "old style" opsz/WONK axis = closest open face to mistral's PP Editorial Old; reads "considered, luxury-editorial." OFL (free, commercial OK), woff2 via `@fontsource-variable/fraunces`.
- **Alternative (MCP-endorsed):** **Newsreader** (warm-editorial, opsz optical sizes, -0.01em) - safer/quieter. **Current OG provisional:** Spectral (will be swapped to the locked face).
- **Drama from size + serif + tight leading, NOT weight** - display stays Regular/Medium (400-500), per mistral and `premium-precision`.
- **OG-card note:** satori needs a TTF of the locked face; sourcing handled at implementation (Fraunces variable TTF from google/fonts, or a static instance).

### Scale assignment (keep existing px tokens; assign family + tracking + leading)

| Token | px / leading now | Family | Weight | Tracking | Leading target |
|---|---|---|---|---|---|
| `--text-heading` | 72 / 80 | **Fraunces** | 400 | -0.015em | **1.05** (tighten) |
| `--text-title-1` | 64 / 72 | **Fraunces** | 400 | -0.015em | 1.06 |
| `--text-title-2` | 48 / 56 | **Fraunces** | 500 | -0.01em | 1.1 |
| `--text-title-3` | 32 / 40 | Satoshi | 600 | -0.01em | 1.2 |
| `--text-subtitle` | 24 / 36 | Satoshi | 500 | 0 | 1.4 |
| `--text-body-lg` | 20 / 30 | Satoshi | 400 | 0 | 1.5 |
| `--text-body` | 16 / 24 | Satoshi | 400 | 0 | 1.5 |
| eyebrow/label | 12-13 | Space Mono | 400/700 | +0.08 to +0.12em, uppercase | 1.4 |

- Body stays 16px fixed (no `clamp()`); display tiers may use `clamp()` for fluid headings.
- Prose width: 65ch on long-form (`knowledge`, legal).
- Hero `SplitHeadline` becomes the serif at `--text-heading`, wrapped in a single semantic `<h1>` (WS2 W3).

---

## 4. Spacing & Rhythm (WS3)

- Keep the 4px grid, 88rem `--container-site`, existing space tokens, existing breakpoints (320/768/1024/1440).
- **Macro whitespace = perceived value** (`designer:whitespace`). Raise above-the-fold and primary section padding toward **96-120px** selectively (hero, Bento intro, CtaBand); keep `compact` density on dense/utility sections. Do not make everything uniform - spacing hierarchy is the signal.
- **Single-accent discipline:** one clay accent per viewport (Von Restorff). Navy tiles and clay accent should not both fight for focus in the same fold.
- **Pills for badges only:** fully-rounded pills reserved for status badges (Live / Soon). Buttons and cards use the radius scale (10-18px), never pills.
- Bleed 40-80px of the next section into view at the fold (no false floor).

---

## 5. Component Specs (deltas only; existing components otherwise stand)

| Component | Spec | WS |
|---|---|---|
| Hero headline | serif `<h1>` at `--text-heading`, leading 1.05; SplitHeadline animates words; accent word in `signature-deep` | WS1, W3 |
| Skip link | `<a href="#main">Skip to main content</a>` as first body element, visually-hidden until focus | W5 |
| Forms (Contact/Apply) | persistent visible `<label htmlFor>`; validate on blur; error = **icon + text + color** (never color-only); preserve input on error; allow paste | W6 |
| Section headers | Space Mono eyebrow (uppercase, tracking) + serif h2 | WS1 |
| Links (inline/footer) | default `ink-700`, **hover `signature-deep`** (the hover-clay convention) | WS3 |
| Buttons (CVA) | keep variants; focus-visible ring 2px/offset already present - keep; loading state replaces label, no width shift | P7 |
| Badges/pills | status only (Live = clay solid 7.19:1; Soon = clay-300 tint + ink-950 text 8.85:1) | WS3 |
| Cards/tiles | radius 10-18px; depth from border + tone, hover lift subtle (translateY 2-4px, 200ms) | P7 |
| Footer | shipped: mono eyebrow headers, hairline dividers, emblem bleed, ink-700 text | done |
| OG card | shipped; swap provisional Spectral -> locked serif (Fraunces) once approved | WS1 |

All interactive elements: visible hover, 2px focus ring, >=44px touch target, semantic element (`<a href>` / `<button>`).

---

## 6. Motion (preserve the strength; codify the discipline)

- **Preserve:** the comprehensive `prefers-reduced-motion` coverage (global CSS guard + per-component hooks across framer-motion, Lenis, canvas) - a measured strength, do not regress it.
- **UI chrome:** 150-250ms, ease-out, **no bounce** (premium-precision). Hover 150ms. Exit 50-100ms shorter than enter. Animate `transform`/`opacity` only.
- **Expressive motion lives in ONE place:** the hero (SplitHeadline springs, magnetic CTAs, parallax) and the generative canvases. Everything else stays quiet.
- Stagger list/reveal entrances 30-50ms/item. Max 2 animated elements per viewport (excluding the hero canvas).
- Lenis smooth scroll stays; bails under reduced-motion (already correct).

---

## 7. Elevation

- Premium-precision = minimal shadows. Depth from **border + tone**, not box-shadow. Any shadow is ultra-subtle and **warm-tinted** (`oklch(0.22 0.006 56 / 0.06)`), never `rgba(0,0,0,...)`.
- z-index scale: dropdown 1000 / sticky-header 1020 / modal 1050 / tooltip 1070 / toast 1080. No `z-9999`.
- Sticky header already offsets content; keep.

---

## 8. Do's and Don'ts (traced to evidence)

**Do**
1. Use the serif for display only; Satoshi for everything <=32px (mistral; `premium-precision`).
2. Keep display weight Regular/Medium - drama from size + tight leading 1.05 (mistral hero ~1.05).
3. One clay accent per fold; accent text uses `signature-deep` 7.19:1 (Von Restorff; WCAG).
4. Generous macro whitespace on primary sections (`designer:whitespace`; Apple/Rolex).
5. Keep the canvas hero + GoL as the color carriers (ownable; mistral imagery role).
6. Status badges as pills; everything else on the radius scale.

**Don't**
1. Don't use `clay-500` as text or small fills (3.67:1 FAIL).
2. Don't use `muted-foreground` for normal text until darkened to 0.55 (4.10:1 FAIL).
3. Don't add a second sans (the Poppins redundancy we are removing).
4. Don't recolor to "trust blue" (the MCP generic default; mistral proves warm is premium).
5. Don't put load-bearing footer content bottom-right (the ChatWidget FAB occludes it).
6. Don't bounce UI chrome or animate width/height/top/left.

---

## 9. Responsive (existing breakpoints: 320 / 768 / 1024 / 1440)

- Mobile-first; 16px min body (no iOS auto-zoom). Display serif uses `clamp()` so the 72px hero scales down (~40px mobile) without reflow.
- Content priority on mobile: hero h1 + primary CTA first; canvas hero may downscale; footer columns stack 2-up then 1-up.
- No horizontal scroll; prose 65ch; `min-h-dvh` not `100vh`.
- Footer columns: `grid-cols-2` -> `tablet:grid-cols-3`, dividers only at tablet+ (shipped).

---

## 10. Anti-Patterns - checks this design passes

| AI-slop / WCAG check | Status |
|---|---|
| AI purple default | PASS - warm clay signature, no #6366F1 |
| `font-weight: 500` everywhere | PASS - serif display 400-500, Satoshi body 400 / headings 600 |
| Cold grey bg (#F9FAFB) | PASS - warm `paper-50` oklch(0.985 0.006 85) |
| 3+ families | PASS (justified) - serif/sans/mono each a distinct job; the redundant 2nd sans is being removed |
| Line-height 1.75 on UI | PASS - 1.5 app body, 1.05-1.1 display |
| Pure #000 on #FFF | PASS - near-black `ink-950` on warm near-white |
| `outline:none` no replacement | PASS - 2px focus rings present |
| Color-only error | FIX in WS2 (W6) - add icon + text |
| Missing `prefers-reduced-motion` | PASS - comprehensive coverage |
| `rgba(0,0,0)` shadows | enforce warm-tinted (S7) |
| Missing h1 | FIX in WS2 (W3) |
| muted text < 4.5:1 | FIX in WS2 (C1) |

---

## Change set -> implementation (for forge-plan)

| WS | Change | Files | Blast radius |
|---|---|---|---|
| WS1 | Add `--font-display` (Fraunces), assign serif to display tiers, retire Poppins | `global.css`, font assets, heading components, `og.png.ts` | **MED** |
| WS2 | C1 darken `muted-foreground`; C2 accent-text audit; h1; skip link; form labels + non-color error | `global.css`, `Layout.astro`, Hero, Contact/Apply forms | **LOW-MED** |
| WS3 | Section rhythm (96-120px), single-accent, pills-for-badges, hover-clay, motion easing tokens | section components, `global.css` | **MED** |
| done | OG card, footer, twitter:image | shipped | - |

---

## Status: APPROVED (2026-06-20)

**Serif display face = Fraunces** (locked; closest to mistral's high-contrast PP Editorial Old; OFL, woff2 via `@fontsource-variable/fraunces`; OG card swaps Spectral -> Fraunces). Considered and rejected: Newsreader (quieter), Spectral (least dramatic).

Contract approved for `hyperstack:forge-plan`. Execution order: WS1 (serif + retire Poppins) -> WS2 (WCAG) -> WS3 (rhythm/discipline). Shipped already: OG card, footer, twitter:image.

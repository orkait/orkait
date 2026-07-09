# DESIGN.md - Orkait Landing Page

Contract for the ground-up landing redesign. Every visual decision below is binding
for implementation. Gates passed: PM (PASS), personas (Morgan/Diane/Max), designer MCP
(technical-developer personality, landing template, 35 developer-tool anti-patterns).

## 1. Visual Theme & Atmosphere

One sentence: **a lab notebook you can audit - black ink, white paper, red proof.**

- Personality: `technical-developer` (Supabase/Warp/Vercel lineage) crossed with
  `premium-precision` restraint. Evidence over spectacle.
- Emotional target: technical + trustworthy. The visitor is a skeptical developer
  whose job-to-be-done is "decide in under a minute whether this lab is real."
- Identity devices: monospace for every fact (numbers, statuses, latencies),
  hairline borders, flat color banding, one live terminal transcript as the hero
  object, the three-body canvas retained as low-opacity background texture
  (physics = lab identity; texture, never spectacle).
- Page banding rhythm (flat blocks, no gradients anywhere):
  `BLACK hero -> BLACK proof strip -> WHITE products -> BLACK open source -> RED cta -> BLACK footer`

## 2. Color

EXTEND the existing token system - do not replace.

- Neutrals (existing): near-black `oklch(0.145 0 0)` (`--color-ink-950`/tile),
  near-white `oklch(0.985 0 0)` (`--color-paper-50`). Chroma 0, committed neutral.
- Accent (existing, locked by owner): red ramp hue 27 -
  `--color-red-400 oklch(0.640 0.215 27)` accent-on-black,
  `--color-red-500 oklch(0.560 0.230 27)` fills,
  `--color-red-600 oklch(0.490 0.205 27)` bands/hover.
- NEW dark-surface elevation steps (dark elevation = lighter bg, never shadows):
  `--color-surface-1: oklch(0.19 0 0)`, `--color-surface-2: oklch(0.23 0 0)`,
  dark border `oklch(1 0 0 / 0.10)`.
- Red budget: red is only permitted on (a) one accent word in H1, (b) primary CTA,
  (c) LIVE status, (d) metric values, (e) the CTA band. Nothing else. One
  high-chroma accent, rest muted (Von Restorff).
- No gradients. No glass. Depth = surface swaps + hairlines.

## 3. Typography

- Families (existing, keep): Outfit (display), Geist (body/UI), Space Mono (facts).
  Rule: if it is a number, a status, a label, or code - it is Space Mono.
- Scale (1.333): display `clamp(2.5rem, 5.5vw, 4.5rem)` w600 lh1.05 tracking -0.02em;
  h2 `clamp(1.75rem, 3vw, 2.5rem)` w600 lh1.1 tracking -0.02em;
  body 16px FIXED lh1.5; body-lg 18px lh1.6 (prose only); mono-label 12px
  uppercase tracking +0.14em; mono-value 14px lh1.6.
- Alignment: LEFT. The centered-template look is banned on hero and section
  headers. Center only the CTA band button block if needed - prefer left split.
- Prose max 65ch.

## 4. Spacing & Grid

- 4px grid throughout (existing tokens).
- Section padding: 96-128px desktop, 64px mobile. Proof strip is compact: 40px.
- Container: existing `max-w-site` (88rem). Content grid: 12-col, 24px gutters
  desktop / 16px mobile.
- Density: normal on marketing surfaces, compact inside terminal/data blocks.

## 5. Sections & Components (desktop -> mobile)

### 5.1 Nav (SiteHeader)
- SOLID near-black bar. The frosted glass is retired (it tinted salmon over red).
- Left: logo + wordmark (white). Center-left: Products / Knowledge / Careers
  (Geist 14px, white/70, hover white + underline offset). Right: `Open Rustbox`
  red solid button + `Contact` ghost.
- Hairline bottom border white/10. Auto-hide on scroll-down retained (existing).
- Mobile: wordmark + hamburger (existing sheet), same solid black.
- States: hover, focus ring 2px red offset 2, active page underline.

### 5.2 Hero (black)
- Layout: 12-col split. Left 6-7 cols: overline mono `AN AI LAB THAT ACTUALLY
  SHIPS` (white/60) -> H1 `AI you don't have to take on faith.` ("faith" in
  red-400) -> subcopy (Geist 18px, white/70, max 54ch) -> CTA row: red solid
  `Open Rustbox ->` + ghost `See the proof` (anchor-scrolls to proof strip).
- Right 5-6 cols: TERMINAL PROOF BLOCK - a static, truthfully-labeled transcript
  of the real Rustbox API: curl request -> `AC Accepted` -> stdout 42 -> CPU 9.1ms
  -> exit 0. Surface-1 bg, hairline border, mono 13px, traffic-light dots, red
  LIVE pill. This is the hero image (75% of SaaS use product screenshot; ours is
  the product's actual output).
- Background: three-body canvas at reduced opacity (<=0.5 overlay), z-below
  content. Texture only.
- Fold: proof strip bleeds 40-80px into first viewport (false-floor rule).
- Mobile: stack - overline, H1, subcopy, CTAs, then terminal block full-width.
  Canvas stays (cheap, already perf-gated by IntersectionObserver).

### 5.3 Proof strip (black, replaces logo wall)
- The logo wall is CUT (no real customer logos; fake proof is the fastest
  credibility loss - Morgan).
- 4 facts, mono, hairline-separated columns; value 28px Space Mono + label 12px
  uppercase white/55. Each links to its source:
  `8 languages` -> rustbox docs; `~36ms median exec` -> rustbox.sh;
  `0 escapes / 22 adversarial tests` -> rustbox.sh; `2 repos open source` ->
  github.com/orkait. Values use red-400; labels white/55.
- NOTE - data integrity: the page previously showed "147 adversarial exploits"
  while `products.ts` says 22 adversarial tests. 22 (the owner-authored data
  file) is the number used everywhere until the owner confirms otherwise.
- Mobile: 2x2 grid.

### 5.4 Products (white)
- Section header, left: mono overline `PRODUCTS` + h2 `One shipped. Two loading.`
- Rustbox = dominant feature card (full width): black card, real product
  screenshot (grayscale, right 45%, flat overlay - no gradient), left content:
  status LIVE pill (red), name, one-liner, description, metrics row (mono,
  red values: 8 languages / 22 adversarial tests / 0 escapes), `Open Rustbox ->`.
  Whole card = link. Hover: translateY(-2px) + border brighten, 150ms.
- BooleanStack + Zen = DEMOTED to compact rows under the card (not sibling
  cards): name + one-liner + status chip + link (BooleanStack ->
  booleanstack.com, opens new tab; Zen unlinked `Coming soon`). Hairline
  separators, white bg. Coming-soon must never outweigh the live product.
- Mobile: card stacks (content over image), rows unchanged.

### 5.5 Open source & research (black)
- Header: mono overline `OPEN SOURCE` + h2 `We wrote the hard parts ourselves.`
  + subcopy `Read the code, run the tests.`
- 2 repo cards (GraphStore, Hyperstack): surface-1, hairline border, mono repo
  name prefixed `orkait/`, statement, metrics (mono red values), `View on
  GitHub ->`. Hover as 5.4.
- Orka = research row beneath (not a card): `RESEARCH` chip, statement
  "Language-model weights, compressed toward 2 bits.", `~2 bit` metric, text
  note `Source opens soon at github.com/orkait/orka.py` (NOT a link until the
  repo is public - no 404s on an evidence page).
- MemoryGraph canvas retained on desktop left column (existing, on-identity).
- Mobile: cards stack; keep existing horizontal snap only if stacking overflows.

### 5.6 CTA band (red-600)
- LEFT split, not centered: left = h2 `Have a hard problem worth shipping?` +
  one line `We take on selective research partnerships when there is a path to
  a real system.` Right = black solid button `Get in touch ->` vertically
  centered. Flat red, no texture.
- Mobile: stacks, button full-width, min-height 48px.

### 5.7 Footer (black)
- Existing structure retained: newsletter (`Product updates, no noise.`),
  link columns (Products column: Rustbox, BooleanStack->booleanstack.com, Zen),
  legal, giant wordmark. Restyle only to match hairline/mono vocabulary.

## 6. Motion

- Durations: 150ms hover / 200ms default / 300ms section reveal. Nothing >400ms.
- Easing: ease-out enter, ease-in exit; `--ease-emphasized` allowed for nav hide.
- Reveal-on-scroll: opacity 0->1 + translateY(12px)->0, 300ms, stagger 40ms per
  item, once. (Existing `[data-reveal]` system - retune, reuse.)
- Hover: translateY(-2px) + border-color, 150ms tween. NO springs (spring =
  playful; this is an evidence page). Remove framer spring lifts.
- Terminal block: types nothing, animates nothing except a 1.2s red LIVE dot
  pulse (status = information, allowed).
- Canvas: existing three-body (already viewport-paused, setTimeout-driven).
- `prefers-reduced-motion`: all of the above -> none; canvas static frame
  (existing behavior). Non-negotiable.
- GPU-only: transform + opacity. Max 2 animated elements per viewport.

## 7. Elevation & Z

- Light surfaces: shadows minimal - `0 1px 2px oklch(0.145 0 0 / 0.06)` cards.
- Dark surfaces: NO shadows; elevation = surface-1/surface-2 lighter bg steps.
- z-scale: content 0-10, nav 1020, mobile sheet 1050. No 9999.

## 8. Do's & Don'ts (this product)

DO: mono for every fact; link every number to its source; left-align; keep red
scarce; label the terminal transcript truthfully; keep 44px touch targets;
`min-h-dvh` not 100vh; focus ring 2px red on everything interactive.
DON'T: gradients; glass; logo walls without customers; equal weight to
coming-soon products; unsourced metrics; springs/bounce; centered multi-line
paragraphs; animate width/height; dead links (orka.py stays text until public);
emoji as icons.

## 9. Responsive

- Breakpoints (existing): mobile 320 / tablet 768 / laptop 1024 / base 1440.
- 375px: hero stacks (copy -> CTAs -> terminal), proof 2x2, products stack,
  rows stay rows, CTA stacks w/ full-width button, no horizontal scroll.
- 768px: hero still stacked but terminal max-w 560 centered-left; proof 4-col.
- 1024px+: hero splits 7/5; products card goes image-right.
- Content priority mobile: H1 -> CTA -> terminal proof -> stats -> Rustbox card.
  Everything else defers.

## 10. Anti-pattern compliance

Checked against the 35 developer-tool anti-patterns: no AI purple, OKLCH-only
tokens, no pure #000/#fff, weight contrast 600/400, no 3rd family misuse
(mono = data role), 4px grid, max-width constrained, hover+focus+states
everywhere, no emoji icons, reduced-motion enforced, no linear easing, no
layout-property animation, no arbitrary z-index, aspect-ratio on images,
sticky-nav body offset, banded sections instead of borders-everywhere.
AI-slop fingerprint: 0/15 present.

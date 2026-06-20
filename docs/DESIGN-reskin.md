# DESIGN.md - Orkait Reskin (Mistral-inspired, own identity)

Reskin of the just-migrated Astro site. Takes Mistral's *system* - warm paper, bold display, bento color blocks, dark-product capability cards - and expresses it in **orkait's own identity**: electric-cobalt signature (not Mistral flame), amber heritage spark, navy ink. Reuses the existing Astro + Tailwind v4 token architecture; changes values + adds new section patterns.

```
WORKSPACE REALITY
- Stack: Astro 6 + Tailwind v4 @theme + React islands (raw Astro + CVA, no shadcn)
- Existing system: slate-monochrome, Satoshi+Poppins, 1340px, 72->16 type scale
- Inspiration (ground-truthed from mistral.ai Astro CSS): warm paper #fbfbf8, navy ink #151524,
  ALTMistral bold grotesk + Inter, flame ramp, bento blocks, dark-product capability cards, ~1536 container
- Decision: NEW visual direction. Reuse token *architecture* + 1340px layout system; reskin values + add patterns.
```

Personality: **bold-energetic** x **warm-editorial** (MCP-resolved). "Confident product lab on warm paper - electric, not loud."

---

## 1. Visual Theme & Atmosphere

| Property | Value |
|---|---|
| Emotional target | Bold + confident, warm not corporate |
| Personality | bold-energetic (display weight, large type) on a warm-editorial paper base |
| Inspiration | Mistral structure; orkait identity (electric cobalt + amber, navy ink) |
| Default mode | Light (warm paper). Dark mode = navy-surface redesign, retained. |
| One-line | "Applied AI research, shipped as products - on warm paper, in bold type, with one electric accent." |

What changes vs current orkait: cool slate -> **warm paper + navy ink**; zero accent -> **one electric-cobalt signature + amber spark**; restrained -> **big bold display + bento color blocks + richer motion**. Keeps: product-first brand voice, monochrome discipline (accent is the ONLY color, used deliberately).

## 2. Color Palette (OKLCH, warm)

Replaces the slate ramp. 3-layer: primitives -> semantic -> Tailwind `@theme` bridge.

```
NEUTRALS - warm paper + navy ink (commit warm; never cool slate)
  --paper-50    oklch(0.985 0.006 85)   #fcfbf7   page background
  --paper-100   oklch(0.965 0.008 84)   #f5f3ec   raised section
  --paper-200   oklch(0.935 0.010 82)   #eae6da   sand / tertiary
  --ink-950     oklch(0.20  0.025 265)  #16172a   primary text (navy-tinted, NOT #000)
  --ink-700     oklch(0.44  0.02  265)  #4a4c63   secondary text
  --ink-500     oklch(0.58  0.018 265)  #74768c   muted
  --ink-300     oklch(0.80  0.012 265)            borders/dividers

SIGNATURE - electric cobalt (the ONE focal hue; distinct from Mistral flame)
  --cobalt-50   oklch(0.96 0.03 264)
  --cobalt-300  oklch(0.70 0.14 264)
  --cobalt-500  oklch(0.52 0.20 264)   vivid cobalt - primary actions, links, focal
  --cobalt-600  oklch(0.46 0.19 264)   hover/active
  --cobalt-700  oklch(0.40 0.16 264)

SECONDARY SPARK - amber (orkait heritage, orkait_yellow.svg; highlights only, sparing)
  --amber-400   oklch(0.84 0.15 80)
  --amber-500   oklch(0.80 0.16 75)    accent dots, "live" badge, bento tile

STATUS (keep)
  --success oklch(0.62 0.15 150)   --destructive oklch(0.58 0.20 25)
  charts: dedicated --chart-1..5 (cobalt + amber + ink tints), NOT reused from primary
```

Semantic tokens (light/dark pairs): `--surface-{primary,raised,sand,invert}`, `--text-{primary,muted}`, `--action-{primary,ghost}`, `--accent-{signature,spark}`, `--border`. Dark mode = navy-950 surfaces, paper-50 text, progressively lighter surfaces (redesign, not invert). Max 2 accents (cobalt + amber). No AI purple.

## 3. Typography

Keep Satoshi (already a clean grotesk - covers the "ALTMistral bold display" role). Add Space Mono for the capability-card label/tag lists (Mistral's mono-label move). Drop Poppins. **2 families.**

| Role | Font | Weight | Tracking | Notes |
|---|---|---|---|---|
| Display (hero) | Satoshi | 900 | -0.03em | huge, `clamp()`; ONE word gets playful per-letter jitter |
| Heading | Satoshi | 700 | -0.02em | section titles, 32px+ |
| Body | Satoshi | 400 | 0 | keep existing 16/24 body |
| Label / tag / eyebrow | Space Mono | 400-700 | +0.06em | uppercase small caps for capability tags, section numbers "(01)" |

Type scale: keep orkait's existing (heading 72/80 ... body 16/24). Headings fluid via `clamp()`, body fixed 16px. Weight contrast 900/700 vs 400. Prose 65ch.

## 4. Spacing & Layout

Keep the 4px grid + radius scale. Layout deltas:

| Token | Current | Reskin |
|---|---|---|
| `--container-site` | 83.75rem (1340) | **88rem (1408)** - a touch wider, closer to Mistral's airy feel |
| `--container-wide` | - | **96rem (1536)** - full-bleed bento blocks |
| Radius | 6-18 | bump cards to **16-20px** (bold-energetic confident radius); pills full |
| Section padding | py-24/32 | comfortable: 96-128px between sections |

Density: comfortable for marketing (was compact). 12-col grid, bento uses asymmetric spans.

## 5. Component Specs (new + restyled)

| Component | Spec | States |
|---|---|---|
| **Button / primary** | cobalt-500 bg, paper text, radius-lg, 44px+ | hover cobalt-600, focus 2px cobalt ring +2 offset, active scale-98, disabled opacity-50 |
| **Button / ghost** | transparent, ink border, "Discover X ->" | hover ink-on-paper-100, focus ring |
| **Button / dark pill** | navy bg, paper text (nav "Contact us") | hover lighten |
| **Bento block** (signature) | full-bleed grid of rounded tiles, varied sizes; fills = cobalt / amber / navy / paper; some hold a product wordmark or stat | hover: subtle scale + shadow (reduced-motion off) |
| **Capability card** (signature) | heading + dark product-UI image (rounded-2xl, aspect-ratio set) + Space Mono tag row + ghost "Discover ->" + amber accent dot | image lazy + blur-up; card hover lift |
| **Featured card** | dark image card, label + title, in a drag carousel | active/hover; dots indicator |
| **Nav** | minimal text links + dark pill CTA; active = cobalt underline/weight; mobile = popover (existing) | active-state desktop AND mobile (kept) |
| **Product line card** | restyle existing: warm surface, status badge (amber=live, ink-muted=soon) | hover lift |

All interactive: hover + 2px cobalt focus ring + cursor-pointer + 44px target. SVG icons (lucide). No emojis.

## 6. Motion (bold-energetic, accessible)

| Token | Value |
|---|---|
| fast / normal / slow | 150 / 250 / 400ms |
| easing | ease-out enter, ease-in exit, spring `cubic-bezier(0.34,1.56,0.64,1)` for playful bits |
| Scroll reveal | existing `data-reveal` (keep), stagger 40ms |
| Hero jitter | one word, subtle per-letter rotate (CSS, transform-only), <=2deg |
| Rules | transform/opacity only; max 2 animated per viewport; exits faster |
| Reduced motion | existing global guard - all of the above bail under `prefers-reduced-motion` |

Keep lenis smooth scroll. Canvas FX (AsciiField/GameOfLife) optional - could become bento tiles or retire; decide in forge-plan.

## 7. Elevation

Light: warm-tinted shadows `0 8px 24px oklch(0.20 0.02 265 / 0.08)` (never cold rgba). Colored shadow on cobalt CTAs `oklch(0.52 0.20 264 / 0.12)`. Dark: elevation by progressively lighter navy surfaces, no box-shadow. z-index scale: dropdown 1000 / sticky 1020 / modal 1050 / toast 1080.

## 8. Do's and Don'ts

1. DO warm every neutral (paper + navy ink) - no cool slate, no #F9FAFB, no pure #000/#FFF.
2. DO keep cobalt as the ONE focal hue; amber is a spark, not a co-star (<=2 accents).
3. DO use big Satoshi-900 display + Space Mono labels for the editorial-bold contrast.
4. DO lead with the bento block + capability-card patterns - that's the borrowed system.
5. DO set aspect-ratio on every product-UI image (no CLS).
6. DON'T clone Mistral's flame palette or ALTMistral - own hue, own font.
7. DON'T reuse cobalt for charts - separate `--chart-*`.
8. DON'T animate width/height; transform+opacity only; everything honors reduced-motion.
9. DON'T introduce agency/pricing framing (CLAUDE.md) - product-first voice holds.
10. DON'T break `data-integrity.test.ts` brand guarantees during the reskin.

## 9. Responsive

Breakpoints unchanged (mobile 320 / tablet 768 / laptop 1024 / base 1440). Mobile priority: hero headline + one CTA first; bento collapses to 2-col then 1; capability cards stack (image below heading); Space Mono tags wrap; nav -> popover. Content max 1408px; prose 65ch; `min-h-dvh` for hero. No horizontal scroll. Honor `mobile-home-regression.test.ts`.

## 10. Anti-Patterns This Passes

AI-slop fingerprint: warm OKLCH neutrals (not cold grey), navy-near-black on warm-white (not pure), one high-chroma accent (not all-same-chroma), weight contrast 900/400, negative heading tracking, no AI purple, separate chart tokens, reduced-motion guard, bento (not identical-card grid), warm shadows. Brand: `data-integrity.test.ts` still enforces product truth + banned phrases.

---

## Resolved Decisions (locked 2026-06-20)

1. **Signature hue** - **electric cobalt** `oklch(0.52 0.20 264)` (#2f4fd6). Amber `oklch(0.80 0.16 75)` = secondary spark only.
2. **Scope** - HOME FIRST (full reskin: tokens + bento + capability cards), review on tunnel, then roll out to the other 6 routes.
3. **Canvas FX** - REIMAGINE AsciiField + GameOfLife as living bento tiles within the signature block grid.

Contract status: **APPROVED / LOCKED**. Build home reskin.

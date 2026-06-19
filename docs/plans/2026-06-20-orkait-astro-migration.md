# Plan: Orkait Next.js → Astro Migration

Input: approved `DESIGN.md` (migration contract, locked 2026-06-20). In-place rewrite of `/mnt/storage/codespace/code/orkait/orkait`. Full site, React islands for interactive bits, forms via existing Cloudflare Worker.

Branch (Rule 16): `f-FE-orkait-astro-migration`. Never commit to `main`.

---

## MCP Survey (this session)

| Domain | Tool | Result used in |
|---|---|---|
| React islands | `react_get_constraints` | RSC-first → static `.astro` default, island only when interactive (Tasks P3-P4) |
| Reduced motion | `motion_get_api(useReducedMotion)` | `MotionConfig reducedMotion="user"` wraps island roots (Task P4.x, fix #2) |
| Smooth scroll | `lenis_get_pattern(accessibility/full-page)` | vanilla lenis in Astro client script + matchMedia reduced-motion gate (Task P2.5) |
| Astro 6 conventions | reference repo `apps/landing` (real code, MCP has no `astro_*`) | astro.config, Section/Container, font preload, client modules, island directives |

Degraded-mode flag: Astro framework specifics grounded in the reference repo, not Context7 (quota exhausted). Versions pinned from reference `package.json`.

---

## File Map

```
DELETE (entire Next surface, after parity confirmed):
  next.config.ts · src/app/** · postcss.config.mjs(next) · components.json · eslint.config.mjs(next)
  src/config/{navigation,images}.ts · src/components/sections/pricing/** · src/data/pricing.ts
  unused constants block in src/constants/index.ts

CREATE - config:
  astro.config.mjs              - astro 6 + react + sitemap, static output
  postcss.config.mjs            - @tailwindcss/postcss
  tsconfig.json                 - astro strict (replace)
  eslint.config.mjs             - eslint-plugin-astro + ts
  vitest.config.ts              - jsdom env
  src/env.d.ts

CREATE - styles/tokens:
  src/styles/global.css         - PORT orkait globals.css verbatim + --container-site + max-w-site

CREATE - layout shell:
  src/layouts/Layout.astro
  src/layouts/BareLayout.astro          - legal/content pages
  src/components/layout/Container.astro
  src/components/layout/Section.astro
  src/components/layout/SiteHeader.astro
  src/components/layout/SiteFooter.astro

CREATE - client modules (vanilla TS):
  src/lib/client/smoothScroll.ts        - lenis + reduced-motion
  src/lib/client/revealOnScroll.ts      - replaces fade-in/slide-up/stagger wrappers (fix #2)
  src/lib/utils.ts                       - cn = twMerge(clsx)

CREATE - data layer (PORT, prune dead):
  src/lib/data/nav.ts · footer.ts · products.ts · team.ts · features.ts · capabilities.ts · services.ts
  src/lib/markdown.ts                    - PORT
  src/lib/chat-markdown.ts               - PORT (chat island)

CREATE - static .astro components:
  components/sections/home/{Hero,Process,Advance,ServicesText,StudioText}.astro
  components/shared/{Heading,IconBox,ContentPage}.astro
  components/ui/{Button,Card,Badge}.astro          - CVA, from DESIGN.md S5

CREATE - React islands (.tsx, hydrated):
  components/react/Flash.tsx · Feedback.tsx · AsciiField.tsx · GameOfLife.tsx
  components/react/TeamCarousel.tsx · ProjectsInteractive.tsx
  components/react/ContactForm.tsx · ApplyForm.tsx · ChatWidget.tsx
  components/react/ui/**                            - pruned shadcn subset islands consume
  src/lib/react-hooks/**                            - PORT use-mobile, use-prefers-reduced-motion, useCarouselInit, useChatbot

CREATE - pages:
  src/pages/{index,projects,contact,careers,knowledge,terms,privacy-policy}.astro

CREATE - tests (PORT + new):
  src/lib/data/data-integrity.test.ts   - PORT (brand guard)
  src/components/home/mobile-home-regression.test.ts - PORT
  src/lib/client/smoothScroll.test.ts   - reduced-motion gate
  src/lib/forms/payload.test.ts         - zod schema shared with Worker

MODIFY - chatbot Worker (forms endpoint, fix #1):
  chatbot/src/index.ts                  - add POST /api/contact + /api/apply (Resend)
  chatbot/src/forms.ts                  - zod validate + Resend send (port app/actions/*)
  chatbot/src/forms.test.ts
```

---

## Phase 0: Branch + Scaffold

### Task 0.1: Feature branch + clean workspace
- [ ] `git checkout -b f-FE-orkait-astro-migration`
- [ ] Verify clean: `git status` → clean tree
Commit: none yet.

### Task 0.2: Astro project config (pinned to reference versions)

**Files:** Create `astro.config.mjs`, `postcss.config.mjs`, `tsconfig.json`, `src/env.d.ts`; Modify `package.json`.

**MCP refs:** reference `astro.config.mjs:8-36`, `package.json` deps.

- [ ] Step 1: replace `package.json` deps/scripts:
```jsonc
{
  "scripts": {
    "dev": "astro dev", "build": "astro build", "preview": "astro preview",
    "check": "astro check", "lint": "eslint .", "test": "vitest run"
  },
  "dependencies": {
    "astro": "^6.4.6", "@astrojs/sitemap": "^3.7.3",
    "@base-ui/react": "^1.5.0", "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1", "lenis": "^1.3.23", "lucide-react": "^1.17.0",
    "react": "19.2.4", "react-dom": "19.2.4", "sharp": "^0.35.1",
    "tailwind-merge": "^3.6.0", "zod": "^3.x", "embla-carousel-react": "*",
    "embla-carousel-autoplay": "*", "framer-motion": "*",
    "react-hook-form": "*", "@hookform/resolvers": "*"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.9", "@astrojs/react": "^5.0.7",
    "@tailwindcss/postcss": "^4.3.0", "@tailwindcss/typography": "^0.5.20",
    "tailwindcss": "^4", "tw-animate-css": "^1.4.0", "typescript": "^5",
    "eslint": "^9", "eslint-plugin-astro": "^1.7.0", "typescript-eslint": "^8.61.0",
    "vitest": "^4.1.8", "jsdom": "^29.1.1", "@types/react": "^19", "@types/react-dom": "^19"
  }
}
```
- [ ] Step 2: `astro.config.mjs`:
```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? "https://orkait.com",
  integrations: [react(), sitemap()],
  build: { inlineStylesheets: "always" },
  vite: { resolve: { dedupe: ["react", "react-dom"] } },
});
```
- [ ] Step 3: `postcss.config.mjs` → `export default { plugins: { "@tailwindcss/postcss": {} } };`
- [ ] Step 4: Verify: `pnpm install && pnpm astro check` → no config errors (no pages yet OK).
- [ ] Step 5: Commit `chore: scaffold astro config and deps`.

---

## Phase 1: Tokens + Layout System (the 1340px contract)

### Task 1.1: Port design tokens verbatim
**Files:** Create `src/styles/global.css`.
**DESIGN.md:** S2, S3, S4, S7. **Self-review:** colors/type/spacing match `src/app/globals.css` exactly; add `--container-site`.

- [ ] Step 1: copy `@theme`, `@theme inline`, `.dark`, base layer, lenis classes, `fade-edge-*`, `process-grid`, `marquee` from current `globals.css` into `src/styles/global.css`. Replace `@import "shadcn/tailwind.css"` line (Next-specific) - keep `@import "tailwindcss"` + `tw-animate-css`.
- [ ] Step 2: add to `@theme`: `--container-site: 83.75rem;` and utility:
```css
@utility max-w-site { max-width: var(--container-site); }
```
- [ ] Step 3: `@font-face` for Satoshi (local woff2) + Poppins (self-hosted woff2); set `--font-satoshi`, `--font-poppins`.
- [ ] Step 4: Verify: temporary `pages/index.astro` importing global.css → `pnpm astro build` succeeds; inspect computed `--container-site`.
- [ ] Step 5: Commit `feat: port orkait design tokens to astro global.css`.

### Task 1.2: Container + Section
**Files:** Create `Container.astro`, `Section.astro`, `src/lib/utils.ts`.
**DESIGN.md:** S4. **MCP/ref:** `Container.astro:9`, `Section.astro:24-39`.

- [ ] Step 1: `utils.ts`: `export const cn = (...a) => twMerge(clsx(a))`.
- [ ] Step 2: `Container.astro`: `<div class={cn("mx-auto w-full max-w-site px-6 tablet:px-8", className)}><slot/></div>`.
- [ ] Step 3: `Section.astro` with CVA: variants `background` (none/light/dark/beige), `spacing` (sm=py-12/md=py-24/lg=py-32), `maxWidth` (default=max-w-site/narrow=max-w-3xl/wide=max-w-[1536px]/full). Inner `<Container>` unless `maxWidth=full`.
- [ ] Step 4: Verify: render both in scratch page at 1440px viewport → content column = 1340px centered, 32px gutters. `pnpm astro check`.
- [ ] Step 5: Commit `feat: add Section + Container 1340px layout system`.

### Task 1.3: Layout.astro + BareLayout.astro
**Files:** Create both layouts. **MCP/ref:** `Layout.astro` head + script loading (`:103-165`).

- [ ] Step 1: `Layout.astro`: `<html><head>` font preloads, `<meta>` from props (port `createPageMetadata` shape), `global.css` import; `<body>` slot; `<script>` loads `smoothScroll.ts` + `revealOnScroll.ts`.
- [ ] Step 2: `BareLayout.astro`: minimal head + slot (legal/content).
- [ ] Step 3: Verify: `pnpm astro check` clean.
- [ ] Step 4: Commit `feat: add Layout + BareLayout shells`.

---

## Phase 2: Shell + Client Modules + Data

### Task 2.1: Data layer port (prune dead - DESIGN.md 5e)
**Files:** Create `lib/data/{nav,footer,products,team,features,capabilities,services}.ts`.
**Self-review:** DROP `navigation.ts`, `images.ts`, `pricing.ts`, unused constants. Keep only consumed exports.

- [ ] Step 1: port `PRODUCT_LINES`, `PROJECTS`, `OSS_PROJECTS` → `products.ts`; `TEAM_MEMBERS` → `team.ts`; `FEATURES`,`CAPABILITIES_*`,`SERVICES`,`FOOTER_COLUMNS`,`HEADER_LINKS`,routes → split files.
- [ ] Step 2: Verify: `pnpm astro check` (types resolve).
- [ ] Step 3: Commit `feat: port data layer, drop dead exports`.

### Task 2.2: data-integrity test port (brand guard)
**Files:** Create `lib/data/data-integrity.test.ts` (port). **DESIGN.md:** S10.
- [ ] Step 1: port assertions: unique IDs, ≤4 product/oss cards, Rustbox=live only, BooleanStack+Zen=coming-soon, banned-phrase scan over `.astro`+data, exclude unified-mcp/gatekeeper, header links valid, team images exist, knowledge md 7 sections.
- [ ] Step 2: Run `pnpm vitest run src/lib/data/data-integrity.test.ts` → PASS.
- [ ] Step 3: Commit `test: port brand data-integrity guard`.

### Task 2.3: smoothScroll client module (lenis + reduced-motion, fix #2)
**Files:** Create `lib/client/smoothScroll.ts`, `smoothScroll.test.ts`.
**MCP:** `lenis_get_pattern(accessibility)` - matchMedia gate.
- [ ] Step 1 (test): assert `if matchMedia("(prefers-reduced-motion: reduce)").matches` → lenis NOT instantiated (export a factory returning null when reduced).
- [ ] Step 2 (impl): vanilla `import Lenis from "lenis"`; guard reduced-motion; `requestAnimationFrame`-free raf loop is required by lenis - **exception:** lenis internally needs rAF; global Rule 9 bans *our* rAF use. Use lenis's built-in `autoRaf: true` option so we never call rAF ourselves.
- [ ] Step 3: Run test → PASS.
- [ ] Step 4: Commit `feat: lenis smooth-scroll with reduced-motion gate`.

### Task 2.4: revealOnScroll (replaces framer wrappers on static content, fix #2)
**Files:** Create `lib/client/revealOnScroll.ts`.
- [ ] Step 1: IntersectionObserver adds `.is-visible` to `[data-reveal]`; bail entirely if reduced-motion. CSS in global.css: `[data-reveal]{opacity:0;transform:translateY(40px)} .is-visible{opacity:1;transform:none;transition:...}`.
- [ ] Step 2: Verify: scratch page, element reveals on scroll; reduced-motion → visible immediately.
- [ ] Step 3: Commit `feat: css scroll-reveal honoring reduced-motion`.

### Task 2.5: SiteHeader + SiteFooter
**Files:** Create `SiteHeader.astro`, `SiteFooter.astro`.
**DESIGN.md:** S5a. **Fix #8:** mobile active-state. **MCP/ref:** popover mobile menu.
- [ ] Step 1: header nav from `lib/data/nav.ts`; active via `Astro.url.pathname.startsWith(href)`; mobile menu HTML `popover` API; active-state styling applies on mobile too.
- [ ] Step 2: footer columns from `lib/data/footer.ts`.
- [ ] Step 3: Verify: `pnpm astro check`; nav active correct per route.
- [ ] Step 4: Commit `feat: site header + footer, mobile active-state fix`.

---

## Phase 3: Static pages + .astro components

For each: build static `.astro`, verify `astro check` + visual parity against the running Next dev (`next dev` on a clean checkout for reference). One commit per page.

### Task 3.1: UI primitives (Button, Card, Badge .astro)
- [ ] CVA per DESIGN.md S5 (port variants from `ui/button.tsx` etc). Verify all states (hover/focus/disabled). Commit.

### Task 3.2: Home static parts (Hero, Process, Advance, ServicesText, StudioText)
- [ ] Port markup + data; wrap in Section/Container; `data-reveal` for scroll-in. Island slots left as placeholders for Phase 4. Verify parity. Commit.

### Task 3.3: terms + privacy-policy (BareLayout + ContentPage)
- [ ] Port `ContentPage` → `.astro`; render markdown. Verify. Commit.

### Task 3.4: knowledge page
- [ ] Port `lib/markdown.ts`; read `chatbot/knowledge/index.md`; render. Verify 7 sections present. Commit.

### Task 3.5: mobile-home-regression test port
- [ ] Port assertions adapted to `.astro` output (grep rendered classes). `pnpm vitest run`. Commit.

---

## Phase 4: React islands

Each island: port the existing React component into `components/react/`, mount in its page with the directive from DESIGN.md S5c, wrap root in `<MotionConfig reducedMotion="user">` where it uses framer-motion (fix #2). Prune `ui/*` to consumed subset.

### Task 4.1: hooks + ui subset port
- [ ] Port `use-mobile`, `use-prefers-reduced-motion` (init `false` not `undefined` - fix SSR hazard from codemode #3), `useCarouselInit`, `useChatbot`. Commit.

### Task 4.2: Flash showcase (`client:visible`)  → index
### Task 4.3: Feedback carousel (`client:visible`) → index
### Task 4.4: AsciiField + GameOfLife (`client:visible`) → index  (keep setTimeout loops, Rule 9)
### Task 4.5: TeamCarousel (`client:visible`) → projects
### Task 4.6: ProjectsInteractive (`client:visible`) → projects, honor PROJECTS_LAYOUT flag
### Task 4.7: ChatWidget (`client:idle`) → Layout, env PUBLIC_CHATBOT_URL

Each: mount, `pnpm astro build` (island compiles, no hydration error), visual parity, commit.

---

## Phase 5: Forms via Worker (fix #1, #4)

### Task 5.1: shared zod payload
**Files:** Create `src/lib/forms/payload.ts` + `payload.test.ts` (importable by Worker + island).
- [ ] Step 1 (test): contact schema {firstName,email,contact}; apply schema {name,email,phone,portfolio?,message,role}. Assert reject on bad email.
- [ ] Step 2 (impl): port zod schemas from `app/actions/{contact,apply}.ts`.
- [ ] Step 3: `pnpm vitest run` → PASS. Commit.

### Task 5.2: Worker endpoints
**Files:** Modify `chatbot/src/index.ts`; Create `chatbot/src/forms.ts` + `forms.test.ts`.
- [ ] Step 1 (test): POST /api/contact with valid body → calls Resend (mock fetch), returns `{success:true}`; invalid → 400.
- [ ] Step 2 (impl): route handler validates with shared schema, calls Resend (`RESEND_API_KEY` from Worker env), CORS for site origin. Port email body from `app/actions/*`.
- [ ] Step 3: `cd chatbot && pnpm vitest run` → PASS. Commit.
- [ ] Step 4: set Worker secret: `wrangler secret put RESEND_API_KEY` (note in plan; user runs).

### Task 5.3: ContactForm + ApplyForm islands (`client:load`)
- [ ] Port RHF+zod forms; submit via `fetch(PUBLIC_FORMS_URL + "/api/contact")`; **fix #4** in-flight lock (disable + ref guard); success/error UX preserved; **fix #1** real submit (home ContactUs uses same island). Mount in contact/careers + home. Verify submit hits Worker (local `wrangler dev`). Commit.

---

## Phase 6: Cutover + Ship Gate

### Task 6.1: delete Next surface
- [ ] Remove `src/app/**`, `next.config.ts`, Next-only config, dead files (DESIGN.md 5e). Verify no imports dangle: `pnpm astro check` clean.
- [ ] Commit `chore: remove next.js surface post-migration`.

### Task 6.2: full verification (ship-gate evidence)
- [ ] `pnpm astro check` → 0 errors
- [ ] `pnpm vitest run` → all pass (data-integrity, mobile-regression, forms, smoothScroll)
- [ ] `pnpm build` → static dist/ for all 7 routes
- [ ] `pnpm preview` → manual parity sweep vs Next at 375/768/1024/1440
- [ ] reduced-motion check (DevTools emulate) → no animation, lenis off
- [ ] Commit `chore: astro migration verification green`.

### Task 6.3: deploy config
- [ ] Cloudflare Pages build = `pnpm build`, output `dist/`. Worker forms deployed separately. Update CLAUDE.md Rule 8 deploy note if dir changes.

---

## Self-Review

1. **Spec coverage:** every DESIGN.md route + island + fix mapped (S5c → P4, forms → P5, fixes #1/#2/#4/#8 → tasks tagged). ✓
2. **Placeholder scan:** Phase 3/4 page ports are templated but each names exact component + directive + verify + commit; no "TBD". Per-page code is mechanical port of named source files.
3. **MCP verification:** lenis (autoRaf, reduced-motion), motion (MotionConfig), react (RSC-default/SSR-init) all traced to this-session calls. Astro grounded in reference (flagged).
4. **Type consistency:** shared `payload.ts` zod schema used by island + Worker - single source.
5. **Atomicity:** logic tasks have real failing tests; visual `.astro` tasks verify via check/build/parity (Astro components are not vitest-unit-tested in the reference - honest verification path).

Open risk: Poppins self-host source (woff2 file) must be obtained; if unavailable, fall back to `@fontsource/poppins`. Flagged, not blocking.

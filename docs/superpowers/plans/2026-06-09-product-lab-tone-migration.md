# Product Lab Tone Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the Orkait website from agency-style services copy to product-first AI lab copy with Rustbox live, BooleanStack and Zen coming soon, and research partnerships as a secondary lane.

**Architecture:** Keep the existing Next.js app structure and data-driven copy model. Add product truth tests first, update central data/config/knowledge sources, then migrate page-level copy while preserving the current visual system. Treat the chatbot knowledge base as the public truth source for product status.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Bun tests, Cloudflare Worker chatbot, Vitest for Worker helpers.

---

## File Structure

Primary files to modify:

- `CLAUDE.md`: update the AI editing contract to product-first lab positioning.
- `src/types/content.ts`: add product status and product line types.
- `src/data/projects.ts`: make Rustbox the only live product and add BooleanStack and Zen as coming soon products.
- `src/constants/index.ts`: replace agency/service content with lab thesis, product pillars, shipping discipline, and research partnership copy.
- `src/config/site.ts`: update site description.
- `src/config/site-links.ts`: rename "Projects & Team" to "Products".
- `src/config/metadata.ts`: keep metadata helper, no API changes expected.
- `src/app/layout.tsx`: update global description and remove stale unused chat import if still unused.
- `src/app/page.tsx`: remove agency-only sections that no longer fit.
- `src/app/projects/page.tsx`: update title and description.
- `src/components/home/Hero.tsx`: product-lab hero.
- `src/components/home/Flash.tsx`: product line showcase.
- `src/components/home/StudioText.tsx`: lab thesis.
- `src/components/home/ServicesText.tsx`: product surfaces instead of service categories.
- `src/components/home/Advance.tsx`: shipping discipline.
- `src/components/home/Process.tsx`: product operating principles.
- `src/components/sections/projects/projects-masonry-grid.tsx`: Products page led by product lines.
- `src/components/contact/ContactMobile.tsx`: partnership framing.
- `src/app/contact/page.tsx`: partnership metadata and desktop headline.
- `src/components/careers/careers-page.tsx`: hiring copy for product-grade AI systems.
- `chatbot/knowledge/index.md`: public knowledge source aligned to new product truth.
- `chatbot/src/knowledge.test.ts`: assert removed public product claims are not selected from KB samples.
- `src/data/data-integrity.test.ts`: product truth and banned phrase checks.
- `src/components/ui/card-swap.tsx`: fix existing lint blocker so final lint can pass.

Do not modify binary assets, images, fonts, or reference screenshots for this tone migration.

---

### Task 1: Add Product Truth And Voice Regression Tests

**Files:**
- Modify: `src/data/data-integrity.test.ts`

- [ ] **Step 1: Write the failing tests**

Add these imports near the existing data imports:

```ts
import { PRODUCT_LINES } from "./projects";
```

Add this helper near the top of the file after imports:

```ts
const PUBLIC_COPY_FILES = [
	"src/config/site.ts",
	"src/config/site-links.ts",
	"src/app/layout.tsx",
	"src/app/projects/page.tsx",
	"src/app/contact/page.tsx",
	"src/components/home/Hero.tsx",
	"src/components/home/Flash.tsx",
	"src/components/home/StudioText.tsx",
	"src/components/home/ServicesText.tsx",
	"src/components/home/Advance.tsx",
	"src/components/home/Process.tsx",
	"src/components/sections/projects/projects-masonry-grid.tsx",
	"src/components/contact/ContactMobile.tsx",
	"src/components/careers/careers-page.tsx",
	"src/constants/index.ts",
	"src/data/projects.ts",
	"chatbot/knowledge/index.md",
];

const BANNED_PUBLIC_COPY_PHRASES = [
	"AI solutions",
	"digital transformation",
	"unlock potential",
	"revolutionize",
	"next-gen",
	"modern businesses",
	"custom software solutions",
	"client work",
	"professional services",
	"business websites",
];

function readProjectFile(relativePath: string) {
	return readFileSync(path.join(process.cwd(), relativePath), "utf8");
}
```

Add these test blocks after the existing project data tests:

```ts
describe("product positioning data", () => {
	it("keeps Rustbox as the only live public product", () => {
		const liveProducts = PRODUCT_LINES.filter((product) => product.status === "live");

		assert.deepEqual(
			liveProducts.map((product) => product.id),
			["rustbox"]
		);
		assert.equal(liveProducts[0]?.href, "https://rustbox.orkait.com");
	});

	it("keeps BooleanStack and Zen as coming soon products", () => {
		const comingSoonIds = PRODUCT_LINES
			.filter((product) => product.status === "coming-soon")
			.map((product) => product.id)
			.sort();

		assert.deepEqual(comingSoonIds, ["booleanstack", "zen"]);
	});

	it("does not publish removed internal projects as product lines", () => {
		const ids = PRODUCT_LINES.map((product) => product.id);

		assert.equal(ids.includes("unified-mcp"), false);
		assert.equal(ids.includes("gatekeeper"), false);
	});
});

describe("public copy voice", () => {
	it("avoids agency and generic AI phrasing in public copy", () => {
		for (const file of PUBLIC_COPY_FILES) {
			const source = readProjectFile(file).toLowerCase();

			for (const phrase of BANNED_PUBLIC_COPY_PHRASES) {
				assert.equal(
					source.includes(phrase.toLowerCase()),
					false,
					`${file} contains banned phrase: ${phrase}`
				);
			}
		}
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
bun test src/data/data-integrity.test.ts
```

Expected: FAIL because `PRODUCT_LINES` does not exist yet and current public copy still contains agency phrasing.

- [ ] **Step 3: Commit the failing test**

```bash
git add src/data/data-integrity.test.ts
git commit -m "test(brand): add product lab positioning guards"
```

---

### Task 2: Add Product Data Model And Product Lines

**Files:**
- Modify: `src/types/content.ts`
- Modify: `src/data/projects.ts`
- Test: `src/data/data-integrity.test.ts`

- [ ] **Step 1: Add product types**

Append these types to `src/types/content.ts`:

```ts
export type ProductStatus = "live" | "coming-soon";

export type ProductLine = {
	id: string;
	title: string;
	status: ProductStatus;
	statusLabel: string;
	summary: string;
	description: string;
	surface: string;
	href?: string;
	ctaLabel: string;
	publicRole: string;
};
```

- [ ] **Step 2: Replace project data with live product truth**

Update `src/data/projects.ts` so it exports this product model while preserving `PROJECTS` for existing consumers:

```ts
import type { OSSProject, ProductLine, Project } from "@/types";

export const PRODUCT_LINES: ProductLine[] = [
	{
		id: "rustbox",
		title: "Rustbox",
		status: "live",
		statusLabel: "Live",
		summary: "Secure execution for untrusted code.",
		description:
			"Rustbox is Orkait's live product for running untrusted workloads with strict isolation, resource controls, and production-minded execution boundaries.",
		surface: "Secure execution",
		href: "https://rustbox.orkait.com",
		ctaLabel: "Open Rustbox",
		publicRole: "Flagship completed product",
	},
	{
		id: "booleanstack",
		title: "BooleanStack",
		status: "coming-soon",
		statusLabel: "Coming soon",
		summary: "A software learning system for serious practice.",
		description:
			"BooleanStack is Orkait's upcoming product for data structures, algorithms, system design, and engineering practice that rewards depth over streaks.",
		surface: "Software learning systems",
		ctaLabel: "Coming soon",
		publicRole: "Upcoming software learning system",
	},
	{
		id: "zen",
		title: "Zen",
		status: "coming-soon",
		statusLabel: "Coming soon",
		summary: "AI-assisted interface creation for rough product ideas.",
		description:
			"Zen is Orkait's upcoming interface lab for turning rough product intent into usable screens and interactive UI concepts.",
		surface: "AI-assisted creation",
		ctaLabel: "Coming soon",
		publicRole: "Upcoming AI interface creation product",
	},
];

export const PROJECTS: Project[] = [
	{
		id: "rustbox",
		title: "Rustbox",
		services: "Secure Execution, Systems Infrastructure",
		href: "https://rustbox.orkait.com",
		image: {
			src: "/data/projects/rustbox-hero.jpeg",
			width: 960,
			height: 540,
		},
	},
];

export const OSS_PROJECTS: OSSProject[] = [];
```

- [ ] **Step 3: Run product truth tests**

Run:

```bash
bun test src/data/data-integrity.test.ts
```

Expected: still FAIL because public copy files have not been migrated yet.

- [ ] **Step 4: Commit product data**

```bash
git add src/types/content.ts src/data/projects.ts
git commit -m "feat(brand): define product line data"
```

---

### Task 3: Rewrite Central Brand Contract And Constants

**Files:**
- Modify: `CLAUDE.md`
- Modify: `src/constants/index.ts`
- Modify: `src/config/site.ts`
- Modify: `src/config/site-links.ts`
- Modify: `src/app/layout.tsx`
- Test: `src/data/data-integrity.test.ts`

- [ ] **Step 1: Update site config**

Replace `src/config/site.ts` with:

```ts
export const siteConfig = {
	name: "Orkait",
	description:
		"Product-first AI lab building secure execution tools, software learning systems, and AI-assisted creation products.",
	url: "https://orkait.com",
} as const;
```

- [ ] **Step 2: Update navigation label**

Change `src/config/site-links.ts` to:

```ts
import type { SiteLink } from "@/types";
import { routes } from "@/config/routes";

export const HEADER_LINKS: SiteLink[] = [
	{ label: "Products", href: routes.projects },
];

export const FOOTER_SOCIAL_LINKS: SiteLink[] = [
	{ label: "LinkedIn", href: "https://www.linkedin.com/company/orkait/" },
	{ label: "GitHub", href: "https://github.com/orkait" },
];
```

- [ ] **Step 3: Update layout metadata and remove unused chat import**

In `src/app/layout.tsx`, remove this import if the chat widget remains commented out:

```ts
import { ChatWidget } from "@/components/layout/chat-widget";
```

Set the root metadata description to:

```ts
description:
	"Orkait is a product-first AI lab. We build secure execution tools, software learning systems, and AI-assisted creation products.",
```

- [ ] **Step 4: Replace agency constants with lab constants**

Update `src/constants/index.ts` by replacing service-first exports with these product-lab exports. Keep `FOOTER_COLUMNS`, `FEATURES`, and `TESTIMONIALS` export names if existing components still import them, but change the content.

```ts
import { routes } from "@/config/routes";

export type CoreValue = {
	title: string;
	tagline: string;
	description: string;
};

export const CORE_VALUES: CoreValue[] = [
	{
		title: "Product Discipline",
		tagline: "Research must become a working system",
		description:
			"We do not treat prototypes as proof. A useful idea has to survive constraints, users, deployment, and maintenance.",
	},
	{
		title: "Reliability",
		tagline: "Systems should hold under pressure",
		description:
			"Rustbox sets the bar for how we think about execution, isolation, and production boundaries.",
	},
	{
		title: "Specificity",
		tagline: "Name the product, name the surface",
		description:
			"We avoid vague AI claims. Public copy should tie back to Rustbox, BooleanStack, Zen, or a concrete technical problem.",
	},
	{
		title: "Research Taste",
		tagline: "Novelty is not enough",
		description:
			"We care about ideas that can turn into useful tools for secure execution, software learning, or AI-assisted creation.",
	},
	{
		title: "Clear Communication",
		tagline: "Say what exists and what is next",
		description:
			"Rustbox is live. BooleanStack and Zen are coming soon. Anything beyond that should be labelled as research or partnership work.",
	},
];

export type ProductPillar = {
	title: string;
	description: string;
	surface: string;
};

export const PRODUCT_PILLARS: ProductPillar[] = [
	{
		title: "Secure execution",
		surface: "Rustbox",
		description:
			"Run untrusted code with strict execution boundaries, resource limits, and infrastructure-grade isolation.",
	},
	{
		title: "Software learning systems",
		surface: "BooleanStack",
		description:
			"Build practice environments for algorithms, system design, and engineering depth without shallow progress loops.",
	},
	{
		title: "AI-assisted creation",
		surface: "Zen",
		description:
			"Turn rough product intent into usable interface concepts without pretending a prompt is a finished product.",
	},
];

export const LAB_THESIS = [
	"Applied research only matters when it becomes a reliable product surface.",
	"Secure execution is the foundation for serious agent and code-running workflows.",
	"Learning systems should reward engineering depth, not shallow engagement.",
	"AI interface tools should help shape product thinking, not replace it with generic screens.",
];

export const SHIPPING_DISCIPLINE = [
	"Live products are labelled live.",
	"Upcoming products are labelled coming soon.",
	"Research partnerships are selective.",
	"Public claims stay tied to product truth.",
];

export const RESEARCH_PARTNERSHIP_CRITERIA = [
	"Secure execution or agent runtime work",
	"Software learning and evaluation systems",
	"AI-assisted product and interface tooling",
	"Research with a path to a deployed system",
];

export type FooterLink = {
	label: string;
	href: string;
	isExternal?: boolean;
};

export type FooterColumn = {
	ariaLabel: string;
	heading?: string;
	links: FooterLink[];
};

export const FOOTER_COLUMNS: FooterColumn[] = [
	{
		ariaLabel: "Primary navigation",
		heading: "Company",
		links: [
			{ label: "Home", href: routes.home },
			{ label: "Products", href: routes.projects },
			{ label: "Careers", href: routes.careers },
		],
	},
	{
		ariaLabel: "Social and contact navigation",
		heading: "Connect",
		links: [
			{ label: "Research Partnerships", href: routes.contact },
			{ label: "LinkedIn", href: "https://www.linkedin.com/company/orkait/", isExternal: true },
			{ label: "GitHub", href: "https://github.com/orkait", isExternal: true },
		],
	},
];

export type FeedbackCardProps = {
	quote: string;
	name: string;
	company: string;
};

export const TESTIMONIALS: FeedbackCardProps[] = [];

export type FeatureCardProps = {
	num: string;
	title: string;
	description: string;
	area: string;
};

export const FEATURES: FeatureCardProps[] = [
	{
		num: "(01)",
		title: "Live means live",
		description:
			"Rustbox is public and reachable. Coming soon products are labelled clearly until they ship.",
		area: "card1",
	},
	{
		num: "(02)",
		title: "Research has a target",
		description:
			"Every lab direction maps to a product surface: execution, learning, or interface creation.",
		area: "card2",
	},
	{
		num: "(03)",
		title: "Claims stay bounded",
		description:
			"We do not inflate roadmap work into public product claims.",
		area: "card3",
	},
	{
		num: "(04)",
		title: "Systems come first",
		description:
			"We care about runtime behavior, constraints, failure modes, and maintenance.",
		area: "card4",
	},
	{
		num: "(05)",
		title: "Partnerships stay selective",
		description:
			"We collaborate when the work has a path to a real system.",
		area: "card5",
	},
	{
		num: "(06)",
		title: "No generic AI copy",
		description:
			"Public language should name the product, surface, or constraint it describes.",
		area: "card6",
	},
	{
		num: "(07)",
		title: "Ship the proof",
		description:
			"Research earns trust when users can touch the product.",
		area: "card7",
	},
];

export const SERVICES = [
	{ label: "Rustbox", active: true },
	{ label: "BooleanStack", active: false },
	{ label: "Zen", active: false },
	{ label: "Research", active: false },
];

export const CAPABILITIES_LEFT = [
	"Secure execution",
	"Product-grade AI systems",
	"Software learning infrastructure",
];

export const CAPABILITIES_RIGHT = [
	"AI-assisted interface creation",
	"Selective research partnerships",
];
```

- [ ] **Step 5: Rewrite brand contract**

Rewrite the top sections of `CLAUDE.md` so the identity and banned language match this plan:

```md
# Orkait AI Context And Brand Rules

This file is the source of truth for AI or LLM edits in this codebase.

## Identity

Orkait is a product-first AI lab.

We build focused products around:

1. Secure execution - Rustbox is live at https://rustbox.orkait.com
2. Software learning systems - BooleanStack is coming soon
3. AI-assisted interface creation - Zen is coming soon

Research partnerships are secondary and selective. They should be described only when the work has a path to a product-grade system.

## Core Positioning

Primary line:

Applied AI research, shipped as products.

Supporting definition:

Orkait builds focused tools for secure execution, software learning, and AI-assisted creation. Rustbox is live. BooleanStack and Zen are coming soon.

## Product Truth

| Product | Status | Public Role |
|---|---|---|
| Rustbox | Live | Secure execution product |
| BooleanStack | Coming soon | Software learning system |
| Zen | Coming soon | AI-assisted interface creation product |

Do not position unified-mcp or gatekeeper as public Orkait products.
```

Keep the existing sections about data architecture, but update their examples to the new files and constants after Task 3 is complete.

- [ ] **Step 6: Run tests**

Run:

```bash
bun test src/data/data-integrity.test.ts
```

Expected: may still FAIL until page-level copy is migrated, but product data imports should pass.

- [ ] **Step 7: Commit central brand changes**

```bash
git add CLAUDE.md src/constants/index.ts src/config/site.ts src/config/site-links.ts src/app/layout.tsx
git commit -m "feat(brand): update product lab source of truth"
```

---

### Task 4: Migrate Homepage Copy To Product Lab Voice

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/home/Hero.tsx`
- Modify: `src/components/home/Flash.tsx`
- Modify: `src/components/home/StudioText.tsx`
- Modify: `src/components/home/ServicesText.tsx`
- Modify: `src/components/home/Advance.tsx`
- Modify: `src/components/home/Process.tsx`
- Test: `src/data/data-integrity.test.ts`
- Test: `src/components/home/mobile-home-regression.test.ts`

- [ ] **Step 1: Remove homepage testimonial section**

Update `src/app/page.tsx` to remove the `Feedback` import and remove `<Feedback />` from the rendered homepage:

```tsx
import { Hero } from "@/components/home/Hero";
import Flash from "@/components/home/Flash";
import StudioText from "@/components/home/StudioText";
import { Section } from "@/components/shared/section";
import ServicesText from "@/components/home/ServicesText";
import Advance from "@/components/home/Advance";
import Process from "@/components/home/Process";

export default function Home() {
	return (
		<Section horizontalMargin verticalMargin className="py-12 tablet:py-14 laptop:py-16">
			<Hero />
			<Flash />
			<StudioText />
			<ServicesText />
			<Advance />
			<Process />
		</Section>
	);
}
```

- [ ] **Step 2: Update hero copy**

In `src/components/home/Hero.tsx`, update visible hero text only. Keep layout and existing image treatment.

Use this mobile support text:

```tsx
Applied AI research, shipped as products. Rustbox is live. BooleanStack and Zen are coming soon.
```

Use this desktop hero text:

```tsx
Applied AI research,
shipped as products.
Rustbox is live.
BooleanStack and Zen are next.
```

Change the hero CTA label to:

```tsx
View Products
```

and keep the CTA target as `routes.projects`.

- [ ] **Step 3: Update product showcase copy**

In `src/components/home/Flash.tsx`, change the section label to:

```tsx
Product Lines
```

Change the heading to:

```tsx
One live product. Two product lines in build.
```

Change the support copy to:

```tsx
Rustbox proves the execution layer. BooleanStack and Zen extend the lab into learning systems and AI-assisted creation.
```

Change `SHOWCASE_ORDER` to:

```ts
const SHOWCASE_ORDER = ["rustbox", "booleanstack", "zen"];
```

Build `ALL_ITEMS` from `PRODUCT_LINES`, using `href ?? routes.contact` for coming soon items and using `imageSrc: p.id === "rustbox" ? "/data/projects/rustbox-hero.jpeg" : null`.

- [ ] **Step 4: Update lab thesis section**

In `src/components/home/StudioText.tsx`, change the section label to:

```tsx
(01) Lab Thesis
```

Change the main heading to:

```tsx
We build where AI systems meet execution, learning, and interface work.
```

Change the first paragraph to:

```tsx
Orkait is product-first. Rustbox is live as our secure execution product. BooleanStack and Zen are the next product lines.
```

Change the second paragraph to:

```tsx
We keep the lab small on purpose. Research only earns space here when it can become a product-grade system.
```

Change the CTA label to:

```tsx
View Products
```

- [ ] **Step 5: Update surfaces section**

In `src/components/home/ServicesText.tsx`, keep the component structure and change the right-side labels to:

```tsx
<p className="text-foreground font-medium text-body leading-body">Secure Execution</p>
<p className="text-foreground font-medium text-body leading-body">Software Learning</p>
<p className="text-foreground font-medium text-body leading-body">Interface Creation</p>
```

Ensure the mobile label reads:

```tsx
(02) PRODUCT SURFACES
```

- [ ] **Step 6: Update shipping discipline section**

In `src/components/home/Advance.tsx`, set the mobile label to:

```tsx
(03) DISCIPLINE
```

Set the heading to:

```tsx
Research only matters when it survives production.
```

Keep `CAPABILITIES_LEFT` and `CAPABILITIES_RIGHT` mapped from constants.

- [ ] **Step 7: Update operating principles section**

In `src/components/home/Process.tsx`, change the mobile and desktop heading to:

```tsx
How the lab decides what ships
```

Keep cards driven by `FEATURES`.

- [ ] **Step 8: Run homepage tests**

Run:

```bash
bun test src/components/home/mobile-home-regression.test.ts src/data/data-integrity.test.ts
```

Expected: PASS after all public homepage banned phrases are removed.

- [ ] **Step 9: Commit homepage migration**

```bash
git add src/app/page.tsx src/components/home/Hero.tsx src/components/home/Flash.tsx src/components/home/StudioText.tsx src/components/home/ServicesText.tsx src/components/home/Advance.tsx src/components/home/Process.tsx
git commit -m "feat(home): reposition homepage as product lab"
```

---

### Task 5: Migrate Products Page

**Files:**
- Modify: `src/app/projects/page.tsx`
- Modify: `src/components/sections/projects/projects-masonry-grid.tsx`
- Test: `src/data/data-integrity.test.ts`

- [ ] **Step 1: Update page metadata**

Update `src/app/projects/page.tsx` metadata to:

```ts
export const metadata: Metadata = createPageMetadata(
	"Products",
	"Rustbox is live. BooleanStack and Zen are coming soon from the Orkait product lab."
);
```

- [ ] **Step 2: Replace public page copy with product lines**

In `src/components/sections/projects/projects-masonry-grid.tsx`, import `PRODUCT_LINES` instead of `OSS_PROJECTS` and `PROJECTS` for the product section:

```ts
import { PRODUCT_LINES } from "@/data/projects";
```

Create this card helper above `TeamMemberCard`:

```tsx
function ProductLineCard({
	product,
}: {
	product: (typeof PRODUCT_LINES)[number];
}) {
	const content = (
		<div className="h-48 rounded-lg border border-border bg-[#f7f7f7] flex flex-col justify-between gap-4 px-5 py-6 transition-all duration-300 shadow-sm hover:shadow-lg hover:border-foreground/20">
			<div className="flex items-center justify-between gap-3">
				<ProjectAvatar name={product.id} size={128} className="w-12 h-12" />
				<span className="rounded-md border border-border px-2 py-1 text-xs font-medium text-muted-foreground">
					{product.statusLabel}
				</span>
			</div>
			<div className="flex flex-col gap-2">
				<span className="text-subtitle leading-subtitle font-bold text-foreground tracking-tight">
					{product.title}
				</span>
				<span className="text-sm font-medium text-muted-foreground leading-snug">
					{product.summary}
				</span>
			</div>
			<span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
				{product.ctaLabel} {product.href ? <ArrowUpRight className="size-3.5" /> : null}
			</span>
		</div>
	);

	if (!product.href) {
		return <div className="group block">{content}</div>;
	}

	return (
		<a href={product.href} target="_blank" rel="noopener noreferrer" className="group block">
			{content}
		</a>
	);
}
```

Replace the first section heading with:

```tsx
<p className="text-body leading-body font-medium uppercase tracking-wide text-muted-foreground">
	(01) PRODUCTS
</p>
<h1 className="text-title-3 leading-title-3 font-bold tracking-tight text-foreground tablet:text-title-2 tablet:leading-title-2 laptop:text-title-1 laptop:leading-title-1">
	Applied AI research, shipped as products.
</h1>
<p className="text-body leading-body font-medium text-muted-foreground laptop:text-body-lg laptop:leading-body-lg mt-2 max-w-[360px]">
	Rustbox is live. BooleanStack and Zen are coming soon.
</p>
```

Replace the product card grid with:

```tsx
<div className="grid grid-cols-1 phone:grid-cols-2 gap-4 tablet:justify-self-end tablet:max-w-xl">
	{PRODUCT_LINES.map((product) => (
		<ProductLineCard key={product.id} product={product} />
	))}
</div>
```

Replace the open source section with a research partnerships section:

```tsx
<section className="grid grid-cols-1 tablet:grid-cols-2 gap-10 tablet:gap-16">
	<div className="order-2 tablet:order-1 grid grid-cols-1 gap-4">
		<div className="rounded-lg border border-border bg-[#f7f7f7] p-6 shadow-sm">
			<p className="text-body-lg leading-body-lg font-bold text-foreground">
				Research partnerships
			</p>
			<p className="mt-3 text-body leading-body font-medium text-muted-foreground">
				We partner when the work has a path to a real product or research system.
			</p>
			<Link
				href={routes.contact}
				className="mt-5 inline-flex text-sm font-medium text-foreground underline underline-offset-4"
			>
				Start a partnership conversation
			</Link>
		</div>
	</div>

	<div className="order-1 tablet:order-2 flex flex-col gap-4 tablet:text-right tablet:justify-self-end">
		<p className="text-body leading-body font-medium uppercase tracking-wide text-muted-foreground">
			(02) PARTNERSHIPS
		</p>
		<h2 className="text-title-3 leading-title-3 font-bold tracking-tight text-foreground tablet:text-title-2 tablet:leading-title-2">
			Selective research, product-grade outcomes.
		</h2>
		<p className="text-body leading-body font-medium text-muted-foreground laptop:text-body-lg laptop:leading-body-lg mt-2 tablet:ml-auto max-w-[320px]">
			No open-ended consulting menu. We work on execution, learning, and interface systems.
		</p>
	</div>
</section>
```

- [ ] **Step 3: Run product tests**

Run:

```bash
bun test src/data/data-integrity.test.ts
```

Expected: PASS for product truth and public copy checks if remaining files are clean.

- [ ] **Step 4: Commit products page migration**

```bash
git add src/app/projects/page.tsx src/components/sections/projects/projects-masonry-grid.tsx
git commit -m "feat(products): lead with product lines"
```

---

### Task 6: Migrate Contact And Careers Copy

**Files:**
- Modify: `src/app/contact/page.tsx`
- Modify: `src/components/contact/ContactMobile.tsx`
- Modify: `src/components/careers/careers-page.tsx`
- Test: `src/data/data-integrity.test.ts`

- [ ] **Step 1: Update contact metadata**

Set `src/app/contact/page.tsx` metadata to:

```ts
export const metadata: Metadata = createPageMetadata(
	"Research Partnerships",
	"Bring a hard systems problem with a path to a real product or research system."
);
```

- [ ] **Step 2: Update desktop contact headline**

Replace the desktop contact `h1` text with:

```tsx
Bring a hard
<br />
systems
<br />
problem.
```

Replace the social helper text with:

```tsx
Or reach the lab through public channels
```

- [ ] **Step 3: Update mobile contact headline**

In `src/components/contact/ContactMobile.tsx`, replace the mobile headline with:

```tsx
Bring a hard<br />
systems<br />
problem.
```

- [ ] **Step 4: Update careers copy**

In `src/components/careers/careers-page.tsx`, replace both mobile and desktop headings with:

```tsx
Work on product-grade<br />
AI systems.
```

Replace both supporting paragraphs with:

```tsx
Small team. Live products. Research that has to survive real users and real constraints.
```

- [ ] **Step 5: Run public copy tests**

Run:

```bash
bun test src/data/data-integrity.test.ts
```

Expected: PASS for public copy checks.

- [ ] **Step 6: Commit contact and careers copy**

```bash
git add src/app/contact/page.tsx src/components/contact/ContactMobile.tsx src/components/careers/careers-page.tsx
git commit -m "feat(brand): update partnership and careers copy"
```

---

### Task 7: Migrate Knowledge Base And Worker Tests

**Files:**
- Modify: `chatbot/knowledge/index.md`
- Modify: `chatbot/src/knowledge.test.ts`
- Test: `chatbot/src/knowledge.test.ts`
- Test: `src/data/data-integrity.test.ts`

- [ ] **Step 1: Rewrite knowledge base**

Replace `chatbot/knowledge/index.md` with:

```md
# Orkait Knowledge Base

## What Orkait Is

Orkait is a product-first AI lab.

The lab builds focused products around secure execution, software learning systems, and AI-assisted creation. Rustbox is live. BooleanStack and Zen are coming soon. Research partnerships are selective and only make sense when the work has a path to a product-grade system.

## Live Product

### Rustbox

- Status: live
- URL: https://rustbox.orkait.com
- Summary: secure execution product for running untrusted code
- What it does: provides an execution surface for untrusted workloads with strict boundaries, resource controls, and production-minded isolation
- Why it matters: serious AI and code-running workflows need execution infrastructure that treats isolation and limits as first-order requirements
- Public role: flagship completed Orkait product

## Coming Soon

### BooleanStack

- Status: coming soon
- Summary: software learning system for serious engineering practice
- What it is for: data structures, algorithms, system design, and software engineering depth
- Public positioning: upcoming product line, not a live public product yet

### Zen

- Status: coming soon
- Summary: AI-assisted interface creation product
- What it is for: turning rough product intent into usable screens and interactive UI concepts
- Public positioning: upcoming product line, not a live public product yet

## Research Partnerships

Orkait takes on selective research partnerships when the work can become a real system.

Relevant partnership areas:

- secure execution and code-running infrastructure
- software learning and evaluation systems
- AI-assisted product and interface tooling
- research with a path to deployment

Orkait is not a general agency intake desk.

## What We Do Not Claim

- We do not claim BooleanStack or Zen are live products yet.
- We do not position unified-mcp or gatekeeper as public Orkait products.
- We do not claim timelines, customers, or roadmap details not written in this knowledge base.
- We do not describe generic AI services as Orkait products.
- We do not present research partnerships as a broad services menu.
```

- [ ] **Step 2: Add Worker knowledge regression test**

Add this test to `chatbot/src/knowledge.test.ts`:

```ts
it("does not select removed internal projects from the public product truth", () => {
	const sections = parseKnowledgeSections(SAMPLE_KB);
	const context = buildKnowledgeContext(sections, "Tell me about gatekeeper and unified-mcp", 2);

	expect(context.toLowerCase()).not.toContain("gatekeeper");
	expect(context.toLowerCase()).not.toContain("unified-mcp");
});
```

Then update `SAMPLE_KB` so it reflects the new product truth:

```ts
const SAMPLE_KB = `# Orkait Knowledge Base

## What Orkait Is

Orkait is a product-first AI lab.

## Live Product

### Rustbox

- Status: live
- Summary: secure execution product for running untrusted code

## Coming Soon

### BooleanStack

- Status: coming soon
- Summary: software learning system

### Zen

- Status: coming soon
- Summary: AI-assisted interface creation product
`;
```

- [ ] **Step 3: Run Worker tests**

Run:

```bash
npm test --prefix chatbot -- --run
```

Expected: PASS. The compatibility date warning may remain until final cleanup.

- [ ] **Step 4: Run site knowledge tests**

Run:

```bash
bun test src/data/data-integrity.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit knowledge migration**

```bash
git add chatbot/knowledge/index.md chatbot/src/knowledge.test.ts
git commit -m "feat(knowledge): align chatbot truth with product lab"
```

---

### Task 8: Fix Lint Blockers And Final Rule Drift

**Files:**
- Modify: `src/components/ui/card-swap.tsx`
- Modify: `src/data/projects.ts` if unused imports remain
- Modify: `chatbot/wrangler.jsonc` if Worker test runtime compatibility is still mismatched
- Test: lint and build

- [ ] **Step 1: Fix CardSwap ref write during render**

In `src/components/ui/card-swap.tsx`, replace:

```ts
  const orderRef = useRef(order);
  orderRef.current = order;
```

with:

```ts
  const orderRef = useRef(order);

  useEffect(() => {
    orderRef.current = order;
  }, [order]);
```

If ESLint still reports a refs error from render, replace `order.indexOf(originalIdx)` inside the render map with a pure memoized lookup:

```ts
  const slotLookup = new Map(order.map((item, index) => [item, index]));
```

and then:

```ts
        const slotIdx = slotLookup.get(originalIdx) ?? 0;
```

- [ ] **Step 2: Align Worker compatibility date if tests still warn**

If `npm test --prefix chatbot -- --run` still warns that the installed runtime falls back to `2025-09-06`, change `chatbot/wrangler.jsonc`:

```jsonc
"compatibility_date": "2025-09-06",
```

Only make this change after observing the warning in this branch.

- [ ] **Step 3: Run lint**

Run:

```bash
bun run lint
```

Expected: PASS with no errors. Warnings from generated Worker types are acceptable only if the generated file remains linted by the current config. Prefer excluding generated Worker types in `eslint.config.mjs` if warnings block CI.

- [ ] **Step 4: Run build**

Run:

```bash
bun run build
```

Expected: PASS.

- [ ] **Step 5: Commit cleanup**

```bash
git add src/components/ui/card-swap.tsx chatbot/wrangler.jsonc eslint.config.mjs src/data/projects.ts
git commit -m "fix(ui): clear tone migration lint blockers"
```

If any listed file was not changed, omit it from `git add`.

---

### Task 9: Final Verification

**Files:**
- Verify all changed files

- [ ] **Step 1: Run product and public copy tests**

Run:

```bash
bun test src/data/data-integrity.test.ts
```

Expected: PASS.

- [ ] **Step 2: Run homepage regression tests**

Run:

```bash
bun test src/components/home/mobile-home-regression.test.ts
```

Expected: PASS.

- [ ] **Step 3: Run contact action tests**

Run:

```bash
bun test src/app/actions/contact.test.ts
```

Expected: PASS.

- [ ] **Step 4: Run Worker tests**

Run:

```bash
npm test --prefix chatbot -- --run
```

Expected: PASS.

- [ ] **Step 5: Run lint**

Run:

```bash
bun run lint
```

Expected: PASS.

- [ ] **Step 6: Run build**

Run:

```bash
bun run build
```

Expected: PASS.

- [ ] **Step 7: Search for removed public products and banned phrases**

Run:

```bash
rg --line-number --no-heading "unified-mcp|gatekeeper|digital transformation|unlock potential|revolutionize|next-gen|modern businesses|custom software solutions|client work|professional services|business websites" CLAUDE.md src chatbot/knowledge
```

Expected: no matches except explicit "What We Do Not Claim" or test guard contexts where removed terms are intentionally listed.

- [ ] **Step 8: Review git diff**

Run:

```bash
git diff --stat
git diff -- src/data/projects.ts src/constants/index.ts src/components/home/Hero.tsx chatbot/knowledge/index.md
```

Expected: diff shows product-first tone migration only, with no binary assets or unrelated refactors.

- [ ] **Step 9: Commit final verification notes if files changed during verification**

If final verification required small fixes:

```bash
git add <changed-files>
git commit -m "chore(brand): finalize product lab migration"
```

If no files changed, do not create an empty commit.

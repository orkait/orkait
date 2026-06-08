# Orkait Product Lab Tone Migration Design

Date: 2026-06-09

## Goal

Migrate Orkait's public website voice from agency and client-services positioning to product-first AI lab positioning.

The new site should present Orkait as a product company that builds applied AI systems, secure execution infrastructure, and focused SaaS products. Research partnerships remain available, but they are secondary and selective.

## Core Positioning

Primary line:

> Applied AI research, shipped as products.

Supporting definition:

> Orkait is a product-first AI lab building focused tools for secure execution, learning systems, and AI-assisted creation. Rustbox is live. BooleanStack and Zen are coming soon. Research partnerships are selective and tied to product-grade outcomes.

## Product Truth

The public site must reflect this product state:

| Product | Status | Public URL | Public Role |
|---|---|---|---|
| Rustbox | Live | https://rustbox.orkait.com | Flagship completed product |
| BooleanStack | Coming soon | None yet | Upcoming software learning system |
| Zen | Coming soon | None yet | Upcoming AI interface creation product |

The public site must not position `unified-mcp` or `gatekeeper` as public Orkait products.

## Voice Rules

The new voice must sound like a lab that ships, not like generic AI marketing.

Use:

- Concrete product names: Rustbox, BooleanStack, Zen.
- Concrete technical surfaces: secure execution, untrusted code, learning systems, interface generation, product-grade systems.
- Maturity labels: live, coming soon, research partnership.
- Short, direct claims tied to what exists.
- Product-first framing before partnership or services framing.

Avoid:

- "AI solutions"
- "digital transformation"
- "unlock potential"
- "revolutionize"
- "next-gen"
- "modern businesses"
- "custom software solutions"
- "client work"
- "case studies" as the primary framing
- broad claims that could describe any AI startup

## Approved Copy Direction

Preferred headline:

> Applied AI research, shipped as products.

Preferred support copy:

> We build AI-native tools for secure execution, software learning, and AI-assisted creation. Rustbox is live. BooleanStack and Zen are coming soon.

Partnership copy direction:

> We take on selective research partnerships when the work can become a real system, not a slide deck.

Product examples:

- Rustbox is our secure execution product for running untrusted code.
- BooleanStack is our upcoming learning system for serious software practice.
- Zen is our upcoming AI interface lab for turning rough product ideas into usable screens.

## Content Architecture

The site should stop organizing itself around services and case studies. It should organize around products, lab thesis, and selective partnerships.

Recommended homepage model:

```text
Home
├── Hero
│   ├── Headline: Applied AI research, shipped as products.
│   ├── Proof line: Rustbox is live. BooleanStack and Zen are coming soon.
│   └── CTAs: View Products, Research Partnerships
├── Product Lines
│   ├── Rustbox - Live
│   ├── BooleanStack - Coming soon
│   └── Zen - Coming soon
├── Lab Thesis
│   ├── Secure execution
│   ├── Software learning systems
│   └── AI-assisted interface creation
├── Shipping Discipline
│   └── Research only matters when it survives production constraints.
├── Research Partnerships
│   └── Selective collaboration for product-grade AI systems.
└── Team / Careers
```

## Data Model Changes

The implementation should preserve the existing data-driven structure where possible.

Update `src/data/projects.ts`:

- Keep Rustbox as the only live public product.
- Remove `unified-mcp` and `gatekeeper` from public product or open source lists.
- Add a product pipeline model for BooleanStack and Zen.

Update `src/constants/index.ts`:

- Replace agency/service categories with lab and product themes.
- Remove "Client Work", "Business Websites", "Professional services", and similar service-first language.
- Add constants for product pillars, lab thesis, and partnership criteria.

Update `src/config/site.ts` and metadata helpers:

- Replace agency descriptions with product-first AI lab descriptions.
- Keep descriptions specific and grounded in Rustbox, BooleanStack, and Zen where practical.

Update `chatbot/knowledge/index.md`:

- Make it the public product truth source.
- Include only Rustbox as live.
- Include BooleanStack and Zen as coming soon.
- Remove public product claims about `unified-mcp` and `gatekeeper`.
- Add a clear "What We Do Not Claim" section that prevents roadmap or maturity fabrication.

Update `CLAUDE.md`:

- Make the AI context file match the new product-first lab positioning.
- Ban generic AI marketing language.
- Preserve the rule that content should live in data files instead of component JSX where possible.

## Page-Level Migration

### Home

Replace agency and service framing with:

- Hero: product-first AI lab positioning.
- Product Lines: Rustbox, BooleanStack, Zen.
- Lab Thesis: secure execution, software learning systems, AI-assisted creation.
- Shipping Discipline: research must become a working system.
- Research Partnerships: selective, product-grade collaboration.

### Products Page

Rename the public concept from "Projects & Team" to "Products".

Lead with:

- Rustbox as live.
- BooleanStack as coming soon.
- Zen as coming soon.

Team content can remain lower on the page, but product proof must lead.

### Contact Page

Replace general agency intake language with partnership language.

Preferred direction:

- "Bring a hard systems problem."
- "We partner when the work has a path to a real product or research system."

The form can remain, but the framing should not imply a general website or app agency.

### Careers Page

Shift hiring copy toward product-grade AI systems.

Preferred direction:

- "Work on product-grade AI systems."
- "Build tools that have to survive real users, real workloads, and real constraints."

Existing roles can remain unless hiring scope changes later.

### Knowledge Page And Chatbot

Rewrite the public KB around:

- What Orkait is now.
- Rustbox.
- BooleanStack.
- Zen.
- Research partnerships.
- What Orkait does not claim.

The chatbot must answer only from that new truth source.

## Pricing

The current public pricing model reads like agency packaging.

Recommended first migration:

- Remove or hide pricing from the main public flow.
- If pricing must remain, reframe it as research partnership engagement bands instead of service packages.
- Do not describe pricing by page counts, screen counts, or generic software deliverables.

## Navigation

Recommended first pass:

| Current | New |
|---|---|
| Projects & Team | Products |
| Contact | Contact |

Optional later pass:

- Add Lab.
- Split Team or Careers only if content volume justifies it.

## Guardrails

Every major section must include at least one concrete surface:

- Rustbox
- BooleanStack
- Zen
- secure execution
- learning systems
- interface generation
- research partnerships

No section should rely on generic AI language alone.

The public site must separate live products from coming soon products.

Research partnerships must sound selective, not like a services menu.

## Testing And Verification

Implementation should include these checks:

- Data integrity tests confirm Rustbox is the only live product.
- Data integrity tests confirm BooleanStack and Zen are marked coming soon.
- Search tests or static checks confirm `unified-mcp` and `gatekeeper` are not shown as public products.
- Static checks confirm banned agency and generic AI phrases are absent from main public copy.
- Existing build, lint, contact tests, and chatbot knowledge tests still run after migration.

## Open Decisions

No open product positioning decisions remain for the first migration.

Deferred decisions:

- Whether to add a dedicated Lab route.
- Whether to remove pricing entirely or reframe it later.
- Whether to redesign visuals after the tone migration.

## Approval Record

Approved direction:

- Orkait is product-first now.
- Research partnerships remain secondary.
- Rustbox is the only completed live product.
- BooleanStack and Zen are coming soon products.
- Hero direction: "Applied AI research, shipped as products."
- Copy must not sound generic or like AI marketing.

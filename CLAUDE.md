# Orkait AI Context And Brand Rules

This file is the source of truth for AI or LLM edits in this codebase.

## Identity

Orkait is a product-first AI lab.

We build focused products around:

1. Secure execution - Rustbox is live at https://rustbox.orkait.com
2. Software learning systems - BooleanStack is coming soon
3. AI-assisted interface creation - Zen is coming soon

Research partnerships are secondary and selective. They should be described only when the work has a path to a product-grade system.

Orkait is not an agency, design studio, or general services shop.

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

## Voice Rules

Use:

- Concrete product names: Rustbox, BooleanStack, Zen
- Concrete technical surfaces: secure execution, untrusted code, learning systems, interface generation, product-grade systems
- Clear maturity labels: live, coming soon, research partnership
- Direct claims tied to what exists
- Product-first framing before partnership framing

Avoid:

- AI solutions
- digital transformation
- unlock potential
- revolutionize
- next-gen
- modern businesses
- custom software solutions
- client work
- professional services
- business websites
- case studies as the primary public framing
- broad claims that could describe any AI startup

## Required Tone

- Specific, not generic.
- Technical, but readable.
- Confident, not inflated.
- Product-led, not service-led.
- Research-aware, but grounded in shipped or clearly labelled product work.
- Short sentences where possible.

Good examples:

- "Rustbox is our secure execution product for running untrusted code."
- "BooleanStack is our upcoming learning system for serious software practice."
- "Zen is our upcoming interface lab for turning rough product ideas into usable screens."
- "We partner when the work has a path to a real product or research system."

Bad examples:

- "We build AI solutions for modern businesses."
- "We unlock the next generation of digital transformation."
- "We provide custom software solutions for every business need."
- "We revolutionize workflows with cutting-edge AI."

## Content Data Architecture

Public copy should live in structured data files when practical, not scattered through component JSX.

| Data | File | Constant |
|---|---|---|
| Product lines | `src/data/projects.ts` | `PRODUCT_LINES` |
| Legacy live project adapter | `src/data/projects.ts` | `PROJECTS` |
| Lab thesis | `src/constants/index.ts` | `LAB_THESIS` |
| Product pillars | `src/constants/index.ts` | `PRODUCT_PILLARS` |
| Shipping discipline | `src/constants/index.ts` | `SHIPPING_DISCIPLINE` |
| Research criteria | `src/constants/index.ts` | `RESEARCH_PARTNERSHIP_CRITERIA` |
| Footer links | `src/constants/index.ts` | `FOOTER_COLUMNS` |
| Team members | `src/data/team.ts` | `TEAM_MEMBERS` |

When modifying public content, prefer editing the data source first.

## Navigation

Primary public navigation should lead with Products, not portfolio or agency language.

Recommended first-pass nav:

- Products
- Contact

## Pricing

Do not present agency-style packages based on page counts, screen counts, or generic deliverables.

If pricing is public, frame it as research partnership engagement bands. If that framing is not ready, hide pricing from the main public flow.

## Knowledge Base And Chatbot

The public knowledge base at `chatbot/knowledge/index.md` is the chatbot truth source.

It must state:

- Orkait is product-first.
- Rustbox is live.
- BooleanStack is coming soon.
- Zen is coming soon.
- Research partnerships are selective.
- unified-mcp and gatekeeper are not public Orkait product claims.

The chatbot must not invent maturity, timelines, features, customers, or roadmap details.

## Key Principle

When in doubt, ask whether the copy names a real product, surface, or constraint.

If it does not, tighten it until it does.

import type { OSSProject, ProductLine, Project } from "@/lib/types";

export const PRODUCT_LINES: ProductLine[] = [
	{
		id: "rustbox",
		title: "Rustbox",
		status: "live",
		statusLabel: "Live",
		summary: "Kernel-enforced sandboxing for untrusted code.",
		description:
			"Rustbox runs untrusted code inside a kernel-enforced sandbox built on Linux namespaces and cgroups, no Docker required. Eight languages, 260+ requests per second, and zero escapes across 22 adversarial tests.",
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
		summary: "Turn a written prompt into interactive, multi-screen UI.",
		description:
			"Zen turns a written prompt into interactive, multi-screen UI: mockups and wireframes you can click through, then refine together in real time.",
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

export const OSS_PROJECTS: OSSProject[] = [
	{
		id: "graphstore",
		title: "GraphStore",
		description:
			"Spreading-activation recall, confidence-scored beliefs that expire and get contradicted. No Cypher, no SPARQL - queries that read like sentences.",
		tags: "Agent Memory, Research Infrastructure",
		language: "Python",
		href: "https://github.com/orkait/graphstore",
	},
	{
		id: "hyperstack",
		title: "Hyperstack",
		description:
			"A disciplined engineering harness for AI agents: an MCP server serving real-time ground truth, with adversarial skill gates for modern stacks.",
		tags: "AI Agents, Developer Tooling",
		language: "TypeScript",
		href: "https://github.com/orkait/hyperstack",
	},
];

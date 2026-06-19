import type { OSSProject, ProductLine, Project } from "@/lib/types";

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

export const OSS_PROJECTS: OSSProject[] = [
	{
		id: "graphstore",
		title: "GraphStore",
		description:
			"Memory infrastructure for agents: semantic recall, document ingest, and belief tracking.",
		tags: "Agent Memory, Research Infrastructure",
		language: "Python",
		href: "https://github.com/orkait/graphstore",
	},
];

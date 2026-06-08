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
			"Live product work sets the bar for how we think about execution, isolation, and production boundaries.",
	},
	{
		title: "Specificity",
		tagline: "Name the product, name the surface",
		description:
			"We avoid vague AI claims. Public copy should tie back to a real surface, constraint, or technical problem.",
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
		description: "Live work, lab work, and partnership work should be labelled differently.",
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
		surface: "Runtime boundaries",
		description:
			"Run untrusted code with strict execution boundaries, resource limits, and infrastructure-grade isolation.",
	},
	{
		title: "Software learning systems",
		surface: "Practice infrastructure",
		description:
			"Build practice environments for algorithms, system design, and engineering depth without shallow progress loops.",
	},
	{
		title: "AI-assisted creation",
		surface: "Interface workflows",
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
	"Research with a path to deployment",
];

export type ProcessStep = {
	step: number;
	title: string;
	description: string;
};

export const PROBLEM_SOLVING_PROCESS: ProcessStep[] = [
	{
		step: 1,
		title: "Question",
		description: "Find a hard systems problem worth productizing",
	},
	{
		step: 2,
		title: "Research",
		description: "Reduce the unknowns before writing product claims",
	},
	{
		step: 3,
		title: "Prototype",
		description: "Build the smallest useful execution path",
	},
	{
		step: 4,
		title: "Harden",
		description: "Test constraints, failures, and real workloads",
	},
	{
		step: 5,
		title: "Ship",
		description: "Release the product only when the proof is public",
	},
];

export const CLIENT_SERVICES = RESEARCH_PARTNERSHIP_CRITERIA;

export const SAAS_PRINCIPLES = [
	"Product truth before launch copy",
	"Live and coming soon states separated clearly",
	"Research tied to execution, learning, or interface creation",
	"Selective partnerships with product-grade outcomes",
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
			{
				label: "LinkedIn",
				href: "https://www.linkedin.com/company/orkait/",
				isExternal: true,
			},
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
		description: "Public product claims are reserved for systems people can actually use.",
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
		description: "We do not inflate roadmap work into public product claims.",
		area: "card3",
	},
	{
		num: "(04)",
		title: "Systems come first",
		description: "We care about runtime behavior, constraints, failure modes, and maintenance.",
		area: "card4",
	},
	{
		num: "(05)",
		title: "Partnerships stay selective",
		description: "We collaborate when the work has a path to a real system.",
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
		description: "Research earns trust when users can touch the product.",
		area: "card7",
	},
];

export const SERVICES = [
	{ label: "Secure execution", active: true },
	{ label: "Learning systems", active: false },
	{ label: "Creation tools", active: false },
	{ label: "Research partnerships", active: false },
];

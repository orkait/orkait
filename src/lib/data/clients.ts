export type Client = {
	name: string;
	// Optional brand logo, in priority order:
	logo?: string; // local asset under /public (e.g. "/logos/tencent.svg")
	slug?: string; // simpleicons slug (https://cdn.simpleicons.org/<slug>)
	// No logo + no slug -> rendered as a clean wordmark (the name itself).

	// Per-logo height for OPTICAL balance: wide wordmarks sit shorter, square
	// marks/seals sit taller, so every logo reads as equal visual weight.
	heightClass?: string;
};

// Real partners/clients. Official SVG logos sourced from Wikimedia Commons,
// self-hosted under /public/logos and rendered grayscale + muted in the wall.
export const CLIENTS: Client[] = [
	{ name: "Tencent", logo: "/logos/tencent.svg", heightClass: "h-7 tablet:h-8" },
	{ name: "Kyoto University", logo: "/logos/kyoto-university.svg", heightClass: "h-11 tablet:h-12" },
	{ name: "IIT Madras", logo: "/logos/iit-madras.svg", heightClass: "h-11 tablet:h-12" },
];

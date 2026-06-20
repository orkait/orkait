export type Client = {
	name: string;
	// Optional brand logo, in priority order:
	logo?: string; // local asset under /public (e.g. "/logos/tencent.svg")
	slug?: string; // simpleicons slug (https://cdn.simpleicons.org/<slug>)
	// No logo + no slug -> rendered as a clean wordmark (the name itself).
};

// Real partners/clients. Tencent + two research universities. None have a
// simpleicons entry, so they render as wordmarks until a local logo is dropped
// into /public and referenced via `logo`.
export const CLIENTS: Client[] = [
	{ name: "Tencent" },
	{ name: "Kyoto University" },
	{ name: "IIT Madras" },
];

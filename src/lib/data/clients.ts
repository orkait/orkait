export type Client = { name: string; slug?: string };

// TODO: real client logos - pending from team.
// Entries with a `slug` render a simpleicons logo; entries without render a
// monogram chip. Seeded with obvious placeholders (no real brand names) so the
// trust bar reads as complete in layout while we wait on the real list.
export const CLIENTS: Client[] = [
	{ name: "Partner A" },
	{ name: "Partner B" },
	{ name: "Partner C" },
	{ name: "Partner D" },
	{ name: "Partner E" },
];

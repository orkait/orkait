export const routes = {
	home: "/",
	projects: "/projects",
	knowledge: "/knowledge",
	contact: "/contact",
	privacyPolicy: "/privacy-policy",
	terms: "/terms",
} as const;

export type RoutePath = (typeof routes)[keyof typeof routes];

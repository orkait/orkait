export const routes = {
	home: "/",
	about: "/about",
	projects: "/projects",
	services: "/services",
	pricing: "/pricing",
	contact: "/contact",
	privacyPolicy: "/privacy-policy",
	terms: "/terms",
} as const;

export type RoutePath = (typeof routes)[keyof typeof routes];

import type { SiteLink } from "@/lib/types";

export const routes = {
	home: "/",
	projects: "/projects",
	careers: "/careers",
	knowledge: "/knowledge",
	contact: "/contact",
	privacyPolicy: "/privacy-policy",
	terms: "/terms",
} as const;

export type RoutePath = (typeof routes)[keyof typeof routes];

export const HEADER_LINKS: SiteLink[] = [{ label: "Projects & Team", href: routes.projects }];

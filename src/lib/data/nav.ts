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

// Floating glass navbar - product-first ordering per brand rules.
export const headerNav: SiteLink[] = [
	{ label: "Products", href: routes.projects },
	{ label: "Knowledge", href: routes.knowledge },
	{ label: "Careers", href: routes.careers },
];

export const headerCtas = {
	rustbox: { label: "Rustbox", href: "https://rustbox.orkait.com" },
	contact: { label: "Contact", href: routes.contact },
} as const;

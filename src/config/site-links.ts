import type { SiteLink } from "@/types";
import { routes } from "@/config/routes";

export const HEADER_LINKS: SiteLink[] = [
	{ label: "About", href: routes.about },
	{ label: "Projects", href: routes.projects },
	{ label: "Services", href: routes.services },
];

export const FOOTER_NAV_LINKS: SiteLink[] = [
	{ label: "Home", href: routes.home },
	{ label: "About", href: routes.about },
	{ label: "Projects", href: routes.projects },
	{ label: "Services", href: routes.services },
];

export const FOOTER_LEGAL_LINKS: SiteLink[] = [
	{ label: "Pricing", href: routes.pricing },
	{ label: "Privacy Policy", href: routes.privacyPolicy },
	{ label: "Terms & Conditions", href: routes.terms },
	{ label: "Contact", href: routes.contact },
];

export const FOOTER_SOCIAL_LINKS: SiteLink[] = [
	{ label: "X (Twitter)", href: "https://x.com" },
	{ label: "YouTube", href: "https://www.youtube.com" },
	{ label: "Instagram", href: "https://www.instagram.com" },
	{ label: "LinkedIn", href: "https://www.linkedin.com" },
];

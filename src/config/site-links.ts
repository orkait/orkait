export type SiteLink = {
	label: string;
	href: string;
};

export const HEADER_LINKS: SiteLink[] = [
	{ label: "About", href: "/about" },
	{ label: "Projects", href: "/projects" },
	{ label: "Services", href: "/services" },
];

export const FOOTER_NAV_LINKS: SiteLink[] = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Projects", href: "/projects" },
	{ label: "Services", href: "/services" },
];

export const FOOTER_LEGAL_LINKS: SiteLink[] = [
	{ label: "Pricing", href: "/pricing" },
	{ label: "Privacy Policy", href: "/privacy-policy" },
	{ label: "Terms & Conditions", href: "/terms" },
	{ label: "Contact", href: "/contact" },
];

export const FOOTER_SOCIAL_LINKS: SiteLink[] = [
	{ label: "X (Twitter)", href: "https://x.com" },
	{ label: "YouTube", href: "https://www.youtube.com" },
	{ label: "Instagram", href: "https://www.instagram.com" },
	{ label: "LinkedIn", href: "https://www.linkedin.com" },
];

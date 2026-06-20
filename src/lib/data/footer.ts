import type { FooterColumn, SiteLink } from "@/lib/types";
import { routes } from "@/lib/data/nav";

export const FOOTER_COLUMNS: FooterColumn[] = [
	{
		ariaLabel: "Products navigation",
		heading: "Products",
		links: [
			{ label: "Rustbox", href: "https://rustbox.orkait.com", isExternal: true },
			{ label: "BooleanStack", href: routes.projects },
			{ label: "Zen", href: routes.projects },
		],
	},
	{
		ariaLabel: "Company navigation",
		heading: "Company",
		links: [
			{ label: "Projects & Team", href: routes.projects },
			{ label: "Careers", href: routes.careers },
			{ label: "Knowledge", href: routes.knowledge },
			{ label: "Research Partnerships", href: routes.contact },
		],
	},
	{
		ariaLabel: "Legal navigation",
		heading: "Legal",
		links: [
			{ label: "Privacy Policy", href: routes.privacyPolicy },
			{ label: "Terms of Service", href: routes.terms },
		],
	},
];

export const FOOTER_SOCIAL_LINKS: SiteLink[] = [
	{ label: "LinkedIn", href: "https://www.linkedin.com/company/orkait/" },
	{ label: "GitHub", href: "https://github.com/orkait" },
];

export const FOOTER_STATUS = "RUSTBOX - LIVE   ·   BOOLEANSTACK - SOON   ·   ZEN - SOON";

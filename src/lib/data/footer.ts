import type { FooterColumn, SiteLink } from "@/lib/types";
import { routes } from "@/lib/data/nav";

export const FOOTER_COLUMNS: FooterColumn[] = [
	{
		ariaLabel: "Primary navigation",
		heading: "Company",
		links: [
			{ label: "Home", href: routes.home },
			{ label: "Products", href: routes.projects },
			{ label: "Careers", href: routes.careers },
		],
	},
	{
		ariaLabel: "Social and contact navigation",
		heading: "Connect",
		links: [
			{ label: "Research Partnerships", href: routes.contact },
			{
				label: "LinkedIn",
				href: "https://www.linkedin.com/company/orkait/",
				isExternal: true,
			},
			{ label: "GitHub", href: "https://github.com/orkait", isExternal: true },
		],
	},
];

export const FOOTER_SOCIAL_LINKS: SiteLink[] = [
	{ label: "LinkedIn", href: "https://www.linkedin.com/company/orkait/" },
	{ label: "GitHub", href: "https://github.com/orkait" },
];

import type { SiteLink } from "@/types";
import { routes } from "@/config/routes";

export const HEADER_LINKS: SiteLink[] = [
	{ label: "Projects & Team", href: routes.projects },
];

export const FOOTER_SOCIAL_LINKS: SiteLink[] = [
	{ label: "LinkedIn", href: "https://www.linkedin.com/company/orkait/" },
	{ label: "GitHub", href: "https://github.com/orkait" },
];

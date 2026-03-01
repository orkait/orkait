import type { SiteLink } from "@/types";
import { routes } from "@/config/routes";
import { HEADER_LINKS } from "@/config/site-links";

export const navLinks: ReadonlyArray<SiteLink> = [
	{ label: "Home", href: routes.home },
	...HEADER_LINKS,
	{ label: "Pricing", href: routes.pricing },
	{ label: "Contact", href: routes.contact },
];

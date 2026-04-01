import type { SiteLink } from "@/types";
import { routes } from "@/config/routes";
import { HEADER_LINKS } from "@/config/site-links";

export const navLinks: ReadonlyArray<SiteLink> = [
	{ label: "Home", href: routes.home },
	...HEADER_LINKS,
	{ label: "Contact", href: routes.contact },
] as const;

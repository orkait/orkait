import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const SITE_NAME = "Orkait";

export function createPageMetadata(title: string, description: string): Metadata {
	const fullTitle = `${title} | ${SITE_NAME}`;
	return {
		title: fullTitle,
		description,
		openGraph: {
			title: fullTitle,
			description,
			siteName: SITE_NAME,
			url: siteConfig.url,
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: fullTitle,
			description,
		},
	};
}

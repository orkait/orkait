import type { Metadata } from "next";

const SITE_NAME = "Orkait";

export function createPageMetadata(
	title: string,
	description: string
): Metadata {
	return {
		title: `${title} | ${SITE_NAME}`,
		description,
	};
}

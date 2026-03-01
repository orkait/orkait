import type { Metadata } from "next";
import { ContentPage } from "@/components/shared/content-page";
import { createPageMetadata } from "@/config/metadata";
import { routes } from "@/config/routes";

export const metadata: Metadata = createPageMetadata(
	"About",
	"Learn how Orkait helps teams launch and scale high-performance digital products."
);

export default function AboutPage() {
	return (
		<ContentPage
			eyebrow="(01) About"
			title="Building reliable digital products with speed and precision."
			description="Orkait partners with founders and teams to design, build, and scale products that are secure, maintainable, and ready for growth."
			links={[
				{ label: "View Services", href: routes.services },
				{ label: "Contact Us", href: routes.contact },
			]}
		/>
	);
}

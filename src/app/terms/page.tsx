import type { Metadata } from "next";
import { ContentPage } from "@/components/shared/content-page";
import { createPageMetadata } from "@/config/metadata";
import { routes } from "@/config/routes";

export const metadata: Metadata = createPageMetadata(
	"Terms & Conditions",
	"Read the terms governing use of Orkait services, deliverables, and engagements."
);

export default function TermsPage() {
	return (
		<ContentPage
			eyebrow="(04) Legal"
			title="Engagement terms and delivery expectations."
			description="Project scope, timelines, acceptance criteria, and support windows are defined per engagement. Our terms ensure transparent collaboration and predictable execution."
			links={[
				{ label: "Privacy Policy", href: routes.privacyPolicy },
				{ label: "Contact", href: routes.contact },
			]}
		/>
	);
}

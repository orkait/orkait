import type { Metadata } from "next";
import { ContentPage } from "@/components/shared/content-page";
import { createPageMetadata } from "@/config/metadata";
import { routes } from "@/config/routes";

export const metadata: Metadata = createPageMetadata(
	"Privacy Policy",
	"Review how Orkait collects, stores, and uses information across our products and services."
);

export default function PrivacyPolicyPage() {
	return (
		<ContentPage
			eyebrow="(03) Legal"
			title="Privacy and data handling."
			description="We collect only the information required to provide services and support communication. Data is processed with care, protected with industry best practices, and never sold."
			links={[
				{ label: "Terms & Conditions", href: routes.terms },
				{ label: "Contact", href: routes.contact },
			]}
		/>
	);
}

import type { Metadata } from "next";
import { ContentPage } from "@/components/shared/content-page";
import { createPageMetadata } from "@/config/metadata";
import { routes } from "@/config/routes";
import { ServicesMobileHeader } from "@/components/services/services-mobile-header";

export const metadata: Metadata = createPageMetadata(
	"Services",
	"Explore Orkait services across product strategy, web engineering, and scalable delivery."
);

export default function ServicesPage() {
	const links = [
		{ label: "See Pricing", href: routes.pricing },
	];

	return (
		<>
			<div className="block tablet:hidden">
				<ServicesMobileHeader links={links} />
			</div>

			<div className="hidden tablet:block">
				<ContentPage
					eyebrow="(02) Services"
					title="End-to-end product engineering for ambitious teams."
					description="From MVP delivery to production hardening, Orkait supports the full lifecycle with a strong focus on system quality, velocity, and developer experience."
					links={links}
				/>
			</div>
		</>
	);
}

import type { Metadata } from "next";
import { PricingTable } from "@/components/sections/pricing/pricing-table";
import { createPageMetadata } from "@/config/metadata";

export const metadata: Metadata = createPageMetadata(
	"Pricing",
	"Transparent fixed-price packages for product development engagements."
);

export default function PricingPage() {
	return <PricingTable />;
}

import type { PricingPlan } from "@/types";

const STARTER_PLAN: Omit<PricingPlan, "id"> = {
	title: "Starter",
	description: "Perfect for MVPs and simple applications",
	pricePrefix: "Starting from",
	price: "$2500",
	paymentType: "One-time payment",
	features: [
		"Single platform (iOS or Android or Web)",
		"Up to 5 screens/pages",
		"Basic UI/UX design",
		"API integration (up to 3 endpoints)",
		"30 days post-launch support",
	],
	ctaLabel: "Get Started",
	tone: "default",
};

const PRO_PLAN: Omit<PricingPlan, "id"> = {
	title: "Pro",
	description: "Full-featured applications",
	pricePrefix: "Starting from",
	price: "$7500",
	paymentType: "One-time payment",
	features: [
		"Cross-platform (iOS + Android or Web)",
		"Up to 15 screens/pages",
		"Custom UI/UX design",
		"Push notifications",
		"90 days post-launch support",
	],
	ctaLabel: "Contact Sales",
	tone: "featured",
};

export const PRICING_PLANS: PricingPlan[] = [
	{
		id: "starter-left",
		...STARTER_PLAN,
	},
	{
		id: "pro",
		...PRO_PLAN,
	},
	{
		id: "starter-right",
		...STARTER_PLAN,
	},
];


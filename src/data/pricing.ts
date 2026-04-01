import type { PricingPlan } from "@/types";
import { routes } from "@/config/routes";

const STARTER_PLAN: Omit<PricingPlan, "id"> = {
	title: "Starter",
	description: "MVPs and focused web applications",
	pricePrefix: "Starting from",
	price: "$2500",
	paymentType: "One-time payment",
	features: [
		"Single platform (Web, iOS, or Android)",
		"Up to 5 core screens",
		"API design and integration",
		"CI/CD pipeline setup",
		"30 days post-launch support",
	],
	ctaLabel: "Get Started",
	ctaHref: routes.contact,
	tone: "default",
};

const PRO_PLAN: Omit<PricingPlan, "id"> = {
	title: "Pro",
	description: "Production-grade systems built to scale",
	pricePrefix: "Starting from",
	price: "$7500",
	paymentType: "One-time payment",
	features: [
		"Cross-platform (Web + Mobile)",
		"Up to 15 screens with custom architecture",
		"Scalable backend with cloud-native infrastructure",
		"Automated testing and monitoring",
		"90 days post-launch support",
	],
	ctaLabel: "Talk to Us",
	ctaHref: routes.contact,
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

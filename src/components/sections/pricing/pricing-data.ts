export type PricingPlan = {
	id: string;
	title: string;
	pricePrefix: string;
	price: string;
	paymentType: string;
	description: string;
	features: string[];
};

const BASE_PLAN: Omit<PricingPlan, "id"> = {
	title: "Professional",
	pricePrefix: "Starting from",
	price: "$7500",
	paymentType: "One-time payment",
	description: "Full-featured applications for growing businesses",
	features: [
		"Cross-platform (iOS + Android or Web)",
		"Up to 15 screens/pages",
		"Custom UI/UX design",
		"Full backend integration",
		"User authentication & authorization",
		"Push notifications",
		"90 days post-launch support",
	],
};

export const PRICING_PLANS: PricingPlan[] = Array.from({ length: 5 }, (_, index) => ({
	id: `professional-${index}`,
	...BASE_PLAN,
}));

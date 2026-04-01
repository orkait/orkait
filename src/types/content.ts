export type SiteLink = {
	label: string;
	href: string;
};

export type Service = {
	title: string;
	description: string;
	icon?: string;
};

export type PricingPlanTone = "default" | "featured";

export type PricingPlan = {
	id: string;
	title: string;
	description: string;
	pricePrefix: string;
	price: string;
	paymentType: string;
	features: string[];
	ctaLabel: string;
	ctaHref: string;
	tone: PricingPlanTone;
};

export type Project = {
	id: string;
	title: string;
	services: string;
	href: string;
	image: {
		src: string;
		width: number;
		height: number;
	};
};

export type Testimonial = {
	name: string;
	role: string;
	company: string;
	content: string;
	avatar?: string;
};

export type OSSProject = {
	id: string;
	title: string;
	description: string;
	tags: string;
	language: string;
	href: string;
	hidden?: boolean;
	image?: {
		src: string;
		width: number;
		height: number;
	};
};

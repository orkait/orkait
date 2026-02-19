export interface Service {
	title: string;
	description: string;
	icon?: string;
}

export interface PricingPlan {
	name: string;
	price: string;
	description: string;
	features: string[];
	highlighted?: boolean;
}

export interface Project {
	title: string;
	description: string;
	image: string;
	tags: string[];
	href?: string;
}

export interface Testimonial {
	name: string;
	role: string;
	company: string;
	content: string;
	avatar?: string;
}

export interface NavLink {
	label: string;
	href: string;
}

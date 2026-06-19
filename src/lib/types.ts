export type SiteLink = {
	label: string;
	href: string;
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

export type ProductStatus = "live" | "coming-soon";

export type ProductLine = {
	id: string;
	title: string;
	status: ProductStatus;
	statusLabel: string;
	summary: string;
	description: string;
	surface: string;
	href?: string;
	ctaLabel: string;
	publicRole: string;
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

export type TeamMember = {
	name: string;
	role: string;
	ex: string[];
	image: string;
	alumni?: boolean;
};

export type Service = {
	label: string;
	active: boolean;
};

export type FeatureCard = {
	num: string;
	title: string;
	description: string;
	area: string;
};

export type Testimonial = {
	quote: string;
	name: string;
	company: string;
};

export type FooterLink = {
	label: string;
	href: string;
	isExternal?: boolean;
};

export type FooterColumn = {
	ariaLabel: string;
	heading?: string;
	links: FooterLink[];
};

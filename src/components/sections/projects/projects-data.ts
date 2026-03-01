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

export const PROJECTS: Project[] = [
	{
		id: "17th-floor",
		title: "17th Floor",
		services: "Strategy, Identity",
		href: "#",
		image: {
			src: "/projects/17th-floor.webp",
			width: 453,
			height: 443,
		},
	},
	{
		id: "mora-fashion",
		title: "Mora Fashion",
		services: "Strategy, Identity, Webdesign",
		href: "#",
		image: {
			src: "/projects/mora-fashion.webp",
			width: 453,
			height: 443,
		},
	},
	{
		id: "zeba-imp",
		title: "Zeba-IMP",
		services: "Strategy, Identity, Webdesign",
		href: "#",
		image: {
			src: "/projects/zeba-imp.webp",
			width: 453,
			height: 599,
		},
	},
	{
		id: "anima-living",
		title: "Anima Living",
		services: "Strategy, Identity, Webdesign",
		href: "#",
		image: {
			src: "/projects/anima-living.webp",
			width: 453,
			height: 599,
		},
	},
	{
		id: "montara-immobilien",
		title: "Montara Immobilien",
		services: "Strategy, Identity, Webdesign",
		href: "#",
		image: {
			src: "/projects/montara-immobilien.webp",
			width: 453,
			height: 604,
		},
	},
	{
		id: "vienna-rental",
		title: "Vienna Rental",
		services: "Strategy, Identity",
		href: "#",
		image: {
			src: "/projects/vienna-rental.webp",
			width: 453,
			height: 443,
		},
	},
];

import type { Project } from "@/types";
import { routes } from "@/config/routes";

export const PROJECTS: Project[] = [
	{
		id: "17th-floor",
		title: "17th Floor",
		services: "Strategy, Engineering",
		href: `${routes.projects}#project-17th-floor`,
		image: {
			src: "/projects/17th-floor.webp",
			width: 453,
			height: 443,
		},
	},
	{
		id: "mora-fashion",
		title: "Mora Fashion",
		services: "Strategy, Web Engineering",
		href: `${routes.projects}#project-mora-fashion`,
		image: {
			src: "/projects/mora-fashion.webp",
			width: 453,
			height: 443,
		},
	},
	{
		id: "zeba-imp",
		title: "Zeba-IMP",
		services: "Strategy, Full-Stack Development",
		href: `${routes.projects}#project-zeba-imp`,
		image: {
			src: "/projects/zeba-imp.webp",
			width: 453,
			height: 599,
		},
	},
	{
		id: "anima-living",
		title: "Anima Living",
		services: "Web App, Backend Systems",
		href: `${routes.projects}#project-anima-living`,
		image: {
			src: "/projects/anima-living.webp",
			width: 453,
			height: 599,
		},
	},
	{
		id: "montara-immobilien",
		title: "Montara Immobilien",
		services: "Dashboard, API Engineering",
		href: `${routes.projects}#project-montara-immobilien`,
		image: {
			src: "/projects/montara-immobilien.webp",
			width: 453,
			height: 604,
		},
	},
	{
		id: "vienna-rental",
		title: "Vienna Rental",
		services: "SaaS Platform, Engineering",
		href: `${routes.projects}#project-vienna-rental`,
		image: {
			src: "/projects/vienna-rental.webp",
			width: 453,
			height: 443,
		},
	},
];


import type { OSSProject, Project } from "@/types";
import { routes } from "@/config/routes";

export const PROJECTS: Project[] = [
	{
		id: "rustbox",
		title: "Rustbox",
		services: "Infrastructure, Systems Engineering",
		href: "https://rustbox.orkait.com",
		image: {
			src: "/data/projects/rustbox-hero.jpeg",
			width: 960,
			height: 540,
		},
	},
	{
		id: "booleanstack",
		title: "BooleanStack",
		services: "SaaS Platform, Full-Stack Development",
		href: "https://booleanstack.com",
		image: {
			src: "/data/projects/nitrogen-hero-v2.jpeg",
			width: 960,
			height: 540,
		},
	},
];

export const OSS_PROJECTS: OSSProject[] = [
	{
		id: "event-calendar",
		title: "Event Calendar",
		description:
			"Production-ready scheduling API on Cloudflare Workers using bitset-based storage for availability tracking and conflict detection.",
		tags: "API Engineering, Infrastructure",
		language: "TypeScript",
		href: "https://github.com/orkait/event-calendar",
		hidden: true,
	},
	{
		id: "gatekeeper",
		title: "Gatekeeper",
		description:
			"Control plane for managing authentication, sessions, subscriptions, and access control across multiple services. Built on Cloudflare Workers.",
		tags: "Backend Systems, API Engineering",
		language: "TypeScript",
		href: "https://github.com/orkait/gatekeeper",
	},
	{
		id: "unified-mcp",
		title: "Unified MCP",
		description:
			"One MCP server. All frontend libraries. No conflicts. Provides Claude with unified access to React Flow, Motion, and other frontend tooling.",
		tags: "Dev Tools, AI Tooling",
		language: "TypeScript",
		href: "https://github.com/orkait/unified-mcp",
	},
];


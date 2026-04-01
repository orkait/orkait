import type { OSSProject, Project } from "@/types";
import { routes } from "@/config/routes";

export const PROJECTS: Project[] = [
	{
		id: "rustbox",
		title: "Rustbox",
		services: "Infrastructure, Systems Engineering",
		href: "https://rustbox.orkait.com",
		image: {
			src: "/data/projects/rustbox.webp",
			width: 453,
			height: 443,
		},
	},
	{
		id: "booleanstack",
		title: "BooleanStack",
		services: "SaaS Platform, Full-Stack Development",
		href: "https://booleanstack.com",
		image: {
			src: "/data/projects/booleanstack.webp",
			width: 453,
			height: 443,
		},
	},
];

export const OSS_PROJECTS: OSSProject[] = [
	{
		id: "gatekeeper",
		title: "Gatekeeper",
		description:
			"Control plane for managing authentication, sessions, subscriptions, and access control across multiple services. Built on Cloudflare Workers.",
		tags: "Backend Systems, API Engineering",
		language: "TypeScript",
		href: "https://github.com/orkait/gatekeeper",
		image: { src: "/data/projects/gatekeeper.webp", width: 453, height: 300 },
	},
	{
		id: "event-calendar",
		title: "Event Calendar",
		description:
			"Production-ready scheduling API on Cloudflare Workers using bitset-based storage for availability tracking and conflict detection.",
		tags: "API Engineering, Infrastructure",
		language: "TypeScript",
		href: "https://github.com/orkait/event-calendar",
		image: { src: "/data/projects/event-calendar.webp", width: 453, height: 300 },
	},
	{
		id: "unified-mcp",
		title: "Unified MCP",
		description:
			"One MCP server. All frontend libraries. No conflicts. Provides Claude with unified access to React Flow, Motion, and other frontend tooling.",
		tags: "Dev Tools, AI Tooling",
		language: "TypeScript",
		href: "https://github.com/orkait/unified-mcp",
		image: { src: "/data/projects/unified-mcp.webp", width: 453, height: 300 },
	},
];


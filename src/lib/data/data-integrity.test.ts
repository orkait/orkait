import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { globSync } from "tinyglobby";
import { PROJECTS, OSS_PROJECTS, PRODUCT_LINES } from "./products";
import { TEAM_MEMBERS } from "./team";
import { HEADER_LINKS, routes } from "./nav";

const PUBLIC_COPY_GLOBS = [
	"src/pages/**/*.astro",
	"src/components/**/*.astro",
	"src/lib/data/**/*.ts",
];

const BANNED_PUBLIC_COPY_PHRASES = [
	"AI solutions",
	"digital transformation",
	"unlock potential",
	"revolutionize",
	"next-gen",
	"modern businesses",
	"custom software solutions",
	"client work",
	"professional services",
	"business websites",
	"unlock the next",
	"next generation",
	"case studies",
];

function readProjectFile(relativePath: string) {
	return readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function publicCopyFiles(): string[] {
	const files = new Set<string>();
	for (const pattern of PUBLIC_COPY_GLOBS) {
		for (const match of globSync(pattern, { cwd: process.cwd() })) {
			if (!match.endsWith(".test.ts")) {
				files.add(match);
			}
		}
	}
	return [...files];
}

describe("project data", () => {
	it("uses stable unique identifiers", () => {
		const ids = PROJECTS.map((project) => project.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it("has valid external links", () => {
		PROJECTS.forEach((project) => {
			expect(project.href.startsWith("https://")).toBe(true);
		});
	});

	it("has image assets that reference the data directory", () => {
		PROJECTS.forEach((project) => {
			expect(project.image.src.startsWith("/data/projects/")).toBe(true);
		});
	});
});

describe("OSS project data", () => {
	it("uses stable unique identifiers", () => {
		const ids = OSS_PROJECTS.map((project) => project.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it("keeps the public open section capped to four cards", () => {
		expect(OSS_PROJECTS.length).toBeLessThanOrEqual(4);
	});

	it("showcases the open public projects", () => {
		expect(OSS_PROJECTS.map((project) => project.id)).toEqual(["graphstore", "hyperstack"]);
		expect(OSS_PROJECTS[0]?.href).toBe("https://github.com/orkait/graphstore");
		expect(OSS_PROJECTS[0]?.language).toBe("Python");
		expect(OSS_PROJECTS[1]?.href).toBe("https://github.com/orkait/hyperstack");
		expect(OSS_PROJECTS[1]?.language).toBe("TypeScript");
	});

	it("does not share IDs with client projects", () => {
		const clientIds = new Set(PROJECTS.map((p) => p.id));
		OSS_PROJECTS.forEach((project) => {
			expect(clientIds.has(project.id)).toBe(false);
		});
	});

	it("does not publish removed internal projects as open cards", () => {
		const ids = OSS_PROJECTS.map((project) => project.id);
		expect(ids.includes("unified-mcp")).toBe(false);
		expect(ids.includes("gatekeeper")).toBe(false);
	});
});

describe("product positioning data", () => {
	it("keeps the product grid capped to four cards", () => {
		expect(PRODUCT_LINES.length).toBeLessThanOrEqual(4);
	});

	it("keeps Rustbox as the only live public product", () => {
		const liveProducts = PRODUCT_LINES.filter((product) => product.status === "live");
		expect(liveProducts.map((product) => product.id)).toEqual(["rustbox"]);
		expect(liveProducts[0]?.href).toBe("https://rustbox.orkait.com");
	});

	it("keeps BooleanStack and Zen as coming soon products", () => {
		const comingSoonIds = PRODUCT_LINES.filter((product) => product.status === "coming-soon")
			.map((product) => product.id)
			.sort();
		expect(comingSoonIds).toEqual(["booleanstack", "zen"]);
	});

	it("does not publish removed internal projects as product lines", () => {
		const ids = PRODUCT_LINES.map((product) => product.id);
		expect(ids.includes("unified-mcp")).toBe(false);
		expect(ids.includes("gatekeeper")).toBe(false);
	});
});

describe("public copy voice", () => {
	it("avoids agency and generic AI phrasing in public copy", () => {
		const files = publicCopyFiles();
		expect(files.length).toBeGreaterThan(0);

		for (const file of files) {
			const source = readProjectFile(file).toLowerCase();

			for (const phrase of BANNED_PUBLIC_COPY_PHRASES) {
				expect(
					source.includes(phrase.toLowerCase()),
					`${file} contains banned phrase: ${phrase}`,
				).toBe(false);
			}
		}
	});
});

describe("navigation data", () => {
	it("keeps header links aligned with valid app routes", () => {
		const routeSet = new Set<string>(Object.values(routes));

		HEADER_LINKS.filter((link) => !link.href.startsWith("http")).forEach((link) => {
			expect(routeSet.has(link.href), `Header link "${link.label}" points to invalid route: ${link.href}`).toBe(true);
		});
	});
});

describe("team data", () => {
	it("references image assets that exist in public", () => {
		TEAM_MEMBERS.forEach((member) => {
			const assetPath = path.join(process.cwd(), "public", member.image.replace(/^\//, ""));
			expect(existsSync(assetPath), `Missing image asset for ${member.name}: ${member.image}`).toBe(true);
		});
	});

	it("has no duplicate names", () => {
		const names = TEAM_MEMBERS.map((m) => m.name);
		expect(new Set(names).size).toBe(names.length);
	});
});

describe("knowledge base", () => {
	it("has a curated markdown source with the required sections", () => {
		const kbPath = path.join(process.cwd(), "chatbot", "knowledge", "index.md");
		expect(existsSync(kbPath), "Missing chatbot/knowledge/index.md").toBe(true);

		const markdown = readFileSync(kbPath, "utf8");

		[
			"# Orkait Knowledge Base",
			"## What Orkait Is",
			"## Live Product",
			"## Coming Soon",
			"## Built In The Open",
			"## Research Partnerships",
			"## What We Do Not Claim",
		].forEach((heading) => {
			expect(markdown).toMatch(
				new RegExp(`^${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "m"),
			);
		});
	});
});

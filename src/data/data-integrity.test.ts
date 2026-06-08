import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { PROJECTS, OSS_PROJECTS, PRODUCT_LINES } from "./projects";
import { TEAM_MEMBERS } from "./team";
import { HEADER_LINKS } from "../config/site-links";
import { routes } from "../config/routes";

const PUBLIC_COPY_FILES = [
	"src/config/site.ts",
	"src/config/site-links.ts",
	"src/app/layout.tsx",
	"src/app/projects/page.tsx",
	"src/app/contact/page.tsx",
	"src/components/home/Hero.tsx",
	"src/components/home/Flash.tsx",
	"src/components/home/StudioText.tsx",
	"src/components/home/ServicesText.tsx",
	"src/components/home/Advance.tsx",
	"src/components/home/Process.tsx",
	"src/components/sections/projects/projects-masonry-grid.tsx",
	"src/components/contact/ContactMobile.tsx",
	"src/components/careers/careers-page.tsx",
	"src/constants/index.ts",
	"src/data/projects.ts",
	"chatbot/knowledge/index.md",
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
];

function readProjectFile(relativePath: string) {
	return readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

describe("project data", () => {
	it("uses stable unique identifiers", () => {
		const ids = PROJECTS.map((project) => project.id);
		assert.equal(new Set(ids).size, ids.length);
	});

	it("has valid external links", () => {
		PROJECTS.forEach((project) => {
			assert.equal(
				project.href.startsWith("https://"),
				true,
				`Project ${project.title} should have a live URL`,
			);
		});
	});

	it("has image assets that reference the data directory", () => {
		PROJECTS.forEach((project) => {
			assert.equal(
				project.image.src.startsWith("/data/projects/"),
				true,
				`Project ${project.title} image should be in /data/projects/`,
			);
		});
	});
});

describe("OSS project data", () => {
	it("uses stable unique identifiers", () => {
		const ids = OSS_PROJECTS.map((project) => project.id);
		assert.equal(new Set(ids).size, ids.length);
	});

	it("keeps the public open section capped to four cards", () => {
		assert.equal(
			OSS_PROJECTS.length <= 4,
			true,
			"Open project cards should stay capped at four",
		);
	});

	it("showcases GraphStore as the open public project", () => {
		assert.deepEqual(
			OSS_PROJECTS.map((project) => project.id),
			["graphstore"],
		);
		assert.equal(OSS_PROJECTS[0]?.href, "https://github.com/orkait/graphstore");
		assert.equal(OSS_PROJECTS[0]?.language, "Python");
	});

	it("does not share IDs with client projects", () => {
		const clientIds = new Set(PROJECTS.map((p) => p.id));
		OSS_PROJECTS.forEach((project) => {
			assert.equal(
				clientIds.has(project.id),
				false,
				`OSS project ${project.title} shares ID with a client project`,
			);
		});
	});

	it("does not publish removed internal projects as open cards", () => {
		const ids = OSS_PROJECTS.map((project) => project.id);

		assert.equal(ids.includes("unified-mcp"), false);
		assert.equal(ids.includes("gatekeeper"), false);
	});
});

describe("product positioning data", () => {
	it("keeps the product grid capped to four cards", () => {
		assert.equal(PRODUCT_LINES.length <= 4, true, "Product cards should stay capped at four");
	});

	it("keeps Rustbox as the only live public product", () => {
		const liveProducts = PRODUCT_LINES.filter((product) => product.status === "live");

		assert.deepEqual(
			liveProducts.map((product) => product.id),
			["rustbox"],
		);
		assert.equal(liveProducts[0]?.href, "https://rustbox.orkait.com");
	});

	it("keeps BooleanStack and Zen as coming soon products", () => {
		const comingSoonIds = PRODUCT_LINES.filter((product) => product.status === "coming-soon")
			.map((product) => product.id)
			.sort();

		assert.deepEqual(comingSoonIds, ["booleanstack", "zen"]);
	});

	it("does not publish removed internal projects as product lines", () => {
		const ids = PRODUCT_LINES.map((product) => product.id);

		assert.equal(ids.includes("unified-mcp"), false);
		assert.equal(ids.includes("gatekeeper"), false);
	});
});

describe("public copy voice", () => {
	it("avoids agency and generic AI phrasing in public copy", () => {
		for (const file of PUBLIC_COPY_FILES) {
			const source = readProjectFile(file).toLowerCase();

			for (const phrase of BANNED_PUBLIC_COPY_PHRASES) {
				assert.equal(
					source.includes(phrase.toLowerCase()),
					false,
					`${file} contains banned phrase: ${phrase}`,
				);
			}
		}
	});
});

describe("navigation data", () => {
	it("keeps header links aligned with valid app routes", () => {
		const routeSet = new Set<string>(Object.values(routes));

		HEADER_LINKS.filter((link) => !link.href.startsWith("http")).forEach((link) => {
			assert.equal(
				routeSet.has(link.href),
				true,
				`Header link "${link.label}" points to invalid route: ${link.href}`,
			);
		});
	});
});

describe("team data", () => {
	it("references image assets that exist in public", () => {
		TEAM_MEMBERS.forEach((member) => {
			const assetPath = path.join(process.cwd(), "public", member.image.replace(/^\//, ""));
			assert.equal(
				existsSync(assetPath),
				true,
				`Missing image asset for ${member.name}: ${member.image}`,
			);
		});
	});

	it("has no duplicate names", () => {
		const names = TEAM_MEMBERS.map((m) => m.name);
		assert.equal(new Set(names).size, names.length);
	});
});

describe("knowledge base", () => {
	it("has a curated markdown source with the required sections", () => {
		const kbPath = path.join(process.cwd(), "chatbot", "knowledge", "index.md");
		assert.equal(existsSync(kbPath), true, "Missing chatbot/knowledge/index.md");

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
			assert.match(
				markdown,
				new RegExp(`^${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "m"),
			);
		});
	});
});

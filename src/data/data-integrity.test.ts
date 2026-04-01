import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { PROJECTS, OSS_PROJECTS } from "./projects";
import { TEAM_MEMBERS } from "./team";
import { HEADER_LINKS } from "../config/site-links";
import { routes } from "../config/routes";

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
				`Project ${project.title} should have a live URL`
			);
		});
	});

	it("has image assets that reference the data directory", () => {
		PROJECTS.forEach((project) => {
			assert.equal(
				project.image.src.startsWith("/data/projects/"),
				true,
				`Project ${project.title} image should be in /data/projects/`
			);
		});
	});
});

describe("OSS project data", () => {
	it("uses stable unique identifiers", () => {
		const ids = OSS_PROJECTS.map((project) => project.id);
		assert.equal(new Set(ids).size, ids.length);
	});

	it("does not share IDs with client projects", () => {
		const clientIds = new Set(PROJECTS.map((p) => p.id));
		OSS_PROJECTS.forEach((project) => {
			assert.equal(
				clientIds.has(project.id),
				false,
				`OSS project ${project.title} shares ID with a client project`
			);
		});
	});
});

describe("navigation data", () => {
	it("keeps header links aligned with valid app routes", () => {
		const routeSet = new Set<string>(Object.values(routes));

		HEADER_LINKS
			.filter((link) => !link.href.startsWith("http"))
			.forEach((link) => {
				assert.equal(
					routeSet.has(link.href),
					true,
					`Header link "${link.label}" points to invalid route: ${link.href}`
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
				`Missing image asset for ${member.name}: ${member.image}`
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
			"## What Orkait Builds",
			"## Active Public Products And Infrastructure",
			"## Selected Supporting Projects",
			"## Coming Soon",
			"## What We Do Not Claim",
		].forEach((heading) => {
			assert.match(markdown, new RegExp(`^${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "m"));
		});
	});
});

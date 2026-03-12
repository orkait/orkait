import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { PRICING_PLANS } from "./pricing";
import { PROJECTS } from "./projects";
import {
	FOOTER_LEGAL_LINKS,
	FOOTER_NAV_LINKS,
	HEADER_LINKS,
} from "../config/site-links";
import { routes } from "../config/routes";

describe("pricing data", () => {
	it("defines exactly three plans with one featured plan", () => {
		assert.equal(PRICING_PLANS.length, 3);
		assert.equal(
			PRICING_PLANS.filter((plan) => plan.tone === "featured").length,
			1
		);
	});

	it("has stable unique identifiers", () => {
		const ids = PRICING_PLANS.map((plan) => plan.id);
		assert.equal(new Set(ids).size, ids.length);
	});
});

describe("project data", () => {
	it("uses stable unique identifiers", () => {
		const ids = PROJECTS.map((project) => project.id);
		assert.equal(new Set(ids).size, ids.length);
	});

	it("links to project anchors on the projects route", () => {
		PROJECTS.forEach((project) => {
			assert.equal(project.href.startsWith(`${routes.projects}#project-`), true);
		});
	});
});

describe("navigation data", () => {
	it("keeps primary links aligned with valid app routes", () => {
		const routeSet = new Set<string>(Object.values(routes));

		[...HEADER_LINKS, ...FOOTER_NAV_LINKS, ...FOOTER_LEGAL_LINKS]
			.filter((link) => !link.href.startsWith("http"))
			.forEach((link) => {
				assert.equal(routeSet.has(link.href), true);
			});
	});
});

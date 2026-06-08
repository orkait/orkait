import { describe, expect, it } from "vitest";
import {
	buildKnowledgeContext,
	parseKnowledgeSections,
	selectRelevantSections,
} from "./knowledge";

const SAMPLE_KB = `# Orkait Knowledge Base

## What Orkait Is

Orkait is a product-first AI lab.

## Live Product

### Rustbox

- Status: live
- Summary: secure execution product for running untrusted code

## Coming Soon

### BooleanStack

- Status: coming soon
- Summary: software learning system

### Zen

- Status: coming soon
- Summary: AI-assisted interface creation product
`;

describe("knowledge helpers", () => {
	it("parses markdown into named sections", () => {
		const sections = parseKnowledgeSections(SAMPLE_KB);

			expect(sections.map((section) => section.title)).toEqual([
				"What Orkait Is",
				"Live Product",
				"Rustbox",
				"Coming Soon",
				"BooleanStack",
				"Zen",
			]);
	});

	it("selects the most relevant sections for a repo-specific query", () => {
		const sections = parseKnowledgeSections(SAMPLE_KB);
		const matches = selectRelevantSections(sections, "What is Rustbox used for?", 2);

		expect(matches.length).toBeGreaterThan(0);
		expect(matches[0]?.title).toBe("Rustbox");
	});

	it("builds a bounded context instead of returning the entire KB", () => {
		const sections = parseKnowledgeSections(SAMPLE_KB);
		const context = buildKnowledgeContext(sections, "Tell me about software learning", 1);

		expect(context).toContain("BooleanStack");
		expect(context).not.toContain("Zen");
		expect(context).not.toContain("# Orkait Knowledge Base");
	});

	it("does not select removed internal projects from the public product truth", () => {
		const sections = parseKnowledgeSections(SAMPLE_KB);
		const context = buildKnowledgeContext(sections, "Tell me about gatekeeper and unified-mcp", 2);

		expect(context.toLowerCase()).not.toContain("gatekeeper");
		expect(context.toLowerCase()).not.toContain("unified-mcp");
	});
});

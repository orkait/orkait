import { describe, expect, it } from "vitest";
import {
	buildKnowledgeContext,
	parseKnowledgeSections,
	selectRelevantSections,
} from "./knowledge";

const SAMPLE_KB = `# Orkait Knowledge Base

## Active Public Products And Infrastructure

### Rustbox

- Summary: kernel-enforced sandbox
- Why it matters: safe code execution

### graphstore

- Summary: agent memory database
- Why it matters: long-running memory for agents

## Coming Soon

### Zen

- Summary: AI-powered mockup and wireframe generation platform
`;

describe("knowledge helpers", () => {
	it("parses markdown into named sections", () => {
		const sections = parseKnowledgeSections(SAMPLE_KB);

		expect(sections.map((section) => section.title)).toEqual([
			"Active Public Products And Infrastructure",
			"Rustbox",
			"graphstore",
			"Coming Soon",
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
		const context = buildKnowledgeContext(sections, "Tell me about agent memory", 1);

		expect(context).toContain("graphstore");
		expect(context).not.toContain("Zen");
		expect(context).not.toContain("# Orkait Knowledge Base");
	});
});

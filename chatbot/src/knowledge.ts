export type KnowledgeSection = {
	title: string;
	content: string;
	level: number;
};

function tokenize(input: string): string[] {
	return input
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, " ")
		.split(/\s+/)
		.filter((token) => token.length > 1);
}

export function parseKnowledgeSections(markdown: string): KnowledgeSection[] {
	const lines = markdown.split(/\r?\n/);
	const sections: KnowledgeSection[] = [];
	let current: KnowledgeSection | null = null;

	for (const rawLine of lines) {
		const line = rawLine.trim();
		const headingMatch = line.match(/^(#{2,3})\s+(.+)$/);

		if (headingMatch) {
			if (current) {
				sections.push({
					...current,
					content: current.content.trim(),
				});
			}

			current = {
				title: headingMatch[2].trim(),
				level: headingMatch[1].length,
				content: "",
			};
			continue;
		}

		if (!current) {
			continue;
		}

		current.content += `${line}\n`;
	}

	if (current) {
		sections.push({
			...current,
			content: current.content.trim(),
		});
	}

	return sections.filter((section) => section.content.length > 0 || section.level === 2);
}

export function selectRelevantSections(
	sections: KnowledgeSection[],
	query: string,
	limit = 3
): KnowledgeSection[] {
	const queryTokens = tokenize(query);

	return sections
		.map((section) => {
			const haystack = `${section.title} ${section.content}`;
			const sectionTokens = new Set(tokenize(haystack));
			const exactTitleMatch = section.title.toLowerCase().includes(query.toLowerCase()) ? 5 : 0;
			const tokenScore = queryTokens.reduce(
				(score, token) => score + (sectionTokens.has(token) ? 1 : 0),
				0
			);

			return {
				section,
				score: exactTitleMatch + tokenScore,
			};
		})
		.filter(({ score }) => score > 0)
		.sort((left, right) => right.score - left.score)
		.slice(0, limit)
		.map(({ section }) => section);
}

export function buildKnowledgeContext(
	sections: KnowledgeSection[],
	query: string,
	limit = 3
): string {
	const relevantSections = selectRelevantSections(sections, query, limit);

	return relevantSections
		.map((section) => `## ${section.title}\n${section.content}`)
		.join("\n\n")
		.trim();
}

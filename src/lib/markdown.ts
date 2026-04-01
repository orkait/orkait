export type MarkdownBlock =
	| { type: "h1" | "h2" | "h3"; text: string }
	| { type: "paragraph"; text: string }
	| { type: "list"; items: string[] };

export function parseMarkdownBlocks(markdown: string): MarkdownBlock[] {
	const lines = markdown.split(/\r?\n/);
	const blocks: MarkdownBlock[] = [];
	let paragraphBuffer: string[] = [];
	let listBuffer: string[] = [];

	const flushParagraph = () => {
		if (paragraphBuffer.length === 0) {
			return;
		}

		blocks.push({
			type: "paragraph",
			text: paragraphBuffer.join(" "),
		});
		paragraphBuffer = [];
	};

	const flushList = () => {
		if (listBuffer.length === 0) {
			return;
		}

		blocks.push({
			type: "list",
			items: [...listBuffer],
		});
		listBuffer = [];
	};

	for (const rawLine of lines) {
		const line = rawLine.trim();

		if (line.length === 0) {
			flushParagraph();
			flushList();
			continue;
		}

		if (line.startsWith("### ")) {
			flushParagraph();
			flushList();
			blocks.push({ type: "h3", text: line.slice(4).trim() });
			continue;
		}

		if (line.startsWith("## ")) {
			flushParagraph();
			flushList();
			blocks.push({ type: "h2", text: line.slice(3).trim() });
			continue;
		}

		if (line.startsWith("# ")) {
			flushParagraph();
			flushList();
			blocks.push({ type: "h1", text: line.slice(2).trim() });
			continue;
		}

		if (line.startsWith("- ")) {
			flushParagraph();
			listBuffer.push(line.slice(2).trim());
			continue;
		}

		flushList();
		paragraphBuffer.push(line);
	}

	flushParagraph();
	flushList();

	return blocks;
}

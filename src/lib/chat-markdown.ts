function escapeHtml(text: string) {
	return text
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

function renderInline(text: string) {
	return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

export function renderChatMarkdown(markdown: string) {
	const lines = markdown.split(/\r?\n/);
	const parts: string[] = [];
	let paragraphBuffer: string[] = [];
	let listBuffer: string[] = [];

	const flushParagraph = () => {
		if (paragraphBuffer.length === 0) {
			return;
		}

		parts.push(`<p>${renderInline(paragraphBuffer.join(" "))}</p>`);
		paragraphBuffer = [];
	};

	const flushList = () => {
		if (listBuffer.length === 0) {
			return;
		}

		parts.push(
			`<ul>${listBuffer.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ul>`
		);
		listBuffer = [];
	};

	for (const rawLine of lines) {
		const line = rawLine.trim();

		if (!line) {
			flushParagraph();
			flushList();
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

	return parts.join("");
}

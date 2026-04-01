import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { parseMarkdownBlocks } from "@/lib/markdown";
import { createPageMetadata } from "@/config/metadata";
import { Section } from "@/components/shared/section";

export const metadata: Metadata = createPageMetadata(
	"Knowledge",
	"Curated public knowledge base covering Orkait's current public products, infrastructure, and upcoming product lines."
);

export default async function KnowledgePage() {
	const kbPath = path.join(process.cwd(), "chatbot", "knowledge", "index.md");
	const markdown = await readFile(kbPath, "utf8");
	const blocks = parseMarkdownBlocks(markdown);

	return (
		<Section
			className="bg-background text-foreground"
			horizontalMargin
			verticalMargin
		>
			<article className="mx-auto flex max-w-4xl flex-col gap-6">
				{blocks.map((block, index) => {
					if (block.type === "h1") {
						return (
							<h1
								key={`${block.type}-${index}`}
								className="text-title-2 font-bold leading-title-2 tracking-tight tablet:text-title-1 tablet:leading-title-1"
							>
								{block.text}
							</h1>
						);
					}

					if (block.type === "h2") {
						return (
							<h2
								key={`${block.type}-${index}`}
								className="pt-8 text-title-3 font-bold leading-title-3 tracking-tight tablet:text-subtitle tablet:leading-subtitle"
							>
								{block.text}
							</h2>
						);
					}

					if (block.type === "h3") {
						return (
							<h3
								key={`${block.type}-${index}`}
								className="pt-4 text-body-lg font-semibold leading-body-lg"
							>
								{block.text}
							</h3>
						);
					}

					if (block.type === "list") {
						return (
							<ul
								key={`${block.type}-${index}`}
								className="flex list-disc flex-col gap-2 pl-6 text-body leading-body text-muted-foreground"
							>
								{block.items.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						);
					}

					return (
						<p
							key={`${block.type}-${index}`}
							className="text-body leading-body text-muted-foreground"
						>
							{block.text}
						</p>
					);
				})}
			</article>
		</Section>
	);
}

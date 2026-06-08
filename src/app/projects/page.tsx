import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/sections/projects/projects-grid";
import { ProjectsMasonryGrid } from "@/components/sections/projects/projects-masonry-grid";
import { flag } from "@/config/feature-flag";
import { createPageMetadata } from "@/config/metadata";

export const metadata: Metadata = createPageMetadata(
	"Products",
	"Rustbox is live. BooleanStack and Zen are coming soon from the Orkait product lab."
);

export default function ProjectsPage() {
	if (flag.PROJECTS_LAYOUT === "masonry") {
		return <ProjectsMasonryGrid />;
	}

	return <ProjectsGrid />;
}

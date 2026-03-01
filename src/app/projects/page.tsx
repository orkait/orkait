import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/sections/projects/projects-grid";
import { ProjectsMasonryGrid } from "@/components/sections/projects/projects-masonry-grid";
import { flag } from "@/config/feature-flag";
import { createPageMetadata } from "@/config/metadata";

export const metadata: Metadata = createPageMetadata(
	"Projects",
	"Case studies covering strategy, product design, and engineering delivery."
);

export default function ProjectsPage() {
	if (flag.PROJECTS_LAYOUT === "masonry") {
		return <ProjectsMasonryGrid />;
	}

	return <ProjectsGrid />;
}

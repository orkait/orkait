import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/sections/projects/projects-grid";
import { ProjectsMasonryGrid } from "@/components/sections/projects/projects-masonry-grid";
import { flag } from "@/config/feature-flag";
import { createPageMetadata } from "@/config/metadata";

export const metadata: Metadata = createPageMetadata(
	"Projects",
	"Engineering case studies — dashboards, web apps, SaaS platforms, and scalable backend systems."
);

export default function ProjectsPage() {
	if (flag.PROJECTS_LAYOUT === "masonry") {
		return <ProjectsMasonryGrid />;
	}

	return <ProjectsGrid />;
}

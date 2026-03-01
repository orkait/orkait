import { ProjectsGrid } from "@/components/sections/projects/projects-grid";
import { ProjectsMasonryGrid } from "@/components/sections/projects/projects-masonry-grid";
import { flag } from "../../../flag";

export default function ProjectsPage() {
	if (flag.PROJECTS_LAYOUT === "masonry") {
		return <ProjectsMasonryGrid />;
	}

	return <ProjectsGrid />;
}

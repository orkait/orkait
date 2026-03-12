import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/data/projects";

export function ProjectsMasonryGrid() {
	return (
		<main className="bg-background px-4 pb-24 pt-16 phone:px-8 phone:pt-20 tablet:px-16 tablet:pt-24">
			<header className="mx-auto flex max-w-4xl flex-col items-center text-center">
				<h1 className="text-title-3 leading-title-3 font-bold tracking-tight text-foreground phone:text-title-2 phone:leading-title-2 tablet:text-title-1 tablet:leading-title-1">
					Professional services for modern businesses
				</h1>
				<p className="mt-6 text-body leading-body font-medium uppercase tracking-wide text-foreground phone:text-body-lg phone:leading-body-lg">
					(01) CASE STUDIES
				</p>
			</header>

			<section className="mx-auto mt-16 max-w-7xl columns-1 gap-6 phone:columns-2 tablet:columns-3 tablet:gap-8">
				{PROJECTS.map((project, index: number) => (
					<article key={project.id} className="mb-6 break-inside-avoid phone:mb-8">
						<Card className="overflow-hidden border border-border bg-background p-3 shadow-sm transition-all duration-300 hover:shadow-md phone:p-4">
							<div className="overflow-hidden rounded-sm">
								<Image
									src={project.image.src}
									alt={project.title}
									width={project.image.width}
									height={project.image.height}
									className="h-auto w-full transition-transform duration-500 hover:scale-105"
								/>
							</div>

							<div className="mt-4 flex flex-col gap-2 phone:mt-5 phone:gap-3">
								<p className="text-body leading-body font-medium text-muted-foreground">
									({String(index + 1).padStart(2, "0")}) CASE STUDY
								</p>
								<h2 className="text-subtitle leading-subtitle font-bold tracking-tight text-foreground">
									{project.title}
								</h2>
								<p className="text-body leading-body font-medium text-foreground phone:text-body-lg phone:leading-body-lg">
									{project.services}
								</p>
								<Button asChild variant="outline" size="sm" className="mt-1 w-fit">
									<a href={project.href} aria-label={`View ${project.title} case study`}>
										View case study
										<ArrowUpRight />
									</a>
								</Button>
							</div>
						</Card>
					</article>
				))}
			</section>
		</main>
	);
}

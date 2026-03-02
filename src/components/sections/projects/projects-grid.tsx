"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LENIS_SCROLL_OFFSET } from "@/config/scroll";
import { PROJECTS } from "./projects-data";

export function ProjectsGrid() {
	const [activeIndex, setActiveIndex] = useState(0);
	const sectionRefs = useRef<Array<HTMLElement | null>>([]);

	const updateActiveProject = useCallback(() => {
		if (typeof window === "undefined") {
			return;
		}

		const viewportAnchor = window.innerHeight * 0.45;
		let closestIndex = 0;
		let closestDistance = Number.POSITIVE_INFINITY;

		sectionRefs.current.forEach((section, index) => {
			if (!section) {
				return;
			}

			const rect = section.getBoundingClientRect();
			const sectionAnchor = rect.top + rect.height * 0.5;
			const distance = Math.abs(sectionAnchor - viewportAnchor);

			if (distance < closestDistance) {
				closestDistance = distance;
				closestIndex = index;
			}
		});

		setActiveIndex((previousIndex) =>
			previousIndex === closestIndex ? previousIndex : closestIndex
		);
	}, []);

	const lenis = useLenis(
		() => {
			updateActiveProject();
		},
		[updateActiveProject]
	);

	useEffect(() => {
		window.addEventListener("resize", updateActiveProject);
		window.addEventListener("scroll", updateActiveProject, { passive: true });

		return () => {
			window.removeEventListener("resize", updateActiveProject);
			window.removeEventListener("scroll", updateActiveProject);
		};
	}, [updateActiveProject]);

	const handleProjectJump = useCallback(
		(index: number) => {
			const section = sectionRefs.current[index];

			if (!section) {
				return;
			}

			if (lenis) {
				lenis.scrollTo(section, {
					offset: LENIS_SCROLL_OFFSET,
					duration: 1.1,
				});
				return;
			}

			section.scrollIntoView({ behavior: "smooth", block: "start" });
		},
		[lenis]
	);

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

			<section
				className="mx-auto mt-12 flex w-full max-w-7xl gap-8 phone:mt-16 tablet:gap-10 laptop:gap-12"
				aria-label="Project showcase"
			>
				<nav
					className="hidden tablet:sticky tablet:top-28 tablet:flex tablet:h-fit tablet:w-56 tablet:flex-col tablet:gap-2"
					aria-label="Project navigation"
				>
					{PROJECTS.map((project, index) => {
						const isActive = index === activeIndex;

						return (
							<button
								key={project.id}
								type="button"
								onClick={() => handleProjectJump(index)}
								className={cn(
									"flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition-all",
									isActive
										? "border-foreground bg-primary text-primary-foreground"
										: "border-border bg-background text-foreground hover:bg-muted"
								)}
							>
								<span className="text-body leading-body font-medium">
									({String(index + 1).padStart(2, "0")})
								</span>
								<span className="text-body leading-body font-medium">{project.title}</span>
							</button>
						);
					})}
				</nav>

				<div className="flex-1 space-y-12 phone:space-y-16 tablet:space-y-20">
					{PROJECTS.map((project, index) => {
						const isActive = index === activeIndex;

						return (
							<article
								id={`project-${project.id}`}
								key={project.id}
								ref={(element) => {
									sectionRefs.current[index] = element;
								}}
								className="scroll-mt-24"
							>
								<div className="min-h-screen flex items-center">
									<Card
										className={cn(
											"w-full overflow-hidden border border-border bg-background p-4 transition-all duration-500 phone:p-6 tablet:p-8",
											isActive
												? "opacity-100 shadow-md"
												: "opacity-60 tablet:opacity-50"
										)}
									>
										<div className="grid gap-6 tablet:grid-cols-2 tablet:items-end">
											<div className="overflow-hidden rounded-lg bg-muted">
												<Image
													src={project.image.src}
													alt={project.title}
													width={project.image.width}
													height={project.image.height}
													className={cn(
														"h-auto w-full transition-transform duration-500",
														isActive ? "scale-100" : "scale-105"
													)}
												/>
											</div>

											<div className="flex flex-col gap-4 tablet:gap-5">
												<p className="text-body leading-body font-medium text-muted-foreground">
													({String(index + 1).padStart(2, "0")}) CASE STUDY
												</p>
												<h2 className="text-title-3 leading-title-3 font-bold tracking-tight text-foreground phone:text-title-2 phone:leading-title-2">
													{project.title}
												</h2>
												<p className="text-body leading-body font-medium text-foreground phone:text-body-lg phone:leading-body-lg">
													{project.services}
												</p>
												<Button
													asChild
													variant={isActive ? "default" : "outline"}
													size="lg"
													className="w-fit"
												>
													<a href={project.href} aria-label={`View ${project.title} case study`}>
														View case study
														<ArrowUpRight />
													</a>
												</Button>
											</div>
										</div>
									</Card>
								</div>
							</article>
						);
					})}
				</div>
			</section>
		</main>
	);
}

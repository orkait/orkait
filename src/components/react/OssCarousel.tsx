import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from "@/components/react/ui/carousel";
import type { OSSProject } from "@/lib/types";

interface Props {
	projects: OSSProject[];
}

export function OssCarousel({ projects }: Props) {
	const reduce = useReducedMotion();
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [autoplay] = useState(() =>
		Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true }),
	);

	useEffect(() => {
		if (!api) return;
		setCurrent(api.selectedScrollSnap());
		const onSelect = () => setCurrent(api.selectedScrollSnap());
		api.on("select", onSelect);
		return () => {
			api.off("select", onSelect);
		};
	}, [api]);

	return (
		<div className="flex flex-col gap-5">
			<Carousel
				setApi={setApi}
				opts={{ loop: projects.length > 1, align: "start" }}
				plugins={reduce ? undefined : [autoplay]}
				aria-label="Open-source projects"
			>
				<CarouselContent>
					{projects.map((project) => {
						const tags = project.tags.split(",").map((t) => t.trim());
						return (
							<CarouselItem key={project.id}>
								<article className="flex h-full flex-col gap-6 rounded-[20px] border border-on-tile/15 bg-on-tile/[0.04] p-7 tablet:p-8">
									<div className="flex items-baseline justify-between gap-4">
										<h3 className="text-subtitle font-extrabold tracking-[-0.02em]">
											{project.title}
										</h3>
										<span className="font-mono text-[13px] uppercase tracking-[0.14em] text-on-tile/55">
											{project.language}
										</span>
									</div>

									<p className="text-body-lg leading-[28px] text-on-tile/75">
										{project.description}
									</p>

									<div className="flex flex-wrap gap-2">
										{tags.map((tag) => (
											<span
												key={tag}
												className="rounded-full border border-on-tile/20 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-on-tile/70"
											>
												{tag}
											</span>
										))}
									</div>

									<a
										href={project.href}
										target="_blank"
										rel="noopener noreferrer"
										className="group mt-auto inline-flex h-12 w-fit items-center gap-2 rounded-lg bg-signature-deep px-6 text-base font-bold text-on-signature transition-[transform,background-color] duration-200 hover:bg-signature-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-tile focus-visible:ring-offset-2 focus-visible:ring-offset-tile active:scale-[0.98]"
									>
										View on GitHub
										<svg
											className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2.2"
											strokeLinecap="round"
											strokeLinejoin="round"
											aria-hidden="true"
										>
											<path d="M7 17 17 7M9 7h8v8" />
										</svg>
									</a>
								</article>
							</CarouselItem>
						);
					})}
				</CarouselContent>
			</Carousel>

			{projects.length > 1 && (
				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center gap-2" role="tablist" aria-label="Select project">
						{projects.map((p, i) => (
							<button
								key={p.id}
								type="button"
								role="tab"
								onClick={() => api?.scrollTo(i)}
								aria-label={`Show ${p.title}`}
								aria-selected={i === current}
								className="group flex h-11 items-center focus-visible:outline-none"
							>
								<span
									className={`h-1.5 rounded-full transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-on-tile group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-tile ${
										i === current
											? "w-8 bg-signature"
											: "w-3 bg-on-tile/25 group-hover:bg-on-tile/45"
									}`}
								/>
							</button>
						))}
					</div>
					<span className="font-mono text-[11px] uppercase tracking-[0.16em] text-on-tile/40">
						Drag to explore
					</span>
				</div>
			)}
		</div>
	);
}

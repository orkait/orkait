"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { PRICING_PLANS, type PricingPlan } from "./pricing-data";

type PlanTone = "ghost" | "default" | "featured";

function distanceFromActive(index: number, activeIndex: number, total: number) {
	return Math.min(
		Math.abs(index - activeIndex),
		Math.abs(index - activeIndex + total),
		Math.abs(index - activeIndex - total)
	);
}

function toneFromDistance(distance: number): PlanTone {
	if (distance === 0) return "featured";
	if (distance === 1) return "default";
	return "ghost";
}

function PricingPlanCard({ plan, tone }: { plan: PricingPlan; tone: PlanTone }) {
	const isFeatured = tone === "featured";
	const isGhost = tone === "ghost";

	return (
		<Card
			className={cn(
				"relative overflow-hidden border border-border rounded-lg shadow-2xl transition-all duration-500",
				isFeatured
					? "w-full max-w-[436px] bg-[linear-gradient(180deg,var(--color-pricing-active-start)_0%,var(--color-pricing-active-end)_100%)] text-primary-foreground"
					: "w-full max-w-[388px] bg-[linear-gradient(180deg,var(--color-pricing-inactive-start)_0%,var(--color-pricing-inactive-end)_100%)] text-foreground",
				isGhost && "opacity-35"
			)}
		>
			{isFeatured ? (
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/15 to-transparent" />
			) : null}

			<CardContent
				className={cn(
					"relative flex flex-col items-center px-6 pb-6 pt-8 text-center",
					isFeatured ? "h-[720px] max-h-[720px]" : "min-h-[644px]"
				)}
			>
				<h2
					className={cn(
						"font-bold tracking-tight",
						isFeatured
							? "text-title-2 leading-title-2"
							: "text-title-3 leading-title-3"
					)}
				>
					{plan.title}
				</h2>

				<p
					className={cn(
						"mt-6 font-medium",
						isFeatured
							? "text-body-lg leading-body-lg text-primary-foreground/80"
							: "text-body leading-body text-muted-foreground"
					)}
				>
					{plan.pricePrefix}
				</p>

				<p
					className={cn(
						"mt-1 font-bold tracking-tight",
						isFeatured
							? "text-title-2 leading-title-2"
							: "text-title-3 leading-title-3"
					)}
				>
					{plan.price}
				</p>

				<p
					className={cn(
						"mt-1 font-medium",
						isFeatured
							? "text-body-lg leading-body-lg text-primary-foreground/80"
							: "text-body leading-body text-muted-foreground"
					)}
				>
					{plan.paymentType}
				</p>

				<p
					className={cn(
						"mt-7 max-w-sm font-medium",
						isFeatured ? "text-body-lg leading-body-lg" : "text-body leading-body"
					)}
				>
					{plan.description}
				</p>

				<ul className="mt-8 flex w-full flex-col gap-3 text-left">
					{plan.features.map((feature) => (
						<li key={feature} className="flex items-start gap-3">
							<CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
							<span
								className={cn(
									"font-medium",
									isFeatured ? "text-body-lg leading-body-lg" : "text-body leading-body"
								)}
							>
								{feature}
							</span>
						</li>
					))}
				</ul>

				<Button
					type="button"
					size="lg"
					className={cn(
						"mt-auto w-full",
						isFeatured
							? "bg-background text-foreground hover:bg-background/90"
							: "bg-foreground text-primary-foreground hover:bg-foreground/90"
					)}
				>
					Contact Sales
				</Button>
			</CardContent>
		</Card>
	);
}

export function PricingTable() {
	const [api, setApi] = React.useState<CarouselApi>();
	const [activeIndex, setActiveIndex] = React.useState(2);

	React.useEffect(() => {
		if (!api) return;

		const onChange = () => setActiveIndex(api.selectedScrollSnap());
		onChange();

		api.on("select", onChange);
		api.on("reInit", onChange);

		return () => {
			api.off("select", onChange);
			api.off("reInit", onChange);
		};
	}, [api]);

	return (
		<section className="py-16 phone:py-20 tablet:py-24">
			<header className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center phone:px-8">
				<h1 className="text-title-1 leading-title-1 font-bold tracking-tight text-foreground laptop:text-heading laptop:leading-heading">
					Professional services for modern businesses
				</h1>
				<p className="mt-4 max-w-2xl text-body-lg leading-body-lg font-medium text-muted-foreground tablet:text-subtitle tablet:leading-subtitle">
					From web applications to custom software solutions, we deliver quality
					services tailored to your business needs.
				</p>
			</header>

			<div className="mt-12 overflow-hidden phone:mt-16">
				<Carousel
					setApi={setApi}
					opts={{
						align: "center",
						loop: true,
						containScroll: false,
						startIndex: 2,
					}}
					className="w-full"
				>
					<CarouselContent className="ml-0 items-end gap-0 py-6 phone:py-10">
						{PRICING_PLANS.map((plan, index) => {
							const tone = toneFromDistance(
								distanceFromActive(index, activeIndex, PRICING_PLANS.length)
							);

							return (
								<CarouselItem
									key={plan.id}
									className="basis-[94%] pl-0 phone:basis-[82%] tablet:basis-auto"
								>
									<div
										className={cn(
											"flex justify-center transition-transform duration-500",
											tone === "featured" && "tablet:scale-100",
											tone === "default" && "tablet:scale-[0.95]",
											tone === "ghost" && "tablet:scale-[0.88]"
										)}
									>
										<PricingPlanCard plan={plan} tone={tone} />
									</div>
								</CarouselItem>
							);
						})}
					</CarouselContent>
				</Carousel>
			</div>

			<p className="mx-auto mt-12 max-w-2xl px-4 text-center text-body-lg leading-body-lg font-medium text-muted-foreground">
				All pricing is customizable based on your specific requirements. Contact us
				for a detailed quote tailored to your project.
			</p>
		</section>
	);
}

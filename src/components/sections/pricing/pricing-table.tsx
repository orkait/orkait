import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PRICING_PLANS } from "@/data/pricing";
import type { PricingPlan } from "@/types";

function PricingPlanCard({ plan }: { plan: PricingPlan }) {
	const isFeatured = plan.tone === "featured";

	return (
		<Card
			className={cn(
				"h-[586px] w-full max-w-[400px] overflow-hidden rounded-none border border-border shadow-2xl",
				isFeatured
					? "bg-[linear-gradient(180deg,var(--color-pricing-active-start)_0%,var(--color-pricing-active-end)_100%)] text-primary-foreground"
					: "bg-background text-foreground"
			)}
		>
			<CardContent className="flex h-full flex-col px-8 pb-6 pt-7 text-left">
				<h2 className="text-title-3 leading-title-3 font-bold tracking-tight">
					{plan.title}
				</h2>

				<p
					className={cn(
						"mt-1 max-w-xs font-medium",
						isFeatured
							? "text-body-lg leading-body-lg text-primary-foreground"
							: "text-body-lg leading-body-lg text-foreground"
					)}
				>
					{plan.description}
				</p>

				<div className="mt-8">
					<p
						className={cn(
							"text-body leading-body font-medium",
							isFeatured ? "text-primary-foreground/85" : "text-muted-foreground"
						)}
					>
						{plan.pricePrefix}
					</p>
					<p className="mt-1 text-title-2 leading-title-2 font-bold tracking-tight">
						{plan.price}
					</p>
					<p
						className={cn(
							"mt-1 text-body leading-body font-medium",
							isFeatured ? "text-primary-foreground/85" : "text-foreground"
						)}
					>
						{plan.paymentType}
					</p>
				</div>

				<ul className="mt-10 flex flex-col gap-3">
					{plan.features.map((feature) => (
						<li key={feature} className="flex items-start gap-3">
							<CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
							<span
								className={cn(
									"text-body leading-body font-medium",
									isFeatured ? "text-primary-foreground" : "text-foreground"
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
						"mt-auto h-10 w-full",
						isFeatured
							? "bg-background text-foreground hover:bg-background/90"
							: "border border-foreground bg-background text-foreground hover:bg-muted"
					)}
				>
					{plan.ctaLabel}
				</Button>
			</CardContent>
		</Card>
	);
}

export function PricingTable() {
	return (
		<section className="py-12 phone:py-16">
			<div className="mx-auto grid max-w-[1240px] grid-cols-1 place-items-center gap-6 px-4 tablet:grid-cols-3 tablet:gap-4 laptop:gap-6">
				{PRICING_PLANS.map((plan) => (
					<PricingPlanCard key={plan.id} plan={plan} />
				))}
			</div>
		</section>
	);
}

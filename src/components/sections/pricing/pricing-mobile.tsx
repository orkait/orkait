import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { PRICING_PLANS } from "@/data/pricing";
import { Section } from "@/components/shared/section";
import Link from "next/link";

export function PricingMobile() {
  return (
    <Section className="block tablet:hidden w-full pt-16 pb-20 px-5 flex flex-col font-sans bg-background">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-[24px] font-bold leading-[30px] text-foreground mb-4 uppercase">
          Professional services for<br />
          modern businesses
        </h1>
        <p className="text-[14px] font-medium leading-[20px] text-muted-foreground max-w-[281px]">
          From web applications to custom software solutions, we deliver quality services tailored to your business needs.
        </p>
      </div>

      <div className="flex flex-col gap-8 items-center">
        {PRICING_PLANS.map((plan) => {
          const isFeatured = plan.tone === "featured";
          
          return (
            <div
              key={plan.id}
              className={`w-full max-w-[341px] flex flex-col p-8 rounded-lg border border-transparent shadow-md ${
                isFeatured
                  ? "bg-gradient-to-b from-[#3b3b3b] to-black text-white shadow-[5.413px_5.413px_12.681px_0px_rgba(0,0,0,0.25)]"
                  : "bg-gradient-to-b from-[#f6f6f6] to-[#e6e6e6] text-black"
              }`}
            >
              <div className="flex flex-col items-center text-center mb-6">
                <h2 className="text-[24px] font-bold leading-[30px] mb-2">{plan.title}</h2>
                <span className="text-[12px] opacity-70 mb-1">{plan.pricePrefix}</span>
                <span className="text-[32px] font-bold leading-none mb-1">{plan.price}</span>
                <span className="text-[12px] opacity-70 mb-4">{plan.paymentType}</span>
                <p className="text-[14px] font-medium leading-[20px] opacity-80 min-h-[40px]">
                  {plan.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className={`size-4 shrink-0 mt-0.5 ${isFeatured ? "text-white" : "text-black"}`} />
                    <span className="text-[12px] font-medium leading-[18px] opacity-90">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                className={`w-full h-[36px] rounded-md text-[14px] font-medium transition-colors ${
                  isFeatured
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-black text-white hover:bg-black/90"
                }`}
              >
                <Link href={plan.ctaHref}>{plan.ctaLabel}</Link>
              </Button>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

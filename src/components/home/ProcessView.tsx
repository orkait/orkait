import type { RefCallback } from "react";
import { cn } from "@/lib/utils";

type FeatureCard = {
    num: string;
    title: string;
    description: string;
    area: string;
};

const FEATURES: FeatureCard[] = [
    {
        num: "(01)",
        title: "Secure",
        description:
            "Orkait follows industry best practices and security standards. Rest easy knowing your digital solutions are built with security as a priority.",
        area: "card1",
    },
    {
        num: "(02)",
        title: "High-Performance",
        description:
            "Engineered for speed and efficiency. We build systems that handle millions of requests with sub-millisecond latency, ensuring zero compromises.",
        area: "card2",
    },
    {
        num: "(03)",
        title: "Quality Assured",
        description:
            "Orkait ensures quality through rigorous testing and verification processes. Deploy new solutions with confidence and reliability.",
        area: "card3",
    },
    {
        num: "(04)",
        title: "Simple",
        description:
            "Orkait simplifies complex development processes. Get started quickly with our streamlined approach to web apps and software solutions.",
        area: "card4",
    },
    {
        num: "(05)",
        title: "Customizable",
        description:
            "Tailored solutions to meet your specific requirements. Orkait customizes every aspect of your project to satisfy your unique needs.",
        area: "card5",
    },
    {
        num: "(06)",
        title: "Plug and Play",
        description:
            "Seamless integration and deployment solutions. Get started quickly and easily with Orkait's streamlined service delivery.",
        area: "card6",
    },
    {
        num: "(07)",
        title: "Enterprise Ready",
        description:
            "Orkait provides enterprise-grade solutions for scaling and deployment. Trusted by small enterprises for reliable digital transformation.",
        area: "card7",
    },
];

type ProcessViewProps = {
    sectionRef: RefCallback<HTMLElement>;
    gridRef: RefCallback<HTMLDivElement>;
    taglineRef: RefCallback<HTMLDivElement>;
    setCardRef: (index: number) => RefCallback<HTMLDivElement>;
    activeIndex: number;
};

export function ProcessView({
    sectionRef,
    gridRef,
    taglineRef,
    setCardRef,
    activeIndex,
}: ProcessViewProps) {
    return (
        <section ref={sectionRef} className="mt-16 laptop:mt-32 transform-gpu will-change-transform">
            <div ref={gridRef} className="process-grid gap-x-16">
                {FEATURES.map((feature, index) => {
                    const isActive = index <= activeIndex;

                    return (
                        <div
                            key={feature.num}
                            ref={setCardRef(index)}
                            className={cn(
                                "flex flex-col gap-2 py-10 border-b border-border transform-gpu will-change-transform transition-colors duration-300",
                                isActive ? "opacity-100" : "opacity-45"
                            )}
                            style={{ gridArea: feature.area }}
                        >
                            <p className="text-muted-foreground font-medium text-subtitle leading-subtitle">
                                {feature.num}
                            </p>
                            <p className="text-foreground font-medium text-subtitle leading-subtitle">
                                {feature.title}
                            </p>
                            <p className="text-muted-foreground font-normal text-body leading-body">
                                {feature.description}
                            </p>
                        </div>
                    );
                })}

                <div ref={taglineRef} className="flex items-center transform-gpu will-change-transform" style={{ gridArea: "tagline" }}>
                    <h2 className="text-foreground font-bold text-heading leading-heading tracking-tight">
                        Seamless process, optimal results
                    </h2>
                </div>
            </div>
        </section>
    );
}


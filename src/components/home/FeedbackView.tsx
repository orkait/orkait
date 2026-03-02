"use client";

import type { RefCallback } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import FeedbackCard, { type FeedbackCardProps } from "./FeedbackCard";
import { cn } from "@/lib/utils";

const AUTOPLAY_DELAY_MS = 3500;

const TESTIMONIALS: FeedbackCardProps[] = [
    {
        quote:
            "Orkait transformed our web application development process. Their expertise in crafting digital experiences helped us deliver a product that truly inspires our users. The team's attention to detail and commitment to quality is unmatched.",
        name: "Sarah K.",
        company: "TechVentures",
    },
    {
        quote:
            "Working with Orkait for our software solutions was a game-changer. They understood our requirements perfectly and delivered scalable solutions that exceeded our expectations. Their deployment strategies helped us grow seamlessly.",
        name: "Manuel H.",
        company: "Immobilien",
    },
    {
        quote:
            "Orkait's scaling and deployment solutions enabled our small enterprise to compete with larger players. Their comprehensive approach to enterprise scaling transformed our operational capabilities and opened new growth opportunities.",
        name: "Isabelle T.",
        company: "Kultur",
    },
    {
        quote:
            "The team at Orkait built our SaaS platform from scratch with remarkable speed and precision. Their cloud-native approach ensured we could scale from day one. I'd recommend them to any founder serious about infrastructure.",
        name: "James R.",
        company: "Foundry Labs",
    },
    {
        quote:
            "Orkait's dev products saved us months of engineering time. Their plug-and-play integrations fit perfectly into our existing stack, and the support throughout was exceptional. A true technology partner.",
        name: "Priya M.",
        company: "Datasync",
    },
];

type FeedbackViewProps = {
    sectionRef: RefCallback<HTMLElement>;
    headerRef: RefCallback<HTMLDivElement>;
    carouselRef: RefCallback<HTMLDivElement>;
};

export function FeedbackView({ sectionRef, headerRef, carouselRef }: FeedbackViewProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [isInitialized, setIsInitialized] = useState(false);

    const plugin = useRef(
        Autoplay({ delay: AUTOPLAY_DELAY_MS, stopOnInteraction: false, stopOnMouseEnter: true })
    );

    useEffect(() => {
        if (!api) {
            return;
        }

        const handleReInit = () => setIsInitialized(true);
        api.on("reInit", handleReInit);

        if (api.canScrollNext() || api.canScrollPrev() || api.scrollSnapList().length > 0) {
            setIsInitialized(true);
        }

        return () => {
            api.off("reInit", handleReInit);
        };
    }, [api]);

    return (
        <section ref={sectionRef} className="mt-16 laptop:mt-32 py-12 transform-gpu will-change-transform">
            <div ref={headerRef} className="flex flex-col gap-6 mb-10 transform-gpu will-change-transform">
                <p className="text-foreground font-medium text-body-lg leading-body-lg">
                    (05) FEEDBACK
                </p>
                <h2 className="text-foreground font-medium text-heading leading-heading tracking-tight">
                    Clients
                    <br />
                    Trust Us!
                </h2>
            </div>

            <div
                ref={carouselRef}
                className={cn(
                    "relative overflow-hidden transition-opacity duration-700 ease-in-out transform-gpu will-change-transform",
                    isInitialized ? "opacity-100" : "opacity-0"
                )}
            >
                <div className="fade-edge-left z-10" />
                <div className="fade-edge-right z-10" />

                <Carousel
                    setApi={setApi}
                    opts={{ loop: true, align: "center", containScroll: false }}
                    plugins={[plugin.current]}
                    className="w-full"
                >
                    <CarouselContent className="-ml-6" viewportClassName="overflow-visible">
                        {TESTIMONIALS.map((testimonial, index) => (
                            <CarouselItem key={index} className="pl-6 basis-auto">
                                <FeedbackCard {...testimonial} width={580} height={530} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}


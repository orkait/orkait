"use client";

import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, useEffect } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import FeedbackCard, { type FeedbackCardProps } from "./FeedbackCard";
import { cn } from "@/lib/utils";

import { TESTIMONIALS } from "@/constants";
import { useCarouselInit } from "@/hooks/useCarouselInit";

/** ← Change this to control how long each card is shown (milliseconds) */
const AUTOPLAY_DELAY_MS = 3500;

const Feedback = () => {
    const [api, setApi] = useState<CarouselApi>();
    const isInitialized = useCarouselInit(api);
    
    const plugin = useRef(
        Autoplay({ delay: AUTOPLAY_DELAY_MS, stopOnInteraction: false, stopOnMouseEnter: true })
    );

    return (
        <section className="mt-16 laptop:mt-32 py-12">
            {/* Header */}
            <div className="flex flex-col gap-6 mb-10">
                <p className="text-foreground font-medium text-body-lg leading-body-lg">
                    (05) FEEDBACK
                </p>
                <h2 className="text-foreground font-medium text-heading leading-heading tracking-tight">
                    Clients<br />Trust Us!
                </h2>
            </div>

            {/* Carousel — partial left · full centre · partial right */}
            <div className={cn(
                "relative overflow-hidden transition-opacity duration-700 ease-in-out",
                isInitialized ? "opacity-100" : "opacity-0"
            )}>
                <div className="fade-edge-left z-10" />
                <div className="fade-edge-right z-10" />

                <Carousel
                    setApi={setApi}
                    opts={{ loop: true, align: "center", containScroll: false }}
                    plugins={[plugin.current]}
                    className="w-full"
                >
                    <CarouselContent className="-ml-6" viewportClassName="overflow-visible">
                        {TESTIMONIALS.map((t, i) => (
                            <CarouselItem key={i} className="pl-6 basis-auto">
                                <FeedbackCard {...t} width={580} height={530} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
};

export default Feedback;

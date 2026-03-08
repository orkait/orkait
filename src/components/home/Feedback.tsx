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
        <section className="mt-16 base:mt-32 pt-12 pb-0 tablet:py-12">
            {/* Header */}
            <div className="flex flex-col gap-[8px] tablet:gap-6 mb-[24px] tablet:mb-10">
                <p className="text-foreground font-medium text-[14px] leading-[20px] tablet:text-body-lg tablet:leading-body-lg">
                    (04) FEEDBACK
                </p>
                <h2 className="text-foreground font-bold tablet:font-medium text-[24px] leading-[30px] tablet:text-heading tablet:leading-heading tracking-tight">
                    <span className="tablet:hidden">Clients Trust Us!</span>
                    <span className="hidden tablet:block">Clients<br />Trust Us!</span>
                </h2>
            </div>

            {/* Carousel — partial left · full centre · partial right */}
            <div className={cn(
                "relative overflow-hidden transition-opacity duration-700 ease-in-out",
                isInitialized ? "opacity-100" : "opacity-0"
            )}>
                <div className="fade-edge-left z-10 hidden tablet:block" />
                <div className="fade-edge-right z-10 hidden tablet:block" />

                <Carousel
                    setApi={setApi}
                    opts={{ loop: true, align: "center", containScroll: false }}
                    plugins={[plugin.current]}
                    className="w-full"
                >
                    <CarouselContent className="-ml-[16px] tablet:-ml-6" viewportClassName="overflow-visible">
                        {TESTIMONIALS.map((t, i) => (
                            <CarouselItem key={i} className="pl-[16px] tablet:pl-6 basis-[80%] tablet:basis-[580px] max-w-full">
                                <FeedbackCard {...t} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
};

export default Feedback;

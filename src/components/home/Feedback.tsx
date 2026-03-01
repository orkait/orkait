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

/** ← Change this to control how long each card is shown (milliseconds) */
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

const Feedback = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [isInitialized, setIsInitialized] = useState(false);
    
    const plugin = useRef(
        Autoplay({ delay: AUTOPLAY_DELAY_MS, stopOnInteraction: false, stopOnMouseEnter: true })
    );

    useEffect(() => {
        if (!api) return;
        
        // Embla API is available, but we want to ensure it's actually initialized
        api.on("reInit", () => setIsInitialized(true));
        
        // If it's already initialized by the time this effect runs
        if (api.canScrollNext() || api.canScrollPrev() || api.scrollSnapList().length > 0) {
            setIsInitialized(true);
        }
    }, [api]);

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

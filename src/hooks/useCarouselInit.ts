import { useState, useEffect } from "react";
import { type CarouselApi } from "@/components/ui/carousel";

export function useCarouselInit(api: CarouselApi | undefined) {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!api) return;
        
        // Embla API is available, but we want to ensure it's actually initialized
        api.on("reInit", () => setIsInitialized(true));
        
        // If it's already initialized by the time this effect runs
        if (api.canScrollNext() || api.canScrollPrev() || api.scrollSnapList().length > 0) {
            setIsInitialized(true);
        }
    }, [api]);

    return isInitialized;
}

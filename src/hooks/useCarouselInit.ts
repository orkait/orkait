import { useState, useEffect } from "react";
import { type CarouselApi } from "@/components/ui/carousel";

export function useCarouselInit(api: CarouselApi | undefined) {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!api) return;
        
        api.on("reInit", () => setIsInitialized(true));
        
        if (api.canScrollNext() || api.canScrollPrev() || api.scrollSnapList().length > 0) {
            setIsInitialized(true);
        }
    }, [api]);

    return isInitialized;
}

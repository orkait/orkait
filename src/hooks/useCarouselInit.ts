import { useSyncExternalStore, useCallback, useRef, useEffect } from "react";
import { type CarouselApi } from "@/components/ui/carousel";

export function useCarouselInit(api: CarouselApi | undefined) {
    const readyRef = useRef(false);
    const listenersRef = useRef(new Set<() => void>());

    const subscribe = useCallback((onStoreChange: () => void) => {
        listenersRef.current.add(onStoreChange);
        return () => { listenersRef.current.delete(onStoreChange); };
    }, []);

    const getSnapshot = useCallback(() => readyRef.current, []);

    useEffect(() => {
        if (!api) return;

        const markReady = () => {
            if (readyRef.current) return;
            readyRef.current = true;
            listenersRef.current.forEach((fn) => fn());
        };

        api.on("reInit", markReady);

        if (api.canScrollNext() || api.canScrollPrev() || api.scrollSnapList().length > 0) {
            markReady();
        }
    }, [api]);

    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

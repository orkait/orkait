"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function ScrollProgress() {
    const barRef = useRef<HTMLDivElement | null>(null);

    useLenis(({ scroll, limit, progress }) => {
        const bar = barRef.current;

        if (!bar) {
            return;
        }

        const ratio =
            typeof progress === "number" && Number.isFinite(progress)
                ? progress
                : limit > 0
                  ? scroll / limit
                  : 0;

        bar.style.transform = `scaleX(${clamp(ratio, 0, 1).toFixed(4)})`;
    });

    return (
        <div className="pointer-events-none fixed left-0 top-0 z-[70] h-1 w-full bg-background/30 backdrop-blur-sm">
            <div ref={barRef} className="h-full origin-left scale-x-0 bg-primary transform-gpu will-change-transform" />
        </div>
    );
}


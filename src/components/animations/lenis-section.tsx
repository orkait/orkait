"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";

type LenisSectionProps = {
    children: React.ReactNode;
    className?: string;
    distance?: number;
    scaleDepth?: number;
    minOpacity?: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function LenisSection({
    children,
    className,
    distance = 64,
    scaleDepth = 0.06,
    minOpacity = 0.35,
}: LenisSectionProps) {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useLenis(() => {
        const element = sectionRef.current;

        if (!element || typeof window === "undefined") {
            return;
        }

        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;

        const relativeCenter = (rect.top + rect.height * 0.5 - viewportHeight * 0.5) / viewportHeight;
        const clampedCenter = clamp(relativeCenter, -1.2, 1.2);

        const visibility = clamp(1 - Math.abs(clampedCenter), 0, 1);
        const translateY = -clampedCenter * distance;
        const scale = 1 - (1 - visibility) * scaleDepth;
        const opacity = minOpacity + visibility * (1 - minOpacity);

        element.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
        element.style.opacity = opacity.toFixed(3);
    });

    return (
        <div ref={sectionRef} className={cn("transform-gpu will-change-transform", className)}>
            {children}
        </div>
    );
}


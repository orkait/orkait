"use client";

import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import {
    easeInOutCubic,
    easeOutCubic,
    easeOutQuad,
    mix,
    phase,
    useLenisTimeline,
    type LenisTimelineFrame,
} from "@/hooks/use-lenis-timeline";
import { TIMELINE_MAIN_ENTER, TIMELINE_MAIN_EXIT } from "@/config/timeline";

type LenisSectionProps = {
    children: React.ReactNode;
    className?: string;
    distance?: number;
    scaleDepth?: number;
    minOpacity?: number;
    enter?: number;
    exit?: number;
};

export function LenisSection({
    children,
    className,
    distance = 64,
    scaleDepth = 0.06,
    minOpacity = 0.35,
    enter = TIMELINE_MAIN_ENTER,
    exit = TIMELINE_MAIN_EXIT,
}: LenisSectionProps) {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    const updateTimeline = useCallback(
        ({ progress, effectIndex, direction, momentum, anticipation }: LenisTimelineFrame) => {
            const element = sectionRef.current;

            if (!element) {
                return;
            }

            const isRewind = direction === "rewind";
            const introEase = isRewind ? easeOutQuad : easeOutCubic;

            const introP = introEase(phase(progress, 0, 0.35));
            const outroP = easeInOutCubic(phase(progress, 0.72, 1));

            // On rewind: slightly less travel distance, more scale-zoom feel
            const rewindDistanceMul = isRewind ? 0.8 : 1;
            const rewindScaleMul = isRewind ? 1.3 : 1;

            const effectiveDistance = distance * rewindDistanceMul;
            const effectiveScaleDepth = scaleDepth * rewindScaleMul;

            const physicsY = momentum + anticipation;

            const translateY =
                mix(effectiveDistance * 0.6, 0, introP) + mix(0, -effectiveDistance, outroP) + physicsY;
            const scale =
                mix(1 - effectiveScaleDepth * 0.5, 1, introP) * mix(1, 1 - effectiveScaleDepth, outroP);

            // On rewind, opacity reaches full slightly faster
            const opacityMul = isRewind ? 1.12 : 1;
            const opacity =
                Math.min(mix(minOpacity, 1, introP) * opacityMul, 1) *
                mix(1, Math.max(minOpacity, 0.45), outroP);

            element.dataset.lenisSectionEffect = String(effectIndex + 1);
            element.dataset.lenisSectionDirection = direction;
            element.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
            element.style.opacity = opacity.toFixed(3);
        },
        [distance, scaleDepth, minOpacity]
    );

    useLenisTimeline({
        sectionRef,
        effects: 3,
        enter,
        exit,
        onUpdate: updateTimeline,
    });

    return (
        <div ref={sectionRef} className={cn("transform-gpu will-change-transform", className)}>
            {children}
        </div>
    );
}

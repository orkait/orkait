"use client";

import { useCallback, useRef } from "react";
import {
    clamp,
    easeInOutCubic,
    easeOutCubic,
    easeOutQuad,
    mix,
    phase,
    useLenisTimeline,
    type LenisTimelineFrame,
} from "@/hooks/use-lenis-timeline";

type ProjectMasonryCardProps = {
    children: React.ReactNode;
    className?: string;
};

export function ProjectMasonryCard({ children, className }: ProjectMasonryCardProps) {
    const cardRef = useRef<HTMLElement | null>(null);

    const updateTimeline = useCallback(
        ({ progress, direction, momentum, anticipation }: LenisTimelineFrame) => {
            const element = cardRef.current;

            if (!element) {
                return;
            }

            const isRewind = direction === "rewind";
            const introEase = isRewind ? easeOutQuad : easeOutCubic;

            const introP = introEase(phase(progress, 0, 0.35));
            const outroP = easeInOutCubic(phase(progress, 0.72, 1));

            const physicsY = momentum + anticipation;

            const translateY = mix(40, 0, introP) + mix(0, -20, outroP) + physicsY;
            const scale = mix(0.96, 1, introP) * mix(1, 0.97, outroP);

            const opacityMul = isRewind ? 1.12 : 1;
            const opacity =
                clamp(mix(0.15, 1, introP) * opacityMul, 0, 1) * mix(1, 0.5, outroP);

            element.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
            element.style.opacity = opacity.toFixed(3);
        },
        []
    );

    useLenisTimeline({
        sectionRef: cardRef,
        effects: 3,
        enter: 1,
        exit: 0.18,
        onUpdate: updateTimeline,
    });

    return (
        <article
            ref={cardRef}
            className={className}
            style={{ transformOrigin: "center top" }}
        >
            {children}
        </article>
    );
}

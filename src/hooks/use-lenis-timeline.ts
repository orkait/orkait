"use client";

import { type RefObject, useRef } from "react";
import { useLenis } from "lenis/react";

export type TimelineDirection = "forward" | "rewind" | "idle";

export type LenisTimelineFrame = {
    progress: number;
    direction: TimelineDirection;
    velocity: number;
    effectIndex: number;
    effects: number;
};

type UseLenisTimelineOptions = {
    sectionRef: RefObject<HTMLElement | null>;
    effects: number;
    enter?: number;
    exit?: number;
    onUpdate: (frame: LenisTimelineFrame) => void;
};

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const phase = (progress: number, start: number, end: number) => {
    if (end <= start) {
        return 0;
    }

    return clamp((progress - start) / (end - start), 0, 1);
};

export const mix = (from: number, to: number, progress: number) => from + (to - from) * clamp(progress, 0, 1);

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);

export const easeInOutCubic = (t: number) => {
    const x = clamp(t, 0, 1);
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export function useLenisTimeline({
    sectionRef,
    effects,
    enter = 0.9,
    exit = 0.15,
    onUpdate,
}: UseLenisTimelineOptions) {
    const previousProgressRef = useRef(0);

    useLenis(
        ({ velocity = 0 }) => {
            const section = sectionRef.current;

            if (!section || typeof window === "undefined") {
                return;
            }

            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight || 1;
            const enterY = viewportHeight * enter;
            const exitY = -rect.height + viewportHeight * exit;
            const denominator = Math.max(1, enterY - exitY);
            const progress = clamp((enterY - rect.top) / denominator, 0, 1);

            const previous = previousProgressRef.current;
            let direction: TimelineDirection = "idle";

            if (progress > previous + 0.0006) {
                direction = "forward";
            } else if (progress < previous - 0.0006) {
                direction = "rewind";
            }

            previousProgressRef.current = progress;

            const effectIndex = clamp(Math.floor(progress * effects), 0, Math.max(0, effects - 1));

            onUpdate({
                progress,
                direction,
                velocity,
                effectIndex,
                effects,
            });
        },
        [sectionRef, effects, enter, exit, onUpdate]
    );
}


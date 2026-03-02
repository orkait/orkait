"use client";

import { type RefObject, useRef } from "react";
import { useLenis } from "lenis/react";
import { TIMELINE_MAIN_ENTER, TIMELINE_MAIN_EXIT } from "@/config/timeline";

export type TimelineDirection = "forward" | "rewind" | "idle";

export type LenisTimelineFrame = {
    progress: number;
    direction: TimelineDirection;
    velocity: number;
    effectIndex: number;
    effects: number;
    momentum: number;
    anticipation: number;
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

export const easeOutQuad = (t: number) => {
    const x = clamp(t, 0, 1);
    return 1 - (1 - x) * (1 - x);
};

export const easeInOutCubic = (t: number) => {
    const x = clamp(t, 0, 1);
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

const ANTICIPATION_IMPULSE = 2.5;
const ANTICIPATION_DECAY = 0.88;
const ANTICIPATION_THRESHOLD = 0.05;
const MOMENTUM_SCALE = 0.12;
const MOMENTUM_MAX = 10;
const MOMENTUM_SMOOTHING = 0.15;
const MOMENTUM_THRESHOLD = 0.05;

export function useLenisTimeline({
    sectionRef,
    effects,
    enter = TIMELINE_MAIN_ENTER,
    exit = TIMELINE_MAIN_EXIT,
    onUpdate,
}: UseLenisTimelineOptions) {
    const previousProgressRef = useRef(0);
    const previousDirectionRef = useRef<TimelineDirection>("idle");
    const anticipationRef = useRef(0);
    const smoothMomentumRef = useRef(0);

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

            // Anticipation: decaying impulse on direction change
            anticipationRef.current *= ANTICIPATION_DECAY;

            if (Math.abs(anticipationRef.current) < ANTICIPATION_THRESHOLD) {
                anticipationRef.current = 0;
            }

            if (
                direction !== "idle" &&
                previousDirectionRef.current !== "idle" &&
                direction !== previousDirectionRef.current
            ) {
                anticipationRef.current = direction === "rewind" ? ANTICIPATION_IMPULSE : -ANTICIPATION_IMPULSE;
            }

            if (direction !== "idle") {
                previousDirectionRef.current = direction;
            }

            // Momentum: smoothed velocity-based offset
            const rawMomentum = clamp(velocity * MOMENTUM_SCALE, -MOMENTUM_MAX, MOMENTUM_MAX);
            smoothMomentumRef.current += (rawMomentum - smoothMomentumRef.current) * MOMENTUM_SMOOTHING;

            if (Math.abs(smoothMomentumRef.current) < MOMENTUM_THRESHOLD) {
                smoothMomentumRef.current = 0;
            }

            const effectIndex = clamp(Math.floor(progress * effects), 0, Math.max(0, effects - 1));

            onUpdate({
                progress,
                direction,
                velocity,
                effectIndex,
                effects,
                momentum: smoothMomentumRef.current,
                anticipation: anticipationRef.current,
            });
        },
        [sectionRef, effects, enter, exit, onUpdate]
    );
}

import {
    clamp,
    easeInOutCubic,
    easeOutCubic,
    easeOutQuad,
    mix,
    phase,
    type TimelineDirection,
} from "@/hooks/use-lenis-timeline";

export const FEEDBACK_EFFECTS = 4;

export type FeedbackTimelineStyles = {
    sectionLift: number;
    sectionOpacity: number;
    headerY: number;
    headerOpacity: number;
    carouselY: number;
    carouselScale: number;
    carouselOpacity: number;
};

export function getFeedbackTimelineStyles(
    progress: number,
    direction?: TimelineDirection
): FeedbackTimelineStyles {
    const isRewind = direction === "rewind";
    const ease = isRewind ? easeOutQuad : easeOutCubic;

    const headerP = ease(phase(progress, 0, 0.28));
    const carouselP = ease(phase(progress, 0.28, 0.62));
    const outroP = easeInOutCubic(phase(progress, 0.78, 1));

    const opacityMul = isRewind ? 1.12 : 1;

    return {
        sectionLift: mix(0, -24, outroP),
        sectionOpacity: mix(1, 0.5, outroP),

        headerY: mix(34, 0, headerP) + mix(0, -10, outroP),
        headerOpacity: clamp(mix(0.16, 1, headerP) * opacityMul, 0, 1) * mix(1, 0.42, outroP),

        carouselY: mix(40, 0, carouselP) + mix(0, -8, outroP),
        carouselScale: mix(0.95, 1, carouselP) * mix(1, 0.985, outroP),
        carouselOpacity: clamp(mix(0.14, 1, carouselP) * opacityMul, 0, 1) * mix(1, 0.46, outroP),
    };
}

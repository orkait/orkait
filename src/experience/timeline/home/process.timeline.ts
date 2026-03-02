import {
    clamp,
    easeInOutCubic,
    easeOutCubic,
    easeOutQuad,
    mix,
    phase,
    type TimelineDirection,
} from "@/hooks/use-lenis-timeline";

export const PROCESS_CARD_COUNT = 7;
export const PROCESS_EFFECTS = PROCESS_CARD_COUNT + 3;

const PROCESS_STEP_START = 0.2;
const PROCESS_STEP_END = 0.94;

export type ProcessTimelineStyles = {
    sectionLift: number;
    sectionOpacity: number;
    gridY: number;
    gridOpacity: number;
    taglineX: number;
    taglineOpacity: number;
};

export function getProcessTimelineStyles(
    progress: number,
    direction?: TimelineDirection
): ProcessTimelineStyles {
    const isRewind = direction === "rewind";
    const ease = isRewind ? easeOutQuad : easeOutCubic;

    const introP = ease(phase(progress, 0, 0.26));
    const taglineP = ease(phase(progress, 0.3, 0.62));
    const outroP = easeInOutCubic(phase(progress, 0.84, 1));

    const opacityMul = isRewind ? 1.12 : 1;

    return {
        sectionLift: mix(0, -24, outroP),
        sectionOpacity: mix(1, 0.52, outroP),
        gridY: mix(34, 0, introP) + mix(0, -8, outroP),
        gridOpacity: clamp(mix(0.14, 1, introP) * opacityMul, 0, 1) * mix(1, 0.48, outroP),
        taglineX: mix(26, 0, taglineP) + mix(0, -8, outroP),
        taglineOpacity: clamp(mix(0.14, 1, taglineP) * opacityMul, 0, 1) * mix(1, 0.5, outroP),
    };
}

export function getProcessActiveIndex(progress: number) {
    const stepsProgress = phase(progress, PROCESS_STEP_START, PROCESS_STEP_END);
    const stepped = Math.floor(stepsProgress * PROCESS_CARD_COUNT);
    return clamp(stepped, 0, PROCESS_CARD_COUNT - 1);
}

export function getProcessCardStyle(
    progress: number,
    index: number,
    activeIndex: number,
    direction?: TimelineDirection
) {
    const isRewind = direction === "rewind";
    const stepsProgress = phase(progress, PROCESS_STEP_START, PROCESS_STEP_END);
    const currentStep = stepsProgress * PROCESS_CARD_COUNT;
    const local = clamp(currentStep - index, 0, 1);
    const eased = isRewind ? easeOutQuad(local) : easeOutCubic(local);
    const isFuture = index > activeIndex;

    return {
        translateY: isFuture ? mix(isRewind ? 16 : 22, 0, eased) : mix(isRewind ? 8 : 12, 0, eased),
        scale: isFuture ? mix(0.95, 0.98, eased) : mix(0.97, 1, eased),
        opacity: isFuture ? mix(isRewind ? 0.18 : 0.24, 0.55, eased) : mix(isRewind ? 0.42 : 0.5, 1, eased),
    };
}

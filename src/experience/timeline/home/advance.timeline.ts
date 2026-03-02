import {
    clamp,
    easeInOutCubic,
    easeOutCubic,
    easeOutQuad,
    mix,
    phase,
    type TimelineDirection,
} from "@/hooks/use-lenis-timeline";

export const ADVANCE_EFFECTS = 4;

export type AdvanceTimelineStyles = {
    sectionLift: number;
    sectionOpacity: number;
    decorX: number;
    decorOpacity: number;
    headingY: number;
    headingOpacity: number;
    leftY: number;
    leftOpacity: number;
    rightY: number;
    rightOpacity: number;
    labelY: number;
    labelOpacity: number;
};

export function getAdvanceTimelineStyles(
    progress: number,
    direction?: TimelineDirection
): AdvanceTimelineStyles {
    const isRewind = direction === "rewind";
    const ease = isRewind ? easeOutQuad : easeOutCubic;

    const introP = ease(phase(progress, 0, 0.24));
    const listP = ease(phase(progress, 0.24, 0.62));
    const outroP = easeInOutCubic(phase(progress, 0.8, 1));

    const opacityMul = isRewind ? 1.12 : 1;

    return {
        sectionLift: mix(0, -26, outroP),
        sectionOpacity: mix(1, 0.5, outroP),

        decorX: mix(42, 0, introP) + mix(0, -24, outroP),
        decorOpacity: clamp(mix(0.12, 1, introP) * opacityMul, 0, 1) * mix(1, 0.46, outroP),

        headingY: mix(44, 0, introP) + mix(0, -12, outroP),
        headingOpacity: clamp(mix(0.14, 1, introP) * opacityMul, 0, 1) * mix(1, 0.42, outroP),

        leftY: mix(36, 0, listP) + mix(0, -8, outroP),
        leftOpacity: clamp(mix(0.14, 1, listP) * opacityMul, 0, 1) * mix(1, 0.44, outroP),

        rightY: mix(48, 0, listP) + mix(0, -8, outroP),
        rightOpacity: clamp(mix(0.08, 1, listP) * opacityMul, 0, 1) * mix(1, 0.44, outroP),

        labelY: mix(20, 0, introP) + mix(0, -6, outroP),
        labelOpacity: clamp(mix(0.2, 1, introP) * opacityMul, 0, 1) * mix(1, 0.58, outroP),
    };
}

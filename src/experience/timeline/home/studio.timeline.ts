import {
    clamp,
    easeInOutCubic,
    easeOutCubic,
    easeOutQuad,
    mix,
    phase,
    type TimelineDirection,
} from "@/hooks/use-lenis-timeline";

export const STUDIO_EFFECTS = 4;

export type StudioTimelineStyles = {
    sectionLift: number;
    sectionOpacity: number;
    headerY: number;
    headerOpacity: number;
    imageX: number;
    imageScale: number;
    imageOpacity: number;
    copyLeftY: number;
    copyLeftOpacity: number;
    copyRightY: number;
    copyRightOpacity: number;
};

export function getStudioTimelineStyles(progress: number, direction?: TimelineDirection): StudioTimelineStyles {
    const isRewind = direction === "rewind";
    const ease = isRewind ? easeOutQuad : easeOutCubic;

    const introP = ease(phase(progress, 0, 0.26));
    const mediaP = ease(phase(progress, 0.26, 0.52));
    const copyP = ease(phase(progress, 0.52, 0.78));
    const outroP = easeInOutCubic(phase(progress, 0.78, 1));

    const opacityMul = isRewind ? 1.12 : 1;

    return {
        sectionLift: mix(0, -28, outroP),
        sectionOpacity: mix(1, 0.46, outroP),

        headerY: mix(38, 0, introP) + mix(0, -14, outroP),
        headerOpacity: clamp(mix(0.16, 1, introP) * opacityMul, 0, 1) * mix(1, 0.34, outroP),

        imageX: mix(-46, 0, mediaP) + mix(0, -10, outroP),
        imageScale: mix(0.92, 1, mediaP) * mix(1, 0.98, outroP),
        imageOpacity: clamp(mix(0.12, 1, mediaP) * opacityMul, 0, 1) * mix(1, 0.42, outroP),

        copyLeftY: mix(26, 0, mediaP) + mix(0, -10, outroP),
        copyLeftOpacity: clamp(mix(0.2, 1, mediaP) * opacityMul, 0, 1) * mix(1, 0.45, outroP),

        copyRightY: mix(34, 0, copyP) + mix(0, -10, outroP),
        copyRightOpacity: clamp(mix(0.16, 1, copyP) * opacityMul, 0, 1) * mix(1, 0.42, outroP),
    };
}

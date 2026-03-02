import { easeInOutCubic, easeOutCubic, mix, phase } from "@/hooks/use-lenis-timeline";

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

export function getStudioTimelineStyles(progress: number): StudioTimelineStyles {
    const introP = easeOutCubic(phase(progress, 0, 0.26));
    const mediaP = easeOutCubic(phase(progress, 0.26, 0.52));
    const copyP = easeOutCubic(phase(progress, 0.52, 0.78));
    const outroP = easeInOutCubic(phase(progress, 0.78, 1));

    return {
        sectionLift: mix(0, -28, outroP),
        sectionOpacity: mix(1, 0.46, outroP),

        headerY: mix(38, 0, introP) + mix(0, -14, outroP),
        headerOpacity: mix(0.16, 1, introP) * mix(1, 0.34, outroP),

        imageX: mix(-46, 0, mediaP) + mix(0, -10, outroP),
        imageScale: mix(0.92, 1, mediaP) * mix(1, 0.98, outroP),
        imageOpacity: mix(0.12, 1, mediaP) * mix(1, 0.42, outroP),

        copyLeftY: mix(26, 0, mediaP) + mix(0, -10, outroP),
        copyLeftOpacity: mix(0.2, 1, mediaP) * mix(1, 0.45, outroP),

        copyRightY: mix(34, 0, copyP) + mix(0, -10, outroP),
        copyRightOpacity: mix(0.16, 1, copyP) * mix(1, 0.42, outroP),
    };
}


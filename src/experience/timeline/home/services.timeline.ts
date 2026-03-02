import {
    clamp,
    easeInOutCubic,
    easeOutCubic,
    easeOutQuad,
    mix,
    phase,
    type TimelineDirection,
} from "@/hooks/use-lenis-timeline";

export const SERVICE_LABELS = ["Client Work", "Solutions", "SaaS Work", "Dev Products"] as const;

const SERVICE_STEP_START = 0.48;
const SERVICE_STEP_END = 1;

export const SERVICES_EFFECTS = SERVICE_LABELS.length + 3;

export type ServicesTimelineStyles = {
    sectionLift: number;
    sectionOpacity: number;
    mediaX: number;
    mediaScale: number;
    mediaOpacity: number;
    tagsX: number;
    tagsY: number;
    tagsOpacity: number;
    panelY: number;
    panelOpacity: number;
};

export function getServicesTimelineStyles(
    progress: number,
    direction?: TimelineDirection
): ServicesTimelineStyles {
    const isRewind = direction === "rewind";
    const ease = isRewind ? easeOutQuad : easeOutCubic;

    const mediaP = ease(phase(progress, 0, 0.24));
    const tagsP = ease(phase(progress, 0.24, 0.42));
    const panelP = ease(phase(progress, 0.42, 0.56));
    const outroP = easeInOutCubic(phase(progress, 0.84, 1));

    const opacityMul = isRewind ? 1.12 : 1;

    return {
        sectionLift: mix(0, -24, outroP),
        sectionOpacity: mix(1, 0.48, outroP),

        mediaX: mix(-56, 0, mediaP) + mix(0, -8, outroP),
        mediaScale: mix(0.9, 1, mediaP) * mix(1, 0.98, outroP),
        mediaOpacity: clamp(mix(0.12, 1, mediaP) * opacityMul, 0, 1) * mix(1, 0.5, outroP),

        tagsX: mix(30, 0, tagsP),
        tagsY: mix(8, 0, tagsP),
        tagsOpacity: clamp(mix(0.1, 1, tagsP) * opacityMul, 0, 1) * mix(1, 0.62, outroP),

        panelY: mix(38, 0, panelP) + mix(0, -10, outroP),
        panelOpacity: clamp(mix(0.14, 1, panelP) * opacityMul, 0, 1) * mix(1, 0.46, outroP),
    };
}

export function getServicesActiveIndex(progress: number) {
    const stepsProgress = phase(progress, SERVICE_STEP_START, SERVICE_STEP_END);
    const stepped = Math.floor(stepsProgress * SERVICE_LABELS.length);
    return clamp(stepped, 0, SERVICE_LABELS.length - 1);
}

export function getServiceItemStyle(
    progress: number,
    index: number,
    activeIndex: number,
    direction?: TimelineDirection
) {
    const isRewind = direction === "rewind";
    const stepsProgress = phase(progress, SERVICE_STEP_START, SERVICE_STEP_END);
    const currentStep = stepsProgress * SERVICE_LABELS.length;
    const local = clamp(currentStep - index, 0, 1);
    const eased = isRewind ? easeOutQuad(local) : easeOutCubic(local);
    const isFuture = index > activeIndex;

    return {
        translateY: isFuture ? mix(isRewind ? 14 : 18, 0, eased) : mix(isRewind ? 6 : 10, 0, eased),
        scale: isFuture ? mix(0.94, 0.97, eased) : mix(0.96, 1, eased),
        opacity: isFuture ? mix(isRewind ? 0.2 : 0.26, 0.55, eased) : mix(isRewind ? 0.42 : 0.5, 1, eased),
        letterSpacing: isFuture ? mix(0.3, 0.15, eased) : mix(0.36, 0.08, eased),
    };
}

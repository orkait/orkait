import {
    clamp,
    easeInOutCubic,
    easeOutCubic,
    easeOutQuad,
    mix,
    phase,
    type TimelineDirection,
} from "@/hooks/use-lenis-timeline";

export const HERO_EFFECTS = 4;

export type HeroTimelineStyles = {
    introOpacity: number;
    introY: number;
    heroLift: number;
    heroScale: number;
    heroOpacity: number;
    logoY: number;
    logoRotate: number;
    logoScale: number;
    logoOpacity: number;
    mainWordY: number;
    mainWordScale: number;
    mainWordOpacity: number;
};

export function getHeroTimelineStyles(progress: number, direction?: TimelineDirection): HeroTimelineStyles {
    const isRewind = direction === "rewind";
    const ease = isRewind ? easeOutQuad : easeOutCubic;

    const introP = ease(phase(progress, 0, 0.18));
    const logoP = ease(phase(progress, 0.18, 0.38));
    const titleP = ease(phase(progress, 0.38, 0.66));
    const outroP = easeInOutCubic(phase(progress, 0.66, 1));

    // On rewind, opacity reaches full slightly faster (content already seen)
    const opacityMul = isRewind ? 1.12 : 1;

    return {
        introOpacity: clamp(mix(0.18, 1, introP) * opacityMul, 0, 1) * mix(1, 0.32, outroP),
        introY: mix(36, 0, introP) + mix(0, -26, outroP),

        heroLift: mix(0, -74, outroP),
        heroScale: mix(1, 0.96, outroP),
        heroOpacity: mix(1, 0.24, outroP),

        logoY: mix(24, 0, logoP),
        logoRotate: mix(-14, -4, logoP),
        logoScale: mix(0.9, 1, logoP),
        logoOpacity: clamp(mix(0.08, 1, logoP) * opacityMul, 0, 1) * mix(1, 0.45, outroP),

        mainWordY: mix(18, 0, titleP) + mix(0, -14, outroP),
        mainWordScale: mix(1.08, 1, titleP) * mix(1, 0.98, outroP),
        mainWordOpacity: clamp(mix(0.24, 1, titleP) * opacityMul, 0, 1) * mix(1, 0.34, outroP),
    };
}

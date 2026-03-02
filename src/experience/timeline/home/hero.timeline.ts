import { easeInOutCubic, easeOutCubic, mix, phase } from "@/hooks/use-lenis-timeline";

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

export function getHeroTimelineStyles(progress: number): HeroTimelineStyles {
    const introP = easeOutCubic(phase(progress, 0, 0.18));
    const logoP = easeOutCubic(phase(progress, 0.18, 0.38));
    const titleP = easeOutCubic(phase(progress, 0.38, 0.66));
    const outroP = easeInOutCubic(phase(progress, 0.66, 1));

    return {
        introOpacity: mix(0.18, 1, introP) * mix(1, 0.32, outroP),
        introY: mix(36, 0, introP) + mix(0, -26, outroP),

        heroLift: mix(0, -74, outroP),
        heroScale: mix(1, 0.96, outroP),
        heroOpacity: mix(1, 0.24, outroP),

        logoY: mix(24, 0, logoP),
        logoRotate: mix(-14, -4, logoP),
        logoScale: mix(0.9, 1, logoP),
        logoOpacity: mix(0.08, 1, logoP) * mix(1, 0.45, outroP),

        mainWordY: mix(18, 0, titleP) + mix(0, -14, outroP),
        mainWordScale: mix(1.08, 1, titleP) * mix(1, 0.98, outroP),
        mainWordOpacity: mix(0.24, 1, titleP) * mix(1, 0.34, outroP),
    };
}


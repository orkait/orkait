"use client";

import { useCallback, useRef } from "react";
import { HeroView } from "@/components/home/HeroView";
import { type LenisTimelineFrame, useLenisTimeline } from "@/hooks/use-lenis-timeline";
import { getHeroTimelineStyles, HERO_EFFECTS } from "@/experience/timeline/home/hero.timeline";

export function HeroScene() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const introRef = useRef<HTMLDivElement | null>(null);
    const titleGroupRef = useRef<HTMLDivElement | null>(null);
    const logoWrapRef = useRef<HTMLDivElement | null>(null);
    const mainWordRef = useRef<HTMLDivElement | null>(null);

    const setSectionRef = useCallback((node: HTMLDivElement | null) => {
        sectionRef.current = node;
    }, []);

    const setIntroRef = useCallback((node: HTMLDivElement | null) => {
        introRef.current = node;
    }, []);

    const setTitleGroupRef = useCallback((node: HTMLDivElement | null) => {
        titleGroupRef.current = node;
    }, []);

    const setLogoWrapRef = useCallback((node: HTMLDivElement | null) => {
        logoWrapRef.current = node;
    }, []);

    const setMainWordRef = useCallback((node: HTMLDivElement | null) => {
        mainWordRef.current = node;
    }, []);

    const updateTimeline = useCallback(
        ({ progress, effectIndex, direction, momentum, anticipation }: LenisTimelineFrame) => {
            const styles = getHeroTimelineStyles(progress, direction);
            const physicsY = momentum + anticipation;

            if (sectionRef.current) {
                sectionRef.current.dataset.heroEffect = String(effectIndex + 1);
                sectionRef.current.dataset.heroDirection = direction;
            }

            if (introRef.current) {
                introRef.current.style.transform = `translate3d(0, ${(styles.introY + physicsY).toFixed(2)}px, 0)`;
                introRef.current.style.opacity = styles.introOpacity.toFixed(3);
            }

            if (titleGroupRef.current) {
                titleGroupRef.current.style.transform =
                    `translate3d(0, ${(styles.heroLift + physicsY).toFixed(2)}px, 0) ` +
                    `scale(${styles.heroScale.toFixed(4)})`;
                titleGroupRef.current.style.opacity = styles.heroOpacity.toFixed(3);
            }

            if (logoWrapRef.current) {
                logoWrapRef.current.style.transform =
                    `translate3d(0, ${(styles.logoY + physicsY).toFixed(2)}px, 0) ` +
                    `rotate(${styles.logoRotate.toFixed(2)}deg) scale(${styles.logoScale.toFixed(4)})`;
                logoWrapRef.current.style.opacity = styles.logoOpacity.toFixed(3);
            }

            if (mainWordRef.current) {
                mainWordRef.current.style.transform =
                    `translate3d(0, ${(styles.mainWordY + physicsY).toFixed(2)}px, 0) ` +
                    `scale(${styles.mainWordScale.toFixed(4)})`;
                mainWordRef.current.style.opacity = styles.mainWordOpacity.toFixed(3);
            }
        },
        []
    );

    useLenisTimeline({
        sectionRef,
        effects: HERO_EFFECTS,
        enter: 0.94,
        exit: 0.12,
        onUpdate: updateTimeline,
    });

    return (
        <HeroView
            sectionRef={setSectionRef}
            introRef={setIntroRef}
            titleGroupRef={setTitleGroupRef}
            logoWrapRef={setLogoWrapRef}
            mainWordRef={setMainWordRef}
        />
    );
}

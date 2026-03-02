"use client";

import { useCallback, useRef } from "react";
import { StudioView } from "@/components/home/StudioView";
import { type LenisTimelineFrame, useLenisTimeline } from "@/hooks/use-lenis-timeline";
import { getStudioTimelineStyles, STUDIO_EFFECTS } from "@/experience/timeline/home/studio.timeline";

export function StudioScene() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLDivElement | null>(null);
    const copyLeftRef = useRef<HTMLParagraphElement | null>(null);
    const copyRightRef = useRef<HTMLDivElement | null>(null);

    const setSectionRef = useCallback((node: HTMLDivElement | null) => {
        sectionRef.current = node;
    }, []);

    const setHeaderRef = useCallback((node: HTMLDivElement | null) => {
        headerRef.current = node;
    }, []);

    const setImageRef = useCallback((node: HTMLDivElement | null) => {
        imageRef.current = node;
    }, []);

    const setCopyLeftRef = useCallback((node: HTMLParagraphElement | null) => {
        copyLeftRef.current = node;
    }, []);

    const setCopyRightRef = useCallback((node: HTMLDivElement | null) => {
        copyRightRef.current = node;
    }, []);

    const updateTimeline = useCallback(({ progress, effectIndex }: LenisTimelineFrame) => {
        const styles = getStudioTimelineStyles(progress);

        if (sectionRef.current) {
            sectionRef.current.dataset.studioEffect = String(effectIndex + 1);
            sectionRef.current.style.transform = `translate3d(0, ${styles.sectionLift.toFixed(2)}px, 0)`;
            sectionRef.current.style.opacity = styles.sectionOpacity.toFixed(3);
        }

        if (headerRef.current) {
            headerRef.current.style.transform = `translate3d(0, ${styles.headerY.toFixed(2)}px, 0)`;
            headerRef.current.style.opacity = styles.headerOpacity.toFixed(3);
        }

        if (imageRef.current) {
            imageRef.current.style.transform =
                `translate3d(${styles.imageX.toFixed(2)}px, 0, 0) scale(${styles.imageScale.toFixed(4)})`;
            imageRef.current.style.opacity = styles.imageOpacity.toFixed(3);
        }

        if (copyLeftRef.current) {
            copyLeftRef.current.style.transform = `translate3d(0, ${styles.copyLeftY.toFixed(2)}px, 0)`;
            copyLeftRef.current.style.opacity = styles.copyLeftOpacity.toFixed(3);
        }

        if (copyRightRef.current) {
            copyRightRef.current.style.transform = `translate3d(0, ${styles.copyRightY.toFixed(2)}px, 0)`;
            copyRightRef.current.style.opacity = styles.copyRightOpacity.toFixed(3);
        }
    }, []);

    useLenisTimeline({
        sectionRef,
        effects: STUDIO_EFFECTS,
        enter: 0.92,
        exit: 0.14,
        onUpdate: updateTimeline,
    });

    return (
        <StudioView
            sectionRef={setSectionRef}
            headerRef={setHeaderRef}
            imageRef={setImageRef}
            copyLeftRef={setCopyLeftRef}
            copyRightRef={setCopyRightRef}
        />
    );
}


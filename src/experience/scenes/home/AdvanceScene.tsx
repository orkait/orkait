"use client";

import { useCallback, useRef } from "react";
import { AdvanceView } from "@/components/home/AdvanceView";
import { type LenisTimelineFrame, useLenisTimeline } from "@/hooks/use-lenis-timeline";
import { ADVANCE_EFFECTS, getAdvanceTimelineStyles } from "@/experience/timeline/home/advance.timeline";
import { TIMELINE_MAIN_ENTER, TIMELINE_MAIN_EXIT } from "@/config/timeline";

export function AdvanceScene() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const decorRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const leftListRef = useRef<HTMLDivElement | null>(null);
    const rightListRef = useRef<HTMLDivElement | null>(null);
    const labelRef = useRef<HTMLParagraphElement | null>(null);

    const setSectionRef = useCallback((node: HTMLDivElement | null) => {
        sectionRef.current = node;
    }, []);

    const setDecorRef = useCallback((node: HTMLDivElement | null) => {
        decorRef.current = node;
    }, []);

    const setHeadingRef = useCallback((node: HTMLHeadingElement | null) => {
        headingRef.current = node;
    }, []);

    const setLeftListRef = useCallback((node: HTMLDivElement | null) => {
        leftListRef.current = node;
    }, []);

    const setRightListRef = useCallback((node: HTMLDivElement | null) => {
        rightListRef.current = node;
    }, []);

    const setLabelRef = useCallback((node: HTMLParagraphElement | null) => {
        labelRef.current = node;
    }, []);

    const updateTimeline = useCallback(
        ({ progress, effectIndex, direction, momentum, anticipation }: LenisTimelineFrame) => {
            const styles = getAdvanceTimelineStyles(progress, direction);
            const physicsY = momentum + anticipation;

            if (sectionRef.current) {
                sectionRef.current.dataset.advanceEffect = String(effectIndex + 1);
                sectionRef.current.dataset.advanceDirection = direction;
                sectionRef.current.style.transform = `translate3d(0, ${(styles.sectionLift + physicsY).toFixed(2)}px, 0)`;
                sectionRef.current.style.opacity = styles.sectionOpacity.toFixed(3);
            }

            if (decorRef.current) {
                decorRef.current.style.transform = `translate3d(${styles.decorX.toFixed(2)}px, 0, 0)`;
                decorRef.current.style.opacity = styles.decorOpacity.toFixed(3);
            }

            if (headingRef.current) {
                headingRef.current.style.transform = `translate3d(0, ${styles.headingY.toFixed(2)}px, 0)`;
                headingRef.current.style.opacity = styles.headingOpacity.toFixed(3);
            }

            if (leftListRef.current) {
                leftListRef.current.style.transform = `translate3d(0, ${styles.leftY.toFixed(2)}px, 0)`;
                leftListRef.current.style.opacity = styles.leftOpacity.toFixed(3);
            }

            if (rightListRef.current) {
                rightListRef.current.style.transform = `translate3d(0, ${styles.rightY.toFixed(2)}px, 0)`;
                rightListRef.current.style.opacity = styles.rightOpacity.toFixed(3);
            }

            if (labelRef.current) {
                labelRef.current.style.transform = `translate3d(0, ${styles.labelY.toFixed(2)}px, 0)`;
                labelRef.current.style.opacity = styles.labelOpacity.toFixed(3);
            }
        },
        []
    );

    useLenisTimeline({
        sectionRef,
        effects: ADVANCE_EFFECTS,
        enter: TIMELINE_MAIN_ENTER,
        exit: TIMELINE_MAIN_EXIT,
        onUpdate: updateTimeline,
    });

    return (
        <AdvanceView
            sectionRef={setSectionRef}
            decorRef={setDecorRef}
            headingRef={setHeadingRef}
            leftListRef={setLeftListRef}
            rightListRef={setRightListRef}
            labelRef={setLabelRef}
        />
    );
}

"use client";

import { useCallback, useRef, useState } from "react";
import { ProcessView } from "@/components/home/ProcessView";
import { type LenisTimelineFrame, useLenisTimeline } from "@/hooks/use-lenis-timeline";
import {
    getProcessActiveIndex,
    getProcessCardStyle,
    getProcessTimelineStyles,
    PROCESS_EFFECTS,
} from "@/experience/timeline/home/process.timeline";
import { TIMELINE_MAIN_ENTER, TIMELINE_MAIN_EXIT } from "@/config/timeline";

export function ProcessScene() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const gridRef = useRef<HTMLDivElement | null>(null);
    const taglineRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const activeIndexRef = useRef(0);

    const setSectionRef = useCallback((node: HTMLElement | null) => {
        sectionRef.current = node;
    }, []);

    const setGridRef = useCallback((node: HTMLDivElement | null) => {
        gridRef.current = node;
    }, []);

    const setTaglineRef = useCallback((node: HTMLDivElement | null) => {
        taglineRef.current = node;
    }, []);

    const setCardRef = useCallback(
        (index: number) => (node: HTMLDivElement | null) => {
            cardRefs.current[index] = node;
        },
        []
    );

    const updateTimeline = useCallback(
        ({ progress, effectIndex, direction, momentum, anticipation }: LenisTimelineFrame) => {
            const styles = getProcessTimelineStyles(progress, direction);
            const nextActiveIndex = getProcessActiveIndex(progress);
            const physicsY = momentum + anticipation;

            if (nextActiveIndex !== activeIndexRef.current) {
                activeIndexRef.current = nextActiveIndex;
                setActiveIndex(nextActiveIndex);
            }

            if (sectionRef.current) {
                sectionRef.current.dataset.processEffect = String(effectIndex + 1);
                sectionRef.current.dataset.processDirection = direction;
                sectionRef.current.style.transform = `translate3d(0, ${(styles.sectionLift + physicsY).toFixed(2)}px, 0)`;
                sectionRef.current.style.opacity = styles.sectionOpacity.toFixed(3);
            }

            if (gridRef.current) {
                gridRef.current.style.transform = `translate3d(0, ${styles.gridY.toFixed(2)}px, 0)`;
                gridRef.current.style.opacity = styles.gridOpacity.toFixed(3);
            }

            if (taglineRef.current) {
                taglineRef.current.style.transform = `translate3d(${styles.taglineX.toFixed(2)}px, 0, 0)`;
                taglineRef.current.style.opacity = styles.taglineOpacity.toFixed(3);
            }

            cardRefs.current.forEach((card, index) => {
                if (!card) {
                    return;
                }

                const cardStyle = getProcessCardStyle(progress, index, nextActiveIndex, direction);
                card.style.transform =
                    `translate3d(0, ${cardStyle.translateY.toFixed(2)}px, 0) scale(${cardStyle.scale.toFixed(4)})`;
                card.style.opacity = cardStyle.opacity.toFixed(3);
            });
        },
        []
    );

    useLenisTimeline({
        sectionRef,
        effects: PROCESS_EFFECTS,
        enter: TIMELINE_MAIN_ENTER,
        exit: TIMELINE_MAIN_EXIT,
        onUpdate: updateTimeline,
    });

    return (
        <ProcessView
            sectionRef={setSectionRef}
            gridRef={setGridRef}
            taglineRef={setTaglineRef}
            setCardRef={setCardRef}
            activeIndex={activeIndex}
        />
    );
}

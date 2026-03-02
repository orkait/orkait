"use client";

import { useCallback, useRef } from "react";
import { FeedbackView } from "@/components/home/FeedbackView";
import { type LenisTimelineFrame, useLenisTimeline } from "@/hooks/use-lenis-timeline";
import {
    FEEDBACK_EFFECTS,
    getFeedbackTimelineStyles,
} from "@/experience/timeline/home/feedback.timeline";
import { TIMELINE_MAIN_ENTER, TIMELINE_MAIN_EXIT } from "@/config/timeline";

export function FeedbackScene() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const carouselRef = useRef<HTMLDivElement | null>(null);

    const setSectionRef = useCallback((node: HTMLElement | null) => {
        sectionRef.current = node;
    }, []);

    const setHeaderRef = useCallback((node: HTMLDivElement | null) => {
        headerRef.current = node;
    }, []);

    const setCarouselRef = useCallback((node: HTMLDivElement | null) => {
        carouselRef.current = node;
    }, []);

    const updateTimeline = useCallback(
        ({ progress, effectIndex, direction, momentum, anticipation }: LenisTimelineFrame) => {
            const styles = getFeedbackTimelineStyles(progress, direction);
            const physicsY = momentum + anticipation;

            if (sectionRef.current) {
                sectionRef.current.dataset.feedbackEffect = String(effectIndex + 1);
                sectionRef.current.dataset.feedbackDirection = direction;
                sectionRef.current.style.transform = `translate3d(0, ${(styles.sectionLift + physicsY).toFixed(2)}px, 0)`;
                sectionRef.current.style.opacity = styles.sectionOpacity.toFixed(3);
            }

            if (headerRef.current) {
                headerRef.current.style.transform = `translate3d(0, ${styles.headerY.toFixed(2)}px, 0)`;
                headerRef.current.style.opacity = styles.headerOpacity.toFixed(3);
            }

            if (carouselRef.current) {
                carouselRef.current.style.transform =
                    `translate3d(0, ${styles.carouselY.toFixed(2)}px, 0) scale(${styles.carouselScale.toFixed(4)})`;
                carouselRef.current.style.opacity = styles.carouselOpacity.toFixed(3);
            }
        },
        []
    );

    useLenisTimeline({
        sectionRef,
        effects: FEEDBACK_EFFECTS,
        enter: TIMELINE_MAIN_ENTER,
        exit: TIMELINE_MAIN_EXIT,
        onUpdate: updateTimeline,
    });

    return (
        <FeedbackView
            sectionRef={setSectionRef}
            headerRef={setHeaderRef}
            carouselRef={setCarouselRef}
        />
    );
}

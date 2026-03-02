"use client";

import { useCallback, useRef, useState } from "react";
import { ServicesView } from "@/components/home/ServicesView";
import { type LenisTimelineFrame, useLenisTimeline } from "@/hooks/use-lenis-timeline";
import {
    getServiceItemStyle,
    getServicesActiveIndex,
    getServicesTimelineStyles,
    SERVICE_LABELS,
    SERVICES_EFFECTS,
} from "@/experience/timeline/home/services.timeline";
import { TIMELINE_MAIN_ENTER, TIMELINE_MAIN_EXIT } from "@/config/timeline";

export function ServicesScene() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const mediaRef = useRef<HTMLDivElement | null>(null);
    const tagsRef = useRef<HTMLDivElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Array<HTMLParagraphElement | null>>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const activeIndexRef = useRef(0);

    const setSectionRef = useCallback((node: HTMLDivElement | null) => {
        sectionRef.current = node;
    }, []);

    const setMediaRef = useCallback((node: HTMLDivElement | null) => {
        mediaRef.current = node;
    }, []);

    const setTagsRef = useCallback((node: HTMLDivElement | null) => {
        tagsRef.current = node;
    }, []);

    const setPanelRef = useCallback((node: HTMLDivElement | null) => {
        panelRef.current = node;
    }, []);

    const setItemRef = useCallback(
        (index: number) => (node: HTMLParagraphElement | null) => {
            itemRefs.current[index] = node;
        },
        []
    );

    const updateTimeline = useCallback(
        ({ progress, effectIndex, direction, momentum, anticipation }: LenisTimelineFrame) => {
            const styles = getServicesTimelineStyles(progress, direction);
            const nextActiveIndex = getServicesActiveIndex(progress);
            const physicsY = momentum + anticipation;

            if (nextActiveIndex !== activeIndexRef.current) {
                activeIndexRef.current = nextActiveIndex;
                setActiveIndex(nextActiveIndex);
            }

            if (sectionRef.current) {
                sectionRef.current.dataset.servicesEffect = String(effectIndex + 1);
                sectionRef.current.dataset.servicesDirection = direction;
                sectionRef.current.style.transform = `translate3d(0, ${(styles.sectionLift + physicsY).toFixed(2)}px, 0)`;
                sectionRef.current.style.opacity = styles.sectionOpacity.toFixed(3);
            }

            if (mediaRef.current) {
                mediaRef.current.style.transform =
                    `translate3d(${styles.mediaX.toFixed(2)}px, 0, 0) scale(${styles.mediaScale.toFixed(4)})`;
                mediaRef.current.style.opacity = styles.mediaOpacity.toFixed(3);
            }

            if (tagsRef.current) {
                tagsRef.current.style.transform =
                    `translate3d(${styles.tagsX.toFixed(2)}px, ${styles.tagsY.toFixed(2)}px, 0) translateX(100%)`;
                tagsRef.current.style.opacity = styles.tagsOpacity.toFixed(3);
            }

            if (panelRef.current) {
                panelRef.current.style.transform = `translate3d(0, ${styles.panelY.toFixed(2)}px, 0)`;
                panelRef.current.style.opacity = styles.panelOpacity.toFixed(3);
            }

            itemRefs.current.forEach((element, index) => {
                if (!element) {
                    return;
                }

                const itemStyles = getServiceItemStyle(progress, index, nextActiveIndex, direction);
                element.style.transform =
                    `translate3d(0, ${itemStyles.translateY.toFixed(2)}px, 0) scale(${itemStyles.scale.toFixed(4)})`;
                element.style.opacity = itemStyles.opacity.toFixed(3);
                element.style.letterSpacing = `${itemStyles.letterSpacing.toFixed(3)}px`;
            });
        },
        []
    );

    useLenisTimeline({
        sectionRef,
        effects: SERVICES_EFFECTS,
        enter: TIMELINE_MAIN_ENTER,
        exit: TIMELINE_MAIN_EXIT,
        onUpdate: updateTimeline,
    });

    return (
        <ServicesView
            sectionRef={setSectionRef}
            mediaRef={setMediaRef}
            tagsRef={setTagsRef}
            panelRef={setPanelRef}
            setItemRef={setItemRef}
            services={[...SERVICE_LABELS]}
            activeIndex={activeIndex}
        />
    );
}

import type { RefCallback } from "react";
import Image from "next/image";

const CAPABILITIES_LEFT = [
    "Rapid Iteration",
    "Cloud-Native SAAS",
    "High Performance Systems",
];

const CAPABILITIES_RIGHT = [
    "Scalable Foundations",
    "Augmented Deployments",
];

type AdvanceViewProps = {
    sectionRef: RefCallback<HTMLDivElement>;
    decorRef: RefCallback<HTMLDivElement>;
    headingRef: RefCallback<HTMLHeadingElement>;
    leftListRef: RefCallback<HTMLDivElement>;
    rightListRef: RefCallback<HTMLDivElement>;
    labelRef: RefCallback<HTMLParagraphElement>;
};

export function AdvanceView({
    sectionRef,
    decorRef,
    headingRef,
    leftListRef,
    rightListRef,
    labelRef,
}: AdvanceViewProps) {
    return (
        <div ref={sectionRef} className="relative mt-16 laptop:mt-32 overflow-hidden min-h-[800px] transform-gpu will-change-transform">
            <div
                ref={decorRef}
                className="absolute top-0 right-0 h-full w-1/2 pointer-events-none flex items-center justify-end transform-gpu will-change-transform"
            >
                <Image
                    src="/homepage/uniq_1.svg"
                    alt=""
                    width={556}
                    height={777}
                    className="h-full w-auto object-contain"
                    aria-hidden
                />
                <div className="fade-edge-right" />
                <div className="fade-edge-left" />
            </div>

            <div className="relative flex flex-col gap-16 max-w-[60%]">
                <h2
                    ref={headingRef}
                    className="text-foreground font-medium text-heading leading-heading tracking-tight transform-gpu will-change-transform"
                >
                    High Performance scalable solutions
                </h2>

                <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                    <div ref={leftListRef} className="flex flex-col gap-6 transform-gpu will-change-transform">
                        {CAPABILITIES_LEFT.map((item) => (
                            <p
                                key={item}
                                className="text-foreground font-medium text-subtitle leading-subtitle"
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                    <div ref={rightListRef} className="flex flex-col gap-6 transform-gpu will-change-transform">
                        {CAPABILITIES_RIGHT.map((item) => (
                            <p
                                key={item}
                                className="text-foreground font-medium text-subtitle leading-subtitle"
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <p
                ref={labelRef}
                className="absolute bottom-0 left-0 text-foreground font-medium text-body-lg leading-body-lg transform-gpu will-change-transform"
            >
                (04) ADV
            </p>
        </div>
    );
}


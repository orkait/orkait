import type { RefCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ServicesViewProps = {
    sectionRef: RefCallback<HTMLDivElement>;
    mediaRef: RefCallback<HTMLDivElement>;
    tagsRef: RefCallback<HTMLDivElement>;
    panelRef: RefCallback<HTMLDivElement>;
    setItemRef: (index: number) => RefCallback<HTMLParagraphElement>;
    services: string[];
    activeIndex: number;
};

export function ServicesView({
    sectionRef,
    mediaRef,
    tagsRef,
    panelRef,
    setItemRef,
    services,
    activeIndex,
}: ServicesViewProps) {
    return (
        <div ref={sectionRef} className="flex gap-16 items-start mt-32 relative transform-gpu will-change-transform">
            <div ref={mediaRef} className="relative shrink-0 transform-gpu will-change-transform">
                <Image
                    src="https://placehold.co/500x500/webp"
                    alt="Services"
                    width={500}
                    height={500}
                    className="rounded-sm object-cover"
                />
                <div
                    ref={tagsRef}
                    className="absolute bottom-0 right-0 translate-x-full pl-6 pb-2 flex flex-col gap-1 transform-gpu will-change-transform"
                >
                    <p className="text-foreground font-medium text-body leading-body">Developer Tools</p>
                    <p className="text-foreground font-medium text-body leading-body">Infrastructure Platforms</p>
                    <p className="text-foreground font-medium text-body leading-body">Analytics</p>
                </div>
            </div>

            <div ref={panelRef} className="flex flex-1 flex-col gap-2 absolute top-0 right-0 mt-12 transform-gpu will-change-transform">
                <span className="text-foreground font-medium text-body-lg leading-body-lg">(03) SERVICES</span>
                {services.map((label, index) => (
                    <p
                        key={label}
                        ref={setItemRef(index)}
                        className={cn(
                            "max-w-fit font-medium text-heading leading-heading tracking-tight transform-gpu will-change-transform transition-colors duration-300",
                            index <= activeIndex ? "text-foreground" : "text-muted-foreground"
                        )}
                    >
                        {label}
                    </p>
                ))}
            </div>
        </div>
    );
}


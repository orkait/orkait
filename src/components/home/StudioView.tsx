import type { RefCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type StudioViewProps = {
    sectionRef: RefCallback<HTMLDivElement>;
    headerRef: RefCallback<HTMLDivElement>;
    imageRef: RefCallback<HTMLDivElement>;
    copyLeftRef: RefCallback<HTMLParagraphElement>;
    copyRightRef: RefCallback<HTMLDivElement>;
};

export function StudioView({
    sectionRef,
    headerRef,
    imageRef,
    copyLeftRef,
    copyRightRef,
}: StudioViewProps) {
    return (
        <div ref={sectionRef} className="flex flex-col items-start relative mt-32 transform-gpu will-change-transform">
            <div ref={headerRef} className="transform-gpu will-change-transform">
                <p className="absolute top-4 left-2 text-muted-foreground font-medium text-body leading-body tracking-widest uppercase">
                    (01) Studio
                </p>

                <h2
                    style={{ textIndent: "200px" }}
                    className="text-foreground font-medium text-heading leading-heading tracking-tight"
                >
                    We craft digital experiences that inspire, empowering businesses to
                    thrive in the digital world.
                </h2>
            </div>

            <div className="mt-16 flex gap-16 items-start">
                <div ref={imageRef} className="w-[300px] h-[300px] overflow-hidden transform-gpu will-change-transform">
                    <Image
                        src="https://placehold.co/300x300/webp"
                        alt="Orkait studio space"
                        width={300}
                        height={300}
                    />
                </div>

                <div className="flex-1 flex gap-6">
                    <p
                        ref={copyLeftRef}
                        className="text-foreground font-medium text-body-lg leading-body-lg max-w-[320px] transform-gpu will-change-transform"
                    >
                        We are Orkait, a service provider dedicated to crafting digital
                        experiences that inspire. Our expertise spans three core domains: web
                        app development, software solutions, and enterprise scaling &amp;
                        deployment.
                    </p>

                    <div ref={copyRightRef} className="transform-gpu will-change-transform">
                        <p className="text-foreground font-medium text-body-lg leading-body-lg max-w-[320px]">
                            We work with small enterprises to help them compete and grow in
                            today&apos;s digital landscape. Our team combines technical excellence
                            with creative vision to deliver solutions that make a real difference.
                        </p>
                        <Button className="mt-7" variant="default" size="lg">
                            About Us
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}


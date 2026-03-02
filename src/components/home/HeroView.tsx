import type { RefCallback } from "react";
import Image from "next/image";

type HeroViewProps = {
    sectionRef: RefCallback<HTMLDivElement>;
    introRef: RefCallback<HTMLDivElement>;
    titleGroupRef: RefCallback<HTMLDivElement>;
    logoWrapRef: RefCallback<HTMLDivElement>;
    mainWordRef: RefCallback<HTMLDivElement>;
};

export function HeroView({
    sectionRef,
    introRef,
    titleGroupRef,
    logoWrapRef,
    mainWordRef,
}: HeroViewProps) {
    return (
        <div ref={sectionRef} className="flex flex-col items-center justify-center">
            <div ref={introRef} className="flex items-center justify-end font-bold w-full h-full transform-gpu will-change-transform">
                <div className="max-w-lg flex items-center justify-center">
                    <span className="text-5xl text-wrap text-right">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae tortor varius.
                    </span>
                </div>
            </div>
            <div className="w-full h-full laptop:mt-32">
                <div ref={titleGroupRef} className="relative inline-block test transform-gpu will-change-transform">
                    <div ref={logoWrapRef} className="absolute transform-gpu will-change-transform">
                        <Image className="size-auto" src="/orkait.svg" alt="Orkait Logo Fin" width={200} height={200} />
                    </div>

                    <div
                        ref={mainWordRef}
                        style={{
                            lineHeight: "0.76",
                        }}
                        className="text-[200px] font-bold leading-none mt-24 transform-gpu will-change-transform"
                    >
                        ORKAIT
                    </div>

                    <div
                        className="text-[200px] font-bold leading-none opacity-40 -scale-y-100"
                        style={{
                            lineHeight: "0.76",
                            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 80%)",
                            maskImage: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 100%)",
                        }}
                    >
                        ORKAIT
                    </div>
                </div>
            </div>
        </div>
    );
}

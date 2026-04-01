"use client";

import Image from "next/image";
import { CardSwap, Card } from "@/components/ui/card-swap";
import { PROJECTS, OSS_PROJECTS } from "@/data/projects";

const SHOWCASE_ITEMS = [
    ...PROJECTS.map((p) => ({ id: p.id, title: p.title, imageSrc: p.image.src })),
    ...OSS_PROJECTS
        .filter((p) => p.image)
        .map((p) => ({ id: p.id, title: p.title, imageSrc: p.image!.src })),
].slice(0, 4);

const Flash = () => {
    return (
        <div className="w-full mt-5 tablet:mt-0">
            {/* Mobile view */}
            <div className="tablet:hidden flex flex-col gap-8 px-4 py-8">
                <div className="flex flex-col gap-4">
                    <p className="text-muted-foreground font-medium text-body leading-none tracking-widest uppercase">
                        Our Focus
                    </p>
                    <h2 className="text-foreground font-bold text-[28px] leading-[34px] tracking-tight">
                        Systems that hold up<br />
                        under pressure.
                    </h2>
                    <p className="text-muted-foreground font-medium text-[14px] leading-[20px] max-w-[320px]">
                        From dashboards to scalable backends, we ship software built
                        for real workloads — not demos.
                    </p>
                </div>

                <div className="h-[380px] overflow-hidden flex items-end justify-center">
                    <div className="scale-[0.65] origin-bottom">
                        <CardSwap
                            cardDistance={50}
                            verticalDistance={105}
                            skewAmount={0}
                            easing="linear"
                            pauseOnHover
                            width={500}
                            height={380}
                        >
                            {SHOWCASE_ITEMS.map((item) => (
                                <Card key={item.id}>
                                    <Image
                                        src={item.imageSrc}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        sizes="500px"
                                    />
                                </Card>
                            ))}
                        </CardSwap>
                    </div>
                </div>
            </div>

            {/* Tablet / Laptop view */}
            <div className="hidden tablet:flex h-[550px] laptop:h-[700px] overflow-hidden">
                {/* Left: text — flush left, vertically centered */}
                <div className="flex items-center px-8 laptop:px-12 base:px-16">
                    <div className="flex flex-col gap-6 laptop:gap-8 max-w-[420px] laptop:max-w-[480px]">
                        <p className="text-muted-foreground font-medium text-body-lg leading-body-lg tracking-widest uppercase">
                            Our Focus
                        </p>
                        <h2 className="text-foreground font-bold text-title-1 leading-title-1 laptop:text-heading laptop:leading-heading tracking-tight">
                            Systems that hold up under pressure.
                        </h2>
                        <p className="text-muted-foreground font-medium text-body laptop:text-body-lg leading-body laptop:leading-body-lg max-w-[380px]">
                            From dashboards to scalable backends, we ship software built
                            for real workloads — not demos.
                        </p>
                    </div>
                </div>

                {/* Right: card swap — pushed to the right edge */}
                <div className="ml-auto flex items-end justify-end pr-8 laptop:pr-12 base:pr-16 pb-8 laptop:pb-12">
                    <div className="tablet:scale-[0.75] laptop:scale-90 base:scale-100 origin-bottom-right">
                        <CardSwap
                            cardDistance={50}
                            verticalDistance={105}
                            skewAmount={0}
                            easing="linear"
                            pauseOnHover
                            width={560}
                            height={400}
                        >
                            {SHOWCASE_ITEMS.map((item) => (
                                <Card key={item.id}>
                                    <Image
                                        src={item.imageSrc}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        sizes="560px"
                                    />
                                </Card>
                            ))}
                        </CardSwap>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Flash;

"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CardSwap, Card } from "@/components/ui/card-swap";
import { ProjectAvatar } from "@/components/shared/project-avatar";
import { PROJECTS, OSS_PROJECTS } from "@/data/projects";

type ShowcaseItem = {
    id: string;
    title: string;
    subtitle: string;
    href: string;
    imageSrc: string | null;
};

const ALL_ITEMS: ShowcaseItem[] = [
    ...PROJECTS.map((p) => ({
        id: p.id,
        title: p.title,
        subtitle: p.services,
        href: p.href,
        imageSrc: p.image.src,
    })),
    ...OSS_PROJECTS
        .filter((p) => !p.hidden)
        .map((p) => ({
            id: p.id,
            title: p.title,
            subtitle: p.tags,
            href: p.href,
            imageSrc: p.image?.src ?? null,
        })),
];

const SHOWCASE_ORDER = ["rustbox", "gatekeeper", "booleanstack", "unified-mcp"];
const SHOWCASE_ITEMS: ShowcaseItem[] = SHOWCASE_ORDER
    .map((id) => ALL_ITEMS.find((item) => item.id === id))
    .filter((item): item is ShowcaseItem => item !== undefined);

function HoverOverlay({ href }: { href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
        >
            <span className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-white text-sm font-semibold text-foreground">
                Visit Site <ArrowUpRight className="size-4" />
            </span>
        </a>
    );
}

function CardContent({ item }: { item: ShowcaseItem }) {
    if (item.imageSrc) {
        return (
            <>
                <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="560px"
                />
                <HoverOverlay href={item.href} />
            </>
        );
    }

    return (
        <>
            <div className="absolute inset-0 bg-[#f7f7f7] flex flex-col items-center justify-center gap-4 p-6">
                <ProjectAvatar name={item.id} size={128} className="w-24 h-24" />
                <div className="flex flex-col items-center gap-2 text-center">
                    <span className="text-subtitle leading-subtitle font-bold text-foreground tracking-tight">
                        {item.title}
                    </span>
                    <span className="text-body leading-body font-medium text-muted-foreground">
                        {item.subtitle}
                    </span>
                </div>
            </div>
            <HoverOverlay href={item.href} />
        </>
    );
}

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
                                                        pauseOnHover
                            width={480}
                            height={270}
                        >
                            {SHOWCASE_ITEMS.map((item) => (
                                <Card key={item.id}>
                                    <CardContent item={item} />
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
                                                        pauseOnHover
                            width={560}
                            height={315}
                        >
                            {SHOWCASE_ITEMS.map((item) => (
                                <Card key={item.id}>
                                    <CardContent item={item} />
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

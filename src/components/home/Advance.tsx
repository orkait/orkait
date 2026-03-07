import Image from "next/image";

import { CAPABILITIES_LEFT, CAPABILITIES_RIGHT } from "@/constants";

const Advance = () => {
    return (
        <div className="relative mt-16 laptop:mt-32 min-h-[800px] flex flex-col justify-between">
            {/* Decorative stripe pattern — right side */}
            <div className="absolute top-0 right-[calc(50%-50vw)] h-full w-[50vw] pointer-events-none flex items-center justify-end">
                <Image
                    src="/homepage/uniq_1.svg"
                    alt=""
                    fill
                    className="object-cover object-right"
                    aria-hidden
                />
                {/* Fade right edge → background */}
                <div className="fade-edge-right absolute inset-0 mix-blend-multiply" />
                {/* Fade left edge → background */}
                <div className="fade-edge-left absolute inset-0 mix-blend-multiply" />
            </div>

            {/* Main content */}
            <div className="relative flex flex-col gap-16 max-w-full tablet:max-w-[80%] laptop:max-w-[60%]">

                {/* Heading */}
                <h2 className="text-foreground font-medium text-title-1 phone:text-heading leading-title-1 phone:leading-heading tracking-tight">
                    High Performance scalable solutions
                </h2>

                {/* 2-col capability list */}
                <div className="grid grid-cols-1 phone:grid-cols-2 gap-x-16 gap-y-6">
                    <div className="flex flex-col gap-6">
                        {CAPABILITIES_LEFT.map((item) => (
                            <p
                                key={item}
                                className="text-foreground font-medium text-subtitle leading-subtitle"
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                    <div className="flex flex-col gap-6">
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

            {/* Section label — bottom */}
            <p className="mt-16 text-foreground font-medium text-body-lg leading-body-lg">
                (04) ADV
            </p>
        </div>
    );
};

export default Advance;
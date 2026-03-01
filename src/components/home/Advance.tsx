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

const Advance = () => {
    return (
        <div className="relative mt-16 laptop:mt-32 overflow-hidden min-h-[800px]">
            {/* Decorative stripe pattern — right side */}
            <div className="absolute top-0 right-0 h-full w-1/2 pointer-events-none flex items-center justify-end">
                <Image
                    src="/homepage/uniq_1.svg"
                    alt=""
                    width={556}
                    height={777}
                    className="h-full w-auto object-contain"
                    aria-hidden
                />
                {/* Fade right edge → background */}
                <div className="fade-edge-right" />
                {/* Fade left edge → background */}
                <div className="fade-edge-left" />
            </div>

            {/* Main content */}
            <div className="relative flex flex-col gap-16 max-w-[60%]">

                {/* Heading */}
                <h2 className="text-foreground font-medium text-heading leading-heading tracking-tight">
                    High Performance scalable solutions
                </h2>

                {/* 2-col capability list */}
                <div className="grid grid-cols-2 gap-x-16 gap-y-6">
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

            {/* Section label — pinned bottom-left */}
            <p className="absolute bottom-0 left-0 text-foreground font-medium text-body-lg leading-body-lg">
                (04) ADV
            </p>
        </div>
    );
};

export default Advance;
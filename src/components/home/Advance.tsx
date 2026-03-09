import Image from "next/image";

import { CAPABILITIES_LEFT, CAPABILITIES_RIGHT } from "@/constants";

const Advance = () => {
    return (
        <div className="relative mt-16 base:mt-32 tablet:min-h-[400px] laptop:min-h-[800px] flex flex-col tablet:justify-between">
            {/* Desktop decorative stripe pattern */}
            <div 
                className="hidden tablet:flex absolute top-0 right-[calc(50%-50vw)] h-full w-[35vw] pointer-events-none items-center justify-end overflow-hidden"
                style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, black 40%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%)'
                }}
            >
                <Image
                    src="/homepage/uniq_1.svg"
                    alt=""
                    fill
                    className="object-cover object-right"
                    aria-hidden
                />
                <div className="fade-edge-right absolute inset-0 mix-blend-multiply" />
                <div className="fade-edge-left absolute inset-0 mix-blend-multiply" />
            </div>

            {/* Main content */}
            <div className="relative flex flex-col gap-4 tablet:gap-16 max-w-full laptop:max-w-[80%] base:max-w-[60%]">

                {/* Mobile Section label — top */}
                <p className="tablet:hidden text-foreground font-medium text-[14px] leading-[20px] mb-[16px]">
                    (04) ADV
                </p>

                {/* Heading (Hidden on Mobile) */}
                <h2 className="hidden tablet:block text-foreground font-medium text-title-1 tablet:text-heading leading-title-1 tablet:leading-heading tracking-tight">
                    High Performance scalable solutions
                </h2>

                {/* Features container (Relative wrapper to bind gradient height) */}
                <div className="relative w-full">
                    {/* Mobile decorative stripe pattern */}
                    <div 
                        className="tablet:hidden absolute top-0 right-[-16px] h-full w-[45vw] pointer-events-none overflow-hidden"
                        style={{
                            maskImage: 'linear-gradient(to right, transparent 0%, black 60%)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 60%)'
                        }}
                    >
                        <Image
                            src="/homepage/uniq_1.svg"
                            alt=""
                            fill
                            className="object-cover object-right translate-x-[15%]"
                            aria-hidden
                        />
                        {/* Vertical gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent mix-blend-multiply" />
                    </div>

                    {/* Capability list */}
                    <div className="grid grid-cols-1 tablet:grid-cols-2 gap-x-16 gap-y-[16px] tablet:gap-y-6 relative z-10 w-[70%] tablet:w-full">
                        <div className="flex flex-col gap-[16px] tablet:gap-6">
                            {CAPABILITIES_LEFT.map((item) => (
                                <div key={item} className="flex flex-col h-[34px] tablet:h-auto justify-center">
                                    <p className="text-foreground font-medium text-[14px] leading-[20px] tablet:text-subtitle tablet:leading-subtitle">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-[16px] tablet:gap-6">
                            {CAPABILITIES_RIGHT.map((item) => (
                                <div key={item} className="flex flex-col h-[34px] tablet:h-auto justify-center">
                                    <p className="text-foreground font-medium text-[14px] leading-[20px] tablet:text-subtitle tablet:leading-subtitle">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* Section label — bottom (Hidden on Mobile) */}
            <p className="hidden tablet:block mt-16 text-foreground font-medium text-body-lg leading-body-lg">
                (04) ADV
            </p>
        </div>
    );
};

export default Advance;
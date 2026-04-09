import Image from "next/image";
import { CAPABILITIES_LEFT, CAPABILITIES_RIGHT } from "@/constants";

const Advance = () => {
    return (
        <div className="relative mt-12 base:mt-24 tablet:min-h-[400px] laptop:min-h-[800px] flex flex-col tablet:justify-between overflow-x-clip">
            {/* Desktop decorative stripe pattern */}
            <div className="hidden tablet:flex absolute inset-y-0 right-0 h-full w-[35vw] max-w-[32rem] pointer-events-none items-center justify-end overflow-hidden">
                <Image
                    src="/data/homepage/graphic-container.svg"
                    alt=""
                    fill
                    className="object-contain object-right"
                    aria-hidden
                />
                <div className="absolute inset-0 bg-white/10" aria-hidden />
            </div>

            {/* Main content */}
            <div className="relative flex flex-col gap-10 tablet:gap-16 max-w-full laptop:max-w-[80%] base:max-w-[60%]">

                {/* Mobile Section label — top */}
                <p className="tablet:hidden text-foreground font-medium text-[14px] leading-[20px]">
                    (03) ADV
                </p>

                <h2 className="tablet:hidden max-w-[12ch] text-[24px] font-medium leading-[30px] tracking-tight text-foreground">
                    High-performance scalable solutions
                </h2>

                {/* Heading (Hidden on Mobile) */}
                <h2 className="hidden tablet:block text-foreground font-medium text-title-1 tablet:text-heading leading-title-1 tablet:leading-heading tracking-tight">
                    High-Performance Scalable Solutions
                </h2>

                {/* Features container (Relative wrapper to bind gradient height) */}
                <div className="relative w-full">
                    {/* Mobile decorative stripe pattern */}
                    <div className="tablet:hidden absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="relative h-[220px] w-[168px]">
                            <Image
                                src="/data/homepage/graphic-container.svg"
                                alt=""
                                fill
                                className="object-contain object-right"
                                aria-hidden
                            />
                            <div className="absolute inset-0 bg-white/10" aria-hidden />
                        </div>
                    </div>

                    {/* Capability list */}
                    <div className="grid grid-cols-1 tablet:grid-cols-2 gap-x-16 gap-y-4 tablet:gap-y-6 relative z-10 w-[82%] tablet:w-full">
                        <div className="flex flex-col gap-4 tablet:gap-6">
                            {CAPABILITIES_LEFT.map((item) => (
                                <div key={item} className="flex flex-col h-[34px] tablet:h-auto justify-center">
                                    <p className="text-foreground font-medium text-[14px] leading-[20px] tablet:text-subtitle tablet:leading-subtitle">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4 tablet:gap-6">
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
            <p className="hidden tablet:block mt-12 text-foreground font-medium text-body-lg leading-body-lg">
                (03) ADV
            </p>
        </div>
    );
};

export default Advance;

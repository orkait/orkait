import Image from "next/image";
import { SERVICES } from "@/constants";

const ServicesText = () => {
    return (
        <div className="flex flex-col base:flex-row justify-between items-start mt-16 base:mt-32 gap-16 w-full">
            {/* Left: image + sub-tags (Hidden on Mobile) */}
            <div className="hidden tablet:flex flex-col tablet:flex-row tablet:items-end gap-6 shrink-0 order-2 base:order-1">
                <div className="relative w-full tablet:w-[500px] max-w-full aspect-square">
                    <Image
                        src="https://placehold.co/500x500/webp"
                        alt="Services"
                        fill
                        className="rounded-sm object-cover"
                    />
                </div>
                {/* Tag list Desktop ONLY */}
                <div className="flex flex-col gap-1 pb-2 shrink-0">
                    <p className="text-foreground font-medium text-body leading-body">
                        Developer Tools
                    </p>
                    <p className="text-foreground font-medium text-body leading-body">
                        Infrastructure Platforms
                    </p>
                    <p className="text-foreground font-medium text-body leading-body">
                        Analytics
                    </p>
                </div>
            </div>

            {/* Right: label + stacked service names */}
            <div className="flex flex-col gap-4 tablet:gap-2 mt-0 base:mt-12 items-start tablet:items-start base:items-end w-full order-1 base:order-2">
                <span className="text-foreground font-medium text-[14px] leading-[20px] tablet:text-body-lg tablet:leading-body-lg self-start">
                    (02) SERVICES
                </span>
                
                {/* Mobile side-by-side Wrapper */}
                <div className="flex flex-row justify-between w-full tablet:flex-col tablet:items-start base:items-end">
                    
                    {/* Main Service List */}
                    <div className="flex flex-col gap-1 tablet:gap-0">
                        {SERVICES.map(({ label, active }) => (
                            <p
                                key={label}
                                className={`max-w-fit font-bold tablet:font-medium text-[32px] leading-[normal] tracking-tight tablet:text-title-1 laptop:text-heading tablet:leading-title-1 laptop:leading-heading ${
                                    active 
                                      ? "text-foreground" 
                                      : "text-black/5 dark:text-white/5 tablet:text-muted-foreground tablet:dark:text-muted-foreground"
                                }`}
                            >
                                {label}
                            </p>
                        ))}
                    </div>

                    {/* Sub-tags / Right column exclusively on Mobile (hidden tablet and up) */}
                    <div className="flex flex-col gap-1 pt-2 shrink-0 tablet:hidden">
                        <p className="text-foreground font-medium text-[14px] leading-[20px]">Developer Tools</p>
                        <p className="text-foreground font-medium text-[14px] leading-[20px]">Infrastructure</p>
                        <p className="text-foreground font-medium text-[14px] leading-[20px]">Platforms</p>
                        <p className="text-foreground font-medium text-[14px] leading-[20px]">Analytics</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesText;

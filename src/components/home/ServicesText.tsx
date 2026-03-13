import Image from "next/image";
import { SERVICES } from "@/constants";

const ServicesText = () => {
    return (
        <div className="w-full relative">
        <div className="tablet:hidden flex flex-col items-start mt-16 gap-16 w-full">
                <div className="flex flex-col gap-4 items-start w-full">
                    <span className="text-foreground font-medium text-[14px] leading-[20px] self-start">
                        (02) SERVICES
                    </span>
                    <div className="flex flex-row justify-between w-full">
                        <div className="flex flex-col gap-1">
                            {SERVICES.map(({ label, active }) => (
                                <p
                                    key={label}
                                    className={`max-w-fit font-bold text-[32px] leading-[normal] tracking-tight ${
                                        active ? "text-foreground" : "text-black/5"
                                    }`}
                                >
                                    {label}
                                </p>
                            ))}
                        </div>
                        <div className="flex flex-col gap-1 pt-2 shrink-0">
                            <p className="text-foreground font-medium text-[14px] leading-[20px]">Developer Tools</p>
                            <p className="text-foreground font-medium text-[14px] leading-[20px]">Infrastructure</p>
                            <p className="text-foreground font-medium text-[14px] leading-[20px]">Platforms</p>
                            <p className="text-foreground font-medium text-[14px] leading-[20px]">Analytics</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tablet/laptop view */}
            <div className="hidden tablet:flex flex-row justify-between items-start mt-32 gap-16 w-full overflow-visible">
                {/* Image + tag list */}
                <div className="flex flex-row items-end gap-10 shrink-0">
                    <div className="relative w-[500px] aspect-square rounded-sm overflow-hidden bg-muted">
                        <Image
                            src="/homepage/studio-side.png"
                            alt="Orkait engineering services"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-1 pb-2">
                        <p className="text-foreground font-medium text-body leading-body">Developer Tools</p>
                        <p className="text-foreground font-medium text-body leading-body">Infrastructure Platforms</p>
                        <p className="text-foreground font-medium text-body leading-body">Analytics</p>
                    </div>
                </div>

                {/* Label + services list */}
                <div className="flex flex-col items-start gap-4">
                    <span className="text-muted-foreground font-medium text-body-lg leading-body-lg uppercase tracking-widest pl-0">
                        (02) SERVICES
                    </span>
                    
                    <div className="flex flex-col">
                        {SERVICES.map(({ label, active }) => (
                            <p
                                key={label}
                                className={`font-medium tablet:text-title-1 laptop:text-heading leading-tight tracking-tight ${
                                    active 
                                      ? "text-foreground" 
                                      : "text-muted-foreground/30 dark:text-white/10"
                                }`}
                            >
                                {label}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesText;

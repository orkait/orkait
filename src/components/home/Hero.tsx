import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";

export const Hero = () => {
    return (
        <div className="w-full relative overflow-visible">
            {/* Mobile view */}
            <div className="tablet:hidden flex flex-col gap-14 pt-4 pb-4">
                <div className="flex w-full justify-end">
                    <div className="flex w-full max-w-[320px] flex-col items-end gap-8">
                        <span className="w-full max-w-[320px] text-right text-[22px] font-medium leading-[24px] tracking-[-0.04em] text-foreground text-wrap">
                            We engineer software that works. Reliable systems, honest engineering, no hype.
                        </span>
                        <Button asChild className="inline-flex px-4 py-2 justify-center items-center gap-[10px] rounded-md bg-foreground text-white hover:bg-slate-900/90 h-auto font-normal text-base">
                            <Link href={routes.contact}>Talk to Us</Link>
                        </Button>
                    </div>
                </div>

                <div className="flex w-full justify-start pt-6">
                    <div className="relative inline-flex flex-col">
                        <Image
                            className="absolute aspect-square size-[72px] -rotate-[4.672deg] -top-[52px] left-0"
                            src="/data/brand/orkait.svg"
                            alt="Orkait Logo Fin"
                            width={200}
                            height={200}
                            style={{ objectFit: "contain" }}
                        />

                        <div
                            className="text-[clamp(4.5rem,24vw,5.6rem)] font-bold tracking-[-0.05em] text-foreground"
                            style={{ lineHeight: "0.8" }}
                        >
                            ORKAIT
                        </div>

                        <div
                            className="text-[clamp(4.5rem,24vw,5.6rem)] font-bold tracking-[-0.05em] text-foreground/12 -scale-y-100"
                            style={{
                                lineHeight: "0.8",
                                WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 80%)",
                                maskImage: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 100%)",
                            }}
                        >
                            ORKAIT
                        </div>
                    </div>
                </div>
            </div>

            {/* Tablet/laptop view */}
            <div className="hidden tablet:block relative w-full h-[600px] laptop:h-[750px] overflow-visible">
                {/* Tagline */}
                <div className="absolute right-0 tablet:top-6 laptop:top-[12px] w-full max-w-[450px] laptop:max-w-[1000px] z-20">
                    <p className="tablet:text-[36px] laptop:text-[52px] font-bold leading-tight laptop:leading-[50px] tracking-[-0.96px] text-black text-right">
                        We engineer software that works.<br />
                        Honest engineering.<br />
                        Reliable systems.<br />
                        No hype.
                    </p>
                </div>

                {/* Brand group */}
                <div className="absolute left-0 tablet:top-[200px] laptop:top-[240px] flex items-start">
                    <div className="relative transition-all duration-500">
                        
                        {/* Logo fin */}
                        <div className="absolute tablet:-top-[95px] tablet:left-[-10px] laptop:-top-[70px] laptop:left-[-10px] z-10 pointer-events-none">
                            <div className="rotate-[-5deg] transition-transform duration-300">
                                <Image
                                    className="tablet:w-[180px] tablet:h-[180px] laptop:w-[240px] laptop:h-[240px]"
                                    src="/data/brand/orkait.svg"
                                    alt="Orkait Fin Logo"
                                    width={240}
                                    height={240}
                                    priority
                                    style={{ objectFit: "contain" }}
                                />
                            </div>
                        </div>

                        {/* "ORKAIT" heading */}
                        <div 
                            className="tablet:text-[140px] laptop:text-[230.4px] font-bold text-black tracking-normal tablet:mt-[80px] laptop:mt-[110px] ml-0 transition-all duration-300"
                            style={{ lineHeight: "0.76" }}
                        >
                            ORKAIT
                        </div>
                        
                        {/* Reflection */}
                        <div
                            className="tablet:text-[140px] laptop:text-[230.4px] font-bold text-black opacity-30 -scale-y-100 pointer-events-none ml-0 transition-all duration-300"
                            style={{
                                lineHeight: "0.76",
                                maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 80%)",
                                WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 80%)",
                            }}
                        >
                            ORKAIT
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop spacer */}
            <div className="hidden tablet:block h-[64px]" />
        </div>
    );
};

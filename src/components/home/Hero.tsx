import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";

export const Hero = () => {
    return (
        <div className="w-full relative overflow-visible">
            {/* --- MOBILE VIEW (RESTORED EXACTLY) --- */}
            <div className="tablet:hidden flex flex-col items-center justify-center">
                <div className="flex items-center justify-end font-bold w-full h-full ">
                    <div className="max-w-lg flex flex-col items-end justify-center gap-[68px] mt-4 px-4">
                        <span className="w-full max-w-[334px] text-[24px] font-medium leading-[24px] tracking-[-1.55px] text-black text-right text-wrap">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae tortor varius.
                        </span>
                        <Button asChild className="inline-flex px-4 py-2 justify-center items-center gap-[10px] rounded-md bg-slate-900 text-white hover:bg-slate-900/90 h-auto font-normal text-base">
                            <Link href={routes.contact}>Contact Us</Link>
                        </Button>
                    </div>
                </div>
                <div className="w-full h-full mt-[168px] flex flex-col items-end justify-end">
                    <div className="relative inline-block mt-4">
                        <Image
                            className="absolute aspect-square w-[90px] h-[90px] -rotate-[4.672deg] -top-[75px] -left-3"
                            src="/orkait.svg"
                            alt="Orkait Logo Fin"
                            width={200}
                            height={200}
                            style={{ objectFit: "contain" }}
                        />

                        <div 
                            className="text-[92.774px] font-bold text-black mt-0"
                            style={{ lineHeight: "0.76" }}
                        >
                            ORKAIT
                        </div>
                        
                        <div
                            className="text-[92.774px] font-bold text-black opacity-40 -scale-y-100"
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

            {/* --- TABLET/LAPTOP VIEW (REFINED FIGMA DESIGN) --- */}
            <div className="hidden tablet:block relative w-full h-[600px] laptop:h-[750px] overflow-visible">
                {/* Tagline Section */}
                <div className="absolute right-0 tablet:top-6 laptop:top-[12px] w-full max-w-[450px] laptop:max-w-[512px] z-20">
                    <p className="tablet:text-[36px] laptop:text-title-2 font-bold leading-tight laptop:leading-[50px] tracking-[-0.96px] text-black text-right">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae tortor varius.
                    </p>
                </div>

                {/* Brand Group */}
                <div className="absolute left-0 tablet:top-[200px] laptop:top-[240px] flex items-start">
                    <div className="relative transition-all duration-500">
                        
                        {/* Logo Fin */}
                        <div className="absolute tablet:-top-[110px] tablet:left-[-20px] laptop:top-[-90px] laptop:left-[-20px] z-10 pointer-events-none">
                            <div className="rotate-[-4.67deg] transition-transform duration-300">
                                <Image
                                    className="tablet:w-[180px] tablet:h-[180px] laptop:w-[240px] laptop:h-[240px]"
                                    src="/orkait.svg"
                                    alt="Orkait Fin Logo"
                                    width={240}
                                    height={240}
                                    priority
                                    style={{ objectFit: "contain" }}
                                />
                            </div>
                        </div>

                        {/* Main "ORKAIT" Text */}
                        <div 
                            className="tablet:text-[140px] laptop:text-[230.4px] font-bold text-black tracking-normal tablet:mt-[80px] laptop:mt-[110px] ml-0 transition-all duration-300"
                            style={{ lineHeight: "0.76" }}
                        >
                            ORKAIT
                        </div>
                        
                        {/* Reflection Text */}
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

            {/* Bottom spacer for absolute laptop layout - Exactly 64px */}
            <div className="hidden tablet:block h-[64px]" />
        </div>
    );
};

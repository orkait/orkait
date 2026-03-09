import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";

export const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-end font-bold w-full h-full ">
                <div className="max-w-lg flex flex-col items-end justify-center gap-[68px] tablet:gap-6 mt-4">
                    <span className="w-[334px] w-full max-w-full tablet:max-w-none tablet:w-auto text-[24px] tablet:text-4xl laptop:text-5xl font-medium leading-[24px] tablet:leading-tight tracking-[-1.55px] tablet:tracking-normal text-black text-right text-wrap">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae tortor varius.
                    </span>
                    <Button asChild className="tablet:hidden inline-flex px-4 py-2 justify-center items-center gap-[10px] rounded-md bg-slate-900 text-white hover:bg-slate-900/90 h-auto font-normal text-base">
                        <Link href={routes.contact}>Contact Us</Link>
                    </Button>
                </div>
            </div>
            <div className="w-full h-full mt-[168px] tablet:mt-16 laptop:mt-32 flex flex-col items-end tablet:items-center justify-end tablet:justify-center">
                <div className="relative inline-block mt-4">
                    <Image
                        className="absolute aspect-square w-[90px] h-[90px] -rotate-[4.672deg] -top-[75px] -left-3 tablet:-rotate-4 tablet:w-[200px] tablet:h-[200px] tablet:top-[-40px] tablet:left-[-30px]"
                        src="/orkait.svg"
                        alt="Orkait Logo Fin"
                        width={200}
                        height={200}
                        style={{ objectFit: "contain" }}
                    />

                    <div 
                        className="text-[92.774px] tablet:text-[140px] laptop:text-[200px] font-bold text-black mt-0 tablet:mt-24"
                        style={{ lineHeight: "0.76" }}
                    >
                        ORKAIT
                    </div>
                    
                    <div
                        className="text-[92.774px] tablet:text-[140px] laptop:text-[200px] font-bold text-black opacity-40 -scale-y-100"
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
    );
};

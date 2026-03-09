import Image from "next/image";
import { Button } from "@/components/ui/button";

const StudioText = () => {
    return (
        <div className="w-full relative overflow-visible">
            {/* Mobile view */}
            <div className="tablet:hidden flex flex-col items-start mt-16 w-full">
                <div className="w-full">
                    <span className="float-left mr-4 pt-1">
                        <p className="text-muted-foreground font-medium text-body leading-none tracking-widest uppercase">
                            (01) Studio
                        </p>
                    </span>
                    <h2 className="text-foreground font-medium text-subtitle leading-tight tracking-tight">
                        We craft digital experiences that inspire, empowering businesses to
                        thrive in the digital world.
                    </h2>
                </div>

                <div className="mt-16 flex flex-col gap-8 items-start w-full">
                    <div className="w-full relative shrink-0 rounded-[3px] overflow-hidden aspect-[340/375] bg-muted">
                        <Image
                            src="/homepage/studio-side.png"
                            alt="Orkait studio space"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex flex-col gap-6 w-full">
                        <div className="pr-[16px]">
                            <p className="text-foreground font-medium text-[14px] leading-[20px]">
                                We are Orkait, a service provider dedicated to crafting digital
                                experiences that inspire. Our expertise spans three core domains: web
                                app development, software solutions, and enterprise scaling &amp;
                                deployment.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-7 mt-4">
                            <p className="text-foreground font-medium text-[14px] leading-[20px] text-right pl-[50px]">
                                We work with small enterprises to help them compete and grow in
                                today&apos;s digital landscape. Our team combines technical excellence
                                with creative vision to deliver solutions that make a real difference.
                            </p>
                            <Button className="px-4 py-2 h-auto text-[14px] font-medium rounded-[6px]" variant="default">
                                About Us
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tablet/laptop view */}
            <div className="hidden tablet:block flex flex-col items-start mt-16 base:mt-32 w-full">
                <div className="w-full block">
                    <div className="float-left tablet:w-[150px] laptop:w-[200px] mb-4 tablet:mb-0">
                        <p className="text-muted-foreground font-medium text-body leading-none tablet:leading-body tracking-widest uppercase pt-2">
                            (01) Studio
                        </p>
                    </div>
                    <h2 className="text-foreground font-medium text-subtitle tablet:text-title-1 laptop:text-heading leading-tight tablet:leading-title-1 laptop:leading-heading tracking-tight max-w-[1400px] block">
                        We craft digital experiences that inspire, empowering businesses to
                        thrive in the digital world.
                    </h2>
                </div>
                
                <div className="clear-both" />

                <div className="mt-16 laptop:mt-32 grid grid-cols-1 tablet:grid-cols-1 laptop:grid-cols-3 gap-8 laptop:gap-8 base:gap-12 items-start w-full">
                    
                    {/* Image column */}
                    <div className="w-full relative shrink-0 rounded-[3px] overflow-hidden aspect-[340/375] laptop:aspect-[291/322] bg-muted">
                        <Image
                            src="/homepage/studio-side.png"
                            alt="Orkait studio space"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="laptop:max-w-[311px] laptop:ml-24">
                        <p className="text-foreground font-medium text-[14px] leading-[20px] tablet:text-body laptop:text-body-lg tablet:leading-body laptop:leading-body-lg">
                            We are Orkait, a service provider dedicated to crafting digital
                            experiences that inspire. Our expertise spans three core domains: web
                            app development, software solutions, and enterprise scaling &amp;
                            deployment.
                        </p>
                    </div>

                    {/* Second description + CTA */}
                    <div className="flex flex-col items-start gap-8 laptop:max-w-[280px]">
                        <p className="text-foreground font-medium text-[14px] leading-[20px] tablet:text-body laptop:text-body-lg tablet:leading-body laptop:leading-body-lg">
                            We work with small enterprises to help them compete and grow in
                            today&apos;s digital landscape. Our team combines technical excellence
                            with creative vision to deliver solutions that make a real difference.
                        </p>
                        <Button className="px-4 py-2 h-auto text-[14px] tablet:text-base font-medium rounded-[6px] bg-black text-white hover:bg-black/90" variant="default">
                            About Us
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudioText;

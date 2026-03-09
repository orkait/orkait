import Image from "next/image";
import { Button } from "@/components/ui/button";

const StudioText = () => {
    return (
        <div className="flex flex-col items-start mt-16 base:mt-32 w-full">
            <div className="w-full">
                <span className="float-left mr-4 pt-1 tablet:w-[200px] tablet:mr-0 tablet:pt-4">
                    <p className="text-muted-foreground font-medium text-body leading-none tablet:leading-body tracking-widest uppercase">
                        (01) Studio
                    </p>
                </span>
                <h2 className="text-foreground font-medium text-subtitle tablet:text-title-1 laptop:text-heading leading-tight tablet:leading-title-1 laptop:leading-heading tracking-tight">
                    We craft digital experiences that inspire, empowering businesses to
                    thrive in the digital world.
                </h2>
            </div>

            <div className="mt-16 flex flex-col laptop:flex-row gap-8 laptop:gap-16 items-start w-full">
                <div className="w-full laptop:max-w-[300px] relative shrink-0 rounded-[3px] overflow-hidden aspect-[340/375] laptop:aspect-square bg-muted">
                    <Image
                        src="/homepage/studio-side.png"
                        alt="Orkait studio space"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex-1 grid grid-cols-1 laptop:grid-cols-2 gap-6 w-full">
                    {/* First body paragraph */}
                    <div className="pr-[16px] tablet:pr-0">
                        <p className="text-foreground font-medium text-[14px] leading-[20px] tablet:text-body laptop:text-body-lg tablet:leading-body laptop:leading-body-lg">
                            We are Orkait, a service provider dedicated to crafting digital
                            experiences that inspire. Our expertise spans three core domains: web
                            app development, software solutions, and enterprise scaling &amp;
                            deployment.
                        </p>
                    </div>

                    <div className="flex flex-col items-center tablet:items-start gap-7 mt-4">
                        {/* Second body paragraph + CTA */}
                        <p className="text-foreground font-medium text-[14px] leading-[20px] text-right pl-[50px] tablet:pl-0 tablet:text-left tablet:text-body laptop:text-body-lg tablet:leading-body laptop:leading-body-lg">
                            We work with small enterprises to help them compete and grow in
                            today&apos;s digital landscape. Our team combines technical excellence
                            with creative vision to deliver solutions that make a real difference.
                        </p>
                        <Button className="px-4 py-2 h-auto text-[14px] tablet:text-base font-medium rounded-[6px]" variant="default">
                            About Us
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudioText;

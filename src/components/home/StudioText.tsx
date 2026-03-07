import Image from "next/image";
import { Button } from "@/components/ui/button";

const StudioText = () => {
    return (
        <div className="flex flex-col items-start mt-32">
            <div className="w-full">
                <div className="float-left w-[120px] phone:w-[200px] pt-4">
                    <p className="text-muted-foreground font-medium text-body leading-body tracking-widest uppercase">
                        (01) Studio
                    </p>
                </div>
                <h2 className="text-foreground font-medium text-title-1 phone:text-heading leading-title-1 phone:leading-heading tracking-tight">
                    We craft digital experiences that inspire, empowering businesses to
                    thrive in the digital world.
                </h2>
            </div>


            <div className="mt-16 flex flex-col laptop:flex-row gap-8 laptop:gap-16 items-start w-full">
                <div className="bg-pink-500 w-full max-w-[300px] h-auto aspect-square relative shrink-0">
                    <Image
                        src="https://placehold.co/300x300/webp"
                        alt="Orkait studio space"
                        width={300}
                        height={300}
                    />
                </div>

                <div className="flex-1 grid grid-cols-1 phone:grid-cols-2 gap-6 w-full">
                    {/* Col 2: First body paragraph */}
                    <p className="text-foreground font-medium text-body-lg leading-body-lg">
                        We are Orkait, a service provider dedicated to crafting digital
                        experiences that inspire. Our expertise spans three core domains: web
                        app development, software solutions, and enterprise scaling &amp;
                        deployment.
                    </p>

                    <div className="flex flex-col items-start">
                        {/* Col 3: Second body paragraph + CTA */}
                        <p className="text-foreground font-medium text-body-lg leading-body-lg">
                            We work with small enterprises to help them compete and grow in
                            today&apos;s digital landscape. Our team combines technical excellence
                            with creative vision to deliver solutions that make a real difference.
                        </p>
                        <Button className="mt-7" variant="default" size="lg">
                            About Us
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudioText;

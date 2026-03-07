import Image from "next/image";

export const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-end font-bold w-full h-full ">
                <div className="max-w-lg flex items-center justify-center">
                    <span className="text-5xl text-wrap text-right ">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae tortor varius.
                    </span>
                </div>
            </div>
            <div className="w-full h-full laptop:mt-32">
                <div className="relative inline-block">
                    <Image
                        className="absolute -rotate-4"
                        src="/orkait.svg"
                        alt="Orkait Logo Fin"
                        width={200}
                        height={200}
                        style={{ objectFit: "contain" }}
                    />

                    <div
                        style={{
                            lineHeight: "0.76"
                        }}
                        className="text-[200px] font-bold leading-none mt-24 ">
                        ORKAIT
                    </div>
                    
                    <div
                        className="text-[200px] font-bold leading-none opacity-40 -scale-y-100"
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

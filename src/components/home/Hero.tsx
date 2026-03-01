import Image from "next/image";
import { MessagesSquare } from "lucide-react";

export const Hero = () => {
    {/* The hero wrapper allows an explicit h-[814px] exception per TAILWIND_RULES.md */ }
    return (
        <section className="relative w-full mx-auto h-[814px] bg-white overflow-hidden">
            {/* Top paragraph - Positioned to the right exactly as in design */}
            <div className="absolute top-[148px] right-[24px] lg:right-[60px] max-w-lg z-20">
                <p className="font-['Satoshi:Bold',sans-serif] text-5xl font-bold leading-tight tracking-heading text-black text-right hidden lg:block">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae tortor varius.
                </p>
                <p className="font-['Satoshi:Bold',sans-serif] text-4xl font-bold leading-tight tracking-heading text-black text-right lg:hidden">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae tortor varius.
                </p>
            </div>

            {/* ORKAIT Brand & Reflection */}
            <div className="absolute left-[24px] lg:left-[56px] top-[400px]">
                {/* Logo Icon Positioned absolutely above and left of the 'O' */}
                <div
                    className="absolute w-[220px] h-[220px] lg:w-[280px] lg:h-[280px] rotate-[-4.67deg] z-10 pointer-events-none"
                    style={{ top: "-196px", left: "-32px" }}
                >
                    <Image
                        src="/90753497dc5ad75f1fc0894b4f5204f3274e85d8.png"
                        alt="Orkait Logo Mark"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Main Text */}
                <h1
                    className="font-['Satoshi:Bold',sans-serif] text-hero-mobile lg:text-display font-bold text-black tracking-tight"
                >
                    ORKAIT
                </h1>

                {/* Reflection Text */}
                <h1
                    className="font-['Satoshi:Bold',sans-serif] text-hero-mobile lg:text-display font-bold tracking-tight block relative z-0"
                    style={{
                        color: "transparent",
                        backgroundImage: "linear-gradient(to bottom, rgb(249, 249, 249) 0%, rgb(233, 233, 233) 40%, rgb(190, 190, 190) 80%, rgb(181, 181, 181) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        transform: "scaleY(-1)",
                        marginTop: "4px"
                    }}
                >
                    ORKAIT
                </h1>
            </div>

            {/* Floating Chatbot Widget positioned at exact coordinates bottom-ish right */}
            <div className="absolute top-[676px] right-[24px] lg:right-[40px] flex items-center justify-center size-18 bg-black rounded-full cursor-pointer hover:scale-105 transition-transform z-20">
                <div className="flex items-center justify-center size-16 rounded-full border border-white">
                    <MessagesSquare
                        size={28}
                        className="text-white"
                        strokeWidth={1.5}
                    />
                </div>
            </div>
        </section>
    );
};

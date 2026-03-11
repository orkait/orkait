import type { Metadata } from "next";
import { createPageMetadata } from "@/config/metadata";
import { GraphicContainer } from "@/components/about/graphic-container";
import { GraphicDesktop } from "@/components/about/graphic-desktop";
import { TeamCarousel } from "@/components/about/team-carousel";
import { Section } from "@/components/shared/section";

export const metadata: Metadata = createPageMetadata(
	"About",
	"Learn how Orkait helps teams launch and scale high-performance digital products."
);

export default function AboutPage() {
	return (
		<>
			{/* MOBILE VIEW - UNCHANGED */}
			<div className="block tablet:hidden w-full">
				<main className="relative w-full overflow-hidden pt-28 pb-20 px-5 flex flex-col font-sans">
					<div className="relative z-10 flex flex-col">
						<p className="text-[14px] font-medium leading-[20px] uppercase text-foreground mb-8">
							(01) OUR MISSION
						</p>

						<h1 className="text-[clamp(32px,9vw,40px)] font-bold leading-[1.05] uppercase text-foreground">
							WE CRAFT DIGITAL<br />
							EXPERIENCES THAT<br />
							INSPIRE
						</h1>

						<p className="text-[16px] font-medium leading-[22px] text-foreground mt-[220px] max-w-[65%]">
							Empowering businesses<br />
							to thrive in the digital<br />
							world.
						</p>
					</div>

					<div className="absolute right-[-2rem] top-[18rem] z-0 pointer-events-none origin-center rotate-45 scale-[1.15] opacity-90 will-change-transform">
						<GraphicContainer />
					</div>
				</main>
				<TeamCarousel />
			</div>

			{/* DESKTOP / LAPTOP VIEW - PIXEL PERFECT FIGMA POSITIONING */}
			<div className="hidden tablet:block w-full overflow-hidden">
				<main className="relative min-h-[850px] w-full bg-background font-sans">
					{/* (01) OUR MISSION - Top: 143px, Left: 64px */}
					<div className="absolute top-[143px] left-[64px] z-10">
						<p className="text-[19.8px] font-medium leading-[26px] text-foreground uppercase tracking-wide">
							(01) OUR MISSION
						</p>
					</div>

					{/* We Craft Digital... - Top: 189px, Left: 64px */}
					<div className="absolute top-[189px] left-[64px] z-10 w-[515px]">
						<h1 className="text-[64px] font-bold leading-[1.2] text-foreground tracking-[-1.55px]">
							We Craft Digital<br />
							Experiences that<br />
							Inspire
						</h1>
					</div>

					{/* Empowering... - Top: 496px, Left: 576px */}
					<div className="absolute top-[496px] left-[576px] z-10 w-[288px]">
						<p className="text-[32px] font-bold leading-[1.48] text-foreground tracking-[-0.64px] whitespace-pre-wrap">
							Empowering      businesses to{"\n"}
							thrive in the digital world.
						</p>
					</div>

					{/* Graphic Element - EXACT 60px margin from RIGHT edge */}
					<div className="absolute right-[60px] top-[77px] z-0 pointer-events-none w-[596px] h-[596px] flex items-center justify-center">
						<div className="rotate-45 scale-[1.0] laptop:scale-[1.1] desktop:scale-[1.2] opacity-80 will-change-transform">
							<GraphicDesktop />
						</div>
					</div>
				</main>

				<div className="mt-20">
					<TeamCarousel />
				</div>
			</div>
		</>
	);
}

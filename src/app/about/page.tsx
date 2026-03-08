import type { Metadata } from "next";
import { ContentPage } from "@/components/shared/content-page";
import { createPageMetadata } from "@/config/metadata";
import { routes } from "@/config/routes";

import { GraphicContainer } from "@/components/about/graphic-container";
import { TeamCarousel } from "@/components/about/team-carousel";

export const metadata: Metadata = createPageMetadata(
	"About",
	"Learn how Orkait helps teams launch and scale high-performance digital products."
);

export default function AboutPage() {
	return (
		<>
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
							Empowering businesses<br/>
							to thrive in the digital<br/>
							world.
						</p>
					</div>
					
					{/* The graphic container rotated 45 degrees to match the diamond design */}
					<div className="absolute right-[-4rem] top-[18rem] z-0 pointer-events-none origin-center rotate-45 scale-[1.3] opacity-90">
						<GraphicContainer />
					</div>
				</main>
				
				<TeamCarousel />
			</div>

			<div className="hidden tablet:block">
				<ContentPage
					eyebrow="(01) About"
					title="Building reliable digital products with speed and precision."
					description="Orkait partners with founders and teams to design, build, and scale products that are secure, maintainable, and ready for growth."
					links={[
						{ label: "View Services", href: routes.services },
						{ label: "Contact Us", href: routes.contact },
						{ label: "Our Team", href: routes.team },
					]}
				/>
			</div>
		</>
	);
}

import { Hero } from "@/components/home/Hero";
import StudioText from "@/components/home/StudioText";
import { Section } from "@/components/shared/section";
import ServicesText from "@/components/home/ServicesText";
import Advance from "@/components/home/Advance";
import Process from "@/components/home/Process";
import Feedback from "@/components/home/Feedback";
import Team from "@/components/Team";
import { ContactUs } from "@/components/home/ContactUs";
import { ProjectsGrid } from "@/components/sections/projects/projects-grid";
import { ProjectsMasonryGrid } from "@/components/sections/projects/projects-masonry-grid";
import { PricingTable } from "@/components/sections/pricing/pricing-table";
import { flag } from "@/config/feature-flag";

export default function Home() {
    const ProjectsSection =
        flag.PROJECTS_LAYOUT === "masonry" ? ProjectsMasonryGrid : ProjectsGrid;

    return (
        <>
            <Section horizontalMargin verticalMargin>
                <Hero />
                {/* <Flash /> */}
                <StudioText />

                <ServicesText />

                <Advance />

                <Process />
                <Feedback />

                <PricingTable />

                <Team />
            </Section>
            <ContactUs />
            <ProjectsSection />
        </>
    );
}

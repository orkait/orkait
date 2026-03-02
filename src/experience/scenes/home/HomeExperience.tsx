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
import { LenisSection } from "@/components/animations/lenis-section";

export function HomeExperience() {
    const ProjectsSection =
        flag.PROJECTS_LAYOUT === "masonry" ? ProjectsMasonryGrid : ProjectsGrid;

    return (
        <>
            <Section horizontalMargin verticalMargin>
                <Hero />
                {/* <Flash /> */}
                <StudioText />
                <ServicesText />

                <LenisSection distance={56} scaleDepth={0.06}>
                    <Advance />
                </LenisSection>

                <LenisSection distance={58} scaleDepth={0.06}>
                    <Process />
                </LenisSection>
                <LenisSection distance={54} scaleDepth={0.05}>
                    <Feedback />
                </LenisSection>

                <LenisSection distance={52} scaleDepth={0.05}>
                    <PricingTable />
                </LenisSection>

                <LenisSection distance={60} scaleDepth={0.06}>
                    <Team />
                </LenisSection>
            </Section>
            <LenisSection distance={60} scaleDepth={0.06}>
                <ContactUs />
            </LenisSection>
            <LenisSection distance={64} scaleDepth={0.07} minOpacity={0.4}>
                <ProjectsSection />
            </LenisSection>
        </>
    );
}

import { Hero } from "@/components/home/Hero";
import Flash from "@/components/home/Flash";
import StudioText from "@/components/home/StudioText";
import { Section } from "@/components/shared/section";
import ServicesText from "@/components/home/ServicesText";
import Advance from "@/components/home/Advance";
import Process from "@/components/home/Process";
import Feedback from "@/components/home/Feedback";

export default function Home() {
    return (
        <>
            <Section horizontalMargin verticalMargin className="py-12 tablet:py-14 laptop:py-16">
                <Hero />
                <Flash />
                <StudioText />

                <ServicesText />

                <Advance />

                <Process />
                <Feedback />
            </Section>
        </>
    );
}

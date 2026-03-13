import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMobile } from "@/components/contact/ContactMobile";
import type { Metadata } from "next";
import { Section } from "@/components/shared/section";
import { createPageMetadata } from "@/config/metadata";

export const metadata: Metadata = createPageMetadata(
	"Contact Us",
	"Tell us your problem. We'll tell you if we can solve it. No sales pitch, just honest engineering."
);

export default function ContactPage() {
    return (
        <>
            <ContactMobile />
            
            <Section className="hidden tablet:flex bg-background text-foreground flex-col" horizontalMargin verticalMargin>
                <section className="flex">
                    <div className="flex-1">
                        <h1 className="text-title-1 leading-title-1 font-bold tracking-tight text-foreground">
                            Ready to build
                            <br />
                            something
                            <br />
                            that works?
                        </h1>

                        <p className="block mt-16 text-body leading-body text-muted-foreground font-medium">
                            Or find us on social media
                        </p>
                    </div>

                    <div className="flex-1">
                        <ContactForm />
                    </div>
                </section>
            </Section>
        </>
    );
}

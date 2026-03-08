import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMobile } from "@/components/contact/ContactMobile";
import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/shared/section";
import { createPageMetadata } from "@/config/metadata";
import { routes } from "@/config/routes";

export const metadata: Metadata = createPageMetadata(
	"Contact Us",
	"Always ready to help you and answer your questions. Reach out to the Orkait team today."
);

export default function ContactPage() {
    return (
        <>
            <ContactMobile />
            
            <Section className="hidden tablet:flex bg-background text-foreground flex-col" horizontalMargin verticalMargin>
                <section className="flex">
                    <div className="flex-1">
                        <h1 className="text-title-1 leading-title-1 font-bold tracking-tight text-foreground">
                            Always ready to
                            <br />
                            help you and
                            <br />
                            answer your
                            <br />
                            questions
                        </h1>

                        <Link
                            href={routes.contact}
                            className="text-body leading-body text-foreground font-medium hover:opacity-70 transition-opacity"
                        >
                            Social Network
                        </Link>
                    </div>

                    <div className="flex-1">
                        <ContactForm />
                    </div>
                </section>
            </Section>
        </>
    );
}

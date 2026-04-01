import { ContactForm } from "@/components/contact/ContactForm";
import { ContactMobile } from "@/components/contact/ContactMobile";
import type { Metadata } from "next";
import { Section } from "@/components/shared/section";
import { createPageMetadata } from "@/config/metadata";
import { FOOTER_SOCIAL_LINKS } from "@/config/site-links";
import Link from "next/link";

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

                        <div className="mt-16 flex flex-col gap-3">
                            <p className="text-body leading-body text-muted-foreground font-medium">
                                Or find us on social media
                            </p>
                            <div className="flex gap-4">
                                {FOOTER_SOCIAL_LINKS.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-body leading-body font-medium text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <ContactForm />
                    </div>
                </section>
            </Section>
        </>
    );
}

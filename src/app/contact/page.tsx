import { ContactForm } from "@/components/contact/ContactForm";
import Link from "next/link";
import { Section } from "@/components/shared/section";

export const metadata = {
    title: "Contact Us | Orkait",
    description: "Always ready to help you and answer your questions. Reach out to the Orkait team today.",
};

export default function ContactPage() {
    return (
        <Section className="bg-background text-foreground flex flex-col" horizontalMargin verticalMargin>
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
                        href="/contact"
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
    );
}

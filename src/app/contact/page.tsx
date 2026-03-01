import { Navbar } from "@/components/layout/navbar";
import { ContactForm } from "@/components/contact/ContactForm";
import Link from "next/link";
import { Section } from "@/components/shared/section";

export const metadata = {
    title: "Contact Us | Orkait",
    description: "Always ready to help you and answer your questions. Reach out to the Orkait team today.",
};

export default function ContactPage() {
    return (
        <Section className="bg-white text-foreground flex flex-col test" horizontalMargin verticalMargin>
            <section className="flex">
                <div className="flex-1">
                    <h1
                        className="font-bold text-foreground tracking-tight"
                        style={{
                            fontSize: "var(--text-title-1)",
                            lineHeight: "var(--leading-title-1)",
                        }}
                    >
                        Always ready to
                        <br />
                        help you and
                        <br />
                        answer your
                        <br />
                        questions
                    </h1>

                    <Link
                        href="#"
                        className="text-foreground font-medium hover:opacity-70 transition-opacity"
                        style={{
                            fontSize: "var(--text-body)",
                            lineHeight: "var(--leading-body)",
                        }}
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
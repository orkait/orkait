import { ContactForm } from "./ContactForm";
import { Section } from "@/components/shared/section";

export function ContactMobile() {
    return (
        <Section className="block tablet:hidden w-full pt-16 pb-20 px-5 flex flex-col font-sans bg-background">
            <div className="flex flex-col mb-12">
                <h1 className="text-[28px] font-bold leading-[1.1] text-foreground">
                    Ready to build<br />
                    something<br />
                    that works?
                </h1>
            </div>

            <div className="w-full">
                <ContactForm />
            </div>
        </Section>
    );
}

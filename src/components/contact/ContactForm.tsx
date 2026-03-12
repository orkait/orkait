"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const INPUT_CLASS =
    "bg-transparent border-0 border-b border-[#00000033] dark:border-white/20 outline-none w-full max-w-[250px] tablet:max-w-full pb-2 text-foreground placeholder:text-muted-foreground transition-colors focus:border-foreground text-center tablet:text-left";

const LABEL_CLASS =
    "text-foreground font-medium text-center tablet:text-left";

interface FormFieldProps {
    id: string;
    label: string;
    type?: string;
    autoComplete?: string;
}

function FormField({ id, label, type = "text", autoComplete }: FormFieldProps) {
    return (
        <div className="flex flex-col gap-3 w-full items-center tablet:items-start">
            <label
                htmlFor={id}
                className={LABEL_CLASS}
                style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)" }}
            >
                {label}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                autoComplete={autoComplete}
                className={INPUT_CLASS}
            />
        </div>
    );
}

export function ContactForm() {
    return (
        <Card className="border-0 shadow-none bg-[#f4f4f4] dark:bg-muted rounded-[20px] p-8 tablet:p-12">
            <CardHeader className="p-0 pb-12">
                <CardTitle
                    className="font-bold text-foreground text-center tablet:text-left"
                    style={{ fontSize: "var(--text-title-3)", lineHeight: "var(--leading-title-3)" }}
                >
                    Contact Us
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                <form className="flex flex-col gap-10 items-center tablet:items-start">
                    <FormField id="first-name" label="First Name" autoComplete="given-name" />
                    <FormField id="email"      label="Email"      type="email" autoComplete="email" />
                    <FormField id="contact"    label="Contact" />

                    <Button
                        type="submit"
                        className="w-full max-w-[200px] h-12 mt-4 rounded-[6px] bg-black text-white font-medium hover:bg-black/90 transition-colors text-[16px]"
                    >
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

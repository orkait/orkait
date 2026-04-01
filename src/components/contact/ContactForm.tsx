"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitContact } from "@/app/actions/contact";

const schema = z.object({
    firstName: z.string().min(1, "Required"),
    email: z.string().email("Invalid email"),
    contact: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof schema>;

const INPUT_CLASS =
    "bg-transparent border-0 border-b border-[#00000033] dark:border-white/20 outline-none w-full max-w-[250px] tablet:max-w-full pb-2 text-foreground placeholder:text-muted-foreground transition-colors focus:border-foreground text-center tablet:text-left";

const LABEL_CLASS =
    "text-foreground font-medium text-center tablet:text-left";

export function ContactForm() {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({ resolver: zodResolver(schema) });

    async function onSubmit(data: FormValues) {
        setSubmitError(null);
        const result = await submitContact(data);
        if (result.success) {
            setSubmitted(true);
        } else {
            setSubmitError(result.error);
        }
    }

    if (submitted) {
        return (
            <Card className="border-0 shadow-none bg-[#f4f4f4] dark:bg-muted rounded-lg p-8 tablet:p-12">
                <div className="flex flex-col gap-4">
                    <p
                        className="font-bold text-foreground"
                        style={{ fontSize: "var(--text-title-3)", lineHeight: "var(--leading-title-3)" }}
                    >
                        Got it.
                    </p>
                    <p
                        className="text-muted-foreground"
                        style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)" }}
                    >
                        We&apos;ll be in touch at the email you provided.
                    </p>
                    <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="text-foreground font-medium text-body leading-body underline underline-offset-4 hover:opacity-70 transition-opacity w-fit"
                    >
                        Send another message
                    </button>
                </div>
            </Card>
        );
    }

    return (
        <Card className="border-0 shadow-none bg-[#f4f4f4] dark:bg-muted rounded-lg p-8 tablet:p-12">
            <CardHeader className="p-0 pb-12">
                <CardTitle
                    className="font-bold text-foreground text-center tablet:text-left"
                    style={{ fontSize: "var(--text-title-3)", lineHeight: "var(--leading-title-3)" }}
                >
                    Contact Us
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-10 items-center tablet:items-start"
                >
                    <div className="flex flex-col gap-3 w-full items-center tablet:items-start">
                        <label
                            htmlFor="first-name"
                            className={LABEL_CLASS}
                            style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)" }}
                        >
                            First Name
                        </label>
                        <input
                            id="first-name"
                            type="text"
                            autoComplete="given-name"
                            className={INPUT_CLASS}
                            {...register("firstName")}
                        />
                        {errors.firstName && (
                            <p className="text-destructive text-xs">{errors.firstName.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 w-full items-center tablet:items-start">
                        <label
                            htmlFor="email"
                            className={LABEL_CLASS}
                            style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)" }}
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            className={INPUT_CLASS}
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-destructive text-xs">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 w-full items-center tablet:items-start">
                        <label
                            htmlFor="contact"
                            className={LABEL_CLASS}
                            style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)" }}
                        >
                            Contact
                        </label>
                        <input
                            id="contact"
                            type="text"
                            className={INPUT_CLASS}
                            {...register("contact")}
                        />
                        {errors.contact && (
                            <p className="text-destructive text-xs">{errors.contact.message}</p>
                        )}
                    </div>

                    {submitError && (
                        <p className="text-destructive text-sm">{submitError}</p>
                    )}

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full max-w-[200px] h-12 mt-4 rounded-md bg-black text-white font-medium hover:bg-black/90 transition-colors text-[16px] disabled:opacity-60"
                    >
                        {isSubmitting ? "Sending..." : "Submit"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

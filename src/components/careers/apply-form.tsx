"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitApplication } from "@/app/actions/apply";

const schema = z.object({
    name: z.string().min(1, "Required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Required"),
    portfolio: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    message: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof schema>;

const INPUT_CLASS =
    "bg-transparent border-0 border-b border-[#00000033] dark:border-white/20 outline-none w-full pb-2 text-foreground placeholder:text-muted-foreground transition-colors focus:border-foreground";

const LABEL_CLASS = "text-foreground font-medium text-body leading-body";

export function ApplyForm({ role }: { role: string }) {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({ resolver: zodResolver(schema) });

    async function onSubmit(data: FormValues) {
        setSubmitError(null);
        const result = await submitApplication({ ...data, role });
        if (result.success) {
            setSubmitted(true);
            reset();
        } else {
            setSubmitError(result.error);
        }
    }

    if (submitted) {
        return (
            <Card className="border-0 shadow-none bg-[#f4f4f4] dark:bg-muted rounded-lg p-8 tablet:p-12">
                <div className="flex flex-col gap-4">
                    <p className="font-bold text-foreground text-title-3 leading-title-3">
                        Application received.
                    </p>
                    <p className="text-muted-foreground text-body leading-body">
                        We&apos;ll review it and reach out at the email you provided.
                    </p>
                    <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="text-foreground font-medium text-body leading-body underline underline-offset-4 hover:opacity-70 transition-opacity w-fit"
                    >
                        Submit another application
                    </button>
                </div>
            </Card>
        );
    }

    return (
        <Card className="border-0 shadow-none bg-[#f4f4f4] dark:bg-muted rounded-lg p-8 tablet:p-12">
            <CardHeader className="p-0 pb-10">
                <CardTitle
                    className="font-bold text-foreground"
                    style={{ fontSize: "var(--text-title-3)", lineHeight: "var(--leading-title-3)" }}
                >
                    {role}
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="apply-name" className={LABEL_CLASS}>Name</label>
                        <input
                            id="apply-name"
                            type="text"
                            autoComplete="name"
                            className={INPUT_CLASS}
                            {...register("name")}
                        />
                        {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="apply-email" className={LABEL_CLASS}>Email</label>
                        <input
                            id="apply-email"
                            type="email"
                            autoComplete="email"
                            className={INPUT_CLASS}
                            {...register("email")}
                        />
                        {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="apply-phone" className={LABEL_CLASS}>Phone</label>
                        <input
                            id="apply-phone"
                            type="tel"
                            autoComplete="tel"
                            className={INPUT_CLASS}
                            {...register("phone")}
                        />
                        {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="apply-portfolio" className={LABEL_CLASS}>
                            Portfolio / LinkedIn{" "}
                            <span className="text-muted-foreground font-normal">(optional)</span>
                        </label>
                        <input
                            id="apply-portfolio"
                            type="url"
                            className={INPUT_CLASS}
                            {...register("portfolio")}
                        />
                        {errors.portfolio && <p className="text-destructive text-xs">{errors.portfolio.message}</p>}
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="apply-message" className={LABEL_CLASS}>Why do you want to join?</label>
                        <textarea
                            id="apply-message"
                            rows={4}
                            className={`${INPUT_CLASS} resize-none`}
                            {...register("message")}
                        />
                        {errors.message && <p className="text-destructive text-xs">{errors.message.message}</p>}
                    </div>

                    {submitError && <p className="text-destructive text-sm">{submitError}</p>}

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full max-w-[200px] h-12 mt-4 rounded-md bg-black text-white font-medium hover:bg-black/90 transition-colors text-base disabled:opacity-60"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

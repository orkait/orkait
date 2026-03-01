"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactForm() {
    return (
        <Card className="border-0 shadow-none bg-muted rounded-2xl p-10 md:p-12">
            <CardHeader className="p-0 pb-10">
                <CardTitle
                    className="font-bold text-foreground"
                    style={{
                        fontSize: "var(--text-title-3)",
                        lineHeight: "var(--leading-title-3)",
                    }}
                >
                    Contact Us
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                <form className="flex flex-col gap-10">
                    {/* First Name */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="first-name"
                            className="text-foreground font-medium"
                            style={{
                                fontSize: "var(--text-body)",
                                lineHeight: "var(--leading-body)",
                            }}
                        >
                            First Name
                        </label>
                        {/* Underline input: border-b only, no box */}
                        <input
                            id="first-name"
                            name="first-name"
                            type="text"
                            autoComplete="given-name"
                            className="bg-transparent border-0 border-b border-border outline-none w-full pb-2 text-foreground placeholder:text-muted-foreground transition-colors focus:border-foreground"
                            style={{
                                fontSize: "var(--text-body)",
                                lineHeight: "var(--leading-body)",
                            }}
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="email"
                            className="text-foreground font-medium"
                            style={{
                                fontSize: "var(--text-body)",
                                lineHeight: "var(--leading-body)",
                            }}
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="bg-transparent border-0 border-b border-border outline-none w-full pb-2 text-foreground placeholder:text-muted-foreground transition-colors focus:border-foreground"
                            style={{
                                fontSize: "var(--text-body)",
                                lineHeight: "var(--leading-body)",
                            }}
                        />
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="contact"
                            className="text-foreground font-medium"
                            style={{
                                fontSize: "var(--text-body)",
                                lineHeight: "var(--leading-body)",
                            }}
                        >
                            Contact
                        </label>
                        <input
                            id="contact"
                            name="contact"
                            type="text"
                            className="bg-transparent border-0 border-b border-border outline-none w-full pb-2 text-foreground placeholder:text-muted-foreground transition-colors focus:border-foreground"
                            style={{
                                fontSize: "var(--text-body)",
                                lineHeight: "var(--leading-body)",
                            }}
                        />
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-fit px-16 mt-2 py-6 rounded-none bg-primary text-primary-foreground font-bold tracking-widest uppercase hover:bg-primary/90 transition-colors text-sm"
                    >
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

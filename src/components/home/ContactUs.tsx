"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";

const schema = z.object({
    firstName: z.string().min(1, "Required"),
    email: z.string().email("Enter a valid email"),
    contact: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof schema>;

export const ContactUs = () => {
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { firstName: "", email: "", contact: "" },
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <section className="bg-background py-24 laptop:py-32 px-6 laptop:px-20">
            <div className="max-w-screen-laptop mx-auto flex flex-col laptop:flex-row laptop:items-center gap-16 laptop:gap-24">

                {/* ── Left: Tagline ── */}
                <div className="flex flex-col gap-16 laptop:flex-1">
                    <h2 className="text-foreground text-title-1 leading-title-1 font-bold tracking-tight">
                        Always ready to help you and answer your questions
                    </h2>
                    <p className="text-muted-foreground text-subtitle leading-subtitle font-medium">
                        Social Network
                    </p>
                </div>

                {/* ── Right: Form Card ── */}
                <div className="w-full laptop:w-[636px] shrink-0 bg-muted rounded-lg px-10 py-10">
                    <h3 className="text-foreground text-title-3 leading-title-3 font-bold mb-10">
                        Contact Us
                    </h3>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">

                            {/* First Name */}
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="gap-0">
                                        <FormLabel className="text-foreground text-subtitle leading-subtitle font-medium pb-2 block">
                                            First Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="border-0 border-b border-foreground rounded-none bg-transparent px-0 text-subtitle leading-subtitle font-medium h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="gap-0">
                                        <FormLabel className="text-foreground text-subtitle leading-subtitle font-medium pb-2 block">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="email"
                                                className="border-0 border-b border-foreground rounded-none bg-transparent px-0 text-subtitle leading-subtitle font-medium h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Contact */}
                            <FormField
                                control={form.control}
                                name="contact"
                                render={({ field }) => (
                                    <FormItem className="gap-0">
                                        <FormLabel className="text-foreground text-subtitle leading-subtitle font-medium pb-2 block">
                                            Contact
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="border-0 border-b border-foreground rounded-none bg-transparent px-0 text-subtitle leading-subtitle font-medium h-auto py-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="bg-foreground text-background hover:bg-foreground/90 h-12 text-body-lg leading-body-lg font-medium w-[202px] rounded-sm mt-2"
                            >
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;

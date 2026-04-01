"use server";

import { z } from "zod";

const CONNECT_EMAIL = "connect@orkait.com";

const schema = z.object({
    firstName: z.string().min(1),
    email: z.string().email(),
    contact: z.string().min(1),
});

type ContactResult = { success: true } | { success: false; error: string };

export async function submitContact(data: unknown): Promise<ContactResult> {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
        return { success: false, error: "Invalid form data." };
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CONTACT_FORM_FROM_EMAIL;
    const toEmail = process.env.CONTACT_FORM_TO_EMAIL ?? CONNECT_EMAIL;

    if (!resendApiKey || !fromEmail) {
        return {
            success: false,
            error: `Contact form is not configured yet. Please email ${CONNECT_EMAIL} directly.`,
        };
    }

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: fromEmail,
            to: toEmail,
            reply_to: parsed.data.email,
            subject: `New contact from ${parsed.data.firstName}`,
            text: `Name: ${parsed.data.firstName}\nEmail: ${parsed.data.email}\nContact: ${parsed.data.contact}`,
        }),
    });

    if (!response.ok) {
        return {
            success: false,
            error: `We couldn't send your message right now. Please email ${CONNECT_EMAIL} directly.`,
        };
    }

    return { success: true };
}

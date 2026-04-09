import { z } from "zod";

const CONNECT_EMAIL = "connect@orkait.com";

const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    portfolio: z.string().url().optional().or(z.literal("")),
    message: z.string().min(1),
    role: z.string().min(1),
});

type ApplyResult = { success: true } | { success: false; error: string };

export async function submitApplication(data: unknown): Promise<ApplyResult> {
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
            error: `Application form is not configured yet. Please email ${CONNECT_EMAIL} directly.`,
        };
    }

    const { name, email, phone, portfolio, message, role } = parsed.data;

    const body = [
        `Role: ${role}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        portfolio ? `Portfolio: ${portfolio}` : null,
        `\nMessage:\n${message}`,
    ]
        .filter(Boolean)
        .join("\n");

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: fromEmail,
            to: toEmail,
            reply_to: email,
            subject: `Application — ${role} — ${name}`,
            text: body,
        }),
    });

    if (!response.ok) {
        return {
            success: false,
            error: `We couldn't send your application right now. Please email ${CONNECT_EMAIL} directly.`,
        };
    }

    return { success: true };
}

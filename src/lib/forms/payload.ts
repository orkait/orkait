import { z } from "zod";

export const contactSchema = z.object({
	firstName: z.string().min(1, "Required"),
	email: z.email("Invalid email"),
	contact: z.string().min(1, "Required"),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export const applySchema = z.object({
	name: z.string().min(1, "Required"),
	email: z.email("Invalid email"),
	phone: z.string().min(1, "Required"),
	portfolio: z.url("Must be a valid URL").optional().or(z.literal("")),
	message: z.string().min(1, "Required"),
	role: z.string().min(1, "Required"),
});

export type ApplyPayload = z.infer<typeof applySchema>;

export type FormResult = { success: true } | { success: false; error: string };

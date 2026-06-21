import type { Context } from 'hono';

const CONNECT_EMAIL = 'connect@orkait.com';
const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export type FormsEnv = {
	RESEND_API_KEY?: string;
	CONTACT_FORM_FROM_EMAIL?: string;
	CONTACT_FORM_TO_EMAIL?: string;
};

type FormResult = { success: true } | { success: false; error: string };

// Schemas are duplicated inline to keep the worker self-contained.
// Shapes MUST stay identical to src/lib/forms/payload.ts.
export type ContactPayload = {
	firstName: string;
	email: string;
	contact: string;
};

export type ApplyPayload = {
	name: string;
	email: string;
	phone: string;
	portfolio?: string;
	message: string;
	role: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value: unknown): value is string {
	return typeof value === 'string' && value.trim().length > 0;
}

function isValidEmail(value: unknown): value is string {
	return typeof value === 'string' && EMAIL_RE.test(value);
}

function isValidUrl(value: string): boolean {
	try {
		new URL(value);
		return true;
	} catch {
		return false;
	}
}

export function parseContact(data: unknown): ContactPayload | null {
	if (typeof data !== 'object' || data === null) return null;
	const record = data as Record<string, unknown>;

	if (!isNonEmptyString(record.firstName)) return null;
	if (!isValidEmail(record.email)) return null;
	if (!isNonEmptyString(record.contact)) return null;

	return {
		firstName: record.firstName,
		email: record.email,
		contact: record.contact,
	};
}

export function parseApply(data: unknown): ApplyPayload | null {
	if (typeof data !== 'object' || data === null) return null;
	const record = data as Record<string, unknown>;

	if (!isNonEmptyString(record.name)) return null;
	if (!isValidEmail(record.email)) return null;
	if (!isNonEmptyString(record.phone)) return null;
	if (!isNonEmptyString(record.message)) return null;
	if (!isNonEmptyString(record.role)) return null;

	let portfolio: string | undefined;
	if (record.portfolio !== undefined && record.portfolio !== '') {
		if (typeof record.portfolio !== 'string' || !isValidUrl(record.portfolio)) return null;
		portfolio = record.portfolio;
	}

	return {
		name: record.name,
		email: record.email,
		phone: record.phone,
		portfolio,
		message: record.message,
		role: record.role,
	};
}

async function sendResendEmail(
	env: FormsEnv,
	payload: { replyTo: string; subject: string; text: string }
): Promise<FormResult> {
	const resendApiKey = env.RESEND_API_KEY;
	const fromEmail = env.CONTACT_FORM_FROM_EMAIL;
	const toEmail = env.CONTACT_FORM_TO_EMAIL ?? CONNECT_EMAIL;

	if (!resendApiKey || !fromEmail) {
		return {
			success: false,
			error: `Form is not configured yet. Please email ${CONNECT_EMAIL} directly.`,
		};
	}

	const response = await fetch(RESEND_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${resendApiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from: fromEmail,
			to: toEmail,
			reply_to: payload.replyTo,
			subject: payload.subject,
			text: payload.text,
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

export async function handleContact(c: Context<{ Bindings: FormsEnv }>): Promise<Response> {
	let body: unknown;
	try {
		body = await c.req.json();
	} catch {
		return c.json({ success: false, error: 'Invalid request body.' } satisfies FormResult, 400);
	}

	const parsed = parseContact(body);
	if (!parsed) {
		return c.json({ success: false, error: 'Invalid form data.' } satisfies FormResult, 400);
	}

	const text = `Name: ${parsed.firstName}\nEmail: ${parsed.email}\nContact: ${parsed.contact}`;

	const result = await sendResendEmail(c.env, {
		replyTo: parsed.email,
		subject: `New contact from ${parsed.firstName}`,
		text,
	});

	return c.json(result, result.success ? 200 : 502);
}

export async function handleApply(c: Context<{ Bindings: FormsEnv }>): Promise<Response> {
	let body: unknown;
	try {
		body = await c.req.json();
	} catch {
		return c.json({ success: false, error: 'Invalid request body.' } satisfies FormResult, 400);
	}

	const parsed = parseApply(body);
	if (!parsed) {
		return c.json({ success: false, error: 'Invalid form data.' } satisfies FormResult, 400);
	}

	const { name, email, phone, portfolio, message, role } = parsed;

	const text = [
		`Role: ${role}`,
		`Name: ${name}`,
		`Email: ${email}`,
		`Phone: ${phone}`,
		portfolio ? `Portfolio: ${portfolio}` : null,
		`\nMessage:\n${message}`,
	]
		.filter(Boolean)
		.join('\n');

	const result = await sendResendEmail(c.env, {
		replyTo: email,
		subject: `Application - ${role} - ${name}`,
		text,
	});

	return c.json(result, result.success ? 200 : 502);
}

export type NewsletterPayload = {
	email: string;
};

export function parseNewsletter(data: unknown): NewsletterPayload | null {
	if (typeof data !== 'object' || data === null) return null;
	const record = data as Record<string, unknown>;

	if (!isValidEmail(record.email)) return null;

	return { email: record.email };
}

export async function handleNewsletter(c: Context<{ Bindings: FormsEnv }>): Promise<Response> {
	let body: unknown;
	try {
		body = await c.req.json();
	} catch {
		return c.json({ success: false, error: 'Invalid request body.' } satisfies FormResult, 400);
	}

	const parsed = parseNewsletter(body);
	if (!parsed) {
		return c.json({ success: false, error: 'Invalid form data.' } satisfies FormResult, 400);
	}

	const result = await sendResendEmail(c.env, {
		replyTo: parsed.email,
		subject: 'New newsletter signup',
		text: `Newsletter signup: ${parsed.email}`,
	});

	return c.json(result, result.success ? 200 : 502);
}

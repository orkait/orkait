import { Hono } from 'hono';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
	handleApply,
	handleContact,
	handleNewsletter,
	parseApply,
	parseContact,
	parseNewsletter,
	type FormsEnv,
} from './forms';

const TEST_ENV: FormsEnv = {
	RESEND_API_KEY: 'test-key',
	CONTACT_FORM_FROM_EMAIL: 'noreply@orkait.com',
	CONTACT_FORM_TO_EMAIL: 'connect@orkait.com',
};

function buildApp() {
	const app = new Hono<{ Bindings: FormsEnv }>();
	app.post('/api/contact', (c) => handleContact(c));
	app.post('/api/apply', (c) => handleApply(c));
	app.post('/api/newsletter', (c) => handleNewsletter(c));
	return app;
}

function post(app: ReturnType<typeof buildApp>, path: string, body: unknown) {
	return app.request(
		path,
		{
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(body),
		},
		TEST_ENV
	);
}

describe('parseContact', () => {
	it('accepts a valid payload', () => {
		expect(parseContact({ firstName: 'Ada', email: 'ada@orkait.com', contact: '+1' })).toEqual({
			firstName: 'Ada',
			email: 'ada@orkait.com',
			contact: '+1',
		});
	});

	it('rejects a bad email', () => {
		expect(parseContact({ firstName: 'Ada', email: 'not-an-email', contact: '+1' })).toBeNull();
	});

	it('rejects missing fields', () => {
		expect(parseContact({ firstName: '', email: 'ada@orkait.com', contact: '+1' })).toBeNull();
	});
});

describe('parseApply', () => {
	const base = {
		name: 'Ada',
		email: 'ada@orkait.com',
		phone: '+1',
		message: 'I want to build.',
		role: 'Fullstack Developer (Intern)',
	};

	it('accepts a valid payload without portfolio', () => {
		expect(parseApply(base)).toMatchObject(base);
	});

	it('accepts a valid portfolio url', () => {
		expect(parseApply({ ...base, portfolio: 'https://ada.dev' })?.portfolio).toBe('https://ada.dev');
	});

	it('accepts an empty portfolio string', () => {
		expect(parseApply({ ...base, portfolio: '' })?.portfolio).toBeUndefined();
	});

	it('rejects an invalid portfolio url', () => {
		expect(parseApply({ ...base, portfolio: 'not a url' })).toBeNull();
	});

	it('rejects a bad email', () => {
		expect(parseApply({ ...base, email: 'nope' })).toBeNull();
	});
});

describe('contact handler', () => {
	beforeEach(() => {
		vi.stubGlobal(
			'fetch',
			vi.fn(async () => new Response(JSON.stringify({ id: 'email_1' }), { status: 200 }))
		);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('calls Resend and returns success for a valid payload', async () => {
		const app = buildApp();
		const res = await post(app, '/api/contact', {
			firstName: 'Ada',
			email: 'ada@orkait.com',
			contact: '+1',
		});

		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ success: true });

		const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(fetchMock.mock.calls[0][0]).toBe('https://api.resend.com/emails');
	});

	it('returns 400 without calling Resend for an invalid email', async () => {
		const app = buildApp();
		const res = await post(app, '/api/contact', {
			firstName: 'Ada',
			email: 'not-an-email',
			contact: '+1',
		});

		expect(res.status).toBe(400);
		const body = (await res.json()) as { success: boolean };
		expect(body.success).toBe(false);

		const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
		expect(fetchMock).not.toHaveBeenCalled();
	});
});

describe('apply handler', () => {
	beforeEach(() => {
		vi.stubGlobal(
			'fetch',
			vi.fn(async () => new Response(JSON.stringify({ id: 'email_1' }), { status: 200 }))
		);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('calls Resend and returns success for a valid payload', async () => {
		const app = buildApp();
		const res = await post(app, '/api/apply', {
			name: 'Ada',
			email: 'ada@orkait.com',
			phone: '+1',
			message: 'I want to build.',
			role: 'Fullstack Developer (Intern)',
		});

		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ success: true });

		const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(fetchMock.mock.calls[0][0]).toBe('https://api.resend.com/emails');
	});

	it('returns 400 without calling Resend for an invalid email', async () => {
		const app = buildApp();
		const res = await post(app, '/api/apply', {
			name: 'Ada',
			email: 'nope',
			phone: '+1',
			message: 'hi',
			role: 'Designer',
		});

		expect(res.status).toBe(400);
		const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
		expect(fetchMock).not.toHaveBeenCalled();
	});
});

describe('parseNewsletter', () => {
	it('accepts a valid email', () => {
		expect(parseNewsletter({ email: 'ada@orkait.com' })).toEqual({ email: 'ada@orkait.com' });
	});

	it('rejects a bad email', () => {
		expect(parseNewsletter({ email: 'not-an-email' })).toBeNull();
	});

	it('rejects a missing email', () => {
		expect(parseNewsletter({})).toBeNull();
	});
});

describe('newsletter handler', () => {
	beforeEach(() => {
		vi.stubGlobal(
			'fetch',
			vi.fn(async () => new Response(JSON.stringify({ id: 'email_1' }), { status: 200 }))
		);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('calls Resend and returns success for a valid email', async () => {
		const app = buildApp();
		const res = await post(app, '/api/newsletter', { email: 'ada@orkait.com' });

		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ success: true });

		const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(fetchMock.mock.calls[0][0]).toBe('https://api.resend.com/emails');
	});

	it('returns 400 without calling Resend for an invalid email', async () => {
		const app = buildApp();
		const res = await post(app, '/api/newsletter', { email: 'nope' });

		expect(res.status).toBe(400);
		const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
		expect(fetchMock).not.toHaveBeenCalled();
	});
});

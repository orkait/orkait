import { afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import { submitContact } from "./contact";

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };

afterEach(() => {
	process.env = { ...originalEnv };
	globalThis.fetch = originalFetch;
});

describe("submitContact", () => {
	it("rejects invalid form data", async () => {
		const result = await submitContact({ firstName: "", email: "nope", contact: "" });

		assert.deepEqual(result, {
			success: false,
			error: "Invalid form data.",
		});
	});

	it("fails honestly when contact delivery is not configured", async () => {
		delete process.env.RESEND_API_KEY;
		delete process.env.CONTACT_FORM_FROM_EMAIL;

		const result = await submitContact({
			firstName: "Kai",
			email: "kai@example.com",
			contact: "+91 9999999999",
		});

		assert.deepEqual(result, {
			success: false,
			error: "Contact form is not configured yet. Please email connect@orkait.com directly.",
		});
	});

	it("sends through Resend when configured", async () => {
		process.env.RESEND_API_KEY = "re_test";
		process.env.CONTACT_FORM_FROM_EMAIL = "website@orkait.com";
		process.env.CONTACT_FORM_TO_EMAIL = "team@orkait.com";

		let requestUrl = "";
		let requestInit: RequestInit | undefined;

		globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
			requestUrl = String(input);
			requestInit = init;

			return new Response(JSON.stringify({ id: "email_123" }), {
				status: 200,
				headers: { "content-type": "application/json" },
			});
		}) as typeof fetch;

		const result = await submitContact({
			firstName: "Kai",
			email: "kai@example.com",
			contact: "+91 9999999999",
		});

		assert.deepEqual(result, { success: true });
		assert.equal(requestUrl, "https://api.resend.com/emails");
		assert.equal(requestInit?.method, "POST");
		assert.equal(
			(requestInit?.headers as Record<string, string>).Authorization,
			"Bearer re_test"
		);

		const body = JSON.parse(String(requestInit?.body));
		assert.equal(body.from, "website@orkait.com");
		assert.equal(body.to, "team@orkait.com");
		assert.equal(body.reply_to, "kai@example.com");
		assert.equal(body.subject, "New contact from Kai");
		assert.match(body.text, /kai@example\.com/);
		assert.match(body.text, /\+91 9999999999/);
	});
});

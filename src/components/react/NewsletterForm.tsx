import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterPayload, type FormResult } from "@/lib/forms/payload";

const FORMS_URL = import.meta.env.PUBLIC_FORMS_URL ?? import.meta.env.PUBLIC_CHATBOT_URL ?? "";

async function postNewsletter(values: NewsletterPayload): Promise<FormResult> {
	try {
		const res = await fetch(`${FORMS_URL}/api/newsletter`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(values),
		});
		if (!res.ok) {
			return { success: false, error: "Could not subscribe right now. Please try again later." };
		}
		return (await res.json()) as FormResult;
	} catch {
		return { success: false, error: "Could not subscribe right now. Please try again later." };
	}
}

export function NewsletterForm() {
	const [submitted, setSubmitted] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const inFlight = useRef(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<NewsletterPayload>({ mode: "onTouched", resolver: zodResolver(newsletterSchema) });

	async function onSubmit(values: NewsletterPayload) {
		if (inFlight.current) return;
		inFlight.current = true;
		setSubmitError(null);
		try {
			const result = await postNewsletter(values);
			if (result.success) {
				setSubmitted(true);
				reset();
			} else {
				setSubmitError(result.error);
			}
		} finally {
			inFlight.current = false;
		}
	}

	if (submitted) {
		return (
			<p role="status" className="flex h-12 items-center text-base text-on-tile">
				Thanks - you are on the list.
			</p>
		);
	}

	const locked = isSubmitting;
	const message = errors.email?.message ?? submitError;

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Newsletter signup" className="flex flex-col gap-2">
			<div className="flex w-full items-center gap-2">
				<input
					type="email"
					autoComplete="email"
					placeholder="you@company.com"
					aria-label="Email address"
					aria-invalid={message ? "true" : undefined}
					aria-describedby={message ? "newsletter-error" : undefined}
					className="h-12 w-full rounded-lg border border-on-tile/25 bg-on-tile/[0.06] px-4 text-base text-on-tile placeholder:text-on-tile/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signature focus-visible:ring-offset-2 focus-visible:ring-offset-tile aria-[invalid=true]:border-signature"
					{...register("email")}
				/>
				<button
					type="submit"
					disabled={locked}
					aria-busy={locked}
					className="inline-flex h-12 shrink-0 items-center rounded-lg bg-signature-deep px-5 text-base font-bold text-on-signature transition-colors hover:bg-signature-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-tile focus-visible:ring-offset-2 focus-visible:ring-offset-tile disabled:opacity-60 disabled:cursor-not-allowed"
				>
					{locked ? "Subscribing..." : "Subscribe"}
				</button>
			</div>
			{message && (
				<p id="newsletter-error" role="alert" className="text-sm text-on-tile/90">
					{message}
				</p>
			)}
		</form>
	);
}

export default NewsletterForm;

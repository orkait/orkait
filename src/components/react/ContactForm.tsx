import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactPayload, type FormResult } from "@/lib/forms/payload";
import { FieldError } from "@/components/react/FieldError";

const FORMS_URL = import.meta.env.PUBLIC_FORMS_URL ?? import.meta.env.PUBLIC_CHATBOT_URL ?? "";
const CONNECT_EMAIL = "connect@orkait.com";

const INPUT_CLASS =
	"bg-transparent border-0 border-b border-[#00000033] dark:border-white/20 outline-none w-full max-w-[250px] tablet:max-w-full pb-2 text-foreground placeholder:text-muted-foreground transition-colors focus:border-foreground text-center tablet:text-left aria-[invalid=true]:border-destructive";

const LABEL_CLASS = "text-foreground font-medium text-body leading-body text-center tablet:text-left";

const CARD_CLASS = "bg-[#f4f4f4] dark:bg-muted rounded-lg p-8 tablet:p-12";

async function postContact(values: ContactPayload): Promise<FormResult> {
	try {
		const response = await fetch(`${FORMS_URL}/api/contact`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(values),
		});

		if (!response.ok) {
			return {
				success: false,
				error: `We couldn't send your message right now. Please email ${CONNECT_EMAIL} directly.`,
			};
		}

		const data = (await response.json()) as FormResult;
		return data;
	} catch {
		return {
			success: false,
			error: `We couldn't send your message right now. Please email ${CONNECT_EMAIL} directly.`,
		};
	}
}

export function ContactForm() {
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitted, setSubmitted] = useState(false);
	const inFlight = useRef(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ContactPayload>({ mode: "onTouched", resolver: zodResolver(contactSchema) });

	async function onSubmit(values: ContactPayload) {
		if (inFlight.current) return;
		inFlight.current = true;
		setSubmitError(null);

		try {
			const result = await postContact(values);
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
			<div className={CARD_CLASS}>
				<div className="flex flex-col gap-4">
					<p className="font-bold text-foreground text-title-3 leading-title-3">Got it.</p>
					<p className="text-muted-foreground text-body leading-body">
						We&apos;ll be in touch at the email you provided.
					</p>
					<button
						type="button"
						onClick={() => setSubmitted(false)}
						className="text-foreground font-medium text-body leading-body underline underline-offset-4 hover:opacity-70 transition-opacity w-fit"
					>
						Send another message
					</button>
				</div>
			</div>
		);
	}

	const locked = isSubmitting;

	return (
		<div className={CARD_CLASS}>
			<h2 className="font-bold text-foreground text-title-3 leading-title-3 text-center tablet:text-left pb-12">
				Contact Us
			</h2>

			<form
				onSubmit={handleSubmit(onSubmit)}
				noValidate
				className="flex flex-col gap-10 items-center tablet:items-start"
			>
				<div className="flex flex-col gap-3 w-full items-center tablet:items-start">
					<label htmlFor="first-name" className={LABEL_CLASS}>
						First Name
					</label>
					<input
						id="first-name"
						type="text"
						autoComplete="given-name"
						className={INPUT_CLASS}
						aria-invalid={errors.firstName ? "true" : undefined}
						aria-describedby={errors.firstName ? "first-name-error" : undefined}
						{...register("firstName")}
					/>
					{errors.firstName && (
						<FieldError id="first-name-error">{errors.firstName.message}</FieldError>
					)}
				</div>

				<div className="flex flex-col gap-3 w-full items-center tablet:items-start">
					<label htmlFor="email" className={LABEL_CLASS}>
						Email
					</label>
					<input
						id="email"
						type="email"
						autoComplete="email"
						className={INPUT_CLASS}
						aria-invalid={errors.email ? "true" : undefined}
						aria-describedby={errors.email ? "email-error" : undefined}
						{...register("email")}
					/>
					{errors.email && <FieldError id="email-error">{errors.email.message}</FieldError>}
				</div>

				<div className="flex flex-col gap-3 w-full items-center tablet:items-start">
					<label htmlFor="contact" className={LABEL_CLASS}>
						Contact
					</label>
					<input
						id="contact"
						type="text"
						className={INPUT_CLASS}
						aria-invalid={errors.contact ? "true" : undefined}
						aria-describedby={errors.contact ? "contact-error" : undefined}
						{...register("contact")}
					/>
					{errors.contact && <FieldError id="contact-error">{errors.contact.message}</FieldError>}
				</div>

				{submitError && (
					<p role="alert" className="text-destructive text-sm">
						{submitError}
					</p>
				)}

				<button
					type="submit"
					disabled={locked}
					aria-busy={locked}
					className="w-full max-w-[200px] h-12 mt-4 rounded-md bg-black text-white font-medium hover:bg-black/90 transition-colors text-[16px] disabled:opacity-60 disabled:cursor-not-allowed"
				>
					{locked ? "Sending..." : "Submit"}
				</button>
			</form>
		</div>
	);
}

export default ContactForm;

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applySchema, type ApplyPayload, type FormResult } from "@/lib/forms/payload";
import { FieldError } from "@/components/react/FieldError";

const FORMS_URL = import.meta.env.PUBLIC_FORMS_URL ?? import.meta.env.PUBLIC_CHATBOT_URL ?? "";
const CONNECT_EMAIL = "connect@orkait.com";

const INPUT_CLASS =
	"bg-transparent border-0 border-b border-[#00000033] dark:border-white/20 outline-none w-full pb-2 text-foreground placeholder:text-muted-foreground transition-colors focus:border-foreground aria-[invalid=true]:border-destructive";

const LABEL_CLASS = "text-foreground font-medium text-body leading-body";

const CARD_CLASS = "bg-[#f4f4f4] dark:bg-muted rounded-lg p-8 tablet:p-12";

const formValuesSchema = applySchema.omit({ role: true });
type ApplyFormValues = Omit<ApplyPayload, "role">;

async function postApply(values: ApplyPayload): Promise<FormResult> {
	try {
		const response = await fetch(`${FORMS_URL}/api/apply`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(values),
		});

		if (!response.ok) {
			return {
				success: false,
				error: `We couldn't send your application right now. Please email ${CONNECT_EMAIL} directly.`,
			};
		}

		const data = (await response.json()) as FormResult;
		return data;
	} catch {
		return {
			success: false,
			error: `We couldn't send your application right now. Please email ${CONNECT_EMAIL} directly.`,
		};
	}
}

export function ApplyForm({ role }: { role: string }) {
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitted, setSubmitted] = useState(false);
	const inFlight = useRef(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ApplyFormValues>({ mode: "onTouched", resolver: zodResolver(formValuesSchema) });

	async function onSubmit(values: ApplyFormValues) {
		if (inFlight.current) return;
		inFlight.current = true;
		setSubmitError(null);

		try {
			const result = await postApply({ ...values, role });
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
					<p className="font-bold text-foreground text-title-3 leading-title-3">
						Application received.
					</p>
					<p className="text-muted-foreground text-body leading-body">
						We&apos;ll review it and reach out at the email you provided.
					</p>
					<button
						type="button"
						onClick={() => setSubmitted(false)}
						className="text-foreground font-medium text-body leading-body underline underline-offset-4 hover:opacity-70 transition-opacity w-fit"
					>
						Submit another application
					</button>
				</div>
			</div>
		);
	}

	const locked = isSubmitting;

	return (
		<div className={CARD_CLASS}>
			<h2 className="font-bold text-foreground text-title-3 leading-title-3 pb-10">{role}</h2>

			<form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-10">
				<div className="flex flex-col gap-3">
					<label htmlFor="apply-name" className={LABEL_CLASS}>
						Name
					</label>
					<input
						id="apply-name"
						type="text"
						autoComplete="name"
						className={INPUT_CLASS}
						aria-invalid={errors.name ? "true" : undefined}
						aria-describedby={errors.name ? "apply-name-error" : undefined}
						{...register("name")}
					/>
					{errors.name && <FieldError id="apply-name-error">{errors.name.message}</FieldError>}
				</div>

				<div className="flex flex-col gap-3">
					<label htmlFor="apply-email" className={LABEL_CLASS}>
						Email
					</label>
					<input
						id="apply-email"
						type="email"
						autoComplete="email"
						className={INPUT_CLASS}
						aria-invalid={errors.email ? "true" : undefined}
						aria-describedby={errors.email ? "apply-email-error" : undefined}
						{...register("email")}
					/>
					{errors.email && <FieldError id="apply-email-error">{errors.email.message}</FieldError>}
				</div>

				<div className="flex flex-col gap-3">
					<label htmlFor="apply-phone" className={LABEL_CLASS}>
						Phone
					</label>
					<input
						id="apply-phone"
						type="tel"
						autoComplete="tel"
						className={INPUT_CLASS}
						aria-invalid={errors.phone ? "true" : undefined}
						aria-describedby={errors.phone ? "apply-phone-error" : undefined}
						{...register("phone")}
					/>
					{errors.phone && <FieldError id="apply-phone-error">{errors.phone.message}</FieldError>}
				</div>

				<div className="flex flex-col gap-3">
					<label htmlFor="apply-portfolio" className={LABEL_CLASS}>
						Portfolio / LinkedIn{" "}
						<span className="text-muted-foreground font-normal">(optional)</span>
					</label>
					<input
						id="apply-portfolio"
						type="url"
						className={INPUT_CLASS}
						aria-invalid={errors.portfolio ? "true" : undefined}
						aria-describedby={errors.portfolio ? "apply-portfolio-error" : undefined}
						{...register("portfolio")}
					/>
					{errors.portfolio && (
						<FieldError id="apply-portfolio-error">{errors.portfolio.message}</FieldError>
					)}
				</div>

				<div className="flex flex-col gap-3">
					<label htmlFor="apply-message" className={LABEL_CLASS}>
						Why do you want to join?
					</label>
					<textarea
						id="apply-message"
						rows={4}
						className={`${INPUT_CLASS} resize-none`}
						aria-invalid={errors.message ? "true" : undefined}
						aria-describedby={errors.message ? "apply-message-error" : undefined}
						{...register("message")}
					/>
					{errors.message && (
						<FieldError id="apply-message-error">{errors.message.message}</FieldError>
					)}
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
					className="w-full max-w-[200px] h-12 mt-4 rounded-md bg-black text-white font-medium hover:bg-black/90 transition-colors text-base disabled:opacity-60 disabled:cursor-not-allowed"
				>
					{locked ? "Submitting..." : "Submit"}
				</button>
			</form>
		</div>
	);
}

export default ApplyForm;

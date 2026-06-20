import { motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";

const Arrow = ({ className }: { className?: string }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="M5 12h14M13 6l6 6-6 6" />
	</svg>
);

const RUSTBOX_METRICS: { value: string; label: string }[] = [
	{ value: "8", label: "languages" },
	{ value: "147", label: "adversarial exploits" },
	{ value: "0", label: "sandbox escapes" },
];

export function BentoGrid() {
	const reduce = useReducedMotion();

	return (
		<div className="grid grid-cols-1 gap-3 tablet:grid-cols-2 laptop:grid-cols-4 laptop:auto-rows-[180px]">
			{/* Rustbox - featured, live, navigates */}
			<MagneticButton
				href="https://rustbox.orkait.com"
				strength={0.18}
				className="group relative col-span-1 flex min-h-[320px] cursor-pointer flex-col justify-between overflow-hidden rounded-[20px] bg-signature-deep p-7 text-on-signature transition-[box-shadow] duration-300 hover:shadow-[0_24px_48px_oklch(0.20_0.02_265_/_0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background tablet:col-span-2 laptop:row-span-2 laptop:min-h-0 tablet:p-8"
			>
				<div className="flex items-center justify-between">
					<span className="font-mono text-[11px] uppercase tracking-[0.18em] text-on-signature/80">
						Secure execution
					</span>
					<span className="inline-flex items-center gap-1.5 rounded-full bg-tile px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-signature-soft">
						<span className="size-1.5 rounded-full bg-signature" />
						Live
					</span>
				</div>

				<div>
					<h3 className="text-[clamp(2.25rem,4vw,3.25rem)] font-black leading-[0.9] tracking-[-0.03em]">
						Rustbox
					</h3>
					<p className="mt-3 max-w-[34ch] text-body-lg leading-[28px] text-on-signature/85">
						Run untrusted code without trusting it.
					</p>
					<p className="mt-2 max-w-[40ch] text-base leading-[24px] text-on-signature/70">
						Kernel-enforced sandboxing on Linux namespaces and cgroups. Single
						binary, no Docker daemon.
					</p>
				</div>

				<div className="flex flex-col gap-5">
					<dl className="flex flex-wrap gap-x-8 gap-y-3 border-t border-on-signature/20 pt-5">
						{RUSTBOX_METRICS.map((m) => (
							<div key={m.label} className="flex flex-col gap-0.5">
								<dd className="order-1 font-mono text-[clamp(1.375rem,2.4vw,1.875rem)] font-black leading-none tracking-[-0.02em] tabular-nums">
									{m.value}
								</dd>
								<dt className="order-2 font-mono text-[10px] uppercase tracking-[0.12em] text-on-signature/65">
									{m.label}
								</dt>
							</div>
						))}
					</dl>
					<div className="flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.12em] text-on-signature">
						Open Rustbox
						<Arrow className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
					</div>
				</div>
			</MagneticButton>

			{/* BooleanStack - clay soft, ink text */}
			<motion.div
				className="col-span-1 flex min-h-[200px] flex-col justify-between rounded-[20px] bg-signature-soft p-7 text-foreground tablet:col-span-1 laptop:row-span-2 laptop:min-h-0 tablet:p-8"
				whileHover={reduce ? undefined : { y: -4 }}
				transition={{ type: "spring", stiffness: 300, damping: 24 }}
			>
				<div className="flex items-center justify-between gap-3">
					<span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70">
						Software learning
					</span>
					<span className="rounded-full border border-foreground/25 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/70">
						Coming soon
					</span>
				</div>
				<div>
					<h3 className="text-[clamp(1.75rem,2.8vw,2.25rem)] font-black leading-[1.0] tracking-[-0.02em] text-foreground">
						BooleanStack
					</h3>
					<p className="mt-3 max-w-[28ch] text-body-lg leading-[26px] text-foreground/80">
						Serious practice that rewards depth, not streaks.
					</p>
				</div>
			</motion.div>

			{/* Zen - navy tile */}
			<motion.div
				className="col-span-1 flex min-h-[200px] flex-col justify-between rounded-[20px] bg-tile p-7 text-on-tile tablet:col-span-1 laptop:row-span-2 laptop:min-h-0 tablet:p-8"
				whileHover={reduce ? undefined : { y: -4 }}
				transition={{ type: "spring", stiffness: 300, damping: 24 }}
			>
				<div className="flex items-center justify-between gap-3">
					<span className="font-mono text-[11px] uppercase tracking-[0.18em] text-on-tile/70">
						Interface creation
					</span>
					<span className="rounded-full border border-on-tile/25 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-on-tile/70">
						Coming soon
					</span>
				</div>
				<div>
					<h3 className="text-[clamp(1.75rem,2.8vw,2.25rem)] font-black leading-[1.0] tracking-[-0.02em]">
						Zen
					</h3>
					<p className="mt-3 max-w-[28ch] text-body-lg leading-[26px] text-on-tile/80">
						Describe a screen. Get a usable one.
					</p>
				</div>
			</motion.div>
		</div>
	);
}

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PRODUCT_LINES } from "@/lib/data/products";
import { GameOfLife } from "./GameOfLife";
import { MagneticButton } from "./MagneticButton";

const rustbox = PRODUCT_LINES.find((p) => p.id === "rustbox")!;
const booleanstack = PRODUCT_LINES.find((p) => p.id === "booleanstack")!;
const zen = PRODUCT_LINES.find((p) => p.id === "zen")!;

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

export function BentoGrid() {
	const reduce = useReducedMotion();
	const [open, setOpen] = useState<string | null>(null);
	const active = open === booleanstack.id ? booleanstack : open === zen.id ? zen : null;

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

	return (
		<>
			<div className="grid grid-cols-2 gap-3 tablet:grid-cols-4 tablet:gap-3 laptop:auto-rows-[200px]">
				{/* Rustbox - hero tile, live, navigates */}
				<MagneticButton
					href={rustbox.href!}
					strength={0.18}
					className="group relative col-span-2 row-span-2 flex min-h-[280px] cursor-pointer flex-col justify-between overflow-hidden rounded-[20px] bg-signature-deep p-7 text-on-signature transition-[box-shadow] duration-300 hover:shadow-[0_24px_48px_oklch(0.20_0.02_265_/_0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background tablet:row-span-2 laptop:min-h-0 tablet:p-8"
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
						<p className="mt-3 max-w-[34ch] text-body-lg leading-[28px] text-on-signature/80">
							{rustbox.summary}
						</p>
					</div>
					<div className="flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.12em] text-on-signature">
						Open Rustbox
						<Arrow className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
					</div>
				</MagneticButton>

				{/* Statement tile (navy) */}
				<div className="relative col-span-2 row-span-2 flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[20px] bg-tile p-7 text-on-tile laptop:min-h-0 tablet:p-8">
					<span className="font-mono text-[11px] uppercase tracking-[0.18em] text-on-tile/80">
						The discipline
					</span>
					<p className="max-w-[24ch] text-[clamp(1.5rem,2.6vw,2.25rem)] font-black leading-[1.05] tracking-[-0.02em]">
						We care about runtime behavior, constraints, failure modes, and maintenance.
					</p>
					<span className="font-mono text-[11px] uppercase tracking-[0.14em] text-on-tile/80">
						Systems come first
					</span>
				</div>

				{/* BooleanStack - expandable */}
				<ProductTile
					product={booleanstack}
					onOpen={() => setOpen(booleanstack.id)}
					hidden={open === booleanstack.id}
					reduce={!!reduce}
					className="group relative col-span-1 flex min-h-[200px] cursor-pointer flex-col justify-between overflow-hidden rounded-[20px] bg-signature-soft p-7 text-left text-foreground tablet:col-span-2 laptop:min-h-0 tablet:p-8"
					eyebrowClass="text-foreground/80"
					bodyClass="text-foreground/80"
				/>

				{/* Stat tile - paper */}
				<div className="col-span-1 flex min-h-[200px] flex-col justify-between rounded-[20px] border border-border bg-secondary p-7 laptop:min-h-0 tablet:p-8">
					<span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
						Shipping discipline
					</span>
					<div>
						<p className="text-[clamp(2.5rem,5vw,4rem)] font-black leading-none tracking-[-0.03em] text-foreground">
							1<span className="text-signature-deep">/</span>3
						</p>
						<p className="mt-2 text-base leading-[24px] text-ink-700">
							product live today. Two more coming soon.
						</p>
					</div>
				</div>

				{/* Living tile: game of life */}
				<div className="relative col-span-1 min-h-[200px] overflow-hidden rounded-[20px] bg-signature-deep tablet:col-span-1 laptop:min-h-0">
					<div className="absolute inset-0">
						<GameOfLife />
					</div>
					<span className="pointer-events-none absolute bottom-5 left-6 font-mono text-[11px] uppercase tracking-[0.14em] text-on-tile/80">
						Emergent / alive
					</span>
				</div>

				{/* Zen - expandable */}
				<ProductTile
					product={zen}
					onOpen={() => setOpen(zen.id)}
					hidden={open === zen.id}
					reduce={!!reduce}
					className="group relative col-span-1 flex min-h-[200px] cursor-pointer flex-col justify-between overflow-hidden rounded-[20px] bg-tile p-7 text-left text-on-tile tablet:col-span-2 laptop:min-h-0 tablet:p-8"
					eyebrowClass="text-on-tile/80"
					bodyClass="text-on-tile/80"
					dot
				/>
			</div>

			<AnimatePresence>
				{active && (
					<motion.div
						key="backdrop"
						className="fixed inset-0 z-[60] flex items-center justify-center p-6"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setOpen(null)}
					>
						<div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
						<motion.div
							layoutId={reduce ? undefined : `card-${active.id}`}
							className="relative z-10 w-full max-w-xl overflow-hidden rounded-[24px] bg-background p-8 shadow-[0_32px_64px_oklch(0.20_0.02_265_/_0.30)] tablet:p-10"
							initial={reduce ? { opacity: 0, scale: 0.96 } : undefined}
							animate={reduce ? { opacity: 1, scale: 1 } : undefined}
							exit={reduce ? { opacity: 0, scale: 0.96 } : undefined}
							onClick={(e) => e.stopPropagation()}
						>
							<motion.div
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0, transition: { delay: 0.12 } }}
							>
								<div className="flex items-center gap-2">
									<span className="size-1.5 rounded-full bg-signature" />
									<span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
										{active.statusLabel} / {active.surface}
									</span>
								</div>
								<h3 className="mt-4 text-[clamp(2rem,4vw,2.75rem)] font-black leading-[0.95] tracking-[-0.03em] text-foreground">
									{active.title}
								</h3>
								<p className="mt-4 max-w-[46ch] text-body-lg leading-[30px] text-ink-700">
									{active.description}
								</p>
								<button
									type="button"
									onClick={() => setOpen(null)}
									className="mt-8 inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-secondary px-5 text-base font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
								>
									Close
								</button>
							</motion.div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

interface TileProps {
	product: (typeof PRODUCT_LINES)[number];
	onOpen: () => void;
	hidden: boolean;
	reduce: boolean;
	className: string;
	eyebrowClass: string;
	bodyClass: string;
	dot?: boolean;
}

function ProductTile({ product, onOpen, hidden, reduce, className, eyebrowClass, bodyClass, dot }: TileProps) {
	return (
		<motion.button
			type="button"
			layoutId={reduce ? undefined : `card-${product.id}`}
			onClick={onOpen}
			aria-label={`${product.title} - ${product.statusLabel}, view details`}
			className={className}
			style={{ visibility: hidden ? "hidden" : "visible" }}
			whileHover={reduce ? undefined : { y: -4 }}
			transition={{ type: "spring", stiffness: 300, damping: 24 }}
		>
			<div className="flex items-center gap-2">
				{dot && <span className="size-1.5 rounded-full bg-signature" />}
				<span className={`font-mono text-[11px] uppercase tracking-[0.18em] ${eyebrowClass}`}>
					{product.statusLabel}
				</span>
			</div>
			<div>
				<h3 className="text-subtitle font-extrabold leading-[1.05] tracking-[-0.02em]">{product.title}</h3>
				<p className={`mt-2 max-w-[30ch] text-base leading-[24px] ${bodyClass}`}>{product.summary}</p>
			</div>
		</motion.button>
	);
}

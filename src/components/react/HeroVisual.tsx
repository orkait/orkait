import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { AsciiField } from "./AsciiField";

interface Props {
	eyebrow: string;
	statement: string;
}

export function HeroVisual({ eyebrow, statement }: Props) {
	const ref = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.04, 1.12]);
	const rawY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
	const scale = useSpring(rawScale, { stiffness: 120, damping: 30, restDelta: 0.001 });
	const y = useSpring(rawY, { stiffness: 120, damping: 30, restDelta: 0.001 });

	return (
		<div
			ref={ref}
			className="relative h-[clamp(280px,38vh,440px)] w-full overflow-hidden rounded-[20px] bg-tile"
		>
			<motion.div className="absolute inset-0" style={reduce ? undefined : { scale, y }}>
				<AsciiField />
			</motion.div>
			<div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-7 tablet:p-8">
				<span className="font-mono text-[12px] uppercase tracking-[0.18em] text-on-tile/80">
					{eyebrow}
				</span>
				<span
					className="max-w-[34ch] text-on-tile"
					style={{
						fontWeight: 700,
						letterSpacing: "-0.02em",
						lineHeight: 1.05,
						fontSize: "clamp(1.25rem,2.4vw,1.875rem)",
					}}
				>
					{statement}
				</span>
			</div>
		</div>
	);
}

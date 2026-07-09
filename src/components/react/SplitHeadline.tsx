import { motion, useReducedMotion, type Variants } from "framer-motion";

interface Word {
	t: string;
	accent?: boolean;
}

interface Props {
	lines: Word[][];
	className?: string;
	style?: React.CSSProperties;
	accentClassName?: string;
}

const container: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const word: Variants = {
	hidden: { y: "110%" },
	visible: { y: "0%", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export function SplitHeadline({ lines, className, style, accentClassName = "text-signature-deep" }: Props) {
	const reduce = useReducedMotion();

	if (reduce) {
		return (
			<h1 className={className} style={style}>
				{lines.map((line, li) => (
					<span key={li} className="block">
						{line.map((w, wi) => (
							<span key={wi} className={w.accent ? accentClassName : undefined}>
								{w.t}
								{wi < line.length - 1 ? " " : ""}
							</span>
						))}
					</span>
				))}
			</h1>
		);
	}

	return (
		<motion.h1 className={className} style={style} variants={container} initial="hidden" animate="visible">
			{lines.map((line, li) => (
				<span key={li} className="block">
					{line.map((w, wi) => (
						<span key={wi}>
							<span className="inline-flex overflow-hidden align-bottom">
								<motion.span
									variants={word}
									className={w.accent ? accentClassName : undefined}
									style={{ display: "inline-block", willChange: "transform" }}
								>
									{w.t}
								</motion.span>
							</span>
							{wi < line.length - 1 ? " " : ""}
						</span>
					))}
				</span>
			))}
		</motion.h1>
	);
}

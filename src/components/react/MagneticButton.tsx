import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface Props {
	href: string;
	className?: string;
	children: React.ReactNode;
	target?: string;
	rel?: string;
	ariaLabel?: string;
	strength?: number;
}

const SPRING = { stiffness: 250, damping: 18, mass: 0.4 };

export function MagneticButton({
	href,
	className,
	children,
	target,
	rel,
	ariaLabel,
	strength = 0.35,
}: Props) {
	const ref = useRef<HTMLAnchorElement>(null);
	const reduce = useReducedMotion();

	const mvX = useMotionValue(0);
	const mvY = useMotionValue(0);
	const x = useSpring(mvX, SPRING);
	const y = useSpring(mvY, SPRING);

	const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (reduce || !ref.current) return;
		const r = ref.current.getBoundingClientRect();
		mvX.set((e.clientX - (r.left + r.width / 2)) * strength);
		mvY.set((e.clientY - (r.top + r.height / 2)) * strength);
	};

	const reset = () => {
		mvX.set(0);
		mvY.set(0);
	};

	return (
		<motion.a
			ref={ref}
			href={href}
			target={target}
			rel={rel}
			aria-label={ariaLabel}
			className={className}
			style={reduce ? undefined : { x, y }}
			onMouseMove={onMove}
			onMouseLeave={reset}
		>
			{children}
		</motion.a>
	);
}

"use client";

import { motion } from "framer-motion";

export function FadeIn({
	children,
	className,
	delay = 0,
}: {
	children: React.ReactNode;
	className?: string;
	delay?: number;
}) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

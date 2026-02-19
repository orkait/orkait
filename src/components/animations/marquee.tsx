"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Marquee({
	children,
	className,
	speed = 30,
}: {
	children: React.ReactNode;
	className?: string;
	speed?: number;
}) {
	return (
		<div className={cn("overflow-hidden", className)}>
			<motion.div
				className="flex w-max gap-8"
				animate={{ x: ["0%", "-50%"] }}
				transition={{
					x: { repeat: Infinity, repeatType: "loop", duration: speed, ease: "linear" },
				}}
			>
				{children}
				{children}
			</motion.div>
		</div>
	);
}

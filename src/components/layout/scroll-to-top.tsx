"use client";

import { useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);
	const isVisibleRef = useRef(false);
	const lenis = useLenis(({ scroll }) => {
		const nextVisible = scroll > 320;

		if (nextVisible !== isVisibleRef.current) {
			isVisibleRef.current = nextVisible;
			setIsVisible(nextVisible);
		}
	});

	return (
		<div
			className={`fixed bottom-8 left-4 z-40 transition-all duration-300 phone:left-8 ${
				isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
			}`}
		>
			<Button
				type="button"
				size="icon"
				onClick={() => lenis?.scrollTo(0, { duration: 1 })}
				className="rounded-full shadow-md"
				aria-label="Back to top"
			>
				<ArrowUp className="size-4" />
			</Button>
		</div>
	);
}

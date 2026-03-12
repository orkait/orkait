"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

type SmoothScrollProviderProps = {
	children: React.ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

		syncPreference();
		mediaQuery.addEventListener("change", syncPreference);

		return () => mediaQuery.removeEventListener("change", syncPreference);
	}, []);

	if (prefersReducedMotion) {
		return <>{children}</>;
	}

	return (
		<ReactLenis
			root
			options={{
				lerp: 0.09,
				smoothWheel: true,
				syncTouch: false,
				gestureOrientation: "vertical",
			}}
		>
			{children}
		</ReactLenis>
	);
}

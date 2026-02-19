"use client";

import { useState } from "react";
import { useScroll } from "./use-scroll";

export function useNavbar() {
	const scrolled = useScroll();
	const [mobileOpen, setMobileOpen] = useState(false);

	return {
		scrolled,
		mobileOpen,
		setMobileOpen,
		toggleMobile: () => setMobileOpen((prev) => !prev),
	};
}

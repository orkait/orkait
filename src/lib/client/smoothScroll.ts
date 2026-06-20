// Lenis-powered smooth scrolling. Progressive enhancement: native scroll if JS
// never runs, and we bail entirely under prefers-reduced-motion. Uses lenis
// `autoRaf` so we never call requestAnimationFrame ourselves (project Rule 9).

import Lenis from "lenis";

const REDUCED = "(prefers-reduced-motion: reduce)";
const HEADER_OFFSET = -120;

export function initSmoothScroll() {
	if (typeof window === "undefined") return null;
	if (window.matchMedia(REDUCED).matches) return null;

	const lenis = new Lenis({
		duration: 1.1,
		easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
		smoothWheel: true,
		touchMultiplier: 1.6,
		autoRaf: true,
	});

	document.addEventListener("click", (event) => {
		if (
			event.defaultPrevented ||
			event.button !== 0 ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey
		)
			return;

		const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
		if (!anchor || anchor.target === "_blank") return;

		const url = new URL(anchor.href, location.href);
		if (url.origin !== location.origin || url.pathname !== location.pathname) return;

		if (!url.hash) {
			event.preventDefault();
			lenis.scrollTo(0);
			history.pushState(null, "", url.pathname);
			return;
		}

		const target = document.querySelector(url.hash);
		if (!target) return;

		event.preventDefault();
		lenis.scrollTo(target as HTMLElement, { offset: HEADER_OFFSET });
		history.pushState(null, "", url.hash);
	});

	return lenis;
}

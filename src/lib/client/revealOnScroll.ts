const REDUCED = "(prefers-reduced-motion: reduce)";

export function initRevealOnScroll() {
	if (typeof window === "undefined") return;
	if (window.matchMedia(REDUCED).matches) return;

	document.documentElement.classList.add("reveal-ready");

	const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
	if (!targets.length) return;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			}
		},
		{ rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
	);

	for (const el of targets) observer.observe(el);
}

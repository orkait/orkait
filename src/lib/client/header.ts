// Floating glass header behaviour:
//   1. Scrolled state - firms up the glass bar (stronger blur/shadow via CSS)
//      once the page leaves the top.
//   2. Auto-hide - slides the bar up on scroll-down, glides it back on
//      scroll-up, so the chrome never feels frozen over long pages.
//
// Progressive enhancement: with no JS the header is a static glass bar and
// every link still works as a plain anchor.

export function initHeader() {
	const header = document.querySelector<HTMLElement>("[data-site-header]");
	if (!header) return;

	// The hero is a dark, full-bleed section the pill floats over near the top.
	// While the pill overlaps it, the bar wears a smoked dark-glass variant.
	const hero = document.querySelector<HTMLElement>('section[aria-label="Intro"]');
	const NAV_BOTTOM = 96; // approx viewport-y of the pill's lower edge

	const REVEAL_NEAR_TOP = 80; // always show within this many px of the top
	const HIDE_PAST = 160; // only begin hiding once well clear of the header
	const DELTA = 6; // ignore sub-pixel scroll jitter

	let lastY = window.scrollY;

	const onScroll = () => {
		const y = window.scrollY;
		header.toggleAttribute("data-scrolled", y > 24);
		header.toggleAttribute(
			"data-over-hero",
			!!hero && hero.getBoundingClientRect().bottom > NAV_BOTTOM,
		);

		if (Math.abs(y - lastY) > DELTA) {
			const goingDown = y > lastY;
			if (y < REVEAL_NEAR_TOP || !goingDown) {
				header.removeAttribute("data-hidden");
			} else if (goingDown && y > HIDE_PAST) {
				header.setAttribute("data-hidden", "");
			}
		}
		lastY = y;
	};

	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });

	// Close the mobile popover after any in-menu link tap.
	const menu = document.getElementById("mobile-nav");
	if (menu) {
		for (const link of menu.querySelectorAll("a")) {
			link.addEventListener("click", () => (menu as HTMLElement & { hidePopover(): void }).hidePopover());
		}
	}
}

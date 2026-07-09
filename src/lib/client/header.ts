// Floating header behaviour:
//   1. Scrolled state - firms up the bar (stronger shadow via CSS) once the
//      page leaves the top.
//   2. Auto-hide - slides the bar up on scroll-down, glides it back on
//      scroll-up, so the chrome never feels frozen over long pages.
//
// Progressive enhancement: with no JS the header is a static bar and every
// link still works as a plain anchor.
//
// View-transition safe: the window scroll listener is bound once and reads
// the CURRENT header/hero through module state, which initHeader() refreshes
// after every astro:page-load swap.

let header: HTMLElement | null = null;
let hero: HTMLElement | null = null;
let listenerBound = false;
let lastY = 0;

const NAV_BOTTOM = 96; // approx viewport-y of the pill's lower edge
const REVEAL_NEAR_TOP = 80; // always show within this many px of the top
const HIDE_PAST = 160; // only begin hiding once well clear of the header
const DELTA = 6; // ignore sub-pixel scroll jitter

const onScroll = () => {
	if (!header) return;
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

export function initHeader() {
	header = document.querySelector<HTMLElement>("[data-site-header]");
	if (!header) return;

	hero = document.querySelector<HTMLElement>('section[aria-label="Intro"]');
	lastY = window.scrollY;
	onScroll();

	if (!listenerBound) {
		window.addEventListener("scroll", onScroll, { passive: true });
		listenerBound = true;
	}

	// Close the mobile popover after any in-menu link tap.
	const menu = document.getElementById("mobile-nav");
	if (menu) {
		for (const link of menu.querySelectorAll("a")) {
			link.addEventListener("click", () =>
				(menu as HTMLElement & { hidePopover(): void }).hidePopover(),
			);
		}
	}
}

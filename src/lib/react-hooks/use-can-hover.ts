import { useEffect, useState } from "react";

// True only on devices with a real hovering pointer (mouse / trackpad).
// Touch devices report (hover: none, pointer: coarse) - gate hover/magnetic
// motion on this so taps don't trigger sticky hover states or jumpy springs.
export function useCanHover() {
	const [canHover, setCanHover] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
		const update = () => setCanHover(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);

	return canHover;
}

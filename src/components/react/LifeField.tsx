import { useEffect, useRef } from "react";

// Conway's Game of Life as hero texture. Deliberately quiet: ink cells at low
// alpha on the paper surface, one generation per ~900ms. A lab motif that is
// actually ours - deterministic rules, emergent structure, checkable by anyone.
//
// Rule 9 compliant: setTimeout stepping, no requestAnimationFrame.
// Paused when off-screen. Static single generation under reduced motion.

const CELL = 18; // px per cell
const STEP_MS = 900; // one generation
const DENSITY = 0.10; // initial fill
const CELL_ALPHA = 0.05; // ink alpha - texture, never content
const MAX_W = 1800;
const MAX_H = 900;

// A glider: the one shape everyone recognises. Seeded a few times so the
// field always has something travelling through it.
const GLIDER: [number, number][] = [
	[1, 0],
	[2, 1],
	[0, 2],
	[1, 2],
	[2, 2],
];

function seed(
	cols: number,
	rows: number,
	density: number,
	gliders: number,
): Uint8Array<ArrayBuffer> {
	const g = new Uint8Array(new ArrayBuffer(cols * rows));
	for (let i = 0; i < g.length; i++) g[i] = Math.random() < density ? 1 : 0;
	for (let n = 0; n < gliders; n++) {
		// on an empty field, start the lone glider in the upper-left quarter so
		// it has the whole page to travel (the grid wraps toroidally anyway)
		const ox = 2 + Math.floor(Math.random() * Math.max(1, Math.floor(cols / 4)));
		const oy = 2 + Math.floor(Math.random() * Math.max(1, Math.floor(rows / 4)));
		for (const [dx, dy] of GLIDER) g[(oy + dy) * cols + (ox + dx)] = 1;
	}
	return g;
}

function step(cur: Uint8Array<ArrayBuffer>, next: Uint8Array<ArrayBuffer>, cols: number, rows: number) {
	for (let y = 0; y < rows; y++) {
		const yUp = ((y - 1 + rows) % rows) * cols;
		const yDn = ((y + 1) % rows) * cols;
		const yMid = y * cols;
		for (let x = 0; x < cols; x++) {
			const xL = (x - 1 + cols) % cols;
			const xR = (x + 1) % cols;
			const n =
				cur[yUp + xL] + cur[yUp + x] + cur[yUp + xR] +
				cur[yMid + xL] + cur[yMid + xR] +
				cur[yDn + xL] + cur[yDn + x] + cur[yDn + xR];
			const alive = cur[yMid + x];
			next[yMid + x] = alive ? (n === 2 || n === 3 ? 1 : 0) : n === 3 ? 1 : 0;
		}
	}
}

export interface LifeFieldProps {
	/** initial random fill; 0 = empty board */
	density?: number;
	/** gliders seeded onto the board */
	gliders?: number;
	/** ink alpha of a live cell */
	cellAlpha?: number;
	/** ms per generation */
	stepMs?: number;
}

export function LifeField({
	density = DENSITY,
	gliders = 3,
	cellAlpha = CELL_ALPHA,
	stepMs = STEP_MS,
}: LifeFieldProps = {}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const wrapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		if (!canvas || !wrap) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		let cols = 0;
		let rows = 0;
		let cur = new Uint8Array(new ArrayBuffer(0));
		let next = new Uint8Array(new ArrayBuffer(0));
		let timer: ReturnType<typeof setTimeout> | undefined;
		let visible = true;
		let disposed = false;

		const styles = getComputedStyle(document.documentElement);
		const ink = styles.getPropertyValue("--cv-life-cell").trim() || "32,28,22";

		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = `rgba(${ink},${cellAlpha})`;
			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					if (!cur[y * cols + x]) continue;
					// inset squares read as a printed grid, not blocky pixels
					ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
				}
			}
		};

		const resize = () => {
			const w = Math.min(wrap.clientWidth, MAX_W);
			const h = Math.min(wrap.clientHeight, MAX_H);
			if (w <= 0 || h <= 0) return;
			canvas.width = w;
			canvas.height = h;
			cols = Math.ceil(w / CELL);
			rows = Math.ceil(h / CELL);
			cur = seed(cols, rows, density, gliders);
			next = new Uint8Array(new ArrayBuffer(cols * rows));
			draw();
		};

		const tick = () => {
			if (disposed) return;
			if (visible) {
				step(cur, next, cols, rows);
				const swap = cur;
				cur = next;
				next = swap;
				draw();
			}
			timer = setTimeout(tick, stepMs);
		};

		resize();

		if (!reduce) {
			const io = new IntersectionObserver(
				(entries) => {
					visible = entries.some((e) => e.isIntersecting);
				},
				{ threshold: 0 },
			);
			io.observe(wrap);
			timer = setTimeout(tick, stepMs);

			let rt: ReturnType<typeof setTimeout>;
			const onResize = () => {
				clearTimeout(rt);
				rt = setTimeout(resize, 180);
			};
			window.addEventListener("resize", onResize);

			return () => {
				disposed = true;
				clearTimeout(timer);
				clearTimeout(rt);
				io.disconnect();
				window.removeEventListener("resize", onResize);
			};
		}

		return () => {
			disposed = true;
			clearTimeout(timer);
		};
	}, [density, gliders, cellAlpha, stepMs]);

	return (
		<div ref={wrapRef} className="relative h-full w-full">
			<canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
		</div>
	);
}

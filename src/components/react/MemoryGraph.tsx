import { useEffect, useRef, useState } from "react";

// Force-directed knowledge graph - a visual of associative memory (GraphStore:
// "recall by meaning or association"). Rule-9 safe: setTimeout loop, no rAF.
// Reduced-motion -> settles once, static. Colors read from CSS tokens so it
// re-hues with the signature.

type Node = { x: number; y: number; vx: number; vy: number; hub: boolean };

const N = 16;
const HUBS = new Set([0, 6, 11]);
const EDGES: [number, number][] = [
	[0, 1], [0, 2], [0, 3], [0, 6], [0, 11],
	[6, 7], [6, 8], [6, 9], [6, 11],
	[11, 12], [11, 13], [11, 14],
	[1, 4], [2, 3], [3, 15], [4, 6],
	[7, 10], [8, 13], [9, 14], [12, 0], [15, 11], [5, 0], [5, 6], [10, 11],
];

const REPULSION = 2600;
const SPRING_K = 0.012;
const REST = 64;
const GRAVITY = 0.012;
const DAMP = 0.86;
const SWIRL = 0.00018; // gentle perpetual rotation so it never fully settles
const DT = 1;
const MAX_RENDER_W = 900;

function token(el: Element, name: string, fallback: string): string {
	const v = getComputedStyle(el).getPropertyValue(name).trim();
	return v || fallback;
}

export function MemoryGraph({ className }: { className?: string }) {
	const wrapRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [dims, setDims] = useState<{ w: number; h: number } | null>(null);

	useEffect(() => {
		const wrap = wrapRef.current;
		if (!wrap) return;
		const sync = () => {
			const r = wrap.getBoundingClientRect();
			const w = Math.max(1, Math.round(Math.min(r.width, MAX_RENDER_W)));
			const h = Math.max(1, Math.round(r.height));
			setDims((c) => (c && c.w === w && c.h === h ? c : { w, h }));
		};
		sync();
		const ro = new ResizeObserver(sync);
		ro.observe(wrap);
		return () => ro.disconnect();
	}, []);

	useEffect(() => {
		if (!dims) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const dpr = Math.min(2, window.devicePixelRatio || 1);
		const W = dims.w;
		const H = dims.h;
		canvas.width = Math.round(W * dpr);
		canvas.height = Math.round(H * dpr);
		ctx.scale(dpr, dpr);

		const inkRgb = token(canvas, "--cv-graph-ink", "26,27,42");
		const hub = token(canvas, "--cv-graph-hub", "#a9531f");
		const cx = W / 2;
		const cy = H / 2;

		// seeded ring + jitter layout (stable across renders)
		const nodes: Node[] = Array.from({ length: N }, (_, i) => {
			const a = (i / N) * Math.PI * 2;
			const rad = HUBS.has(i) ? 36 : 78 + ((i * 37) % 46);
			return {
				x: cx + Math.cos(a) * rad,
				y: cy + Math.sin(a) * rad * 0.78,
				vx: 0,
				vy: 0,
				hub: HUBS.has(i),
			};
		});

		function stepPhysics() {
			for (let i = 0; i < N; i++) {
				let ax = 0;
				let ay = 0;
				for (let j = 0; j < N; j++) {
					if (i === j) continue;
					const dx = nodes[i].x - nodes[j].x;
					const dy = nodes[i].y - nodes[j].y;
					const d2 = dx * dx + dy * dy + 0.01;
					const f = REPULSION / d2;
					const d = Math.sqrt(d2);
					ax += (dx / d) * f;
					ay += (dy / d) * f;
				}
				ax += (cx - nodes[i].x) * GRAVITY;
				ay += (cy - nodes[i].y) * GRAVITY;
				// swirl: perpendicular nudge around center
				ax += -(nodes[i].y - cy) * SWIRL;
				ay += (nodes[i].x - cx) * SWIRL;
				nodes[i].vx = (nodes[i].vx + ax * DT) * DAMP;
				nodes[i].vy = (nodes[i].vy + ay * DT) * DAMP;
			}
			for (const [a, b] of EDGES) {
				const dx = nodes[b].x - nodes[a].x;
				const dy = nodes[b].y - nodes[a].y;
				const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
				const f = (d - REST) * SPRING_K;
				const fx = (dx / d) * f;
				const fy = (dy / d) * f;
				nodes[a].vx += fx;
				nodes[a].vy += fy;
				nodes[b].vx -= fx;
				nodes[b].vy -= fy;
			}
			const pad = 18;
			for (const n of nodes) {
				n.x += n.vx;
				n.y += n.vy;
				n.x = Math.max(pad, Math.min(W - pad, n.x));
				n.y = Math.max(pad, Math.min(H - pad, n.y));
			}
		}

		function draw() {
			ctx.clearRect(0, 0, W, H);
			for (const [a, b] of EDGES) {
				const dx = nodes[a].x - nodes[b].x;
				const dy = nodes[a].y - nodes[b].y;
				const len = Math.sqrt(dx * dx + dy * dy);
				const alpha = Math.max(0.05, 0.32 - len / 620);
				ctx.strokeStyle = `rgba(${inkRgb},${alpha})`;
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(nodes[a].x, nodes[a].y);
				ctx.lineTo(nodes[b].x, nodes[b].y);
				ctx.stroke();
			}
			for (const n of nodes) {
				if (n.hub) {
					ctx.fillStyle = hub;
					ctx.globalAlpha = 0.12;
					ctx.beginPath();
					ctx.arc(n.x, n.y, 13, 0, Math.PI * 2);
					ctx.fill();
					ctx.globalAlpha = 1;
					ctx.beginPath();
					ctx.arc(n.x, n.y, 4.5, 0, Math.PI * 2);
					ctx.fill();
				} else {
					ctx.fillStyle = `rgba(${inkRgb},0.85)`;
					ctx.beginPath();
					ctx.arc(n.x, n.y, 2.6, 0, Math.PI * 2);
					ctx.fill();
				}
			}
		}

		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduce) {
			for (let i = 0; i < 260; i++) stepPhysics();
			draw();
			return;
		}

		let timer: ReturnType<typeof setTimeout> | null = null;
		let running = true;
		let visible = true;
		const TARGET_MS = 1000 / 40;

		const io = new IntersectionObserver(
			([e]) => {
				visible = e.isIntersecting;
				if (visible && running && timer === null) tick();
			},
			{ threshold: 0.02 },
		);
		io.observe(canvas);

		function tick() {
			if (!running || !visible) {
				timer = null;
				return;
			}
			const start = performance.now();
			stepPhysics();
			draw();
			const elapsed = performance.now() - start;
			timer = setTimeout(tick, Math.max(0, TARGET_MS - elapsed));
		}
		// warm-start so the first paint is already a pleasing layout
		for (let i = 0; i < 80; i++) stepPhysics();
		tick();

		return () => {
			running = false;
			if (timer) clearTimeout(timer);
			io.disconnect();
		};
	}, [dims]);

	return (
		<div ref={wrapRef} className={className} aria-hidden="true">
			<canvas ref={canvasRef} className="h-full w-full" />
		</div>
	);
}

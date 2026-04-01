"use client";

import { useEffect, useRef } from "react";

const G = 1;
const M = 1;
const G_CENTER = 0.3;
const BORDER_K = 1.2;      // repulsion strength at the wall
const BORDER_MARGIN = 0.35; // sim-space distance from wall where repulsion starts
const DT = 0.001;
const STEPS_PER_FRAME = 8;
const SOFTENING = 0.02;
const STROKE_ALPHA = 0.15;
const BALL_RADIUS = 12;

type Vec2 = { x: number; y: number };
type Body = { pos: Vec2; vel: Vec2 };

// Figure-8 choreography — Chenciner & Montgomery (2000)
const INIT = [
  { pos: { x: -0.97000436, y:  0.24308753 }, vel: { x:  0.93240737 / 2, y:  0.86473146 / 2 } },
  { pos: { x:  0.97000436, y: -0.24308753 }, vel: { x:  0.93240737 / 2, y:  0.86473146 / 2 } },
  { pos: { x:  0,          y:  0           }, vel: { x: -0.93240737,     y: -0.86473146     } },
];

function gravity(bodies: Body[]): Vec2[] {
  const a: Vec2[] = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
  for (let i = 0; i < 3; i++) {
    for (let j = i + 1; j < 3; j++) {
      const dx = bodies[j].pos.x - bodies[i].pos.x;
      const dy = bodies[j].pos.y - bodies[i].pos.y;
      const r2 = dx * dx + dy * dy + SOFTENING * SOFTENING;
      const r  = Math.sqrt(r2);
      const f  = G * M / r2;
      const nx = dx / r, ny = dy / r;
      a[i].x += f * nx;  a[i].y += f * ny;
      a[j].x -= f * nx;  a[j].y -= f * ny;
    }
  }
  // Central restoring force — pulls each body toward origin
  for (let i = 0; i < 3; i++) {
    a[i].x -= G_CENTER * bodies[i].pos.x;
    a[i].y -= G_CENTER * bodies[i].pos.y;
  }

  return a;
}

function cloneBodies(): Body[] {
  return INIT.map((b, i) => ({
    pos: { ...b.pos },
    vel: { x: b.vel.x + (i === 0 ? 0.15 : 0), y: b.vel.y + (i === 1 ? -0.12 : 0) },
  }));
}

export function AsciiField({ className }: { className?: string }) {
  const trailRef = useRef<HTMLCanvasElement>(null);
  const ballRef  = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const trailCanvas = trailRef.current;
    const ballCanvas  = ballRef.current;
    if (!trailCanvas || !ballCanvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = trailCanvas.getBoundingClientRect();
    const W = Math.round(rect.width);
    const H = Math.round(rect.height);
    trailCanvas.width  = W;  trailCanvas.height  = H;
    ballCanvas.width   = W;  ballCanvas.height   = H;

    const trailCtx = trailCanvas.getContext("2d");
    const ballCtx  = ballCanvas.getContext("2d");
    if (!trailCtx || !ballCtx) return;
    const trail = trailCtx;
    const ball  = ballCtx;

    const SCALE = Math.min(W, H) * 0.28;
    const CX = W / 2, CY = H / 2;
    // Canvas bounds in simulation space
    const xBound = CX / SCALE;
    const yBound = CY / SCALE;

    function toCanvas(p: Vec2): Vec2 {
      return { x: CX + p.x * SCALE, y: CY + p.y * SCALE };
    }

    function drawGrid() {
      trail.fillStyle = "#fafafa";
      trail.fillRect(0, 0, W, H);

      const GRID_PX = 40;

      // Minor grid — skip lines that land on canvas edges
      trail.strokeStyle = "rgba(0,0,0,0.05)";
      trail.lineWidth = 1;
      for (let x = CX % GRID_PX; x < W; x += GRID_PX) {
        if (x < 1 || x > W - 1) continue;
        trail.beginPath(); trail.moveTo(x, 0); trail.lineTo(x, H); trail.stroke();
      }
      for (let y = CY % GRID_PX; y < H; y += GRID_PX) {
        if (y < 1 || y > H - 1) continue;
        trail.beginPath(); trail.moveTo(0, y); trail.lineTo(W, y); trail.stroke();
      }

      // Axes
      trail.strokeStyle = "rgba(0,0,0,0.12)";
      trail.lineWidth = 1;
      trail.beginPath(); trail.moveTo(CX, 0); trail.lineTo(CX, H); trail.stroke();
      trail.beginPath(); trail.moveTo(0, CY); trail.lineTo(W, CY); trail.stroke();

      // Origin dot
      trail.fillStyle = "rgba(0,0,0,0.15)";
      trail.beginPath(); trail.arc(CX, CY, 2, 0, Math.PI * 2); trail.fill();
    }

    function reset() {
      drawGrid();
      return cloneBodies();
    }

    // Set trail style once — never changes
    trail.strokeStyle = `rgba(0,0,0,${STROKE_ALPHA})`;
    trail.lineWidth = 1.5;
    trail.lineCap = "round";

    let bodies = reset();
    let timer: ReturnType<typeof setTimeout> | null = null;
    let running = true;
    let visible = true;
    const TARGET_MS = 1000 / 60;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && running && timer === null) tick();
      },
      { threshold: 0.05 }
    );
    observer.observe(trailRef.current!.parentElement!);

    function tick() {
      if (!running || !visible) { timer = null; return; }
      const frameStart = performance.now();

      // Collect start positions for each body before stepping
      const segStarts: Vec2[][] = bodies.map((b) => [toCanvas(b.pos)]);

      // Physics steps — accumulate waypoints per body
      for (let s = 0; s < STEPS_PER_FRAME; s++) {
        const a = gravity(bodies);

        for (let i = 0; i < 3; i++) {
          const p = bodies[i].pos;
          const dL = p.x + xBound, dR = xBound - p.x;
          const dT = p.y + yBound, dB = yBound - p.y;
          if (dL > 0 && dL < BORDER_MARGIN) a[i].x += BORDER_K / (dL * dL);
          if (dR > 0 && dR < BORDER_MARGIN) a[i].x -= BORDER_K / (dR * dR);
          if (dT > 0 && dT < BORDER_MARGIN) a[i].y += BORDER_K / (dT * dT);
          if (dB > 0 && dB < BORDER_MARGIN) a[i].y -= BORDER_K / (dB * dB);

          bodies[i].vel.x += a[i].x * DT;
          bodies[i].vel.y += a[i].y * DT;
          bodies[i].pos.x += bodies[i].vel.x * DT;
          bodies[i].pos.y += bodies[i].vel.y * DT;
          segStarts[i].push(toCanvas(bodies[i].pos));
        }
      }

      // One path per body — minimises draw calls
      for (let i = 0; i < 3; i++) {
        const pts = segStarts[i];
        trail.beginPath();
        trail.moveTo(pts[0].x, pts[0].y);
        for (let k = 1; k < pts.length; k++) trail.lineTo(pts[k].x, pts[k].y);
        trail.stroke();
      }

      // Balls on separate canvas
      ball.clearRect(0, 0, W, H);
      ball.fillStyle = "#000";
      for (const body of bodies) {
        const cp = toCanvas(body.pos);
        ball.beginPath();
        ball.arc(cp.x, cp.y, BALL_RADIUS, 0, Math.PI * 2);
        ball.fill();
      }

      // Adaptive delay — cap at 60fps
      const elapsed = performance.now() - frameStart;
      timer = setTimeout(tick, Math.max(0, TARGET_MS - elapsed));
    }

    tick();

    return () => {
      running = false;
      observer.disconnect();
      if (timer !== null) clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`relative ${className ?? ""}`}>
      <canvas ref={trailRef} className="absolute inset-0 w-full h-full block" aria-hidden />
      <canvas ref={ballRef}  className="absolute inset-0 w-full h-full block" aria-hidden />
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

const G = 1;
const M = 1;
const G_CENTER = 0.3;
const BORDER_K = 1.2;      // repulsion strength at the wall
const BORDER_MARGIN = 0.35; // sim-space distance from wall where repulsion starts
const DT = 0.001;
const STEPS_PER_FRAME = 8;
const SOFTENING = 0.02;
const TRAIL_ALPHA = 0.6;    // single-pass brightness - trails no longer accumulate
const FADE_ALPHA = 0.08;    // per-frame trail decay (destination-out) - higher = shorter comet tail
const BALL_RADIUS = 12;
const MAX_RENDER_W = 1600;
const MAX_RENDER_H = 600;

// Navy bento tile palette - canvas sits on an ink-950 surface.
const SURFACE = "#16172a"; // ink-950
const GRID_MINOR = "rgba(255,255,255,0.04)";
const GRID_AXIS = "rgba(255,255,255,0.09)";
const ORIGIN_DOT = "rgba(255,255,255,0.16)";
const TRAIL = "230,228,218"; // soft paper trails (hue-independent on navy tile)
const BALL_FILL = "#f5f3ec"; // paper-100 bodies

type Vec2 = { x: number; y: number };
type Body = { pos: Vec2; vel: Vec2 };

// Figure-8 choreography - Chenciner & Montgomery (2000)
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
  // Central restoring force - pulls each body toward origin
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

export function AsciiField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gridRef  = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);
  const ballRef  = useRef<HTMLCanvasElement>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const syncSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(Math.min(rect.width, MAX_RENDER_W)));
      const h = Math.max(1, Math.round(Math.min(rect.height, MAX_RENDER_H)));

      setDims((current) => {
        if (current && current.w === w && current.h === h) {
          return current;
        }

        return { w, h };
      });
    };

    syncSize();

    const observer = new ResizeObserver(syncSize);
    observer.observe(container);
    window.addEventListener("resize", syncSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncSize);
    };
  }, []);

  useEffect(() => {
    if (!dims) return;

    const gridCanvas  = gridRef.current;
    const trailCanvas = trailRef.current;
    const ballCanvas  = ballRef.current;
    if (!gridCanvas || !trailCanvas || !ballCanvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const W = dims.w;
    const H = dims.h;
    gridCanvas.width   = W;  gridCanvas.height   = H;
    trailCanvas.width  = W;  trailCanvas.height  = H;
    ballCanvas.width   = W;  ballCanvas.height   = H;

    const gridCtx  = gridCanvas.getContext("2d");
    const trailCtx = trailCanvas.getContext("2d");
    const ballCtx  = ballCanvas.getContext("2d");
    if (!gridCtx || !trailCtx || !ballCtx) return;
    const grid  = gridCtx;
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

    // Static coordinate field - drawn once on its own layer (no per-frame accumulation)
    function drawGrid() {
      grid.fillStyle = SURFACE;
      grid.fillRect(0, 0, W, H);

      const GRID_PX = 40;

      // Minor grid - skip lines that land on canvas edges
      grid.strokeStyle = GRID_MINOR;
      grid.lineWidth = 1;
      for (let x = CX % GRID_PX; x < W; x += GRID_PX) {
        if (x < 1 || x > W - 1) continue;
        grid.beginPath(); grid.moveTo(x, 0); grid.lineTo(x, H); grid.stroke();
      }
      for (let y = CY % GRID_PX; y < H; y += GRID_PX) {
        if (y < 1 || y > H - 1) continue;
        grid.beginPath(); grid.moveTo(0, y); grid.lineTo(W, y); grid.stroke();
      }

      // Axes
      grid.strokeStyle = GRID_AXIS;
      grid.lineWidth = 1;
      grid.beginPath(); grid.moveTo(CX, 0); grid.lineTo(CX, H); grid.stroke();
      grid.beginPath(); grid.moveTo(0, CY); grid.lineTo(W, CY); grid.stroke();

      // Origin dot
      grid.fillStyle = ORIGIN_DOT;
      grid.beginPath(); grid.arc(CX, CY, 2, 0, Math.PI * 2); grid.fill();
    }

    function reset() {
      drawGrid();
      return cloneBodies();
    }

    const bodies = reset();
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
    if (stageRef.current) {
      observer.observe(stageRef.current);
    }

    function tick() {
      if (!running || !visible) { timer = null; return; }
      const frameStart = performance.now();

      // Collect start positions for each body before stepping
      const segStarts: Vec2[][] = bodies.map((b) => [toCanvas(b.pos)]);

      // Physics steps - accumulate waypoints per body
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

      // Decay existing trails toward transparent (static grid shows through), draw fresh on top
      trail.globalCompositeOperation = "destination-out";
      trail.fillStyle = `rgba(0,0,0,${FADE_ALPHA})`;
      trail.fillRect(0, 0, W, H);
      trail.globalCompositeOperation = "source-over";
      trail.strokeStyle = `rgba(${TRAIL},${TRAIL_ALPHA})`;
      trail.lineWidth = 1.5;
      trail.lineCap = "round";

      // One path per body - minimises draw calls
      for (let i = 0; i < 3; i++) {
        const pts = segStarts[i];
        trail.beginPath();
        trail.moveTo(pts[0].x, pts[0].y);
        for (let k = 1; k < pts.length; k++) trail.lineTo(pts[k].x, pts[k].y);
        trail.stroke();
      }

      // Balls on separate canvas
      ball.clearRect(0, 0, W, H);
      ball.fillStyle = BALL_FILL;
      for (const body of bodies) {
        const cp = toCanvas(body.pos);
        ball.beginPath();
        ball.arc(cp.x, cp.y, BALL_RADIUS, 0, Math.PI * 2);
        ball.fill();
      }

      // Adaptive delay - cap at 60fps
      const elapsed = performance.now() - frameStart;
      timer = setTimeout(tick, Math.max(0, TARGET_MS - elapsed));
    }

    tick();

    return () => {
      running = false;
      observer.disconnect();
      if (timer !== null) clearTimeout(timer);
    };
  }, [dims]);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <div ref={stageRef} className="absolute inset-0 overflow-hidden">
        <canvas ref={gridRef}  className="absolute inset-0 block size-full" aria-hidden />
        <canvas ref={trailRef} className="absolute inset-0 block size-full" aria-hidden />
        <canvas ref={ballRef}  className="absolute inset-0 block size-full" aria-hidden />
      </div>
    </div>
  );
}

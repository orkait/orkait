"use client";

import { useEffect, useRef } from "react";

const CELL_SIZE = 14;
const FPS = 7;
const LIVE_PROB = 0.25;
const STAGNATION_WINDOW = 30;
const SETTLED_HOLD = 50; // frames to hold settled state (~5s at 10fps)
const MAX_GENERATIONS = 600;

// Precomputed per-age style buckets (age 1, 2, 3, 4+)
const AGE_STYLES = ["rgba(0,0,0,0.37)", "rgba(0,0,0,0.63)", "rgba(0,0,0,0.88)", "#000"] as const;
const AGE_SCALE  = [0.55, 0.70, 0.85, 1.00] as const;
const DYING_STYLE = "rgba(0,0,0,0.15)";
const DYING_SCALE = 0.30;

function step(
  curr: Uint16Array,
  next: Uint16Array,
  dying: Uint8Array,
  cols: number,
  rows: number
): void {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let n = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          if (curr[((row + dr + rows) % rows) * cols + ((col + dc + cols) % cols)] > 0) n++;
        }
      }
      const idx = row * cols + col;
      const alive = curr[idx] > 0;
      if (alive) {
        if (n === 2 || n === 3) { next[idx] = curr[idx] + 1; dying[idx] = 0; }
        else                    { next[idx] = 0;              dying[idx] = 1; }
      } else {
        dying[idx] = 0;
        next[idx] = n === 3 ? 1 : 0;
      }
    }
  }
}

function randomize(grid: Uint16Array): void {
  for (let i = 0; i < grid.length; i++) grid[i] = Math.random() < LIVE_PROB ? 1 : 0;
}

function countLive(grid: Uint16Array): number {
  let c = 0;
  for (let i = 0; i < grid.length; i++) if (grid[i] > 0) c++;
  return c;
}

export function GameOfLife({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width  = Math.round(rect.width);
    canvas.height = Math.round(rect.height);
    const W = canvas.width, H = canvas.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const draw = ctx;

    const cols = Math.floor(W / CELL_SIZE);
    const rows = Math.floor(H / CELL_SIZE);
    const maxR = (CELL_SIZE - 2) / 2;

    let curr  = new Uint16Array(cols * rows);
    let next  = new Uint16Array(cols * rows);
    const dying = new Uint8Array(cols * rows);
    randomize(curr);

    let generation = 0;
    const recentCounts: number[] = [];
    let settledAt: number | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let running = true;
    let visible = true;
    const TARGET_MS = 1000 / FPS;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && running && timer === null) tick();
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    function reset() {
      randomize(curr);
      dying.fill(0);
      generation = 0;
      recentCounts.length = 0;
      settledAt = null;
    }

    function render() {
      draw.fillStyle = "#fafafa";
      draw.fillRect(0, 0, W, H);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          const age = curr[idx];
          if (age === 0 && !dying[idx]) continue;

          const cx = col * CELL_SIZE + CELL_SIZE / 2;
          const cy = row * CELL_SIZE + CELL_SIZE / 2;

          if (age > 0) {
            const ai = Math.min(age - 1, 3);
            draw.fillStyle = AGE_STYLES[ai];
            draw.beginPath();
            draw.arc(cx, cy, maxR * AGE_SCALE[ai], 0, Math.PI * 2);
            draw.fill();
          } else {
            draw.fillStyle = DYING_STYLE;
            draw.beginPath();
            draw.arc(cx, cy, maxR * DYING_SCALE, 0, Math.PI * 2);
            draw.fill();
          }
        }
      }
    }

    function tick() {
      if (!running || !visible) { timer = null; return; }
      const start = performance.now();

      step(curr, next, dying, cols, rows);
      [curr, next] = [next, curr];
      generation++;

      const live = countLive(curr);
      recentCounts.push(live);
      if (recentCounts.length > STAGNATION_WINDOW) recentCounts.shift();

      const stagnated =
        recentCounts.length === STAGNATION_WINDOW &&
        Math.max(...recentCounts) - Math.min(...recentCounts) < 3;

      if (live === 0 || generation >= MAX_GENERATIONS) {
        reset();
      } else if (stagnated) {
        if (settledAt === null) settledAt = generation;
        else if (generation - settledAt >= SETTLED_HOLD) reset();
      } else {
        settledAt = null;
      }

      render();

      const elapsed = performance.now() - start;
      timer = setTimeout(tick, Math.max(0, TARGET_MS - elapsed));
    }

    render();
    tick();

    return () => {
      running = false;
      observer.disconnect();
      if (timer !== null) clearTimeout(timer);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}

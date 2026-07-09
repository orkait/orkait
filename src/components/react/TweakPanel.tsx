import { useEffect, useState } from "react";

// Dev-only live theme tweaker. Never rendered in production (gated by
// import.meta.env.DEV at the mount site). Switch fonts + accent live on the
// real site, find a combo, hit "Copy config" and hand it back to wire in.

type Font = { label: string; family: string; weights: string; serif?: boolean };

const DISPLAY: Font[] = [
	{ label: "Space Grotesk", family: "Space Grotesk", weights: "400;500;600;700" },
	{ label: "Inter", family: "Inter", weights: "400;500;600;700;800" },
	{ label: "Sora", family: "Sora", weights: "400;600;700;800" },
	{ label: "Geist", family: "Geist", weights: "400;500;600;700;800" },
	{ label: "Manrope", family: "Manrope", weights: "400;500;600;700;800" },
	{ label: "Outfit", family: "Outfit", weights: "400;500;600;700" },
	{ label: "Bricolage Grotesque", family: "Bricolage Grotesque", weights: "400;600;700;800" },
	{ label: "Archivo", family: "Archivo", weights: "400;600;700;800" },
	{ label: "Plus Jakarta Sans", family: "Plus Jakarta Sans", weights: "400;600;700;800" },
	{ label: "Libre Franklin", family: "Libre Franklin", weights: "400;600;700" },
	{ label: "Instrument Serif", family: "Instrument Serif", weights: "400", serif: true },
	{ label: "Fraunces", family: "Fraunces", weights: "400;500;600;700", serif: true },
];

const BODY: Font[] = [
	{ label: "Inter", family: "Inter", weights: "400;500;600" },
	{ label: "Plus Jakarta Sans", family: "Plus Jakarta Sans", weights: "400;500;600" },
	{ label: "Manrope", family: "Manrope", weights: "400;500;600" },
	{ label: "Geist", family: "Geist", weights: "400;500;600" },
	{ label: "Outfit", family: "Outfit", weights: "400;500;600" },
	{ label: "Work Sans", family: "Work Sans", weights: "400;500;600" },
];

const MONO: Font[] = [
	{ label: "Geist Mono", family: "Geist Mono", weights: "400;500" },
	{ label: "JetBrains Mono", family: "JetBrains Mono", weights: "400;500" },
	{ label: "IBM Plex Mono", family: "IBM Plex Mono", weights: "400;500" },
	{ label: "Space Mono", family: "Space Mono", weights: "400;700" },
];

const ACCENTS: { label: string; c: string; soft: string }[] = [
	{ label: "Clay", c: "#B5512E", soft: "#E8A07E" },
	{ label: "Indigo", c: "#7C73FF", soft: "#B7B2FF" },
	{ label: "Cyan", c: "#2DD4BF", soft: "#99F6E4" },
	{ label: "Cobalt", c: "#2563EB", soft: "#93C5FD" },
	{ label: "Emerald", c: "#10B981", soft: "#6EE7B7" },
	{ label: "Violet", c: "#8B5CF6", soft: "#C4B5FD" },
	{ label: "Amber", c: "#F59E0B", soft: "#FCD34D" },
	{ label: "Rose", c: "#F43F5E", soft: "#FDA4AF" },
	{ label: "Red", c: "#DB0016", soft: "#F3413C" },
	{ label: "Crimson", c: "#C1121F", soft: "#EF4444" },
	{ label: "Scarlet", c: "#E63329", soft: "#FF6B5E" },
];

const loaded = new Set<string>();
function loadFont(f: Font) {
	if (loaded.has(f.family)) return;
	loaded.add(f.family);
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = `https://fonts.googleapis.com/css2?family=${f.family.replace(/ /g, "+")}:wght@${f.weights}&display=swap`;
	document.head.appendChild(link);
}

function styleEl() {
	let e = document.getElementById("dev-tweak");
	if (!e) {
		e = document.createElement("style");
		e.id = "dev-tweak";
		document.head.appendChild(e);
	}
	return e;
}

type State = { d: number; b: number; m: number; a: number; e: number; c: number };

function apply(s: State) {
	const d = DISPLAY[s.d];
	const b = BODY[s.b];
	const m = MONO[s.m];
	const ac = ACCENTS[s.a];
	loadFont(d);
	loadFont(b);
	loadFont(m);
	styleEl().textContent = `
body{font-family:'${b.family}',ui-sans-serif,system-ui,sans-serif!important}
.font-display,h1,h2,h3,h4{font-family:'${d.family}',${d.serif ? "ui-serif,serif" : "ui-sans-serif,sans-serif"}!important}
.font-mono,[class*="font-mono"]{font-family:'${m.family}',ui-monospace,monospace!important}
.bg-primary,.bg-signature-deep,.bg-signature{background-color:${ac.c}!important}
.hover\\:bg-signature-hover:hover{background-color:${ac.c}!important}
.text-signature,.text-signature-soft,.text-signature-deep,.hover\\:text-signature-deep:hover{color:${ac.soft}!important}
.bg-signature-soft{background-color:${ac.soft}!important}
.border-signature,.border-signature-deep{border-color:${ac.c}!important}
.ring-ring{--tw-ring-color:${ac.c}!important}
`;
}

const EFFECTS: { label: string; css: string }[] = [
	{ label: "None", css: "" },
	{
		label: "Aurora",
		css: `@keyframes dev-aurora{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
[data-coming-soon]{background-image:radial-gradient(45% 55% at 22% 28%,color-mix(in oklab,var(--color-signature) 50%,transparent),transparent 70%),radial-gradient(42% 52% at 78% 72%,color-mix(in oklab,currentColor 16%,transparent),transparent 70%),radial-gradient(55% 60% at 60% 22%,color-mix(in oklab,var(--color-signature) 32%,transparent),transparent 72%);background-size:200% 200%;animation:dev-aurora 14s ease-in-out infinite}`,
	},
	{
		label: "Sheen",
		css: `@keyframes dev-sheen{to{background-position:-180% 0}}
[data-coming-soon]{background-image:linear-gradient(115deg,transparent 36%,color-mix(in oklab,currentColor 13%,transparent) 47%,transparent 58%);background-size:250% 100%;animation:dev-sheen 5s linear infinite}`,
	},
	{
		label: "Beams",
		css: `@keyframes dev-beams{to{background-position:64px 0}}
[data-coming-soon]{background-image:repeating-linear-gradient(115deg,transparent 0 30px,color-mix(in oklab,currentColor 7%,transparent) 30px 32px);animation:dev-beams 7s linear infinite}`,
	},
	{
		label: "Dot grid",
		css: `@keyframes dev-dots{to{background-position:24px 24px}}
[data-coming-soon]{background-image:radial-gradient(circle,color-mix(in oklab,currentColor 20%,transparent) 1px,transparent 1.6px);background-size:24px 24px;animation:dev-dots 8s linear infinite}`,
	},
];

function effectEl() {
	let e = document.getElementById("dev-effect");
	if (!e) {
		e = document.createElement("style");
		e.id = "dev-effect";
		document.head.appendChild(e);
	}
	return e;
}

function applyEffect(i: number) {
	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	effectEl().textContent = reduce ? "" : EFFECTS[i]?.css ?? "";
}

const CTA_BGS: { label: string; css: string }[] = [
	{ label: "None", css: `[data-cta-bg]{background-image:none!important;animation:none!important;-webkit-mask-image:none!important;mask-image:none!important}` },
	{
		label: "Beams + grid",
		css: `@keyframes dev-ctagrid{to{background-position:0 -64px,0 -64px,0 0}}
[data-cta-bg]{background-image:repeating-linear-gradient(0deg,color-mix(in oklab,currentColor 7%,transparent) 0 1px,transparent 1px 64px),repeating-linear-gradient(90deg,color-mix(in oklab,currentColor 7%,transparent) 0 1px,transparent 1px 64px),radial-gradient(64% 50% at 50% 64%,color-mix(in oklab,var(--color-signature) 52%,transparent),transparent 72%);background-size:64px 64px,64px 64px,cover;-webkit-mask-image:linear-gradient(to bottom,transparent 0%,#000 20%,#000 80%,transparent 100%);mask-image:linear-gradient(to bottom,transparent 0%,#000 20%,#000 80%,transparent 100%);animation:dev-ctagrid 7s linear infinite}`,
	},
	{
		label: "Spotlight",
		css: `@keyframes dev-ctaspot{0%,100%{background-position:32% 42%}50%{background-position:68% 46%}}
[data-cta-bg]{background-image:radial-gradient(38% 55% at 50% 44%,color-mix(in oklab,var(--color-signature) 42%,transparent),color-mix(in oklab,var(--color-signature) 12%,transparent) 36%,transparent 66%);background-size:170% 170%;-webkit-mask-image:none;mask-image:none;animation:dev-ctaspot 13s ease-in-out infinite}`,
	},
	{
		label: "Grainy mesh",
		css: `[data-cta-bg]{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E"),radial-gradient(42% 60% at 20% 28%,color-mix(in oklab,var(--color-signature) 60%,transparent),transparent 60%),radial-gradient(45% 55% at 82% 72%,color-mix(in oklab,var(--color-signature-deep) 62%,transparent),transparent 62%),radial-gradient(55% 62% at 55% 48%,color-mix(in oklab,var(--color-signature-soft) 32%,transparent),transparent 64%);background-size:180px 180px,cover,cover,cover;-webkit-mask-image:none;mask-image:none;animation:none}`,
	},
	{
		label: "Ripple dots",
		css: `@keyframes dev-ctaripple{0%,100%{background-position:0 0;opacity:.55}50%{background-position:0 -48px;opacity:.9}}
[data-cta-bg]{background-image:radial-gradient(circle,color-mix(in oklab,var(--color-signature) 65%,transparent) 1.5px,transparent 2px);background-size:26px 26px;-webkit-mask-image:radial-gradient(62% 82% at 50% 50%,#000,transparent 76%);mask-image:radial-gradient(62% 82% at 50% 50%,#000,transparent 76%);animation:dev-ctaripple 5s ease-in-out infinite}`,
	},
	{
		label: "Aurora",
		css: `@keyframes dev-ctaaur{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
[data-cta-bg]{background-image:radial-gradient(42% 60% at 16% 26%,color-mix(in oklab,var(--color-signature) 62%,transparent),transparent 66%),radial-gradient(40% 55% at 84% 72%,color-mix(in oklab,var(--color-signature-soft) 42%,transparent),transparent 64%),radial-gradient(55% 65% at 66% 16%,color-mix(in oklab,var(--color-signature) 36%,transparent),transparent 70%);background-size:220% 220%;-webkit-mask-image:none;mask-image:none;animation:dev-ctaaur 18s ease-in-out infinite}`,
	},
	{
		label: "Lamp (Linear)",
		css: `@keyframes dev-ctalamp{0%,100%{opacity:.85}50%{opacity:1}}
[data-cta-bg]{background-image:radial-gradient(60% 42% at 50% -8%,color-mix(in oklab,var(--color-signature) 72%,transparent),color-mix(in oklab,var(--color-signature) 18%,transparent) 42%,transparent 72%),linear-gradient(to bottom,color-mix(in oklab,currentColor 24%,transparent) 0,transparent 2px);background-size:cover,100% 100%;-webkit-mask-image:none;mask-image:none;animation:dev-ctalamp 6s ease-in-out infinite}`,
	},
	{
		label: "Meteors",
		css: `@keyframes dev-ctameteor{to{background-position:-620px 620px,-840px 840px,-460px 460px}}
[data-cta-bg]{background-image:repeating-linear-gradient(125deg,transparent 0 78px,color-mix(in oklab,var(--color-signature) 62%,transparent) 78px 80px,transparent 80px 170px),repeating-linear-gradient(125deg,transparent 0 130px,color-mix(in oklab,var(--color-signature-soft) 45%,transparent) 130px 131px,transparent 131px 250px),repeating-linear-gradient(125deg,transparent 0 96px,color-mix(in oklab,currentColor 14%,transparent) 96px 97px,transparent 97px 210px);background-size:320px 320px,320px 320px,320px 320px;-webkit-mask-image:linear-gradient(125deg,transparent,#000 42%,transparent 78%);mask-image:linear-gradient(125deg,transparent,#000 42%,transparent 78%);animation:dev-ctameteor 4s linear infinite}`,
	},
	{
		label: "Starfield",
		css: `@keyframes dev-ctastar{0%,100%{opacity:.45}50%{opacity:.9}}
[data-cta-bg]{background-image:radial-gradient(circle,color-mix(in oklab,currentColor 75%,transparent) 1px,transparent 1.6px),radial-gradient(circle,color-mix(in oklab,var(--color-signature) 75%,transparent) 1px,transparent 1.6px);background-size:62px 62px,94px 94px;background-position:0 0,32px 46px;-webkit-mask-image:radial-gradient(82% 92% at 50% 40%,#000,transparent 82%);mask-image:radial-gradient(82% 92% at 50% 40%,#000,transparent 82%);animation:dev-ctastar 4s ease-in-out infinite}`,
	},
];

function ctaEl() {
	let e = document.getElementById("dev-cta");
	if (!e) {
		e = document.createElement("style");
		e.id = "dev-cta";
		document.head.appendChild(e);
	}
	return e;
}

function applyCtaBg(i: number) {
	ctaEl().textContent = CTA_BGS[i]?.css ?? "";
}

// Bump this whenever the baked theme changes. A stale saved config re-applies
// itself with !important on every load and silently overrides the real theme.
const KEY = "orkait-dev-tweak-v2-bw-red";

export function TweakPanel() {
	const [open, setOpen] = useState(false);
	// Defaults match the baked theme (Outfit / Geist / Space Mono / Rose) so the
	// dropdowns reflect reality and nothing overrides the real site until you tweak.
	const [s, setS] = useState<State>({ d: 5, b: 3, m: 3, a: 8, e: 0, c: 0 });
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		try {
			const saved = localStorage.getItem(KEY);
			if (saved) {
				const parsed = JSON.parse(saved) as State;
				setS(parsed);
				apply(parsed);
				applyEffect(parsed.e ?? 0);
				applyCtaBg(parsed.c ?? 1);
				return;
			}
		} catch {
			// ignore
		}
		// no saved config: leave the baked theme untouched
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const update = (next: State) => {
		setS(next);
		apply(next);
		applyEffect(next.e);
		applyCtaBg(next.c);
		try {
			localStorage.setItem(KEY, JSON.stringify(next));
		} catch {
			// ignore
		}
	};

	const reset = () => {
		const t = document.getElementById("dev-tweak");
		if (t) t.textContent = "";
		const ef = document.getElementById("dev-effect");
		if (ef) ef.textContent = "";
		const ct = document.getElementById("dev-cta");
		if (ct) ct.textContent = "";
		localStorage.removeItem(KEY);
	};

	const copy = () => {
		const cfg = {
			display: DISPLAY[s.d].family,
			body: BODY[s.b].family,
			mono: MONO[s.m].family,
			accent: ACCENTS[s.a].label,
			accentHex: ACCENTS[s.a].c,
			effect: EFFECTS[s.e].label,
			ctaBg: CTA_BGS[s.c].label,
		};
		navigator.clipboard?.writeText(JSON.stringify(cfg, null, 2));
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	const box: React.CSSProperties = {
		position: "fixed",
		bottom: 20,
		right: 20,
		zIndex: 2147483000,
		fontFamily: "ui-monospace, monospace",
	};
	const label: React.CSSProperties = { fontSize: 10, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 };
	const sel: React.CSSProperties = { width: "100%", background: "#18181b", color: "#fafafa", border: "1px solid #333", borderRadius: 8, padding: "7px 8px", fontSize: 13, marginBottom: 12 };

	return (
		<div style={box}>
			{open && (
				<div
					style={{
						width: 268,
						marginBottom: 10,
						background: "#0c0c0e",
						color: "#fafafa",
						border: "1px solid #2a2a2e",
						borderRadius: 16,
						padding: 16,
						boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
					}}
				>
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
						<strong style={{ fontSize: 13 }}>Theme tweaker</strong>
						<span style={{ fontSize: 10, opacity: 0.5 }}>dev only</span>
					</div>

					<div style={label}>Display font</div>
					<select style={sel} value={s.d} onChange={(e) => update({ ...s, d: +e.target.value })}>
						{DISPLAY.map((f, i) => (
							<option key={f.label} value={i}>{f.label}</option>
						))}
					</select>

					<div style={label}>Body font</div>
					<select style={sel} value={s.b} onChange={(e) => update({ ...s, b: +e.target.value })}>
						{BODY.map((f, i) => (
							<option key={f.label} value={i}>{f.label}</option>
						))}
					</select>

					<div style={label}>Mono font</div>
					<select style={sel} value={s.m} onChange={(e) => update({ ...s, m: +e.target.value })}>
						{MONO.map((f, i) => (
							<option key={f.label} value={i}>{f.label}</option>
						))}
					</select>

					<div style={label}>Accent</div>
					<div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
						{ACCENTS.map((a, i) => (
							<button
								key={a.label}
								title={a.label}
								onClick={() => update({ ...s, a: i })}
								style={{
									width: 26,
									height: 26,
									borderRadius: 999,
									background: a.c,
									border: s.a === i ? "2px solid #fafafa" : "2px solid transparent",
									cursor: "pointer",
								}}
							/>
						))}
					</div>

					<div style={label}>Card effect (coming-soon)</div>
					<select style={sel} value={s.e} onChange={(e) => update({ ...s, e: +e.target.value })}>
						{EFFECTS.map((f, i) => (
							<option key={f.label} value={i}>{f.label}</option>
						))}
					</select>

					<div style={label}>CTA band background</div>
					<select style={sel} value={s.c} onChange={(e) => update({ ...s, c: +e.target.value })}>
						{CTA_BGS.map((f, i) => (
							<option key={f.label} value={i}>{f.label}</option>
						))}
					</select>

					<div style={{ display: "flex", gap: 8 }}>
						<button onClick={copy} style={{ flex: 1, background: "#fafafa", color: "#0c0c0e", border: "none", borderRadius: 8, padding: "8px 0", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
							{copied ? "Copied ✓" : "Copy config"}
						</button>
						<button onClick={reset} style={{ background: "#18181b", color: "#fafafa", border: "1px solid #333", borderRadius: 8, padding: "8px 12px", fontSize: 12, cursor: "pointer" }}>
							Reset
						</button>
					</div>
				</div>
			)}

			<button
				onClick={() => setOpen((o) => !o)}
				aria-label="Theme tweaker"
				style={{
					width: 52,
					height: 52,
					borderRadius: 999,
					background: "#0c0c0e",
					color: "#fafafa",
					border: "1px solid #2a2a2e",
					boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
					cursor: "pointer",
					fontSize: 20,
					marginLeft: "auto",
					display: "block",
				}}
			>
				{open ? "×" : "✦"}
			</button>
		</div>
	);
}

import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import sharp from "sharp";

export const prerender = true;

const WIDTH = 1200;
const HEIGHT = 630;

const PAPER = "#fcfaf6";
const INK = "#101622";
const CLAY = "#8c3d23";

const fontsDir = path.join(process.cwd(), "src/lib/og/fonts");
const serif = fs.readFileSync(path.join(fontsDir, "Fraunces-Display.ttf"));
const mono = fs.readFileSync(path.join(fontsDir, "SpaceMono-Regular.ttf"));

const logoSvg = fs.readFileSync(
	path.join(process.cwd(), "public/data/brand/orkait.svg"),
);
const logoUri = `data:image/svg+xml;base64,${logoSvg.toString("base64")}`;

const motifSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='560' height='560' viewBox='0 0 560 560' fill='none' stroke='${INK}' stroke-width='1.5'>
<ellipse cx='280' cy='280' rx='224' ry='118' transform='rotate(18 280 280)'/>
<ellipse cx='280' cy='280' rx='224' ry='118' transform='rotate(78 280 280)'/>
<ellipse cx='280' cy='280' rx='224' ry='118' transform='rotate(138 280 280)'/>
<circle cx='472' cy='244' r='9' fill='${INK}' stroke='none'/>
<circle cx='108' cy='332' r='9' fill='${INK}' stroke='none'/>
<circle cx='300' cy='128' r='9' fill='${INK}' stroke='none'/>
</svg>`;
const motifUri = `data:image/svg+xml;base64,${Buffer.from(motifSvg).toString("base64")}`;

type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
	type,
	props: children === undefined ? { style } : { style, children },
});

const tree = el(
	"div",
	{
		width: WIDTH,
		height: HEIGHT,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		padding: "80px",
		backgroundColor: PAPER,
		position: "relative",
		fontFamily: "Fraunces",
	},
	[
		{
			type: "img",
			props: {
				src: motifUri,
				width: 560,
				height: 560,
				style: { position: "absolute", top: 64, right: -88, opacity: 0.1 },
			},
		},
		{
			type: "img",
			props: { src: logoUri, width: 150, height: 76, style: { display: "flex" } },
		},
		el("div", { display: "flex", flexDirection: "column" }, [
			el(
				"div",
				{
					display: "flex",
					flexDirection: "column",
					marginBottom: 36,
				},
				[
					el(
						"div",
						{
							display: "flex",
							fontSize: 70,
							fontWeight: 440,
							lineHeight: 1.04,
							color: INK,
							letterSpacing: "-0.01em",
						},
						"Applied AI research,",
					),
					el(
						"div",
						{
							display: "flex",
							fontSize: 70,
							fontWeight: 440,
							lineHeight: 1.04,
							color: CLAY,
							letterSpacing: "-0.01em",
						},
						"shipped as products.",
					),
				],
			),
			el(
				"div",
				{
					display: "flex",
					fontFamily: "Space Mono",
					fontSize: 21,
					letterSpacing: 2,
					color: INK,
					paddingTop: 26,
					borderTop: `1px solid ${INK}`,
				},
				"RUSTBOX - LIVE    ·    BOOLEANSTACK - SOON    ·    ZEN - SOON",
			),
		]),
	],
);

export const GET: APIRoute = async () => {
	const svg = await satori(tree as never, {
		width: WIDTH,
		height: HEIGHT,
		fonts: [
			{ name: "Fraunces", data: serif, weight: 440, style: "normal" },
			{ name: "Space Mono", data: mono, weight: 400, style: "normal" },
		],
	});
	const png = await sharp(Buffer.from(svg)).png().toBuffer();
	return new Response(new Uint8Array(png), {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
};

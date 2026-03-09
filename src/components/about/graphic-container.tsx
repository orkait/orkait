// JUSTIFICATION: absolute positioning is required — this is a fixed 220×220 pixel-perfect geometric
// composition. Each petal's exact coordinates are defined by the Figma design node 414:823.
// SVGs are rendered as data-URL background-images per the Figma MCP reference output,
// which is the only reliable cross-browser technique for conic-gradient inside SVG foreignObject.

const CONIC_SVG = (w: number, h: number, matrix: string, gradient: string) =>
    `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><g transform="${matrix}"><foreignObject x="-190" y="-190" width="380" height="380"><div xmlns="http://www.w3.org/1999/xhtml" style="background-image: ${gradient}; opacity:1; height: 100%; width: 100%;"></div></foreignObject></g></svg>')`;

const RADIAL_SVG = `url('data:image/svg+xml;utf8,<svg viewBox="0 0 106.36 106.36" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect x="0" y="0" height="100%" width="100%" fill="url(%23grad)" opacity="1"/><defs><radialGradient id="grad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10" gradientTransform="matrix(-3.8647 3.8647 -3.8647 -3.8647 53.179 53.179)"><stop stop-color="rgba(0,0,0,1)" offset="0"/><stop stop-color="rgba(8,8,8,0.9375)" offset="0.047557"/><stop stop-color="rgba(16,16,16,0.875)" offset="0.095113"/><stop stop-color="rgba(32,32,32,0.75)" offset="0.19023"/><stop stop-color="rgba(64,64,64,0.5)" offset="0.38045"/><stop stop-color="rgba(127,127,127,0)" offset="0.76091"/></radialGradient></defs></svg>')`;

const CONIC_MAIN = "conic-gradient(from 90deg, rgb(72, 62, 62) 0%, rgba(103, 96, 96, 0.75) 25%, rgba(134, 129, 129, 0.5) 50%, rgba(165, 163, 163, 0.25) 75%, rgba(196, 196, 196, 0) 100%)";
const CONIC_ACCENT = "conic-gradient(from 90deg, rgb(152, 152, 152) 0%, rgba(174, 174, 174, 0.5) 50%, rgba(185, 185, 185, 0.25) 75%, rgba(196, 196, 196, 0) 100%)";

// Large quadrant petals — 99.433×99.433, matrix: -4.9717 4.9717 -4.9717 -4.9717 49.717 49.717
const LARGE_M = "matrix(-4.9717 4.9717 -4.9717 -4.9717 49.717 49.717)";
const LARGE_BG = CONIC_SVG(99.433, 99.433, LARGE_M, CONIC_MAIN);

// Medium petals — 68.469×68.469, matrix: -3.4234 3.4234 -3.4234 -3.4234 34.234 34.234
const MED_M = "matrix(-3.4234 3.4234 -3.4234 -3.4234 34.234 34.234)";
const MED_BG = CONIC_SVG(68.469, 68.469, MED_M, CONIC_MAIN);

// Inner petals — 48.592×48.61 (non-square), matrix: -2.4296 2.4305 -2.4296 -2.4305 24.296 24.305
const INNER_M = "matrix(-2.4296 2.4305 -2.4296 -2.4305 24.296 24.305)";
const INNER_BG = CONIC_SVG(48.592, 48.61, INNER_M, CONIC_MAIN);

// Small accent petals — 23.878×23.87 (non-square), matrix has positive values: 1.1939 1.1935 -1.1939 1.1935
const SMALL_M = "matrix(1.1939 1.1935 -1.1939 1.1935 11.939 11.935)";
const SMALL_BG = CONIC_SVG(23.878, 23.87, SMALL_M, CONIC_ACCENT);

export function GraphicContainer({ className }: { className?: string }) {
    return (
        <div className={`relative w-[220px] h-[220px] ${className ?? ""}`} data-name="Graphic Container">

            {/* ── Large quadrant petals ── */}
            <div className="absolute flex items-center justify-center left-[14.2px] size-[99.433px] top-[110.03px]">
                <div className="-scale-y-100 flex-none rotate-90">
                    <div className="opacity-60 rounded-tr-[25.666px] size-[99.433px]" style={{ backgroundImage: LARGE_BG }} />
                </div>
            </div>
            <div className="absolute flex items-center justify-center left-[113.81px] size-[99.433px] top-[10.54px]">
                <div className="-rotate-90 -scale-y-100 flex-none">
                    <div className="opacity-60 rounded-tr-[25.666px] size-[99.433px]" style={{ backgroundImage: LARGE_BG }} />
                </div>
            </div>
            <div className="absolute flex items-center justify-center left-[14.19px] size-[99.433px] top-[10.55px]">
                <div className="-scale-y-100 flex-none rotate-180">
                    <div className="opacity-60 rounded-tr-[25.666px] size-[99.433px]" style={{ backgroundImage: LARGE_BG }} />
                </div>
            </div>
            <div className="absolute flex items-center justify-center left-[113.64px] size-[99.433px] top-[109.98px]">
                <div className="-scale-y-100 flex-none">
                    <div className="opacity-60 rounded-tr-[25.666px] size-[99.433px]" style={{ backgroundImage: LARGE_BG }} />
                </div>
            </div>

            {/* ── Medium petals ── */}
            <div className="absolute flex items-center justify-center left-[45.27px] size-[68.469px] top-[41.58px]">
                <div className="-rotate-90 -scale-y-100 flex-none">
                    <div className="rounded-br-[11.935px] rounded-tl-[11.935px] size-[68.469px]" style={{ backgroundImage: MED_BG }} />
                </div>
            </div>
            <div className="absolute flex items-center justify-center left-[113.74px] size-[68.469px] top-[110.05px]">
                <div className="-scale-y-100 flex-none rotate-90">
                    <div className="rounded-br-[11.935px] rounded-tl-[11.935px] size-[68.469px]" style={{ backgroundImage: MED_BG }} />
                </div>
            </div>
            <div className="absolute flex items-center justify-center left-[113.74px] size-[68.469px] top-[41.58px]">
                <div className="-scale-y-100 flex-none">
                    <div className="rounded-br-[11.935px] rounded-tl-[11.935px] size-[68.469px]" style={{ backgroundImage: MED_BG }} />
                </div>
            </div>
            <div className="absolute flex items-center justify-center left-[45.27px] size-[68.469px] top-[110.05px]">
                <div className="-scale-y-100 flex-none rotate-180">
                    <div className="rounded-br-[11.935px] rounded-tl-[11.935px] size-[68.469px]" style={{ backgroundImage: MED_BG }} />
                </div>
            </div>

            {/* ── Central radial hub ── */}
            <div className="absolute flex items-center justify-center left-[60.39px] size-[106.358px] top-[52.29px]">
                <div className="flex-none rotate-180">
                    <div className="rounded-[53.179px] size-[106.358px]" style={{ backgroundImage: RADIAL_SVG }} />
                </div>
            </div>

            {/* ── Inner petals (non-square 48.592×48.61) ── */}
            <div className="absolute flex h-[48.61px] items-center justify-center left-[65.15px] top-[61.44px] w-[48.592px]">
                <div className="-scale-y-100 flex-none rotate-180">
                    <div className="h-[48.61px] rounded-br-[24.111px] rounded-tl-[24.111px] w-[48.592px]" style={{ backgroundImage: INNER_BG }} />
                </div>
            </div>
            <div className="absolute flex h-[48.61px] items-center justify-center left-[113.74px] top-[110.05px] w-[48.592px]">
                <div className="-scale-y-100 flex-none">
                    <div className="h-[48.61px] rounded-br-[24.111px] rounded-tl-[24.111px] w-[48.592px]" style={{ backgroundImage: INNER_BG }} />
                </div>
            </div>
            <div className="absolute flex h-[48.592px] items-center justify-center left-[113.74px] top-[61.46px] w-[48.61px]">
                <div className="-rotate-90 -scale-y-100 flex-none">
                    <div className="h-[48.61px] rounded-br-[24.111px] rounded-tl-[24.111px] w-[48.592px]" style={{ backgroundImage: INNER_BG }} />
                </div>
            </div>
            <div className="absolute flex h-[48.592px] items-center justify-center left-[65.14px] top-[110.05px] w-[48.61px]">
                <div className="-scale-y-100 flex-none rotate-90">
                    <div className="h-[48.61px] rounded-br-[24.111px] rounded-tl-[24.111px] w-[48.592px]" style={{ backgroundImage: INNER_BG }} />
                </div>
            </div>

            {/* ── Small accent petals (non-square 23.878×23.87, accent gradient) ── */}
            <div className="absolute flex h-[23.878px] items-center justify-center left-[89.87px] top-[86.17px] w-[23.87px]">
                <div className="-rotate-90 -scale-y-100 flex-none">
                    <div className="h-[23.87px] rounded-bl-[11.935px] rounded-tr-[11.935px] w-[23.878px]" style={{ backgroundImage: SMALL_BG }} />
                </div>
            </div>
            <div className="absolute flex h-[23.878px] items-center justify-center left-[113.74px] top-[110.05px] w-[23.87px]">
                <div className="-scale-y-100 flex-none rotate-90">
                    <div className="h-[23.87px] rounded-bl-[11.935px] rounded-tr-[11.935px] w-[23.878px]" style={{ backgroundImage: SMALL_BG }} />
                </div>
            </div>
            <div className="absolute flex h-[23.87px] items-center justify-center left-[113.74px] top-[86.18px] w-[23.878px]">
                <div className="-scale-y-100 flex-none">
                    <div className="h-[23.87px] rounded-bl-[11.935px] rounded-tr-[11.935px] w-[23.878px]" style={{ backgroundImage: SMALL_BG }} />
                </div>
            </div>
            <div className="absolute flex h-[23.87px] items-center justify-center left-[89.86px] top-[110.05px] w-[23.878px]">
                <div className="-scale-y-100 flex-none rotate-180">
                    <div className="h-[23.87px] rounded-bl-[11.935px] rounded-tr-[11.935px] w-[23.878px]" style={{ backgroundImage: SMALL_BG }} />
                </div>
            </div>

        </div>
    );
}

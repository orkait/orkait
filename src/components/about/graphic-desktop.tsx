// JUSTIFICATION: absolute positioning is required — this is a fixed 428x415 pixel-perfect geometric
// composition for desktop. Each petal's exact coordinates are defined by the Figma design node 845:293.
// This is the high-resolution version of the graphic seen on node 845:293.

const CONIC_SVG = (w: number, h: number, matrix: string, gradient: string) =>
    `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><g transform="${matrix}"><foreignObject x="-190" y="-190" width="380" height="380"><div xmlns="http://www.w3.org/1999/xhtml" style="background-image: ${gradient}; opacity:1; height: 100%; width: 100%;"></div></foreignObject></g></svg>')`;

const RADIAL_SVG = (w: number, h: number, matrix: string) =>
    `url('data:image/svg+xml;utf8,<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect x="0" y="0" height="100%" width="100%" fill="url(%23grad)" opacity="1"/><defs><radialGradient id="grad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10" gradientTransform="${matrix}"><stop stop-color="rgba(0,0,0,1)" offset="0"/><stop stop-color="rgba(8,8,8,0.9375)" offset="0.047557"/><stop stop-color="rgba(16,16,16,0.875)" offset="0.095113"/><stop stop-color="rgba(32,32,32,0.75)" offset="0.19023"/><stop stop-color="rgba(64,64,64,0.5)" offset="0.38045"/><stop stop-color="rgba(127,127,127,0)" offset="0.76091"/></radialGradient></defs></svg>')`;

const CONIC_MAIN = "conic-gradient(from 90deg, rgb(72, 62, 62) 0%, rgba(103, 96, 96, 0.75) 25%, rgba(134, 129, 129, 0.5) 50%, rgba(165, 163, 163, 0.25) 75%, rgba(196, 196, 196, 0) 100%)";
const CONIC_ACCENT = "conic-gradient(from 90deg, rgb(152, 152, 152) 0%, rgba(174, 174, 174, 0.5) 50%, rgba(185, 185, 185, 0.25) 75%, rgba(196, 196, 196, 0) 100%)";

// Desktop Scale Matrix definitions
const LARGE_M = "matrix(-9.3685 9.3685 -9.3685 -9.3685 93.685 93.685)";
const LARGE_BG = CONIC_SVG(187.37, 187.37, LARGE_M, CONIC_MAIN);

const MED_M = "matrix(-6.451 6.451 -6.451 -6.451 64.51 64.51)";
const MED_BG = CONIC_SVG(129.02, 129.02, MED_M, CONIC_MAIN);

const HUB_M = "matrix(-7.2825 7.2825 -7.2825 -7.2825 100.21 100.21)";
const HUB_BG = RADIAL_SVG(200.42, 200.42, HUB_M);

const INNER_M = "matrix(-4.5783 4.58 -4.5783 -4.58 45.783 45.8)";
const INNER_BG = CONIC_SVG(91.566, 91.599, INNER_M, CONIC_MAIN);

const SMALL_M = "matrix(2.2498 2.249 -2.2498 2.249 22.498 22.49)";
const SMALL_BG = CONIC_SVG(44.995, 44.979, SMALL_M, CONIC_ACCENT);

export function GraphicDesktop({ className }: { className?: string }) {
    return (
        <div className={`relative w-[428px] h-[415px] ${className ?? ""}`} data-name="Graphic Container Desktop">
            {/* LARGE QUADRANTS */}
            <div className="absolute flex items-center justify-center left-[26.76px] size-[187.369px] top-[207.34px]">
                <div className="-scale-y-100 flex-none rotate-90">
                    <div className="opacity-60 rounded-tr-[48.365px] size-[187.369px]" style={{ backgroundImage: LARGE_BG }} />
                </div>
            </div>
            <div className="absolute flex items-center justify-center left-[214.45px] size-[187.369px] top-[19.87px]">
                <div className="-rotate-90 -scale-y-100 flex-none">
                    <div className="opacity-60 rounded-tr-[48.365px] size-[187.369px]" style={{ backgroundImage: LARGE_BG }} />
                </div>
            </div>
            <div className="absolute flex items-center justify-center left-[26.75px] size-[187.369px] top-[19.87px]">
                <div className="-scale-y-100 flex-none rotate-180">
                    <div className="opacity-60 rounded-tr-[48.365px] size-[187.369px]" style={{ backgroundImage: LARGE_BG }} />
                </div>
            </div>
            <div className="absolute flex items-center justify-center left-[214.13px] size-[187.369px] top-[207.24px]">
                <div className="-scale-y-100 flex-none">
                    <div className="opacity-60 rounded-tr-[48.365px] size-[187.369px]" style={{ backgroundImage: LARGE_BG }} />
                </div>
            </div>

            {/* MEDIUM PETALS */}
            <div className="absolute flex items-center justify-center left-[85.31px] size-[129.021px] top-[78.36px]">
                <div className="-rotate-90 -scale-y-100 flex-none">
                    <div className="rounded-br-[22.49px] rounded-tl-[22.49px] size-[129.021px]" style={{ backgroundImage: MED_BG }} />
                </div>
            </div>
            <div className="absolute flex items-center justify-center left-[214.33px] size-[129.021px] top-[207.38px]">
                <div className="-scale-y-100 flex-none rotate-90">
                    <div className="rounded-br-[22.49px] rounded-tl-[22.49px] size-[129.021px]" style={{ backgroundImage: MED_BG }} />
                </div>
            </div>
            <div className="absolute flex items-center justify-center left-[214.33px] size-[129.021px] top-[78.36px]">
                <div className="-scale-y-100 flex-none">
                    <div className="rounded-br-[22.49px] rounded-tl-[22.49px] size-[129.021px]" style={{ backgroundImage: MED_BG }} />
                </div>
            </div>
            <div className="absolute flex items-center justify-center left-[85.31px] size-[129.021px] top-[207.38px]">
                <div className="-scale-y-100 flex-none rotate-180">
                    <div className="rounded-br-[22.49px] rounded-tl-[22.49px] size-[129.021px]" style={{ backgroundImage: MED_BG }} />
                </div>
            </div>

            {/* CENTRAL HUB */}
            <div className="absolute flex items-center justify-center left-[113.8px] size-[200.418px] top-[98.52px]">
                <div className="flex-none rotate-180">
                    <div className="rounded-[100.209px] size-[200.418px]" style={{ backgroundImage: HUB_BG }} />
                </div>
            </div>

            {/* INNER PETALS */}
            <div className="absolute flex h-[91.599px] items-center justify-center left-[122.76px] top-[115.78px] w-[91.566px]">
                <div className="-scale-y-100 flex-none rotate-180">
                    <div className="h-[91.599px] rounded-br-[45.435px] rounded-tl-[45.435px] w-[91.566px]" style={{ backgroundImage: INNER_BG }} />
                </div>
            </div>
            <div className="absolute flex h-[91.599px] items-center justify-center left-[214.33px] top-[207.38px] w-[91.566px]">
                <div className="-scale-y-100 flex-none">
                    <div className="h-[91.599px] rounded-br-[45.435px] rounded-tl-[45.435px] w-[91.566px]" style={{ backgroundImage: INNER_BG }} />
                </div>
            </div>
            <div className="absolute flex h-[91.566px] items-center justify-center left-[214.33px] top-[115.81px] w-[91.599px]">
                <div className="-rotate-90 -scale-y-100 flex-none">
                    <div className="h-[91.599px] rounded-br-[45.435px] rounded-tl-[45.435px] w-[91.566px]" style={{ backgroundImage: INNER_BG }} />
                </div>
            </div>
            <div className="absolute flex h-[91.566px] items-center justify-center left-[122.75px] top-[207.38px] w-[91.599px]">
                <div className="-scale-y-100 flex-none rotate-90">
                    <div className="h-[91.599px] rounded-br-[45.435px] rounded-tl-[45.435px] w-[91.566px]" style={{ backgroundImage: INNER_BG }} />
                </div>
            </div>

            {/* SMALL ACCENTS */}
            <div className="absolute flex h-[44.995px] items-center justify-center left-[169.35px] top-[162.38px] w-[44.979px]">
                <div className="-rotate-90 -scale-y-100 flex-none">
                    <div className="h-[44.979px] rounded-bl-[22.49px] rounded-tr-[22.49px] w-[44.995px]" style={{ backgroundImage: SMALL_BG }} />
                </div>
            </div>
            <div className="absolute flex h-[44.995px] items-center justify-center left-[214.33px] top-[207.38px] w-[44.979px]">
                <div className="-scale-y-100 flex-none rotate-90">
                    <div className="h-[44.979px] rounded-bl-[22.49px] rounded-tr-[22.49px] w-[44.995px]" style={{ backgroundImage: SMALL_BG }} />
                </div>
            </div>
            <div className="absolute flex h-[44.979px] items-center justify-center left-[214.33px] top-[162.4px] w-[44.995px]">
                <div className="-scale-y-100 flex-none">
                    <div className="h-[44.979px] rounded-bl-[22.49px] rounded-tr-[22.49px] w-[44.995px]" style={{ backgroundImage: SMALL_BG }} />
                </div>
            </div>
            <div className="absolute flex h-[44.979px] items-center justify-center left-[169.33px] top-[207.38px] w-[44.995px]">
                <div className="-scale-y-100 flex-none rotate-180">
                    <div className="h-[44.979px] rounded-bl-[22.49px] rounded-tr-[22.49px] w-[44.995px]" style={{ backgroundImage: SMALL_BG }} />
                </div>
            </div>
        </div>
    );
}

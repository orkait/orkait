// JUSTIFICATION: absolute positioning is correct here — this is a fixed 220×220 geometric
// composition where each petal has an exact pixel coordinate within the container.
// Flex/grid cannot represent arbitrary overlapping rotated arcs.

const CONIC_GRADIENT =
    "conic-gradient(from 90deg, rgb(72, 62, 62) 0%, rgba(103, 96, 96, 0.75) 25%, rgba(134, 129, 129, 0.5) 50%, rgba(165, 163, 163, 0.25) 75%, rgba(196, 196, 196, 0) 100%)";

const ACCENT_GRADIENT =
    "conic-gradient(from 90deg, rgb(152, 152, 152) 0%, rgba(174, 174, 174, 0.5) 50%, rgba(185, 185, 185, 0.25) 75%, rgba(196, 196, 196, 0) 100%)";

interface PetalProps {
    size: number;
    top: number;
    left: number;
    rotate?: string;
    scaleY?: boolean;
    extraClass?: string;
    gradient?: string;
}

function GraphicPetal({
    size,
    top,
    left,
    rotate = "",
    scaleY = false,
    extraClass = "",
    gradient = CONIC_GRADIENT,
}: PetalProps) {
    const innerTransform = [rotate && `rotate-[${rotate}]`, scaleY && "-scale-y-100"]
        .filter(Boolean)
        .join(" ");
    const half = size / 2;
    const matrix = `matrix(-${half / 10} ${half / 10} -${half / 10} -${half / 10} ${half} ${half})`;

    return (
        <div
            className="absolute flex items-center justify-center"
            style={{ top, left, width: size, height: size }}
        >
            <div className={`flex-none w-full h-full ${innerTransform}`}>
                <svg
                    viewBox={`0 0 ${size} ${size}`}
                    className={`w-full h-full ${extraClass}`}
                    preserveAspectRatio="none"
                >
                    <g transform={matrix}>
                        <foreignObject x="-190" y="-190" width="380" height="380">
                            <div style={{ backgroundImage: gradient, opacity: 1, height: "100%", width: "100%" }} />
                        </foreignObject>
                    </g>
                </svg>
            </div>
        </div>
    );
}

// Four large quadrant petals (99.433px, opacity-60, rounded-tr-[25.666px])
const LARGE_PETALS: PetalProps[] = [
    { size: 99.433, top: 110.03, left: 14.2,   rotate: "90deg",  scaleY: true,  extraClass: "opacity-60 rounded-tr-[25.666px]" },
    { size: 99.433, top: 10.54,  left: 113.81,  rotate: "-90deg", scaleY: true,  extraClass: "opacity-60 rounded-tr-[25.666px]" },
    { size: 99.433, top: 10.55,  left: 14.19,   rotate: "180deg", scaleY: true,  extraClass: "opacity-60 rounded-tr-[25.666px]" },
    { size: 99.433, top: 109.98, left: 113.64,  scaleY: true,                    extraClass: "opacity-60 rounded-tr-[25.666px]" },
];

// Four medium petals (68.469px, rounded-br and rounded-tl)
const MEDIUM_PETALS: PetalProps[] = [
    { size: 68.469, top: 41.58,  left: 45.27,   rotate: "-90deg", scaleY: true,  extraClass: "rounded-br-[11.935px] rounded-tl-[11.935px]" },
    { size: 68.469, top: 110.05, left: 113.74,  rotate: "90deg",  scaleY: true,  extraClass: "rounded-br-[11.935px] rounded-tl-[11.935px]" },
    { size: 68.469, top: 41.58,  left: 113.74,  scaleY: true,                    extraClass: "rounded-br-[11.935px] rounded-tl-[11.935px]" },
    { size: 68.469, top: 110.05, left: 45.27,   rotate: "180deg", scaleY: true,  extraClass: "rounded-br-[11.935px] rounded-tl-[11.935px]" },
];

// Four inner accent petals (48.59px, accent gradient, rounded-br and rounded-tl)
const INNER_PETALS: PetalProps[] = [
    { size: 48.592, top: 61.44,  left: 65.15,   rotate: "180deg", scaleY: true,  extraClass: "rounded-br-[24.111px] rounded-tl-[24.111px]" },
    { size: 48.592, top: 110.05, left: 113.74,  scaleY: true,                    extraClass: "rounded-br-[24.111px] rounded-tl-[24.111px]" },
    { size: 48.61,  top: 61.46,  left: 113.74,  rotate: "-90deg", scaleY: true,  extraClass: "rounded-br-[24.111px] rounded-tl-[24.111px]" },
    { size: 48.61,  top: 110.05, left: 65.14,   rotate: "90deg",  scaleY: true,  extraClass: "rounded-br-[24.111px] rounded-tl-[24.111px]" },
];

// Four small accent petals (23.87px, accent gradient, rounded-bl and rounded-tr)
const SMALL_PETALS: PetalProps[] = [
    { size: 23.878, top: 86.17,  left: 89.87,   rotate: "-90deg", scaleY: true,  extraClass: "rounded-bl-[11.935px] rounded-tr-[11.935px]", gradient: ACCENT_GRADIENT },
    { size: 23.878, top: 110.05, left: 113.74,  rotate: "90deg",  scaleY: true,  extraClass: "rounded-bl-[11.935px] rounded-tr-[11.935px]", gradient: ACCENT_GRADIENT },
    { size: 23.878, top: 86.18,  left: 113.74,  scaleY: true,                    extraClass: "rounded-bl-[11.935px] rounded-tr-[11.935px]", gradient: ACCENT_GRADIENT },
    { size: 23.878, top: 110.05, left: 89.86,   rotate: "180deg", scaleY: true,  extraClass: "rounded-bl-[11.935px] rounded-tr-[11.935px]", gradient: ACCENT_GRADIENT },
];

export function GraphicContainer({ className }: { className?: string }) {
    return (
        <div
            className={`relative w-[220px] h-[220px] ${className ?? ""}`}
            data-name="Graphic Container"
        >
            {/* Central radial hub */}
            <div className="absolute flex items-center justify-center left-[60.39px] w-[106.358px] h-[106.358px] top-[52.29px]">
                <div className="flex-none rotate-180 w-full h-full">
                    <svg className="rounded-[53.179px] w-full h-full" viewBox="0 0 106.36 106.36" preserveAspectRatio="none">
                        <rect x="0" y="0" height="100%" width="100%" fill="url(#grad)" opacity="1" />
                        <defs>
                            <radialGradient id="grad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10" gradientTransform="matrix(-3.8647 3.8647 -3.8647 -3.8647 53.179 53.179)">
                                <stop stopColor="rgba(0,0,0,1)"          offset="0" />
                                <stop stopColor="rgba(8,8,8,0.9375)"     offset="0.047557" />
                                <stop stopColor="rgba(16,16,16,0.875)"   offset="0.095113" />
                                <stop stopColor="rgba(32,32,32,0.75)"    offset="0.19023" />
                                <stop stopColor="rgba(64,64,64,0.5)"     offset="0.38045" />
                                <stop stopColor="rgba(127,127,127,0)"    offset="0.76091" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </div>

            {[...LARGE_PETALS, ...MEDIUM_PETALS, ...INNER_PETALS, ...SMALL_PETALS].map((petal, i) => (
                <GraphicPetal key={i} {...petal} />
            ))}
        </div>
    );
}

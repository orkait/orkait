import Image from "next/image";

// ── Component ───
export default function OrkaitReflection() {
	return (
		<div className="flex flex-col items-center fixed bottom-5 left-5 z-[999]">
			{/* Main Text + Fin Wrapper */}
			<div className="relative inline-block">
				{/* Shark Fin */}
				<div
					className="absolute z-10"
					style={{ top: "-80px", left: "20px", width: "200px", height: "170px" }}
				>
					<Image
						src="/orkait.svg"
						alt="Orkait Logo Fin"
						width={200}
						height={150}
						style={{ objectFit: "contain" }}
					/>
				</div>

				{/* Main Text */}
				<div className="text-[200px] font-bold leading-none">ORKAIT</div>
			</div>

			{/* Reflection */}
			<div
				className="text-[200px] font-bold leading-none opacity-40 -scale-y-100"
				style={{
					marginTop: "-45px",
					WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 80%)",
					maskImage: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 100%)",
				}}
			>
				ORKAIT
			</div>
		</div>
	);
}

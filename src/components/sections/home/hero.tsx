import { satoshi } from "@/config/fonts";
import Image from "next/image";

// ── Component ───
export default function OrkaitReflection() {
	return (
		<div>
			<div className="max-w-[512px] md:ml-auto md:mr-12 text-right">
				<p className="font-satoshi font-bold text-3xl md:text-[48px] leading-snug md:leading-[50px] tracking-[-0.02em]">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae tortor
					varius.
				</p>
			</div>
			<div className="flex flex-col items-center fixed bottom-5 left-5 z-[999]">
				<div className="relative inline-block">
					{/* Shark Fin */}
					<div className="absolute -top-[80px] left-[20px] w-[200px] h-[170px] z-10">
						<Image
							src="/orkait.svg"
							alt="Orkait Logo Fin"
							width={200}
							height={150}
							className="object-contain"
						/>
					</div>

					{/* Main Text */}
					<div className="font-satoshi font-bold text-[230.4px] leading-[100%] tracking-normal text-black">
						ORKAIT
					</div>
				</div>

				{/* Reflection */}
				<div
					className="font-satoshi font-bold text-[230.4px] leading-[100%] tracking-normal text-black opacity-40 -scale-y-100"
					style={{
						marginTop: "-45px",
						WebkitMaskImage:
							"linear-gradient(to top, rgba(0,0,0,0.5), transparent 80%)",
						maskImage: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 100%)",
					}}
				>
					ORKAIT
				</div>
			</div>
		</div>
	);
}

import Image from "next/image";

export default function HeroImageSection() {
	return (
		<section className="flex w-full justify-center bg-white">
			<div className="flex w-full max-w-[1440px] flex-col items-center justify-center p-4 sm:p-8 lg:h-[814px] lg:p-16">
				<div className="flex w-full items-center justify-center overflow-hidden lg:h-[686px] lg:w-[1312px]">
					<Image
						src="/hero-image-section.webp"
						alt="Hero image"
						width={1312}
						height={686}
						priority
						className="h-auto w-full object-cover lg:h-full"
					/>
				</div>
			</div>
		</section>
	);
}

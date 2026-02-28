import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Mission() {
	return (
		<section className="flex w-full justify-center bg-white">
			<div className="flex w-full max-w-[1440px] flex-col gap-12 px-4 py-12 sm:px-8 lg:h-[814px] lg:gap-[149px] lg:px-16 lg:pb-[104px] lg:pt-[30px]">
				<header className="flex flex-col gap-6 lg:gap-[22px]">
					<div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-[96px]">
						<p className="text-[18px] font-medium leading-[24px] text-black lg:text-[32px] lg:leading-[40px]">
							(01) STUDIO
						</p>
						<h2 className="text-[48px] font-medium leading-[52px] tracking-[-0.02em] text-black md:text-[64px] md:leading-[68px] lg:text-[72px] lg:leading-[77.578px]">
							We craft digital experiences that
						</h2>
					</div>
					<h2 className="text-[48px] font-medium leading-[52px] tracking-[-0.02em] text-black md:text-[64px] md:leading-[68px] lg:text-[72px] lg:leading-[77.578px]">
						inspire, empowering businesses to thrive in
						<br className="hidden lg:block" />
						<span className="lg:hidden"> </span>
						the digital world.
					</h2>
				</header>

				<div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-[140px]">
					<Image
						src="/mission-section.png"
						alt="Mission"
						width={292}
						height={322}
						priority
						className="h-auto w-full max-w-[292px] object-cover"
					/>

					<div className="flex flex-1 flex-col gap-8 lg:gap-10">
						<div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-[64px]">
							<p className="max-w-[324px] text-[18px] font-normal leading-[28px] text-black md:text-[24px] md:leading-[34px]">
								We are Orkait, a service provider dedicated to crafting digital
								experiences that inspire. Our expertise spans three core domains:
								web app development, software solutions, and enterprise scaling and
								deployment.
							</p>

							<div className="flex max-w-[356px] flex-col gap-8 lg:gap-10">
								<p className="text-[18px] font-normal leading-[28px] text-black md:text-[24px] md:leading-[34px]">
									We work with small enterprises to help them compete and grow in
									today&apos;s digital landscape. Our team combines technical
									excellence with creative vision to deliver solutions that make a
									real difference.
								</p>

								<Button
									asChild
									className="h-12 w-fit rounded-[8px] bg-black px-6 text-[18px] font-medium leading-[24px] text-white hover:bg-black/90"
								>
									<Link href="/about">About Us</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

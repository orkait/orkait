"use client";

import Image from "next/image";
import Link from "next/link";

export function Navbar() {
	return (
		<nav className="bg-white sticky top-0 z-50 shadow-[0_4px_14px_rgba(0,0,0,0.1)] w-full">
			<div className="flex items-center justify-between px-11 py-6 w-full mx-auto">
				<Link href="/" aria-label="Home" className="shrink-0">
					<Image 
						src="/orkait.svg" 
						alt="Orkait Logo" 
						width={69} 
						height={46} 
						className="w-[69px] h-auto"
						priority
					/>
				</Link>
				<div className="flex items-center gap-10">
					<div className="flex items-center gap-8">
						<Link href="/about" className="text-base text-black font-normal hover:opacity-80 transition-opacity">
							About
						</Link>
						<Link href="/works" className="text-base text-black font-normal hover:opacity-80 transition-opacity">
							Works
						</Link>
						<Link href="/services" className="text-base text-black font-normal hover:opacity-80 transition-opacity">
							Services
						</Link>
					</div>
					<Link 
						href="/contact" 
						className="bg-black text-white text-sm font-medium px-6 py-2 rounded-full hover:bg-black/90 transition-colors"
					>
						Contact Us
					</Link>
				</div>
			</div>
		</nav>
	);
}

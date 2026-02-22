import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
	{ href: "#about", label: "About" },
	{ href: "#work", label: "Work" },
	{ href: "#services", label: "Services" },
];

const contactLink = { href: "#contact", label: "Contact us" };

export default function Navbar() {
	return (
		<header className="w-full border-b bg-background">
			<nav
				className="mx-auto flex items-center justify-between px-4 py-3 mr-2"
				aria-label="Primary"
			>
				{/* Brand */}
				<Link
					href="/"
					className="inline-flex items-center gap-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					aria-label="Home"
				>
					<Image src="/orkait.svg" alt="Orkait logo" width={40} height={40} priority />
				</Link>

				{/* Desktop links */}
				<div className="hidden items-center gap-1 sm:flex">
					{navLinks.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="relative px-3 py-2 text-sm font-medium text-foreground/80 transition
               border-b-2 border-transparent hover:border-foreground hover:text-foreground
               focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2"
						>
							{item.label}
						</Link>
					))}

					<Button asChild className="ml-2">
						<Link href={contactLink.href}>{contactLink.label}</Link>
					</Button>
				</div>
			</nav>
		</header>
	);
}

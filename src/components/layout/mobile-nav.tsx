"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { HEADER_LINKS } from "@/config/site-links";
import { routes } from "@/config/routes";

export function MobileNav() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="laptop:hidden"
					aria-label="Open navigation menu"
				>
					<Menu className="size-5" />
				</Button>
			</SheetTrigger>
			<SheetContent side="right" showCloseButton={false} className="w-[192px] sm:max-w-[192px] border-border flex flex-col">
				<SheetHeader className="pt-8 relative">
					<SheetTitle className="sr-only">Navigation</SheetTitle>
					<SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
						<Image src="/data/ui/cross.svg" alt="Close menu" width={36} height={36} />
						<span className="sr-only">Close</span>
					</SheetClose>
				</SheetHeader>
				<nav className="flex flex-col gap-6 px-4 pt-8">
					{HEADER_LINKS.map((link) => (
						<SheetClose key={link.href} asChild>
							<Button asChild variant="ghost" className="justify-end text-lg font-normal hover:bg-transparent hover:text-primary">
								<Link href={link.href}>{link.label}</Link>
							</Button>
						</SheetClose>
					))}
				</nav>
				<div className="mt-auto px-4 pb-8 flex justify-center">
					<SheetClose asChild>
						<Button asChild>
							<Link href={routes.contact}>Contact Us</Link>
						</Button>
					</SheetClose>
				</div>
			</SheetContent>
		</Sheet>
	);
}

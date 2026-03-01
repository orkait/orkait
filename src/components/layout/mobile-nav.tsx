"use client";

import Link from "next/link";
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

export function MobileNav() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="tablet:hidden"
					aria-label="Open navigation menu"
				>
					<Menu className="size-5" />
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="w-[300px] border-border">
				<SheetHeader className="pt-8">
					<SheetTitle className="text-subtitle leading-subtitle">Navigation</SheetTitle>
				</SheetHeader>
				<nav className="flex flex-col gap-2 px-4 pb-8">
					{HEADER_LINKS.map((link) => (
						<SheetClose key={link.href} asChild>
							<Button asChild variant="ghost" className="justify-start">
								<Link href={link.href}>{link.label}</Link>
							</Button>
						</SheetClose>
					))}
					<SheetClose asChild>
						<Button asChild className="mt-2">
							<Link href="/contact">Contact Us</Link>
						</Button>
					</SheetClose>
				</nav>
			</SheetContent>
		</Sheet>
	);
}

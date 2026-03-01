"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HEADER_LINKS } from "@/config/site-links";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
            <div className="flex w-full items-center justify-between px-4 py-4 phone:px-8 tablet:px-12">
                <Link href="/" aria-label="Home" className="shrink-0">
                    <Image
                        src="/orkait.svg"
                        alt="Orkait Logo"
                        width={69}
                        height={46}
                        className="h-auto w-[69px]"
                        priority
                    />
                </Link>

                <div className="hidden items-center gap-8 tablet:flex">
                    {HEADER_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-body leading-body font-medium text-foreground transition-opacity hover:opacity-70"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Button asChild size="sm">
                        <Link href="/contact">Contact Us</Link>
                    </Button>
                </div>

                <div className="tablet:hidden">
                    <MobileNav />
                </div>
            </div>
        </nav>
    );
}

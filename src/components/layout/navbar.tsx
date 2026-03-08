"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HEADER_LINKS } from "@/config/site-links";
import { MobileNav } from "@/components/layout/mobile-nav";
import { routes } from "@/config/routes";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
    const pathname = usePathname();
    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
            <div className="flex w-full items-center justify-between px-4 py-4 tablet:px-8 base:px-12">
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

                <div className="hidden items-center gap-8 laptop:flex">
                    {HEADER_LINKS.map((link) => {
                        const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow"
                                        : "text-foreground hover:bg-primary hover:text-primary-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    <Link 
                        href={routes.contact}
                        className={cn(
                            "flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors",
                            pathname === routes.contact
                                ? "bg-primary text-primary-foreground shadow"
                                : "text-foreground hover:bg-primary hover:text-primary-foreground"
                        )}
                    >
                        Contact Us
                    </Link>
                </div>

                <div className="laptop:hidden">
                    <MobileNav />
                </div>
            </div>
        </nav>
    );
}

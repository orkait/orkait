"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FOOTER_COLUMNS, type FooterColumn } from "@/constants";
import { routes } from "@/config/routes";

function FooterLinksColumn({ ariaLabel, heading, links }: FooterColumn) {
    return (
        <nav aria-label={ariaLabel} className="flex flex-col gap-3">
            {heading ? (
                <p className="text-foreground font-medium text-body-lg leading-body-lg">
                    {heading}
                </p>
            ) : null}
            {links.map((link) => (
                <Link
                    key={`${ariaLabel}-${link.label}`}
                    href={link.href}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    className="text-muted-foreground font-medium text-body leading-body transition-colors hover:text-foreground w-fit"
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}

const Footer = () => {
    return (
        <footer className="border-t border-border bg-background mt-16 tablet:mt-24">
            <div className="px-4 tablet:px-8 laptop:px-12 base:px-16 py-12 tablet:py-16">
                {/* Mobile: stacked */}
                <div className="tablet:hidden flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                        <Link href="/" aria-label="Home">
                            <Image
                                src="/data/brand/orkait.svg"
                                alt="Orkait"
                                width={56}
                                height={38}
                                className="h-auto w-[56px]"
                            />
                        </Link>
                        <p className="text-muted-foreground font-medium text-body leading-body max-w-[260px]">
                            Engineering-first software company. Reliable systems, honest engineering.
                        </p>
                        <Button asChild variant="default" className="w-fit mt-2">
                            <Link href={routes.contact}>Talk to Us</Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        {FOOTER_COLUMNS.map((column) => (
                            <FooterLinksColumn key={column.ariaLabel} {...column} />
                        ))}
                    </div>
                </div>

                {/* Tablet+: split layout */}
                <div className="hidden tablet:flex justify-between gap-12">
                    {/* Left: logo + tagline + CTA */}
                    <div className="flex flex-col gap-4 shrink-0">
                        <Link href="/" aria-label="Home">
                            <Image
                                src="/data/brand/orkait.svg"
                                alt="Orkait"
                                width={56}
                                height={38}
                                className="h-auto w-[56px]"
                            />
                        </Link>
                        <p className="text-muted-foreground font-medium text-body leading-body max-w-[260px]">
                            Engineering-first software company. Reliable systems, honest engineering.
                        </p>
                        <Button asChild variant="default" className="w-fit mt-2">
                            <Link href={routes.contact}>Talk to Us</Link>
                        </Button>
                    </div>

                    {/* Right: link columns */}
                    <div className="flex gap-12 laptop:gap-16 base:gap-20">
                        {FOOTER_COLUMNS.map((column) => (
                            <FooterLinksColumn key={column.ariaLabel} {...column} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-border px-4 tablet:px-8 laptop:px-12 base:px-16 py-6 flex items-center justify-between">
                <p className="text-muted-foreground font-medium text-xs leading-none">
                    &copy; {new Date().getFullYear()} Orkait
                </p>
                <p className="text-muted-foreground font-medium text-xs leading-none">
                    Built in Mumbai
                </p>
            </div>
        </footer>
    );
};

export default Footer;

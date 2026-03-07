"use client";

import Image from "next/image";
import Link from "next/link";
import { FOOTER_COLUMNS, type FooterColumn } from "@/constants";

const footerLinkClassName =
    "text-body-lg leading-body-lg font-medium text-foreground transition-opacity hover:opacity-70";

function FooterLinksColumn({ ariaLabel, heading, links }: FooterColumn) {
    return (
        <nav aria-label={ariaLabel} className="flex flex-col items-start">
            {heading ? <p className={footerLinkClassName}>{heading}</p> : null}
            {links.map((link) => (
                <Link
                    key={`${ariaLabel}-${link.label}`}
                    href={link.href}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    className={footerLinkClassName}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}

const Footer = () => {
    return (
        <footer className="relative ">
            {/* Absolute layers are required to recreate the diagonal cut and stripe artwork. */}
            <div
                className="pointer-events-none absolute inset-y-0 right-[calc(50%-50vw)] hidden w-[55vw] laptop:block"
                aria-hidden
            >
                <Image
                    src="/homepage/uniq_2.svg"
                    alt=""
                    fill
                    sizes="(min-width: 1440px) 55vw, 0px"
                    className="object-cover object-right"
                />
            </div>

            <div className="relative flex min-h-[420px] flex-col laptop:min-h-[663px]">
                <div className="grid max-w-3xl grid-cols-1 gap-8 phone:grid-cols-3 phone:gap-12">
                    {FOOTER_COLUMNS.map((column) => (
                        <FooterLinksColumn key={column.ariaLabel} {...column} />
                    ))}
                </div>


                <div className="relative mt-auto w-fit leading-[0.7] font-bold tracking-tight text-foreground tablet:text-[150px] laptop:text-[194px]">
                    ORKAIT

                    <Image
                        src="/orkait.svg"
                        alt=""
                        width={236}
                        height={119}
                        className="pointer-events-none scale-x-[-1] -top-2 right-0 -translate-y-full absolute h-auto w-24 phone:w-32 tablet:w-40 laptop:w-48"
                        aria-hidden
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;

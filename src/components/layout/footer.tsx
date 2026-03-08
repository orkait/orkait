"use client";

import Image from "next/image";
import Link from "next/link";
import { FOOTER_COLUMNS, type FooterColumn } from "@/constants";

const footerLinkClassName =
    "text-[8px] leading-[13px] tablet:text-body-lg tablet:leading-body-lg font-medium text-foreground transition-opacity hover:opacity-70";

function FooterLinksColumn({ ariaLabel, heading, links }: FooterColumn) {
    return (
        <nav aria-label={ariaLabel} className="flex flex-col items-start gap-[2px] tablet:gap-0">
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
        <footer className="relative mt-[16px] tablet:mt-0 overflow-hidden tablet:overflow-visible">
            {/* Absolute layers are required to recreate the diagonal cut and stripe artwork. */}
            <div
                className="pointer-events-none absolute inset-y-0 right-0 tablet:right-[calc(50%-50vw)] w-[50vw] tablet:hidden base:block"
                aria-hidden
            >
                <Image
                    src="/homepage/uniq_2.svg"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, (min-width: 1440px) 55vw, 0px"
                    className="object-cover object-left opacity-60 tablet:opacity-100"
                />
            </div>

            <div className="relative flex min-h-[160px] tablet:min-h-[420px] flex-col laptop:min-h-[500px] base:min-h-[663px] pt-[24px] tablet:pt-0 pl-[22px] tablet:pl-0">
                <div className="grid max-w-3xl grid-cols-3 gap-x-[16px] tablet:gap-8 tablet:grid-cols-2 laptop:grid-cols-3 tablet:gap-12 w-[65%] tablet:w-full z-10">
                    {FOOTER_COLUMNS.map((column) => (
                        <FooterLinksColumn key={column.ariaLabel} {...column} />
                    ))}
                </div>


                <div className="relative mt-8 tablet:mt-auto w-fit leading-[0.7] font-bold tracking-tight text-foreground text-[52.77px] tablet:text-[100px] laptop:text-[150px] base:text-[194px] z-10 pb-[15px] tablet:pb-0">
                    ORKAIT

                    <Image
                        src="/orkait.svg"
                        alt=""
                        width={236}
                        height={119}
                        className="pointer-events-none scale-x-[-1] -top-[4px] tablet:-top-2 right-[2px] tablet:right-0 -translate-y-full absolute h-auto w-[42px] tablet:w-24 laptop:w-32 base:w-40 large:w-48"
                        aria-hidden
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;

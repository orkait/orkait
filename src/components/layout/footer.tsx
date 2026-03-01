"use client";

import Link from "next/link";
import {
	FOOTER_LEGAL_LINKS,
	FOOTER_NAV_LINKS,
	FOOTER_SOCIAL_LINKS,
} from "@/config/site-links";

function FooterLinkGroup({
	title,
	links,
}: {
	title: string;
	links: Array<{ label: string; href: string }>;
}) {
	return (
		<nav className="flex flex-col gap-3" aria-label={title}>
			<p className="text-body leading-body font-medium uppercase tracking-wide text-muted-foreground">
				{title}
			</p>
			{links.map((link) => (
				<Link
					key={link.label}
					href={link.href}
					target={link.href.startsWith("http") ? "_blank" : undefined}
					rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
					className="text-body leading-body font-medium text-foreground transition-opacity hover:opacity-70"
				>
					{link.label}
				</Link>
			))}
		</nav>
	);
}

const Footer = () => {
	return (
		<footer className="border-t border-border bg-background">
			<div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-4 py-16 phone:px-8 tablet:px-16">
				<div className="grid grid-cols-1 gap-10 phone:grid-cols-2 tablet:grid-cols-3">
					<FooterLinkGroup title="Navigate" links={FOOTER_NAV_LINKS} />
					<FooterLinkGroup title="Legal" links={FOOTER_LEGAL_LINKS} />
					<FooterLinkGroup title="Social" links={FOOTER_SOCIAL_LINKS} />
				</div>

				<div className="border-t border-border pt-8">
					<p className="text-title-1 leading-title-1 font-bold tracking-tight text-foreground">
						ORKAIT
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

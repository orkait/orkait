import Link from "next/link";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

type ContentPageLink = {
	label: string;
	href: string;
};

type ContentPageProps = {
	eyebrow: string;
	title: string;
	description: string;
	links?: ContentPageLink[];
};

export function ContentPage({
	eyebrow,
	title,
	description,
	links = [],
}: ContentPageProps) {
	return (
		<Section horizontalMargin verticalMargin className="bg-background text-foreground">
			<div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
				<p className="text-body leading-body font-medium uppercase tracking-wide text-muted-foreground">
					{eyebrow}
				</p>
				<h1 className="text-title-1 leading-title-1 font-bold tracking-tight">
					{title}
				</h1>
				<p className="max-w-3xl text-body-lg leading-body-lg text-muted-foreground">
					{description}
				</p>
				{links.length > 0 && (
					<div className="flex flex-wrap gap-3">
						{links.map((link) => (
							<Button key={link.href} asChild size="sm">
								<Link href={link.href}>{link.label}</Link>
							</Button>
						))}
					</div>
				)}
			</div>
		</Section>
	);
}

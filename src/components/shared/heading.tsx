import { cn } from "@/lib/utils";

export function Heading({
	children,
	className,
	as: Tag = "h2",
}: {
	children: React.ReactNode;
	className?: string;
	as?: "h1" | "h2" | "h3" | "h4";
}) {
	return <Tag className={cn("font-bold tracking-tight", className)}>{children}</Tag>;
}

import { cn } from "@/lib/utils";

export function Section({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return <section className={cn("py-16 md:py-24", className)}>{children}</section>;
}

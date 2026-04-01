import { cn } from "@/lib/utils";

export function Container({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("mx-auto w-full max-w-7xl px-4 tablet:px-8 laptop:px-12", className)}>
			{children}
		</div>
	);
}

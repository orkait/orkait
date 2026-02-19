import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function IconBox({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
	return (
		<div
			className={cn(
				"flex items-center justify-center rounded-lg bg-primary/10 p-3",
				className,
			)}
		>
			<Icon className="size-6 text-primary" />
		</div>
	);
}

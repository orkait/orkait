import { cn } from "@/lib/utils";

export function Section({
    children,
    className,
    horizontalMargin = false,
    verticalMargin = false,
}: {
    children: React.ReactNode;
    className?: string;
    horizontalMargin?: boolean;
    verticalMargin?: boolean;
}) {
    return <section className={cn(horizontalMargin && "mx-16", verticalMargin && "py-16 md:py-24", className)}>{children}</section>;
}

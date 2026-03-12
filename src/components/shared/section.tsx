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
    return (
        <section
            className={cn(
                horizontalMargin ? "px-4 tablet:px-8 laptop:px-12 base:px-16" : "",
                verticalMargin ? "py-12 tablet:py-16 laptop:py-20" : "",
                className
            )}
        >
            {children}
        </section>
    );
}

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
                horizontalMargin ? "px-4 phone:px-8 tablet:px-16" : "",
                verticalMargin ? "py-12 phone:py-16 tablet:py-20" : "",
                className
            )}
        >
            {children}
        </section>
    );
}

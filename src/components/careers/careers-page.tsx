"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ApplyForm } from "@/components/careers/apply-form";
import { OPEN_ROLES, type OpenRole } from "@/data/team";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { Section } from "@/components/shared/section";

function getRoleLabel(role: OpenRole): string {
    return role.isIntern ? `${role.title} (Intern)` : role.title;
}

function getActiveRole(param: string | null): OpenRole | null {
    if (OPEN_ROLES.length === 0) return null;
    if (param) {
        const match = OPEN_ROLES.find((r) => getRoleLabel(r) === param);
        if (match) return match;
    }
    return OPEN_ROLES[0];
}

function RoleList({ activeLabel }: { activeLabel: string }) {
    return (
        <div className="flex flex-col gap-3">
            {OPEN_ROLES.map((role) => {
                const label = getRoleLabel(role);
                const isActive = label === activeLabel;

                return (
                    <Link
                        key={role.emailSubject}
                        href={`${routes.careers}?role=${encodeURIComponent(label)}`}
                        className={cn(
                            "flex flex-col gap-0.5 px-5 py-4 rounded-lg border transition-all duration-200",
                            isActive
                                ? "border-foreground bg-foreground"
                                : "border-border bg-background hover:border-foreground/30 hover:shadow-sm"
                        )}
                    >
                        <span className={cn(
                            "font-bold text-subtitle leading-subtitle tracking-tight",
                            isActive ? "text-background" : "text-foreground"
                        )}>
                            {role.title}
                        </span>
                        {role.isIntern && (
                            <span className={cn(
                                "font-medium text-body leading-body",
                                isActive ? "text-background/70" : "text-muted-foreground"
                            )}>
                                Internship
                            </span>
                        )}
                    </Link>
                );
            })}
        </div>
    );
}

export function CareersPage() {
    const searchParams = useSearchParams();
    const activeRole = getActiveRole(searchParams.get("role"));
    const activeLabel = activeRole ? getRoleLabel(activeRole) : null;

    if (!activeRole || !activeLabel) {
        return (
            <Section horizontalMargin verticalMargin>
                <p className="text-muted-foreground font-medium text-body leading-body">
                    No open roles right now. Check back soon.
                </p>
            </Section>
        );
    }

    return (
        <>
            {/* Mobile */}
            <Section horizontalMargin className="tablet:hidden pt-16 pb-20 flex flex-col gap-12">
                <div className="flex flex-col gap-6">
                    <p className="text-muted-foreground font-medium text-body leading-none tracking-widest uppercase">
                        Careers
                    </p>
                    <h1 className="text-[28px] font-bold leading-[1.1] tracking-tight text-foreground">
                        Work on systems<br />
                        that hold up.
                    </h1>
                    <p className="text-muted-foreground font-medium text-[14px] leading-[20px] max-w-[300px]">
                        Small team. Real problems. No hype.
                    </p>
                </div>

                <RoleList activeLabel={activeLabel} />

                <ApplyForm role={activeLabel} />
            </Section>

            {/* Desktop */}
            <Section
                horizontalMargin
                verticalMargin
                className="hidden tablet:flex flex-col"
            >
                <section className="flex gap-8">
                    {/* Left */}
                    <div className="flex-1 flex flex-col gap-10">
                        <p className="text-muted-foreground font-medium text-body leading-none tracking-widest uppercase">
                            Careers
                        </p>

                        <h1 className="text-title-1 leading-title-1 font-bold tracking-tight text-foreground">
                            Work on systems<br />
                            that hold up.
                        </h1>

                        <p className="text-muted-foreground font-medium text-body-lg leading-body-lg max-w-[300px]">
                            Small team. Real problems. No hype.
                        </p>

                        <div className="mt-6 max-w-[360px]">
                            <RoleList activeLabel={activeLabel} />
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex-1">
                        <ApplyForm role={activeLabel} />
                    </div>
                </section>
            </Section>
        </>
    );
}

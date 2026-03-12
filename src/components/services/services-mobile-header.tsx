import Link from "next/link";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

type ServicesMobileHeaderProps = {
  links?: { label: string; href: string }[];
};

export function ServicesMobileHeader({ links = [] }: ServicesMobileHeaderProps) {
  return (
    <Section className="block tablet:hidden w-full pt-28 pb-10 px-5 flex flex-col font-sans">
      <div className="flex flex-col">
        <p className="text-[14px] font-medium leading-[20px] uppercase text-foreground mb-8">
          (02) SERVICES
        </p>

        <h1 className="text-[28px] font-bold leading-[1.1] uppercase text-foreground">
          End-to-end product<br />
          engineering for<br />
          ambitious teams.
        </h1>
      </div>

      <p className="text-[16px] font-medium leading-[22px] text-foreground mt-12 max-w-[85%]">
        From MVP delivery to production hardening, Orkait supports the full lifecycle with a strong focus on system quality, velocity, and developer experience.
      </p>

      {links.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-10">
          {links.map((link) => (
            <Button
              key={link.href}
              asChild
              className="bg-[#0B1221] hover:bg-[#0B1221]/90 rounded-[10px] px-6 h-11 text-[16px] font-medium text-white border-none"
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>
      )}
    </Section>
  );
}

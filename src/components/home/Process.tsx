import { FEATURES, type FeatureCardProps } from "@/constants";

const FeatureCard = ({ num, title, description, index }: FeatureCardProps & { index: number }) => (
    <div
        className={`flex flex-col tablet:gap-2 py-6 tablet:py-10 border-border tablet:border-b
        ${index % 2 === 0 && index !== 6 ? "pr-[16px] border-r border-[#e8e8e8] dark:border-white/10 tablet:border-r-0 tablet:pr-0" : ""}
        ${index % 2 !== 0 && index !== 6 ? "pl-[16px] tablet:pl-0" : ""}
        ${index === 6 ? "col-span-2 w-full mx-auto tablet:col-span-1 tablet:w-full tablet:mx-0" : ""}
        ${index < 6 ? "border-b border-[#e8e8e8] dark:border-white/10 tablet:border-border" : ""}
        `}
    >
        <div className="flex flex-row items-center gap-[6px] tablet:gap-0 tablet:flex-col tablet:items-start mb-[8px] tablet:mb-0">
            <p className="text-[#111] dark:text-[#eee] tablet:text-muted-foreground font-medium text-[14px] leading-[20px] tablet:text-subtitle tablet:leading-subtitle">
                {num}
            </p>
            <p className="text-[#111] dark:text-[#eee] tablet:text-foreground font-bold tablet:font-medium text-[15px] leading-[22px] tablet:text-subtitle tablet:leading-subtitle">
                {title}
            </p>
        </div>
        <p className="text-[#6d6d6d] dark:text-[#a0a0a0] tablet:text-muted-foreground font-normal text-[12px] leading-[18px] tablet:text-body tablet:leading-body">
            {description}
        </p>
    </div>
);

const Process = () => {
    return (
        <section className="mt-12 tablet:mt-12 base:mt-24">
            
            {/* Mobile Title */}
            <div className="tablet:hidden mb-10 w-full">
                <h2 className="text-foreground font-bold text-[24px] leading-[30px] tracking-tight flex flex-col">
                    <span>Engineered right,</span>
                    <span>built to last</span>
                </h2>
            </div>
            
            <div className="grid grid-cols-2 tablet:grid-cols-2 laptop:grid-cols-3 tablet:gap-x-16 gap-y-0">
                {/* Feature cards 01–07 */}
                {FEATURES.map((f, i) => (
                    <FeatureCard key={f.num} {...f} index={i} />
                ))}

                {/* Tagline (Tablet & Desktop) */}
                <div
                    className="hidden tablet:flex mt-12 laptop:mt-0 items-center col-span-1 tablet:col-span-2 laptop:col-span-1 laptop:row-span-2 laptop:col-start-3 laptop:row-start-1"
                >
                    <h2 className="text-foreground font-bold text-heading leading-heading tracking-tight">
                        Engineered right, built to last
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default Process;

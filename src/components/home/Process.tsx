import { FEATURES, type FeatureCardProps } from "@/constants";

const FeatureCard = ({ num, title, description, area }: FeatureCardProps) => (
    <div
        className="flex flex-col gap-2 py-10 border-b border-border"
        style={{ gridArea: area }}
    >
        <p className="text-muted-foreground font-medium text-subtitle leading-subtitle">
            {num}
        </p>
        <p className="text-foreground font-medium text-subtitle leading-subtitle">
            {title}
        </p>
        <p className="text-muted-foreground font-normal text-body leading-body">
            {description}
        </p>
    </div>
);

const Process = () => {
    return (
        <section className="mt-16 laptop:mt-32">
            {/*
             * Named Grid Template:
             *   "card1  card2  tagline"
             *   "card3  card4  tagline"
             *   "card5  card6  card7  "
             *
             * Rows 1–2: tagline spans 2 rows in col 3.
             * Row 3: all three cols are equal feature cards.
             */}
            <div className="process-grid gap-x-16">
                {/* Feature cards 01–07 */}
                {FEATURES.map((f) => (
                    <FeatureCard key={f.num} {...f} />
                ))}

                {/* Tagline — spans [card1/card3] row × col 3 */}
                <div
                    className="flex items-center"
                    style={{ gridArea: "tagline" }}
                >
                    <h2 className="text-foreground font-bold text-heading leading-heading tracking-tight">
                        Seamless process, optimal results
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default Process;
type FeatureCard = {
    num: string;
    title: string;
    description: string;
    area: string;
};

const FEATURES: FeatureCard[] = [
    {
        num: "(01)",
        title: "Secure",
        description:
            "Orkait follows industry best practices and security standards. Rest easy knowing your digital solutions are built with security as a priority.",
        area: "card1",
    },
    {
        num: "(02)",
        title: "High-Performance",
        description:
            "Engineered for speed and efficiency. We build systems that handle millions of requests with sub-millisecond latency, ensuring zero compromises.",
        area: "card2",
    },
    {
        num: "(03)",
        title: "Quality Assured",
        description:
            "Orkait ensures quality through rigorous testing and verification processes. Deploy new solutions with confidence and reliability.",
        area: "card3",
    },
    {
        num: "(04)",
        title: "Simple",
        description:
            "Orkait simplifies complex development processes. Get started quickly with our streamlined approach to web apps and software solutions.",
        area: "card4",
    },
    {
        num: "(05)",
        title: "Customizable",
        description:
            "Tailored solutions to meet your specific requirements. Orkait customizes every aspect of your project to satisfy your unique needs.",
        area: "card5",
    },
    {
        num: "(06)",
        title: "Plug and Play",
        description:
            "Seamless integration and deployment solutions. Get started quickly and easily with Orkait's streamlined service delivery.",
        area: "card6",
    },
    {
        num: "(07)",
        title: "Enterprise Ready",
        description:
            "Orkait provides enterprise-grade solutions for scaling and deployment. Trusted by small enterprises for reliable digital transformation.",
        area: "card7",
    },
];

const FeatureCard = ({ num, title, description, area }: FeatureCard) => (
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
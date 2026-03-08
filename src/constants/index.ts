import { routes } from "@/config/routes";

// --- Advance.tsx ---
export const CAPABILITIES_LEFT = [
    "Rapid Iteration",
    "Cloud-Native SAAS",
    "High Performance Systems",
];

export const CAPABILITIES_RIGHT = [
    "Scalable Foundations",
    "Augmented Deployments",
];

// --- Footer.tsx ---
export type FooterLink = {
    label: string;
    href: string;
    isExternal?: boolean;
};

export type FooterColumn = {
    ariaLabel: string;
    heading?: string;
    links: FooterLink[];
};

export const FOOTER_COLUMNS: FooterColumn[] = [
    {
        ariaLabel: "Primary navigation",
        links: [
            { label: "Home", href: routes.home },
            { label: "About", href: routes.about },
            { label: "Our Work", href: routes.projects },
            { label: "Services", href: routes.services },
        ],
    },
    {
        ariaLabel: "Legal navigation",
        links: [
            { label: "Cookie settings", href: `${routes.privacyPolicy}#cookie-settings` },
            { label: "Pricing", href: routes.pricing },
            { label: "Privacy Policy", href: routes.privacyPolicy },
            { label: "Terms & Condition", href: routes.terms },
        ],
    },
    {
        ariaLabel: "Social navigation",
        heading: "Social Media",
        links: [
            { label: "Youtube", href: "https://www.youtube.com", isExternal: true },
            { label: "Intsagram", href: "https://www.instagram.com", isExternal: true },
            { label: "Twitter", href: "https://x.com", isExternal: true },
        ],
    },
];

// --- Feedback.tsx ---
export type FeedbackCardProps = {
    quote: string;
    name: string;
    company: string;
};

export const TESTIMONIALS: FeedbackCardProps[] = [
    {
        quote:
            "Orkait transformed our web application development process. Their expertise in crafting digital experiences helped us deliver a product that truly inspires our users. The team's attention to detail and commitment to quality is unmatched.",
        name: "Sarah K.",
        company: "TechVentures",
    },
    {
        quote:
            "Working with Orkait for our software solutions was a game-changer. They understood our requirements perfectly and delivered scalable solutions that exceeded our expectations. Their deployment strategies helped us grow seamlessly.",
        name: "Manuel H.",
        company: "Immobilien",
    },
    {
        quote:
            "Orkait's scaling and deployment solutions enabled our small enterprise to compete with larger players. Their comprehensive approach to enterprise scaling transformed our operational capabilities and opened new growth opportunities.",
        name: "Isabelle T.",
        company: "Kultur",
    },
    {
        quote:
            "The team at Orkait built our SaaS platform from scratch with remarkable speed and precision. Their cloud-native approach ensured we could scale from day one. I'd recommend them to any founder serious about infrastructure.",
        name: "James R.",
        company: "Foundry Labs",
    },
    {
        quote:
            "Orkait's dev products saved us months of engineering time. Their plug-and-play integrations fit perfectly into our existing stack, and the support throughout was exceptional. A true technology partner.",
        name: "Priya M.",
        company: "Datasync",
    },
];

// --- Process.tsx ---
export type FeatureCardProps = {
    num: string;
    title: string;
    description: string;
    area: string;
};

export const FEATURES: FeatureCardProps[] = [
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

// --- ServicesText.tsx ---
export const SERVICES = [
    { label: "Client Work", active: true },
    { label: "Solutions", active: false },
    { label: "SaaS Work", active: false },
    { label: "Dev Products", active: false },
];

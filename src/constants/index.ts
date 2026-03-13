import { routes } from "@/config/routes";

// --- Core Values (source: legal/orkait_core.pdf) ---
export type CoreValue = {
    title: string;
    tagline: string;
    description: string;
};

export const CORE_VALUES: CoreValue[] = [
    {
        title: "Ownership",
        tagline: "Own outcomes, not just tasks",
        description:
            "If it's your problem, it's your problem until it's solved. We don't pass the buck or wait for someone else to figure it out.",
    },
    {
        title: "Reliability",
        tagline: "Commitments matter",
        description:
            "We deliver what we promise, when we promise it. Deadlines are real. If something slips, we communicate early — never silently.",
    },
    {
        title: "Thoughtful Innovation",
        tagline: "Build smart, not just new",
        description:
            "We pick the right tool for the job, not the trendy one. Every technical decision is weighed against real constraints and real outcomes.",
    },
    {
        title: "Craftsmanship",
        tagline: "Quality is a habit, not an accident",
        description:
            "Every system we ship is built to hold up under pressure. Clean code, proper testing, and engineering discipline are non-negotiable.",
    },
    {
        title: "Respect & Clear Communication",
        tagline: "Say things clearly and directly",
        description:
            "No politics, no ambiguity. We give honest feedback, flag problems early, and have direct engineering conversations.",
    },
];

// --- Problem-Solving Process (source: legal/orkait_core.pdf) ---
export type ProcessStep = {
    step: number;
    title: string;
    description: string;
};

export const PROBLEM_SOLVING_PROCESS: ProcessStep[] = [
    {
        step: 1,
        title: "Problem",
        description: "Understand what actually needs solving",
    },
    {
        step: 2,
        title: "Break it Down",
        description: "Scope it tight, plan it clearly",
    },
    {
        step: 3,
        title: "Prototype",
        description: "Build fast, validate early",
    },
    {
        step: 4,
        title: "Feedback",
        description: "Iterate with real input, not assumptions",
    },
    {
        step: 5,
        title: "Solution",
        description: "Ship something reliable",
    },
];

// --- What We Build (source: legal/orkait_core.pdf) ---
export const CLIENT_SERVICES = [
    "Dashboards & Admin Panels",
    "Business Websites",
    "Custom Web Apps",
    "Data & Business Analysis",
    "Scalable Backend Systems",
];

export const SAAS_PRINCIPLES = [
    "Focused, problem-specific tools",
    "Built from real client and internal needs",
    "Limited scope, opinionated design",
    "Internal-first, then external SaaS",
];

// --- Advance.tsx ---
export const CAPABILITIES_LEFT = [
    "Rapid Iteration",
    "Cloud-Native SaaS",
    "High Performance Systems",
];

export const CAPABILITIES_RIGHT = [
    "Scalable Foundations",
    "Production-Hardened Deployments",
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
            { label: "Terms & Conditions", href: routes.terms },
        ],
    },
    {
        ariaLabel: "Social navigation",
        heading: "Social Media",
        links: [
            { label: "Youtube", href: "https://www.youtube.com", isExternal: true },
            { label: "Instagram", href: "https://www.instagram.com", isExternal: true },
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
            "Orkait rebuilt our admin dashboard from scratch. The system handles 10x the traffic now with zero downtime. They didn't just build what we asked for — they pushed back where it mattered and delivered something better.",
        name: "Sarah K.",
        company: "TechVentures",
    },
    {
        quote:
            "We needed a backend that could scale with our property listings. Orkait delivered a system that's fast, reliable, and easy for our team to maintain. No over-engineering, no wasted effort — just solid work.",
        name: "Manuel H.",
        company: "Montara Immobilien",
    },
    {
        quote:
            "Most agencies gave us timelines and buzzwords. Orkait gave us a working prototype in two weeks and iterated from there. The final product has been running in production for over a year without issues.",
        name: "Isabelle T.",
        company: "Kultur",
    },
    {
        quote:
            "Orkait built our SaaS platform with a cloud-native architecture from day one. We went from zero to handling thousands of daily active users without re-architecting anything. That's rare.",
        name: "James R.",
        company: "Foundry Labs",
    },
    {
        quote:
            "Their engineering discipline is what sets them apart. Clean code, proper testing, honest communication about trade-offs. They treat your codebase like it's their own.",
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
            "Security baked in from day one. OWASP best practices, proper auth, encrypted data at rest and in transit. Not bolted on after launch.",
        area: "card1",
    },
    {
        num: "(02)",
        title: "High-Performance",
        description:
            "Systems built for sub-millisecond latency and millions of requests. We profile, benchmark, and optimize — not guess.",
        area: "card2",
    },
    {
        num: "(03)",
        title: "Quality Assured",
        description:
            "Quality is a habit, not an accident. Automated testing, code reviews, and CI/CD pipelines that catch problems before they ship.",
        area: "card3",
    },
    {
        num: "(04)",
        title: "Simple",
        description:
            "Complexity is easy. Simplicity takes discipline. We build systems that are easy to understand, extend, and maintain.",
        area: "card4",
    },
    {
        num: "(05)",
        title: "Customizable",
        description:
            "Every business has different constraints. We build solutions scoped to your problem — no bloated frameworks, no unnecessary abstractions.",
        area: "card5",
    },
    {
        num: "(06)",
        title: "Plug and Play",
        description:
            "Clean APIs, documented interfaces, and deployment pipelines that work. Integrate with your existing stack without friction.",
        area: "card6",
    },
    {
        num: "(07)",
        title: "Enterprise Ready",
        description:
            "Built to scale from day one. Proper logging, monitoring, role-based access, and infrastructure that grows with your business.",
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

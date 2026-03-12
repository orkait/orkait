"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
    exCompanies: string[];
}

const TEAM_SETS: TeamMember[][] = [
    [
        {
            id: 1,
            name: "Kailas Mahavarkar",
            role: "Senior SDE at YodaPlus",
            image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png",
            exCompanies: ["Ex-Pinelabs", "Ex-Carwale"]
        },
        { id: 2, name: "Aarav Sharma", role: "Product Manager", image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png", exCompanies: ["Ex-Google"] },
        { id: 3, name: "Ishaan Gupta", role: "UI/UX Designer", image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png", exCompanies: ["Ex-Adobe"] },
        { id: 4, name: "Ananya Iyer", role: "Frontend Dev", image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png", exCompanies: ["Ex-Meta"] },
        { id: 5, name: "Rohan Das", role: "Backend Architect", image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png", exCompanies: ["Ex-Amazon"] },
        { id: 6, name: "Sanya Malhotra", role: "QA Engineer", image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png", exCompanies: ["Ex-TCS"] },
        { id: 7, name: "Vikram Singh", role: "DevOps Engineer", image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png", exCompanies: ["Ex-Netflix"] },
        { id: 8, name: "Tara Kapoor", role: "Data Scientist", image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png", exCompanies: ["Ex-Spotify"] },
        { id: 9, name: "Aryan Khan", role: "Mobile Developer", image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png", exCompanies: ["Ex-Flipkart"] },
        { id: 10, name: "Pooja Hegde", role: "HR Manager", image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png", exCompanies: ["Ex-InfoEdge"] },
    ],
    [
        {
            id: 11,
            name: "Rahul Bose",
            role: "CTO",
            image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png",
            exCompanies: ["Ex-Microsoft"]
        },
        { id: 12, name: "Simran Kaur", role: "VP Engineering", image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png", exCompanies: ["Ex-Uber"] },
        { id: 13, name: "Kabir Mehra", role: "Head of Design", image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png", exCompanies: ["Ex-Airbnb"] },
        { id: 14, name: "Meera Sethi", role: "Lead Frontend", image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png", exCompanies: ["Ex-Slack"] },
        { id: 15, name: "Arjun Rampal", role: "Lead Backend", image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png", exCompanies: ["Ex-Intel"] },
        { id: 16, name: "Neha Dhupia", role: "Project Manager", image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png", exCompanies: ["Ex-PayPal"] },
        { id: 17, name: "Farhan Akhtar", role: "Fullstack Dev", image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png", exCompanies: ["Ex-Zoho"] },
        { id: 18, name: "Dia Mirza", role: "Marketing Head", image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png", exCompanies: ["Ex-InMobi"] },
        { id: 19, name: "Riteish Deshmukh", role: "Sales Director", image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png", exCompanies: ["Ex-Salesforce"] },
        { id: 20, name: "Genelia D'Souza", role: "Community Lead", image: "/team/2d962b57402333c356411d3ad0dffe9f0cf174dd.png", exCompanies: ["Ex-Twitter"] },
    ]
];

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="relative w-full aspect-216/282 overflow-hidden group border border-border/40 hover:border-border transition-colors"
            style={{
                background: "linear-gradient(210.75deg, #F9F9F9 45.49%, #939393 99.43%)"
            }}
        >
            {/* Image Container */}
            <div className="absolute inset-0 pointer-events-none transition-all duration-700 group-hover:scale-105">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-90 group-hover:opacity-100"
                />
            </div>

            {/* Info Overlay */}
            <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <div>
                    <h3 className="text-foreground font-medium text-body leading-tight">{member.name}</h3>
                    <p className="text-muted-foreground text-[10px] mt-1">{member.role}</p>
                </div>

                <div className="flex flex-col gap-0.5 items-end">
                    {member.exCompanies.map((company, idx) => (
                        <p key={idx} className="text-foreground/80 text-[10px]">{company}</p>
                    ))}
                </div>
            </div>

            <motion.div
                className="absolute inset-0 bg-background/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            />
        </motion.div>
    );
};

const Team = () => {
    const [currentSet, setCurrentSet] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const nextSet = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSet((prev) => (prev + 1) % TEAM_SETS.length);
    };

    const members = TEAM_SETS[currentSet];

    return (
        <section className="py-24 bg-background overflow-hidden">
            {/* Header */}
            <div className="mb-20 text-center">
                <span className="text-body-lg text-muted-foreground font-medium uppercase tracking-[0.2em]">
                    (02) OUR TEAM
                </span>
            </div>

            <div className="max-w-6xl mx-auto px-16">
                <AnimatePresence mode="wait" onExitComplete={() => setIsAnimating(false)}>
                    <motion.div
                        key={currentSet}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-4 gap-0"
                    >
                        {/* First 8 members */}
                        {members.slice(0, 8).map((member) => (
                            <TeamMemberCard key={member.id} member={member} />
                        ))}

                        {/* Staggered Row 3 */}
                        <div className="hidden laptop:block" />
                        
                        <TeamMemberCard member={members[8]} />
                        <TeamMemberCard member={members[9]} />

                        {/* Arrow Slot */}
                        <div className="flex items-center justify-center aspect-216/282">
                            <motion.button
                                onClick={nextSet}
                                whileHover={{ scale: 1.1, x: 10 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-4 group"
                            >
                                <ArrowRight className="w-24 h-24 stroke-[0.3] group-hover:stroke-1 text-foreground transition-all duration-300" />
                            </motion.button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Team;

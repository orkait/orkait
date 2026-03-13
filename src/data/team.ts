export type TeamMember = {
    name: string;
    role: string;
    ex: string[];
    image: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
    {
        name: "Kailas Mahavarkar",
        role: "Founder & Software Engineer",
        ex: ["Ex-Pinelabs", "Ex-Carwale"],
        image: "/about/2d962b57402333c356411d3ad0dffe9f0cf174dd.png",
    },
    {
        name: "Anupam Singh",
        role: "Fullstack Developer",
        ex: [],
        image: "/about/placeholder-team.png",
    },
    {
        name: "Abhay Vyas",
        role: "Fullstack Developer",
        ex: [],
        image: "/about/placeholder-team.png",
    },
    {
        name: "Suraj Yadav",
        role: "Fullstack Developer",
        ex: [],
        image: "/about/placeholder-team.png",
    },
    {
        name: "Yashwi Ladda",
        role: "UI/UX Designer",
        ex: [],
        image: "/about/placeholder-team.png",
    },
];

export type TeamMember = {
    name: string;
    role: string;
    ex: string[];
    image: string;
    alumni?: boolean;
};

export type OpenRole = {
    title: string;
    emailSubject: string;
    isIntern?: boolean;
};

export const OPEN_ROLES: OpenRole[] = [
    { title: "UI/UX Designer", emailSubject: "UI/UX Designer Intern Application", isIntern: true },
    { title: "Fullstack Developer", emailSubject: "Fullstack Developer Intern Application", isIntern: true },
];

export const TEAM_MEMBERS: TeamMember[] = [
    {
        name: "Kailas Mahavarkar",
        role: "Founder & Software Engineer",
        ex: ["Ex-Pinelabs", "Ex-Carwale"],
        image: "/data/team/kailas.png",
    },
    {
        name: "Anupam Singh",
        role: "Fullstack Developer",
        ex: [],
        image: "/data/team/anupam.jpeg",
        alumni: true,
    },
    {
        name: "Abhay Vyas",
        role: "Fullstack Developer",
        ex: [],
        image: "/data/team/abhay.jpg",
    },
    {
        name: "Suraj Yadav",
        role: "Fullstack Developer",
        ex: [],
        image: "/data/team/suraj.jpeg",
    },
    {
        name: "Yashwi Ladda",
        role: "UI/UX Designer",
        ex: [],
        image: "/data/team/yashwi.jpeg",
        alumni: true,
    },
    {
        name: "Pranali Raul",
        role: "People Ops",
        ex: [],
        image: "/data/team/pranali.jpeg",
    },
];

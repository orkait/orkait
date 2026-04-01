export type TeamMember = {
    name: string;
    role: string;
    ex: string[];
    image: string;
    alumni?: boolean;
};

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

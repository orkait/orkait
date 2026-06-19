export type OpenRole = {
	title: string;
	emailSubject: string;
	isIntern?: boolean;
};

export const OPEN_ROLES: OpenRole[] = [
	{
		title: "UI/UX Designer",
		emailSubject: "UI/UX Designer Intern Application",
		isIntern: true,
	},
	{
		title: "Fullstack Developer",
		emailSubject: "Fullstack Developer Intern Application",
		isIntern: true,
	},
];

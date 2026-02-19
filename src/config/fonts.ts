import localFont from "next/font/local";
import { Poppins } from "next/font/google";

export const satoshi = localFont({
	src: [
		{
			path: "../assets/fonts/Satoshi-Variable.woff2",
			weight: "300 900",
			style: "normal",
		},
		{
			path: "../assets/fonts/Satoshi-VariableItalic.woff2",
			weight: "300 900",
			style: "italic",
		},
	],
	variable: "--font-satoshi",
	display: "swap",
});

export const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-poppins",
	display: "swap",
});

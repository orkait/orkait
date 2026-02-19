import type { Metadata } from "next";
import { satoshi, poppins } from "@/config/fonts";
import "./globals.css";

export const metadata: Metadata = {
	title: "Orkait",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${satoshi.variable} ${poppins.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}

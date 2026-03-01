import type { Metadata } from "next";
import { satoshi, poppins } from "@/config/fonts";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { MessagesSquare } from "lucide-react";

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
            <body className={`${satoshi.variable} ${poppins.variable} antialiased realtive`}>
                <Navbar />
                {children}
                <div
                    className="absolute bottom-8 right-8 z-20 flex items-center justify-center size-16 bg-black rounded-full cursor-pointer hover:scale-105 transition-transform"
                    role="button"
                    aria-label="Open chat"
                >
                    <div className="flex items-center justify-center size-14 rounded-full border border-white/30">
                        <MessagesSquare size={26} className="text-white" strokeWidth={1.5} />
                    </div>
                </div>
            </body>
        </html>
    );
}

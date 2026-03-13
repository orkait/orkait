import type { Metadata } from "next";
import { satoshi, poppins } from "@/config/fonts";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ChatWidget } from "@/components/layout/chat-widget";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

export const metadata: Metadata = {
    title: {
        default: "Orkait",
        template: "%s | Orkait",
    },
    description: "Orkait is an engineering-first company that builds reliable client software and focused SaaS products. No fluff, no hype — just systems that work.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${satoshi.variable} ${poppins.variable} antialiased relative`}>
                <SmoothScrollProvider>
                    <section className="mx-auto w-full max-w-[1440px]">
                        <Navbar />
                    </section>
                    <main className="mx-auto w-full max-w-[1440px]">
                        {children}
                    </main>

                    <ChatWidget />

                    <section className="mx-auto w-full max-w-[1440px]">
                        <Footer />
                    </section>
                </SmoothScrollProvider>
            </body>
        </html>
    );
}

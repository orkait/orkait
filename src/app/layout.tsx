import type { Metadata } from "next";
import { satoshi, poppins } from "@/config/fonts";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ChatWidget } from "@/components/layout/chat-widget";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { ScrollProgress } from "@/components/layout/scroll-progress";

export const metadata: Metadata = {
    title: {
        default: "Orkait",
        template: "%s | Orkait",
    },
    description: "High-performance software solutions for modern businesses.",
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
                    <ScrollProgress />
                    <section className="mx-auto w-full max-w-[1440px]">
                        <Navbar />
                    </section>
                    <main className="mx-auto w-full max-w-[1440px]">
                        {children}
                    </main>

                    <ChatWidget />
                    <ScrollToTop />

                    <section className="mx-auto w-full max-w-[1440px]">
                        <Footer />
                    </section>
                </SmoothScrollProvider>
            </body>
        </html>
    );
}

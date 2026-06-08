import type { Metadata } from "next";
import { satoshi, poppins } from "@/config/fonts";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

export const metadata: Metadata = {
    title: {
        default: "Orkait",
        template: "%s | Orkait",
    },
    description: "Orkait is a product-first AI lab. We build secure execution tools, software learning systems, and AI-assisted creation products.",
    metadataBase: new URL("https://orkait.com"),
    openGraph: {
        siteName: "Orkait",
        url: "https://orkait.com",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
    },
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
                    <Navbar />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </SmoothScrollProvider>
            </body>
        </html>
    );
}

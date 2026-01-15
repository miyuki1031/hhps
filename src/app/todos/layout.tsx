import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_INFO } from "../../lib/constants";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: `${SITE_INFO.TODO.NAME} - ${SITE_INFO.NAME}`,
    description: SITE_INFO.TODO.DESCRIPTION,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Header />

                {children}
                <Footer />
            </body>
        </html>
    );
}

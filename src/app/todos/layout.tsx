import type { Metadata } from "next";
import { SITE_INFO } from "../../lib/constants";

export const metadata: Metadata = {
    title: `${SITE_INFO.TODO.NAME} - ${SITE_INFO.NAME}`,
    description: SITE_INFO.TODO.DESCRIPTION,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}

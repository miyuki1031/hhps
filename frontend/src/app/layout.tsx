import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../../public/style/globals.css';
import '../../public/style/common.scss';

import '../../public/style/pages.scss';
import '../../public/style/moon.scss';
import '../../public/style/sun.scss';

import { SITE_INFO } from '../lib/constants';
import AppProvider from '../providers/AppProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: SITE_INFO.NAME,
  description: SITE_INFO.DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col hsl-screen-layout">
        <AppProvider>
          <Header />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}

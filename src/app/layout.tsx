import type { Metadata } from "next";
import localFont from "next/font/local";
import { Metal_Mania } from 'next/font/google';
import "./globals.css";

const metalMania = Metal_Mania({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-metal',
  display: 'swap',
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Boardom.net",
  description: "A StarCraft-inspired message board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${metalMania.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/shared/components/BottomNav";
import { unbounded, golosText, jetbrainsMono } from "@/shared/lib/fonts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ЕГЭ Информатика",
  description: "Платформа для подготовки к ЕГЭ по информатике",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable} ${golosText.variable} ${jetbrainsMono.variable} min-h-full flex flex-col`}>
        <div className="flex-1 pb-24 md:pt-20 md:pb-0">
          {children}
        </div>
        <BottomNav/>  
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Syne, Orbitron, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ELSOORYAN | Discord Bot & Web Developer Portfolio",
  description: "Enter Gojo's Hollow Purple collision: an ultra-premium, cinematic 3D portfolio of Elsooryan, specialist in Discord bots, automation, and modern web application development.",
  keywords: ["Elsooryan", "Discord Bot Developer", "Web Developer", "Three.js Portfolio", "Jujutsu Kaisen", "Creative Coder", "Next.js Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${orbitron.variable} ${inter.variable} dark h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-[#050505] text-white font-sans overflow-x-hidden">
        {/* Custom cursor overlay (Desktop only, hidden on mobile via CSS) */}
        <CustomCursor />
        
        {/* Lenis smooth scrolling container */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

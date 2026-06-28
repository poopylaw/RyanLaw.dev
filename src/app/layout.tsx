import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import StarfieldBackground from "@/components/StarfieldBackground";
import IntroWrapper from "@/components/IntroWrapper";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ryan Law — Mechanical Engineer",
  description:
    "Portfolio of Ryan Law: mechanical engineering, fabrication, CAD, and embedded systems work — from microfabrication cleanrooms to UAV competitions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${grotesk.variable} ${plexMono.variable}`}>
      <body>
        <StarfieldBackground />
        <CustomCursor />
        <IntroWrapper>{children}</IntroWrapper>
      </body>
    </html>
  );
}

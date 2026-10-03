import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Sans_Arabic, Inter, Amiri } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Jordan Archaeological Museum, Reimagined",
  description: "A scroll-through sketch of the reimagined interior of the Jordan Archaeological Museum on Amman's Citadel.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${amiri.variable} ${plexArabic.variable} dark h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}

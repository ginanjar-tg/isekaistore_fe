import type { Metadata } from "next";
import { Bungee, Caveat, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bungee",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Isekai Store",
  description:
    "An impossible delivery from another world. Open the case, choose your gear, and survive the episode.",
  openGraph: {
    title: "Isekai Store",
    description: "A chaotic anime adventure has arrived from another world.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bungee.variable} ${space.variable} ${caveat.variable}`}
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}

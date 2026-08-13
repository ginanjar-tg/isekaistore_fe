import type { Metadata } from "next";
import { Cinzel, Nunito, VT323 } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Isekai Store — The Gate to Another World",
  description:
    "A magical shop beyond the gate. Step inside, adventurer — your legend awaits.",
  openGraph: {
    title: "Isekai Store",
    description: "The gate to another world is open. Step inside, adventurer.",
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
      className={`${cinzel.variable} ${vt323.variable} ${nunito.variable}`}
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}

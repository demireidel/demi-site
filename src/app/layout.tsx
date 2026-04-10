import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sourceSans3 = Source_Sans_3({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Demian Reidel — Physicist. Economist. Builder.",
  description:
    "Demian Reidel is an Argentine physicist, economist, and public servant. Co-founder of QFR Capital Management, former Deputy Governor of Argentina's Central Bank, and Senior Fellow at Harvard Kennedy School.",
  keywords: [
    "Demian Reidel",
    "economist",
    "physicist",
    "QFR Capital",
    "Argentina",
    "Central Bank",
    "Harvard",
    "nuclear energy",
    "antitrust",
    "scale economics",
  ],
  authors: [{ name: "Demian Reidel" }],
  openGraph: {
    title: "Demian Reidel — Physicist. Economist. Builder.",
    description:
      "Argentine physicist, economist, and public servant operating at the intersection of complex systems, global finance, and public policy.",
    type: "website",
    locale: "en_US",
    siteName: "Demian Reidel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Demian Reidel — Physicist. Economist. Builder.",
    description:
      "Argentine physicist, economist, and public servant operating at the intersection of complex systems, global finance, and public policy.",
    creator: "@dreidel1",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${cormorantGaramond.variable} ${sourceSans3.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}

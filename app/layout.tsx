import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "Demian Reidel — Physicist. Economist. Builder.",
    description: "Demian Reidel works where science, capital, and institutions meet—and where systems either reach scale or disappear.",
    openGraph: {
      title: "Demian Reidel",
      description: "Physicist. Economist. Builder.",
      type: "website",
      url: origin,
      images: [{ url: `${origin}/og.png`, width: 1731, height: 909, alt: "Demian Reidel — Physicist, Economist, Builder" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Demian Reidel",
      description: "Physicist. Economist. Builder.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}

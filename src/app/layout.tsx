import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Newsreader } from "next/font/google";
import { SiteChrome } from "@/components/site-chrome";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.demianreidel.com"),
  title: {
    default: "Demian Reidel — Systems at Scale",
    template: "%s — Demian Reidel",
  },
  description:
    "Demian Reidel works at the intersection of science, capital, state capacity, and critical infrastructure.",
  keywords: [
    "Demian Reidel",
    "minimum viable scale",
    "nuclear energy",
    "critical infrastructure",
    "economics",
    "complex systems",
    "artificial intelligence infrastructure",
  ],
  authors: [{ name: "Demian Reidel", url: "https://www.demianreidel.com" }],
  creator: "Demian Reidel",
  category: "personal website",
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Demian Reidel — Systems at Scale",
    description:
      "Science. Capital. State. Infrastructure. A career concerned with how ambitious systems become viable at scale.",
    siteName: "Demian Reidel",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Demian Reidel — Systems at Scale",
    description:
      "Science. Capital. State. Infrastructure. A career concerned with how ambitious systems become viable at scale.",
    creator: "@dreidel1",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080807",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Demian Reidel",
  url: "https://www.demianreidel.com",
  email: "mailto:demian@demianreidel.com",
  sameAs: [
    "https://x.com/dreidel1",
    "https://www.linkedin.com/in/demianreidel",
    "https://www.instagram.com/demireidel",
    "https://siderian.energy",
  ],
  knowsAbout: [
    "Economics",
    "Physics",
    "Capital markets",
    "Nuclear energy",
    "Critical infrastructure",
    "Complex systems",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <SiteChrome />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}

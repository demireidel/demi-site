import type { Metadata } from "next";
import PaperExperience from "./PaperExperience";

const title = "Minimum Viable Scale and First-Passage Bellman Barriers";
const description =
  "A clear interactive guide to the welfare frontier between extinction and high-regime selection, and the first-passage Bellman-barrier method.";
const origin = "https://demianreidel.com";
const pageUrl = `${origin}/Public/PaperJMDR`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    type: "article",
    url: pageUrl,
    images: [
      {
        url: `${origin}/PaperJMDR/paper-og.png`,
        width: 1200,
        height: 630,
        alt: "Minimum Viable Scale: can survive is not the same as worth saving",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${origin}/PaperJMDR/paper-og.png`],
  },
};

export default function PaperJMDRPage() {
  return <PaperExperience />;
}

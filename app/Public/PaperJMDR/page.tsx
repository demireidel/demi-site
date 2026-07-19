import type { Metadata } from "next";
import PaperExperience from "./PaperExperience";

const title = "Minimum Viable Scale and First-Passage Bellman Barriers";
const description =
  "An interactive explanation of Javier Milei and Demian Reidel's working paper on the welfare frontier between extinction and growth.";
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
        alt: "Minimum Viable Scale - the frontier between extinction and growth",
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

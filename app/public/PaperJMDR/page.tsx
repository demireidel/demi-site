import type { Metadata } from "next";
import { headers } from "next/headers";
import PaperExperience from "./PaperExperience";

const title = "Minimum Viable Scale and First-Passage Bellman Barriers";
const description =
  "An interactive explanation of Javier Milei and Demian Reidel's working paper on the welfare frontier between extinction and growth.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const pageUrl = `${origin}/public/PaperJMDR`;

  return {
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
}

export default function PaperJMDRPage() {
  return <PaperExperience />;
}

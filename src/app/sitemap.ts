import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.demianreidel.com";

  return [
    {
      url: base,
      lastModified: new Date("2026-07-14"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/research/minimum-viable-scale`,
      lastModified: new Date("2026-07-14"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}

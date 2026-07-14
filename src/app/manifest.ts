import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Demian Reidel — Systems at Scale",
    short_name: "Demian Reidel",
    description:
      "Science, capital, state capacity, and critical infrastructure.",
    start_url: "/",
    display: "standalone",
    background_color: "#080807",
    theme_color: "#080807",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

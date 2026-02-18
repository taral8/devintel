import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DevIntel — Council Planning Intelligence",
    short_name: "DevIntel",
    description:
      "Predict DA approval likelihood, compare similar projects, and decode council conditions across Sydney councils.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

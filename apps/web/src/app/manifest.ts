import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CivroDA — Approval Risk Intelligence",
    short_name: "CivroDA",
    description:
      "Predict your DA approval risk before you lodge. Precedent intelligence built from real council decisions.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9fafb",
    theme_color: "#102a43",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

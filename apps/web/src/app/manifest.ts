import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CivroDA — Planning Intelligence",
    short_name: "CivroDA",
    description:
      "Search development applications, find similar approved projects nearby, and understand common consent conditions across Sydney councils.",
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

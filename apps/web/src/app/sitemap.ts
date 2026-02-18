import type { MetadataRoute } from "next";
import { MOCK_DAS } from "@/lib/mock-das";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://devintel.site";

  const daPages = MOCK_DAS.map((da) => ({
    url: `${baseUrl}/das/${da.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const councilPages = ["parramatta", "blacktown", "hornsby"].map((slug) => ({
    url: `${baseUrl}/councils/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/das`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...councilPages,
    ...daPages,
  ];
}

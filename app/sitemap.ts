import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/articles";

const baseUrl = "https://opinimiu.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticles();
  const staticRoutes = ["", "/isu", "/opini", "/program", "/data", "/tentang", "/cari"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/opini" ? "daily" as const : "weekly" as const,
    priority: path === "" ? 1 : path === "/opini" ? 0.9 : 0.7
  }));

  const articleRoutes = articles.map((article: any) => ({
    url: `${baseUrl}/opini/${article.slug}`,
    lastModified: article.publishedAtIso ? new Date(article.publishedAtIso) : new Date(),
    changeFrequency: "monthly" as const,
    priority: article.featured ? 0.9 : 0.75
  }));

  return [...staticRoutes, ...articleRoutes];
}

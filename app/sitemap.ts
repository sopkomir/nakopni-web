import type { MetadataRoute } from "next";
import { client } from "./lib/sanity";
import { groq } from "next-sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.nakopni.sk";

  const articles = await client.fetch(groq`
    *[_type == "article"]{
      "slug": slug.current,
      publishedAt
    }
  `);

  const photoArticles = await client.fetch(groq`
    *[_type == "fotoclanok"]{
      "slug": slug.current,
      publishedAt
    }
  `);

  const pages = await client.fetch(groq`
    *[_type == "page"]{
      "slug": slug.current
    }
  `);

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },

    ...articles.map((article: any) => ({
      url: `${baseUrl}/${article.slug}`,
      lastModified: article.publishedAt ?? new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),

    ...photoArticles.map((post: any) => ({
      url: `${baseUrl}/fotoclanok/${post.slug}`,
      lastModified: post.publishedAt ?? new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    ...pages.map((page: any) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
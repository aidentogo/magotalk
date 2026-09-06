import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getNewsSitemapEntries, newsArticleUrl, SITE_URL } from "@/lib/news";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getNewsSitemapEntries();
  const pages = ["", "/news", "/books", "/books/ai-is-eating-the-world", "/about", "/contact"];
  return [
    ...routing.locales.flatMap((locale) => pages.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      alternates: { languages: Object.fromEntries(routing.locales.map((lang) => [lang, `${SITE_URL}/${lang}${path}`])) },
    }))),
    ...news.map((post) => ({ url: newsArticleUrl(post), lastModified: post.updated_at })),
  ];
}

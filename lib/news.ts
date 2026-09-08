import { createClient } from "@supabase/supabase-js";
import { cache } from "react";

export const SITE_URL = "https://magotalk.com";
export const NEWS_PAGE_SIZE = 12;

export type NewsPost = {
  slug: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  language: "en" | "zh-Hans" | "zh-Hant";
  source_url: string | null;
  published_at: string;
  updated_at: string;
};

export type NewsSummary = Omit<NewsPost, "source_url">;

function newsClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("News database is not configured.");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
  });
}

function publishedNews() {
  return newsClient().from("news_posts");
}

// Public credentials and RLS protect drafts, even if a query is changed later.
export async function getNewsPage(page = 1) {
  const offset = (page - 1) * NEWS_PAGE_SIZE;
  const { data, error, count } = await publishedNews()
    .select("slug,title,summary,content,author,language,published_at,updated_at", { count: "exact" })
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .order("slug")
    .range(offset, offset + NEWS_PAGE_SIZE - 1);
  // PostgREST returns 416 when a requested page is beyond the final row.
  if (error && error.code !== "PGRST103") {
    console.error("Failed to load news:", error.code);
    throw new Error("News is temporarily unavailable.");
  }
  return { posts: (data ?? []) as NewsSummary[], total: count ?? 0 };
}

export const getNewsBySlug = cache(async (slug: string): Promise<NewsPost | null> => {
  const { data, error } = await publishedNews()
    .select("slug,title,summary,content,author,language,source_url,published_at,updated_at")
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .maybeSingle();
  if (error) {
    console.error("Failed to load news article:", error.code);
    throw new Error("News is temporarily unavailable.");
  }
  return data as NewsPost | null;
});

export async function getNewsSitemapEntries() {
  const entries: Pick<NewsPost, "slug" | "language" | "updated_at">[] = [];
  const batchSize = 500;
  for (let offset = 0; ; offset += batchSize) {
    const { data, error } = await publishedNews()
      .select("slug,language,updated_at")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("slug")
      .range(offset, offset + batchSize - 1);
    if (error) throw new Error("Could not generate news sitemap.");
    entries.push(...(data ?? []));
    if (!data || data.length < batchSize) return entries;
  }
}

export function newsArticleUrl(post: Pick<NewsPost, "slug" | "language">) {
  return `${SITE_URL}/${post.language}/news/${post.slug}`;
}

export function formatNewsDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
  }).format(new Date(date));
}

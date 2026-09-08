import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Markdown from "react-markdown";
import { Link } from "@/i18n/navigation";
import { formatNewsDate, getNewsBySlug, newsArticleUrl, SITE_URL } from "@/lib/news";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) notFound();
  const url = newsArticleUrl(post);
  return {
    title: `${post.title} | MagoTalk`,
    description: post.summary,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      type: "article", title: post.title, description: post.summary, url,
      publishedTime: post.published_at, modifiedTime: post.updated_at, authors: [post.author],
      locale: { en: "en_US", "zh-Hans": "zh_CN", "zh-Hant": "zh_TW" }[post.language],
    },
    twitter: { card: "summary", title: post.title, description: post.summary },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const [post, t] = await Promise.all([getNewsBySlug(slug), getTranslations("News")]);
  if (!post) notFound();
  const sourceUrl = post.source_url && /^https?:\/\//i.test(post.source_url) ? post.source_url : null;
  const structuredData = {
    "@context": "https://schema.org", "@type": "NewsArticle",
    headline: post.title, description: post.summary,
    datePublished: post.published_at, dateModified: post.updated_at,
    author: { "@type": post.author === "MagoTalk" ? "Organization" : "Person", name: post.author },
    publisher: { "@type": "Organization", name: "MagoTalk", url: SITE_URL },
    mainEntityOfPage: newsArticleUrl(post), url: newsArticleUrl(post),
    inLanguage: post.language, ...(sourceUrl ? { citation: sourceUrl } : {}),
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-4 sm:px-8 md:py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Link href="/news" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#315E5B] hover:text-[#C93619]">
        <ArrowLeft className="h-4 w-4" aria-hidden />{t("backToNews")}
      </Link>
      <article lang={post.language} className="mt-3">
        <header>
          <h1 className="break-words text-3xl font-bold leading-tight tracking-tight text-[#015551] sm:text-4xl">{post.title}</h1>
          <time className="mt-3 block text-sm text-[#315E5B]" dateTime={post.published_at}>{formatNewsDate(post.published_at, locale)}</time>
        </header>
        <div className="news-prose mt-5">
          <Markdown skipHtml components={{
            h1: ({ children }) => <h2>{children}</h2>,
            a: ({ href, children }) => <a href={href} rel="noopener noreferrer">{children}</a>,
          }}>{post.content}</Markdown>
        </div>
      </article>
    </main>
  );
}

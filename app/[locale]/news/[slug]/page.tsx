import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Markdown from "react-markdown";
import { Link } from "@/i18n/navigation";
import { formatNewsDate, getNewsBySlug, newsArticleUrl, SITE_URL } from "@/lib/news";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ locale: string; slug: string }> };

function articleBody(content: string) {
  return content.replace(/^>\s*\*\*Document type:[^\n]*\n+/, "");
}

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
    <main className="mx-auto w-full max-w-3xl px-5 py-8 sm:px-8 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Link href="/news" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted hover:text-accent">
        <ArrowLeft className="h-4 w-4" aria-hidden />{t("backToNews")}
      </Link>
      <article lang={post.language} className="mt-8">
        <header className="max-w-2xl">
          <time className="text-sm tabular-nums text-muted" dateTime={post.published_at}>{formatNewsDate(post.published_at, locale)}</time>
          <h1 className="mt-3 text-pretty text-3xl font-bold leading-[1.15] tracking-tight text-ink sm:text-4xl">{post.title}</h1>
        </header>
        <div className="news-prose mt-8">
          <Markdown skipHtml components={{
            h1: ({ children }) => <h2>{children}</h2>,
            a: ({ href, children }) => <a href={href} rel="noopener noreferrer">{children}</a>,
          }}>{articleBody(post.content)}</Markdown>
        </div>
      </article>
    </main>
  );
}

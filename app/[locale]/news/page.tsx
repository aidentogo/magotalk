import type { Metadata } from "next";
import Markdown from "react-markdown";
import { ArrowRight, Newspaper } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getNewsPage, NEWS_PAGE_SIZE, SITE_URL } from "@/lib/news";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
};

function pageNumber(value: string | string[] | undefined) {
  if (value === undefined) return 1;
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) notFound();
  const page = Number(value);
  if (!Number.isSafeInteger(page) || page > 100_000) notFound();
  return page;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  const page = pageNumber((await searchParams).page);
  const t = await getTranslations({ locale, namespace: "News" });
  const suffix = page > 1 ? `?page=${page}` : "";
  const url = `${SITE_URL}/${locale}/news${suffix}`;
  return {
    title: `${t("title")} | MagoTalk`,
    description: t("intro"),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(routing.locales.map((lang) => [lang, `${SITE_URL}/${lang}/news${suffix}`])),
    },
    openGraph: { title: `${t("title")} | MagoTalk`, description: t("intro"), url, type: "website" },
  };
}

export default async function NewsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = pageNumber((await searchParams).page);
  const [t, { posts, total }] = await Promise.all([
    getTranslations("News"), getNewsPage(page),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / NEWS_PAGE_SIZE));
  if (page > totalPages) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-4 sm:px-8 md:py-8" aria-label={t("title")}>

      {posts.length === 0 ? (
        <section className="py-16 sm:py-24" aria-labelledby="news-empty-title">
          <Newspaper className="mb-6 h-9 w-9 text-[#57B4BA]" strokeWidth={1.5} aria-hidden />
          <h2 id="news-empty-title" className="text-2xl font-semibold text-[#015551]">{t("emptyTitle")}</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-[#315E5B]">{t("emptyBody")}</p>
          <Link href="/" className="mt-7 inline-flex items-center gap-2 font-semibold text-[#C93619] hover:underline">
            {t("exploreEpisodes")}<ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      ) : (
        <div className="divide-y divide-[#015551]/15">
          {posts.map((post) => (
            <article key={post.slug} lang={post.language} className="py-6 first:pt-0">
              <h2 className="text-2xl font-semibold leading-snug tracking-tight text-[#015551] sm:text-3xl">
                <Link href={`/news/${post.slug}`} className="hover:text-[#C93619]">{post.title}</Link>
              </h2>
              <div className="news-prose mt-4">
                <Markdown skipHtml components={{
                  h1: ({ children }) => <h3>{children}</h3>,
                  h2: ({ children }) => <h3>{children}</h3>,
                  a: ({ href, children }) => <a href={href} rel="noopener noreferrer">{children}</a>,
                }}>{post.content}</Markdown>
              </div>
            </article>
          ))}
        </div>
      )}

      {totalPages > 1 ? (
        <nav aria-label={t("pagination")} className="mt-8 flex items-center justify-between gap-4 border-t border-[#015551]/20 pt-6 text-sm text-[#015551]">
          {page > 1 ? <Link href={page === 2 ? "/news" : `/news?page=${page - 1}`} className="font-semibold hover:underline">{t("previous")}</Link> : <span />}
          <p>{t("pageStatus", { page, totalPages })}</p>
          {page < totalPages ? <Link href={`/news?page=${page + 1}`} className="font-semibold hover:underline">{t("next")}</Link> : <span />}
        </nav>
      ) : null}
    </main>
  );
}

import type { Metadata } from "next";
import { ArrowRight, Newspaper } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { formatNewsDate, getNewsPage, newsBlurb, NEWS_PAGE_SIZE, SITE_URL } from "@/lib/news";

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
    <main className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 md:py-16" aria-label={t("title")}>
      <h1 className="text-4xl font-bold tracking-tight text-ink md:text-5xl">{t("title")}</h1>
      {posts.length === 0 ? (
        <section className="mt-12 border-t border-line py-16" aria-labelledby="news-empty-title">
          <Newspaper className="mb-5 h-8 w-8 text-brand" strokeWidth={1.5} aria-hidden />
          <h2 id="news-empty-title" className="text-2xl font-semibold text-ink">{t("emptyTitle")}</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">{t("emptyBody")}</p>
          <Link href="/" className="mt-6 inline-flex items-center gap-2 font-semibold text-accent hover:underline">
            {t("exploreEpisodes")}<ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      ) : (
        <div className="mt-10 border-t border-ink/15">
          {posts.map((post, index) => {
            const lead = page === 1 && index === 0;
            const summary = newsBlurb(post.summary) || post.content.replace(/[#*_`>]/g, "").slice(0, 220);
            return (
              <article key={post.slug} lang={post.language} className="border-b border-line">
                <Link
                  href={`/news/${post.slug}`}
                  className="group grid gap-2 py-7 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-baseline sm:gap-10 sm:py-8"
                >
                  <time
                    dateTime={post.published_at}
                    className="text-sm tabular-nums text-muted sm:pt-1"
                  >
                    {formatNewsDate(post.published_at, locale)}
                  </time>
                  <div className="min-w-0">
                    <h2
                      className={`text-pretty font-semibold leading-snug tracking-tight text-ink group-hover:text-accent ${
                        lead ? "text-2xl sm:text-[1.75rem]" : "text-xl sm:text-2xl"
                      }`}
                    >
                      {post.title}
                    </h2>
                    <p className={`mt-3 max-w-2xl leading-relaxed text-muted ${lead ? "line-clamp-3 text-base" : "line-clamp-2 text-[15px]"}`}>
                      {summary}
                    </p>
                    <span className="sr-only">{t("readArticle")}</span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      )}

      {totalPages > 1 ? (
        <nav aria-label={t("pagination")} className="mt-8 flex items-center justify-between gap-4 text-sm text-ink">
          {page > 1 ? <Link href={page === 2 ? "/news" : `/news?page=${page - 1}`} className="font-semibold hover:text-accent">{t("previous")}</Link> : <span />}
          <p className="text-muted">{t("pageStatus", { page, totalPages })}</p>
          {page < totalPages ? <Link href={`/news?page=${page + 1}`} className="font-semibold hover:text-accent">{t("next")}</Link> : <span />}
        </nav>
      ) : null}
    </main>
  );
}

import type { Metadata } from "next";
import { ArrowRight, Newspaper } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { formatNewsDate, getNewsPage, NEWS_PAGE_SIZE, SITE_URL } from "@/lib/news";

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
    <main className="mx-auto w-full max-w-3xl px-5 py-8 sm:px-8 md:py-12" aria-label={t("title")}>

      <header className="mb-8 border-b border-line pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-brand md:text-4xl">{t("title")}</h1>
        <p className="mt-3 text-base leading-relaxed text-muted">{t("intro")}</p>
      </header>
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
              <time dateTime={post.published_at} className="mt-2 block text-sm text-[#315E5B]">
                {formatNewsDate(post.published_at, locale)}
              </time>
              <p className="mt-4 line-clamp-3 text-base leading-relaxed text-muted">{post.summary || post.content.replace(/[#*_`>]/g, "").slice(0, 220)}</p>
              <Link href={`/news/${post.slug}`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand hover:underline">
                {t("readArticle")}<ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
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

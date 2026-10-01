import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatNewsDate, getLatestNews, type NewsListing } from "@/lib/news";

export default async function AboutNews({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "About" });
  let posts: NewsListing[] = [];
  let unavailable = false;
  try {
    posts = await getLatestNews();
  } catch {
    unavailable = true;
  }

  return (
    <section aria-labelledby="about-records-heading" className="mx-auto mt-12 w-full max-w-7xl border-t border-line pt-8 md:mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="about-records-heading" className="text-2xl font-bold tracking-tight text-ink">{t("recordsTitle")}</h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">{t("recordsIntro")}</p>
        </div>
        <Link href="/news" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand hover:underline">
          {t("recordsAll")}<ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      {posts.length ? (
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} lang={post.language} className="rounded-xl border border-line bg-white p-5">
              <time dateTime={post.published_at} className="text-sm text-muted">{formatNewsDate(post.published_at, locale)}</time>
              <h3 className="mt-3 text-lg font-semibold leading-relaxed text-ink">
                <Link href={`/news/${post.slug}`} className="hover:text-brand">{post.title}</Link>
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{post.summary}</p>
              <Link href={`/news/${post.slug}`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand hover:underline">
                {t("recordsRead")}<ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      ) : <p className="mt-6 text-sm text-muted">{t(unavailable ? "recordsUnavailable" : "recordsEmpty")}</p>}
    </section>
  );
}

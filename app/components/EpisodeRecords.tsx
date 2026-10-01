import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatNewsDate, getEpisodeNews } from "@/lib/news";

export default async function EpisodeRecords({ slug, locale }: { slug: string; locale: string }) {
  const t = await getTranslations({ locale, namespace: "Episode" });
  let posts;
  try {
    posts = await getEpisodeNews(slug);
  } catch {
    // A records outage must not prevent listening to an episode.
    return <p className="text-sm text-muted">{t("recordsUnavailable")}</p>;
  }
  if (!posts.length) return null;
  return (
    <section aria-labelledby="episode-records-heading" className="border-t border-line pt-6">
      <h2 id="episode-records-heading" className="text-xl font-semibold text-ink">{t("recordsTitle")}</h2>
      <ul className="mt-3 space-y-4">
        {posts.map((post) => (
          <li key={post.slug} lang={post.language}>
            <Link href={`/news/${post.slug}`} className="font-semibold leading-relaxed text-brand underline underline-offset-4">{post.title}</Link>
            <time dateTime={post.published_at} className="mt-1 block text-sm text-muted">{formatNewsDate(post.published_at, locale)}</time>
          </li>
        ))}
      </ul>
    </section>
  );
}

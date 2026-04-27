import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { getEpisodeBySlug, getCoverImageUrl } from "@/lib/supabase";
import { routing } from "@/i18n/routing";

type AppLocale = (typeof routing.locales)[number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const episode = await getEpisodeBySlug(slug);
  if (!episode) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "Episode" });
  const description =
    episode.description.length > 160
      ? `${episode.description.slice(0, 157)}…`
      : episode.description;

  return {
    title: `${episode.title} | ${t("metaTitleSuffix")}`,
    description,
    openGraph: {
      title: episode.title,
      description,
      type: "article",
    },
  };
}

export default async function EpisodeDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as AppLocale);
  const t = await getTranslations("Episode");
  const episode = await getEpisodeBySlug(slug);

  if (!episode) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#FDFBEE]">
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 md:py-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            {episode.title}
          </h1>
          <p className="mt-3 text-sm md:text-base text-orange-50/95 max-w-3xl mx-auto line-clamp-2">
            {episode.description}
          </p>
        </div>
      </header>

      <div className="px-6 py-8 md:py-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6 md:gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <section className="space-y-5 md:space-y-6">
              <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200/80 p-3 md:p-4">
                <div className="w-full overflow-hidden rounded-lg">
                  <Image
                    src={getCoverImageUrl(episode.cover_image)}
                    alt={episode.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200/80 p-6 md:p-5">
                <div className="flex items-center mb-3">
                  <span className="text-2xl md:text-xl mr-2">🎙</span>
                  <h2 className="text-xl md:text-lg font-semibold text-gray-900">
                    {t("summaryTitle")}
                  </h2>
                </div>
                <div className="text-gray-700 leading-relaxed text-base md:text-sm whitespace-pre-line">
                  {episode.description}
                </div>
              </div>

              {episode.tags && episode.tags.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200/80 p-6 md:p-5">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl md:text-xl mr-2">📎</span>
                    <h2 className="text-xl md:text-lg font-semibold text-gray-900">
                      {t("tagsTitle")}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {episode.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {episode.guests && episode.guests.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200/80 p-6 md:p-5">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl md:text-xl mr-2">🧠</span>
                    <h2 className="text-xl md:text-lg font-semibold text-gray-900">
                      {t("guestsTitle")}
                    </h2>
                  </div>
                  <div className="space-y-2">
                    {episode.guests.map((guest, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                        <span className="text-gray-700 text-base md:text-sm">
                          {guest}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <aside className="lg:sticky lg:top-24">
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200/80 p-6 md:p-5 space-y-5">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">📅</span>
                    <h2 className="text-base md:text-sm font-semibold text-gray-900">
                      {t("timeTitle")}
                    </h2>
                  </div>
                  <p className="text-gray-700 text-sm md:text-sm">
                    {episode.date || t("timeTbd")}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-5">
                  <div className="flex items-center mb-3">
                    <span className="text-xl mr-2">🔗</span>
                    <h2 className="text-base md:text-sm font-semibold text-gray-900">
                      {t("spaceTitle")}
                    </h2>
                  </div>
                  {episode.space_link ? (
                    <a
                      href={episode.space_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg transition-colors"
                    >
                      <span className="mr-2">🎧</span>
                      {t("listenCta")}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500">-</p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

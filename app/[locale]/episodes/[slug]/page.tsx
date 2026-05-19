import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Calendar,
  ChevronLeft,
  Headphones,
  Link2,
  Mic,
  Tag,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getEpisodeBySlug, getCoverImageUrl } from "@/lib/supabase";
import { routing } from "@/i18n/routing";

type AppLocale = (typeof routing.locales)[number];

function SectionHeading({
  icon: Icon,
  title,
  compact = false,
}: {
  icon: LucideIcon;
  title: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 ${compact ? "mb-2" : "mb-3"}`}
    >
      <div
        className={`flex shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600 ring-1 ring-orange-100 ${
          compact ? "h-8 w-8" : "h-9 w-9"
        }`}
      >
        <Icon
          className={compact ? "h-3.5 w-3.5" : "h-4 w-4"}
          strokeWidth={2}
          aria-hidden
        />
      </div>
      <h2
        className={`font-semibold text-gray-900 ${
          compact ? "text-base md:text-sm" : "text-xl md:text-lg"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

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
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-50 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            {t("backToEpisodes")}
          </Link>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-orange-100/90">
            {slug.toUpperCase()}
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight text-center md:text-left">
            {episode.title}
          </h1>
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
                <SectionHeading icon={Mic} title={t("summaryTitle")} />
                <div className="text-gray-700 leading-relaxed text-base md:text-sm whitespace-pre-line">
                  {episode.description}
                </div>
              </div>

              {episode.tags && episode.tags.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200/80 p-6 md:p-5">
                  <SectionHeading icon={Tag} title={t("tagsTitle")} />
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
                  <SectionHeading icon={Users} title={t("guestsTitle")} />
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
                  <SectionHeading
                    icon={Calendar}
                    title={t("timeTitle")}
                    compact
                  />
                  <p className="text-gray-700 text-sm md:text-sm">
                    {episode.date || t("timeTbd")}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-5">
                  <SectionHeading
                    icon={Link2}
                    title={t("spaceTitle")}
                    compact
                  />
                  {episode.space_link ? (
                    <a
                      href={episode.space_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg transition-colors"
                    >
                      <Headphones className="h-4 w-4" aria-hidden />
                      {t("listenCta")}
                    </a>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm leading-relaxed text-gray-600">
                        {t("spacePending")}
                      </p>
                      <a
                        href="https://x.com/MagoTalk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex text-sm font-semibold text-orange-600 underline-offset-4 transition-colors hover:text-orange-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                      >
                        {t("followOnX")}
                      </a>
                    </div>
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

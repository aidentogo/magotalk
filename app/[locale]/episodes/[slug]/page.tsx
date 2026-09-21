import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Calendar,
  ChevronLeft,
  Headphones,
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
import { xProfileUrl } from "@/lib/contact";

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
        className={`flex shrink-0 items-center justify-center rounded-full bg-background text-brand ring-1 ring-line ${
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
        className={`font-semibold text-ink ${
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
    <main className="mx-auto w-full max-w-6xl px-5 py-8 md:px-6 md:py-12">
      <header className="mb-8 border-b border-line pb-8">
        <Link href="/" className="mb-6 inline-flex min-h-8 items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
          <ChevronLeft className="h-4 w-4" aria-hidden />{t("backToEpisodes")}
        </Link>
        <p className="mb-3 text-xs font-semibold tracking-widest text-brand">{slug.toUpperCase()}</p>
        <h1 className="max-w-4xl text-2xl font-bold leading-snug text-ink sm:text-3xl md:text-4xl">{episode.title}</h1>
        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 text-sm leading-relaxed text-muted">
            <Calendar className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>{episode.date || t("timeTbd")}</span>
          </p>
          {episode.space_link ? (
            <a href={episode.space_link} target="_blank" rel="noopener noreferrer" className="button-primary shrink-0">
              <Headphones className="h-4 w-4" aria-hidden />{t("listenCta")}
            </a>
          ) : (
            <div className="text-sm text-muted">
              <p>{t("spacePending")}</p>
              <a href={xProfileUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex font-semibold text-brand underline underline-offset-4">{t("followOnX")}</a>
            </div>
          )}
        </div>
      </header>
      <div className="grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10">
        <div className="self-start overflow-hidden rounded-xl border border-line">
          <Image src={getCoverImageUrl(episode.cover_image)} alt={episode.title} width={800} height={800} sizes="(max-width: 768px) 100vw, 480px" className="h-auto w-full" priority />
        </div>
        <div className="space-y-8">
          <section>
            <SectionHeading icon={Mic} title={t("summaryTitle")} />
            <p className="whitespace-pre-line text-base leading-relaxed text-muted">{episode.description}</p>
          </section>
          {episode.tags && episode.tags.length > 0 && (
            <section className="border-t border-line pt-6">
              <SectionHeading icon={Tag} title={t("tagsTitle")} />
              <div className="flex flex-wrap gap-2">{episode.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-brand/5 px-3 py-1.5 text-sm text-brand">{tag}</span>
              ))}</div>
            </section>
          )}
          {episode.guests && episode.guests.length > 0 && (
            <section className="border-t border-line pt-6">
              <SectionHeading icon={Users} title={t("guestsTitle")} />
              <ul className="space-y-2 text-base text-muted">{episode.guests.map((guest, index) => <li key={index}>{guest}</li>)}</ul>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

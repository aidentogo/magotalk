import { setRequestLocale } from "next-intl/server";
import HomeEpisodes from "@/app/components/HomeEpisodes";
import { getEpisodesPage, EPISODES_PAGE_SIZE } from "@/lib/supabase";
import { routing } from "@/i18n/routing";

type AppLocale = (typeof routing.locales)[number];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);

  const initialData = await getEpisodesPage({
    limit: EPISODES_PAGE_SIZE,
    offset: 0,
  });

  return <HomeEpisodes initialData={initialData} />;
}

import Image from "next/image";
import { Suspense } from "react";
import AboutNews from "@/app/components/AboutNews";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

type AppLocale = (typeof routing.locales)[number];

export const dynamic = "force-dynamic";

const hosts = [
  {
    name: "Mago",
    image: "/hosts/host1-mago.png",
    roleKey: "hostMagoRole" as const,
  },
  {
    name: "KCVision",
    image: "/hosts/host3-mago.jpg",
    roleKey: "hostKcRole" as const,
  },
  {
    name: "Steven Zhu",
    image: "/hosts/host4-mago.jpg",
    roleKey: "hostStevenRole" as const,
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);
  const t = await getTranslations("About");

  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 md:py-16">
      <h1 className="text-4xl font-bold tracking-tight text-ink md:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{t("aboutBody")}</p>

      <section aria-labelledby="about-team-heading" className="mt-12">
        <h2 id="about-team-heading" className="text-2xl font-bold tracking-tight text-ink">{t("guestBiosTitle")}</h2>
        <ul className="mt-6 divide-y divide-line border-t border-line">
          {hosts.map((host) => (
            <li key={host.name} className="flex items-center gap-4 py-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200">
                <Image src={host.image} alt="" fill sizes="56px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-ink">{host.name}</h3>
                <p className="mt-0.5 text-sm text-muted">{t(host.roleKey)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Suspense fallback={null}>
        <AboutNews locale={locale} />
      </Suspense>
    </main>
  );
}

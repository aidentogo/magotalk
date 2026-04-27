import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

type AppLocale = (typeof routing.locales)[number];

const hosts = [
  {
    name: "Mago",
    image: "/hosts/host1-mago.png",
    roleKey: "hostMagoRole" as const,
    bioKey: "hostMagoBio" as const,
  },
  {
    name: "KCVision",
    image: "/hosts/host3-mago.jpg",
    roleKey: "hostKcRole" as const,
    bioKey: "hostKcBio" as const,
  },
  {
    name: "Steven Zhu",
    image: "/hosts/host4-mago.jpg",
    roleKey: "hostStevenRole" as const,
    bioKey: "hostStevenBio" as const,
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
    <div className="min-h-screen bg-[#FDFBEE]">
      <header className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-500 to-amber-600 px-6 py-12 md:py-16">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-amber-400/20 blur-2xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-100/90 md:text-sm">
            MagoTalk
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl md:leading-tight">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-orange-50/95 md:text-lg">
            {t("subtitle")}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <div className="flex flex-col gap-8 md:gap-10">
          <section
            aria-labelledby="about-blurb-heading"
            className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/80 md:p-10"
          >
            <h2
              id="about-blurb-heading"
              className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl"
            >
              {t("aboutHeading")}
            </h2>
            <p className="mt-4 max-w-2xl whitespace-pre-line text-base leading-relaxed text-gray-600">
              {t("aboutBody")}
            </p>
          </section>

          <section
            aria-labelledby="about-mission-heading"
            className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/80 md:p-10"
          >
            <h2
              id="about-mission-heading"
              className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl"
            >
              {t("missionHeading")}
            </h2>
            <p className="mt-4 max-w-2xl whitespace-pre-line text-base leading-relaxed text-gray-600">
              {t("missionBody")}
            </p>
          </section>

          <section aria-labelledby="about-team-heading">
            <div className="mb-8 md:mb-10">
              <h2
                id="about-team-heading"
                className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl"
              >
                {t("guestBiosTitle")}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-gray-500 md:text-base">
                {t("teamIntro")}
              </p>
            </div>

            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {hosts.map((host) => (
                <li key={host.name}>
                  <article className="flex h-full flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-200/80 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-orange-200/70 md:p-8">
                    <div className="relative mb-5 h-28 w-28 shrink-0 overflow-hidden rounded-full ring-4 ring-orange-100/90">
                      <Image
                        src={host.image}
                        alt={host.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {host.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-orange-600">
                      {t(host.roleKey)}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      {t(host.bioKey)}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

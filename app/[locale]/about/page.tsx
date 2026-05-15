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
    <main className="flex min-h-[calc(100svh-73px)] bg-[#FDFBEE] px-5 py-6 md:h-[calc(100svh-73px)] md:items-center md:overflow-hidden md:px-8 md:py-8">
      <div className="mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.72fr)] md:items-center md:gap-10 lg:gap-14">
        <section aria-labelledby="about-title" className="min-w-0">
          <h1
            id="about-title"
            className="max-w-3xl text-5xl font-extrabold leading-none tracking-tight text-gray-950 md:text-6xl lg:text-7xl"
          >
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-xl font-semibold leading-snug text-gray-900 md:text-2xl">
            {t("subtitle")}
          </p>

          <div className="mt-8 grid max-w-3xl gap-5 sm:grid-cols-2 md:mt-10">
            <div className="border-t border-gray-300 pt-5">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-gray-950">
                {t("aboutHeading")}
              </h2>
              <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-gray-600">
                {t("aboutBody")}
              </p>
            </div>
            <div className="border-t border-orange-300 pt-5">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-gray-950">
                {t("missionHeading")}
              </h2>
              <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-gray-600">
                {t("missionBody")}
              </p>
            </div>
          </div>

        </section>

        <section
          aria-labelledby="about-team-heading"
          className="min-w-0 border-l-0 border-gray-200 md:border-l md:pl-8 lg:pl-10"
        >
          <div className="flex items-end justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <h2
                id="about-team-heading"
                className="text-2xl font-bold tracking-tight text-gray-950"
              >
                {t("guestBiosTitle")}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{t("teamIntro")}</p>
            </div>
            <p className="text-sm font-semibold text-orange-600 tabular-nums">
              0{hosts.length}
            </p>
          </div>

          <ul className="mt-4 divide-y divide-gray-200 md:mt-5">
            {hosts.map((host) => (
              <li key={host.name} className="py-4 first:pt-0 last:pb-0">
                <article className="group flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200 md:h-[72px] md:w-[72px]">
                    <Image
                      src={host.image}
                      alt={host.name}
                      fill
                      sizes="72px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-gray-950">
                      {host.name}
                    </h3>
                    <p className="mt-0.5 text-sm font-semibold text-orange-600">
                      {t(host.roleKey)}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {t(host.bioKey)}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-gray-200 pt-5">
            <p className="text-sm leading-relaxed text-gray-600">
              {t("subtitle")}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

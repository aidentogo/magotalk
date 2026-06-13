import { ExternalLink, Mail } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import XIcon from "@/app/components/XIcon";
import {
  contactEmail,
  contactEmailHref,
  xHandle,
  xProfileUrl,
} from "@/lib/contact";

type AppLocale = (typeof routing.locales)[number];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);
  const t = await getTranslations("Contact");

  return (
    <main className="flex min-h-[calc(100svh-73px)] bg-[#FDFBEE] px-5 py-6 md:h-[calc(100svh-73px)] md:items-center md:overflow-hidden md:px-8 md:py-8">
      <div className="mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(340px,0.85fr)] md:items-center md:gap-12 lg:gap-16">
        <section aria-labelledby="contact-title" className="min-w-0">
          <h1
            id="contact-title"
            className="max-w-3xl text-5xl font-extrabold leading-none tracking-tight text-gray-950 md:text-6xl lg:text-7xl"
          >
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-xl font-semibold leading-snug text-gray-900 md:text-2xl">
            {t("subtitle")}
          </p>

          <div className="mt-8 max-w-2xl border-t border-gray-300 pt-5 md:mt-10">
            <p className="whitespace-pre-line text-base leading-relaxed text-gray-600">
              {t("pageIntro")}
            </p>
          </div>
        </section>

        <section
          aria-labelledby="contact-touch-heading"
          className="min-w-0 border-l-0 border-gray-200 md:border-l md:pl-8 lg:pl-10"
        >
          <div className="border-b border-gray-200 pb-4">
            <h2
              id="contact-touch-heading"
              className="text-2xl font-bold tracking-tight text-gray-950"
            >
              {t("getInTouch")}
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            <a
              href={contactEmailHref}
              aria-label={`${t("emailLabel")}: ${contactEmail}`}
              className="group flex items-center gap-4 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-orange-600 ring-1 ring-gray-200 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                <Mail className="h-5 w-5" strokeWidth={2} aria-hidden />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="flex items-center gap-1.5 text-sm font-semibold text-gray-500">
                  {t("emailLabel")}
                  <ExternalLink
                    className="h-3.5 w-3.5 shrink-0 opacity-50 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                </h3>
                <p className="mt-1 break-all text-lg font-semibold text-gray-950 group-hover:text-orange-700">
                  {contactEmail}
                </p>
              </div>
            </a>

            <a
              href={xProfileUrl}
              className="group flex items-center gap-4 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-950 text-white transition-colors group-hover:bg-orange-500">
                <XIcon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="flex items-center gap-1.5 text-sm font-semibold text-gray-500">
                  {t("xLabel")}
                  <ExternalLink
                    className="h-3.5 w-3.5 shrink-0 opacity-50 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                </h3>
                <p className="mt-1 text-lg font-semibold text-gray-950 group-hover:text-orange-700">
                  {xHandle}
                </p>
              </div>
            </a>
          </div>

          <div className="mt-6 border-t border-orange-300 pt-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-gray-950">
              {t("collabTitle")}
            </h2>
            <p className="mt-3 max-w-xl whitespace-pre-line text-base leading-relaxed text-gray-600">
              {t("collabBody")}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

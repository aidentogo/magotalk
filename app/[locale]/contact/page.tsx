import { ExternalLink, Mail } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

type AppLocale = (typeof routing.locales)[number];

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);
  const t = await getTranslations("Contact");

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

      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <div className="flex flex-col gap-10 md:gap-12">
          <section
            aria-labelledby="contact-touch-heading"
            className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/80 md:p-10"
          >
            <h2
              id="contact-touch-heading"
              className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl"
            >
              {t("getInTouch")}
            </h2>
            <p className="mt-3 max-w-2xl whitespace-pre-line text-base leading-relaxed text-gray-500">
              {t("pageIntro")}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <a
                href="mailto:magotalk@aol.com"
                className="group flex gap-4 rounded-2xl border border-gray-100 bg-gradient-to-br from-orange-50/80 to-white p-5 shadow-sm ring-1 ring-orange-100/60 transition-[box-shadow,transform,border-color] hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                  <Mail className="h-5 w-5" strokeWidth={2} aria-hidden />
                </div>
                <div className="min-w-0 text-left">
                  <h3 className="text-sm font-semibold text-gray-500">
                    {t("emailLabel")}
                  </h3>
                  <p className="mt-1 break-all text-base font-medium text-gray-900 group-hover:text-orange-700">
                    magotalk@aol.com
                  </p>
                </div>
              </a>

              <a
                href="https://x.com/MagoTalk"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 rounded-2xl border border-gray-100 bg-gradient-to-br from-orange-50/80 to-white p-5 shadow-sm ring-1 ring-orange-100/60 transition-[box-shadow,transform,border-color] hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white transition-colors group-hover:bg-orange-500">
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
                  <p className="mt-1 text-base font-medium text-gray-900 group-hover:text-orange-700">
                    @MagoTalk
                  </p>
                </div>
              </a>
            </div>
          </section>

          <section
            aria-labelledby="contact-collab-heading"
            className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200/80 md:p-10"
          >
            <h2
              id="contact-collab-heading"
              className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl"
            >
              {t("collabTitle")}
            </h2>
            <p className="mt-6 max-w-2xl whitespace-pre-line border-l-2 border-orange-100 pl-5 text-base leading-relaxed text-gray-600 md:pl-6">
              {t("collabBody")}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

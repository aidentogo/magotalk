import Image from "next/image";
import { ArrowRight, Download, Languages } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  books,
  getAvailableBookLocales,
  getBookCoverUrl,
  getBookFile,
  getPublicBookUrl,
  type BookLocale,
} from "@/lib/books";

type AppLocale = (typeof routing.locales)[number];

function getBookLocale(locale: string): BookLocale {
  if (locale === "zh-Hans" || locale === "zh-Hant" || locale === "en") {
    return locale;
  }
  return "en";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Books",
  });

  return {
    title: `${t("pageTitle")} - MagoTalk`,
    description: t("pageIntro"),
  };
}

export default async function BooksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);
  const t = await getTranslations("Books");
  const currentLocale = getBookLocale(locale);

  return (
    <main className="min-h-screen bg-[#FDFBEE]">
      <section className="border-b border-orange-100 bg-gradient-to-br from-[#fff8e6] via-[#FDFBEE] to-[#f1fbf8] px-6 py-10 md:py-14">
        <div className="mx-auto max-w-7xl">
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-gray-950 md:text-6xl">
            {t("pageTitle")}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
            {t("pageIntro")}
          </p>
        </div>
      </section>

      <section className="px-6 py-10 md:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-2 md:mb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-teal-700">
                <Languages className="h-4 w-4" />
                {t("allEditionsEyebrow")}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 md:text-3xl">
                {t("allBooksTitle")}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-gray-600">
              {t("formatHint")}
            </p>
          </div>

          <div className="space-y-6">
            {books.map((book) => {
              const primaryFile = getBookFile(
                book,
                currentLocale,
                book.primaryFormat,
              );

              return (
                <article
                  key={book.slug}
                  id={book.slug}
                  className="grid gap-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-[180px_1fr] md:p-6 lg:grid-cols-[220px_1fr]"
                >
                <div className="mx-auto w-full max-w-[220px] md:mx-0">
                  <div className="relative aspect-[5/8] overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-200">
                    <Image
                      src={getBookCoverUrl(book, currentLocale)}
                      alt={t("coverAlt", { title: book.title })}
                      fill
                      sizes="(max-width: 768px) 220px, 180px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight text-gray-950 md:text-3xl">
                        {book.title}
                      </h3>
                      <p className="mt-2 text-sm font-semibold text-orange-600">
                        {t("authorLabel")}: {book.author}
                      </p>
                    </div>
                    <p className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                      {t(`formatLabels.${book.primaryFormat}`)}
                    </p>
                  </div>

                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600">
                    {t(`bookDescriptions.${book.descriptionKey}`)}
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    {book.detailPath ? (
                      <Link
                        href={book.detailPath}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-gray-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                      >
                        {t("viewDetails")}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    ) : null}
                    {primaryFile ? (
                      <a
                        href={getPublicBookUrl(primaryFile.path)}
                        download={primaryFile.filename}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:border-teal-600 hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                      >
                        <Download className="h-4 w-4" aria-hidden />
                        {t("downloadFormat", {
                          format: t(`formatLabels.${book.primaryFormat}`),
                        })}
                      </a>
                    ) : (
                      <span className="inline-flex min-h-10 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-500">
                        {t("comingSoon")}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 grid gap-4 lg:grid-cols-3">
                    {getAvailableBookLocales(book).map((editionLocale) => {
                      const editionFile = getBookFile(
                        book,
                        editionLocale,
                        book.primaryFormat,
                      );

                      return (
                        <div
                          key={editionLocale}
                          className="rounded-lg border border-gray-200 bg-[#FDFBEE] p-4"
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative h-20 w-12 shrink-0 overflow-hidden rounded-md bg-gray-100 ring-1 ring-gray-200">
                              <Image
                                src={getBookCoverUrl(book, editionLocale)}
                                alt={t("coverAlt", { title: book.title })}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-base font-bold text-gray-950">
                                {t(`editions.${editionLocale}`)}
                              </h4>
                              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                                {t(`editionDescriptions.${editionLocale}`)}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4">
                            {editionFile ? (
                              <a
                                href={getPublicBookUrl(editionFile.path)}
                                download={editionFile.filename}
                                className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-gray-950 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                              >
                                <Download className="h-4 w-4" />
                                {t(`formatLabels.${book.primaryFormat}`)}
                              </a>
                            ) : (
                              <span className="inline-flex min-h-10 w-full cursor-not-allowed items-center justify-center rounded-lg bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-500">
                                {t("comingSoon")}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <p className="mt-5 text-xs text-gray-500">
                    Copyright © {book.year} {book.author}.{" "}
                    {t("rightsReserved")}
                  </p>
                </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

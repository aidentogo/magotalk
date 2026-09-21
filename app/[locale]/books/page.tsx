import BookCard from "@/app/components/BookCard";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { books, type BookLocale } from "@/lib/books";

type AppLocale = (typeof routing.locales)[number];
function getBookLocale(locale: string): BookLocale {
  return locale === "zh-Hans" || locale === "zh-Hant" ? locale : "en";
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
    <main className="mx-auto w-full max-w-6xl px-5 py-8 md:px-6 md:py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-brand md:text-5xl">{t("pageTitle")}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{t("pageIntro")}</p>
      </header>
      <div className="space-y-6">
        {books.map((book) => <BookCard key={`${book.slug}-${currentLocale}`} book={book} locale={currentLocale} />)}
      </div>
    </main>
  );
}

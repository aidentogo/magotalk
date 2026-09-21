"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "@/i18n/navigation";
import BookPublication from "@/app/components/BookPublication";
import { getAvailableBookLocales, getBookCoverUrl, getBookFile, getPublicBookUrl, type Book, type BookLocale } from "@/lib/books";

export default function BookCard({ book, locale }: { book: Book; locale: BookLocale }) {
  const t = useTranslations("Books");
  const [edition, setEdition] = useState(locale);
  const selectId = useId();
  const file = getBookFile(book, edition, book.primaryFormat);

  return (
    <article id={book.slug} className="grid gap-6 rounded-xl border border-line bg-white p-5 md:grid-cols-[180px_1fr] md:gap-8 md:p-8">
      <div className="mx-auto w-full max-w-[180px] md:mx-0">
        <div className="relative aspect-[5/8] overflow-hidden rounded-lg bg-background">
          <Image src={getBookCoverUrl(book, edition)} alt={t("coverAlt", { title: book.title })} fill sizes="180px" className="object-cover" />
        </div>
      </div>
      <div className="min-w-0">
        <h2 className="text-2xl font-bold leading-snug text-ink md:text-3xl">{book.title}</h2>
        <p className="mt-2 text-sm text-muted">{t("authorLabel")}: {book.author}</p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{t(`bookDescriptions.${book.descriptionKey}`)}</p>
        <div className="mt-6 flex flex-wrap items-end gap-3">
          <div>
            <label htmlFor={selectId} className="mb-2 block text-sm font-medium text-muted">{t("editionLabel")}</label>
            <select id={selectId} value={edition} onChange={(event) => setEdition(event.target.value as BookLocale)} className="min-h-11 rounded-lg border border-line bg-white px-3 py-2 text-base text-ink">
              {getAvailableBookLocales(book).map((language) => <option key={language} value={language}>{t(`editions.${language}`)}</option>)}
            </select>
          </div>
          {file ? <a href={getPublicBookUrl(file.path)} download={file.filename} className="button-primary"><Download className="h-4 w-4" aria-hidden />{t("downloadFormat", { format: t(`formatLabels.${book.primaryFormat}`) })}</a> : <span className="text-sm text-muted">{t("comingSoon")}</span>}
          {book.detailPath ? <Link href={book.detailPath} className="button-secondary">{t("viewDetails")}<ArrowRight className="h-4 w-4" aria-hidden /></Link> : null}
        </div>
        <BookPublication book={book} locale={locale} />
      </div>
    </article>
  );
}

import { bookLocaleOrder, type Book, type BookLocale } from "@/lib/books";

const labels = {
  en: {
    title: "EPUB edition publication dates",
    note: "Dates are recorded in each downloadable EPUB’s publication metadata and apply to these digital editions.",
    languages: { en: "English", "zh-Hans": "Simplified Chinese", "zh-Hant": "Traditional Chinese" },
  },
  "zh-Hans": {
    title: "EPUB 版本出版日期",
    note: "日期依据各下载版 EPUB 的出版元数据，仅适用于对应电子书版本。",
    languages: { en: "英文版", "zh-Hans": "简体中文版", "zh-Hant": "繁体中文版" },
  },
  "zh-Hant": {
    title: "EPUB 版本出版日期",
    note: "日期依據各下載版 EPUB 的出版中繼資料，僅適用於對應電子書版本。",
    languages: { en: "英文版", "zh-Hans": "簡體中文版", "zh-Hant": "繁體中文版" },
  },
};

export default function BookPublication({ book, locale }: { book: Book; locale: BookLocale }) {
  const text = labels[locale];
  return (
    <details id={`${book.slug}-publication`} className="mt-6 border-t border-current/15 pt-4 text-sm">
      <summary className="cursor-pointer py-1 font-medium">{text.title}</summary>
      <dl className="mt-2 space-y-1">
        {bookLocaleOrder.map((language) => {
          const edition = book.editions[language];
          if (!edition?.files.epub) return null;
          return (
            <div key={language} className="flex flex-wrap gap-x-2">
              <dt>{text.languages[language]}:</dt>
              <dd>
                <time dateTime={edition.publicationDate}>{edition.publicationDate}</time>
              </dd>
            </div>
          );
        })}
      </dl>
      <p className="mt-2 max-w-xl text-xs leading-relaxed opacity-80">{text.note}</p>
    </details>
  );
}

export type BookLocale = "zh-Hans" | "zh-Hant" | "en";
export type BookFormat = "epub";

export type Book = {
  slug: string;
  title: string;
  author: string;
  year: string;
  descriptionKey: string;
  editions: Record<
    BookLocale,
    {
      coverPath: string;
      files: Record<
        BookFormat,
        {
          path: string;
          filename: string;
        }
      >;
    }
  >;
};

const BOOKS_ASSET_BASE_PATH = "/books";

function getPublicBookUrl(path: string) {
  return `${BOOKS_ASSET_BASE_PATH}/${path}`;
}

export const books: Book[] = [
  {
    slug: "money-code",
    title: "Money Code",
    author: "MAGO",
    year: "2026",
    descriptionKey: "moneyCode",
    editions: {
      "zh-Hans": {
        coverPath: "money-code/zh-Hans/Money-Code-cover-zh-Hans.jpg",
        files: {
          epub: {
            path: "money-code/zh-Hans/Money-Code-zh-Hans.epub",
            filename: "Money-Code-zh-Hans.epub",
          },
        },
      },
      "zh-Hant": {
        coverPath: "money-code/zh-Hant/Money-Code-cover-zh-Hant.jpg",
        files: {
          epub: {
            path: "money-code/zh-Hant/Money-Code-zh-Hant.epub",
            filename: "Money-Code-zh-Hant.epub",
          },
        },
      },
      en: {
        coverPath: "money-code/en/Money-Code-cover-en.jpg",
        files: {
          epub: {
            path: "money-code/en/Money-Code-en.epub",
            filename: "Money-Code-en.epub",
          },
        },
      },
    },
  },
];

export const moneyCodeBook = books[0];

export function getBookCoverUrl(book: Book, locale: BookLocale) {
  return getPublicBookUrl(book.editions[locale].coverPath);
}

export function getBookDownloadUrl(
  book: Book,
  locale: BookLocale,
  format: BookFormat,
) {
  const file = book.editions[locale].files[format];
  return getPublicBookUrl(file.path);
}

export function getBookDownloadFilename(
  book: Book,
  locale: BookLocale,
  format: BookFormat,
) {
  return book.editions[locale].files[format].filename;
}

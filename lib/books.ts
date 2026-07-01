export type BookLocale = "zh-Hans" | "zh-Hant" | "en";
export type BookFormat = "epub" | "pdf" | "markdown";

export type BookFile = {
  path: string;
  filename: string;
};

export type BookEdition = {
  coverPath: string;
  files: Partial<Record<BookFormat, BookFile>>;
};

export type Book = {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  year: string;
  descriptionKey: string;
  intro?: string[];
  authorLine?: string;
  seoDescription?: string;
  detailPath?: string;
  manuscriptPath?: string;
  primaryFormat: BookFormat;
  fallbackLocale: BookLocale;
  editions: Partial<Record<BookLocale, BookEdition>>;
};

const BOOKS_ASSET_BASE_PATH = "/books";
export const bookLocaleOrder: BookLocale[] = ["en", "zh-Hans", "zh-Hant"];
export const bookFormatOrder: BookFormat[] = ["epub", "pdf", "markdown"];

export function getPublicBookUrl(path: string) {
  return `${BOOKS_ASSET_BASE_PATH}/${path}`;
}

export const books: Book[] = [
  {
    slug: "money-code",
    title: "Money Code",
    author: "MAGO",
    year: "2026",
    descriptionKey: "moneyCode",
    primaryFormat: "epub",
    fallbackLocale: "en",
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
  {
    slug: "ai-is-eating-the-world",
    title: "AI is eating the world",
    subtitle: "人工智能如何重写财富、工作、公司与世界秩序",
    author: "MAGO",
    year: "2026",
    descriptionKey: "aiIsEatingTheWorld",
    intro: [
      "软件吞噬了旧世界，AI 正在吞噬软件。",
      "当智能变得便宜，工作、财富、公司、信任和价值都会被重新分配。",
      "这不是一本 AI 工具教程，也不是技术百科。它写的是智能变便宜以后，写作、编程、搜索、媒体、法律、金融、公司结构和信任会怎样被重新组织。",
    ],
    authorLine: "MAGO 长期关注 AI、金融、Web3 与科技背后的结构性变化",
    seoDescription:
      "《AI is eating the world》是 MAGO 关于 AI、金融、Web3 与科技结构变化的第二本书，讨论人工智能如何重写工作、财富、公司、金融、信任与世界秩序",
    detailPath: "/books/ai-is-eating-the-world",
    manuscriptPath:
      "ai-is-eating-the-world/AI_is_eating_the_world_CN_full_manuscript.md",
    primaryFormat: "epub",
    fallbackLocale: "zh-Hans",
    editions: {
      en: {
        coverPath:
          "ai-is-eating-the-world/cover_front_ebook_1600x2560.jpg",
        files: {
          epub: {
            path: "ai-is-eating-the-world/AI_is_eating_the_world-en.epub",
            filename: "AI_is_eating_the_world-en.epub",
          },
          markdown: {
            path: "ai-is-eating-the-world/AI_is_eating_the_world_EN_web_preview.md",
            filename: "AI_is_eating_the_world_EN_web_preview.md",
          },
        },
      },
      "zh-Hans": {
        coverPath:
          "ai-is-eating-the-world/cover_front_ebook_1600x2560.jpg",
        files: {
          epub: {
            path: "ai-is-eating-the-world/AI_is_eating_the_world-zh-Hans.epub",
            filename: "AI_is_eating_the_world-zh-Hans.epub",
          },
          pdf: {
            path: "ai-is-eating-the-world/AI_is_eating_the_world_CN_preview.pdf",
            filename: "AI_is_eating_the_world_CN_preview.pdf",
          },
          markdown: {
            path: "ai-is-eating-the-world/AI_is_eating_the_world_CN_full_manuscript.md",
            filename: "AI_is_eating_the_world_CN_full_manuscript.md",
          },
        },
      },
      "zh-Hant": {
        coverPath:
          "ai-is-eating-the-world/cover_front_ebook_1600x2560.jpg",
        files: {
          epub: {
            path: "ai-is-eating-the-world/AI_is_eating_the_world-zh-Hant.epub",
            filename: "AI_is_eating_the_world-zh-Hant.epub",
          },
          markdown: {
            path: "ai-is-eating-the-world/AI_is_eating_the_world_zh-Hant_full_manuscript.md",
            filename: "AI_is_eating_the_world_zh-Hant_full_manuscript.md",
          },
        },
      },
    },
  },
];

export const moneyCodeBook = books[0];
export const aiIsEatingTheWorldBook = books[1];

export function getBookCoverUrl(book: Book, locale: BookLocale) {
  return getPublicBookUrl(getBookEdition(book, locale).coverPath);
}

export function getBookEdition(book: Book, locale: BookLocale) {
  const edition =
    book.editions[locale] ??
    book.editions[book.fallbackLocale] ??
    Object.values(book.editions).find(
      (value): value is BookEdition => Boolean(value),
    );

  if (!edition) {
    throw new Error(`Book ${book.slug} has no available editions.`);
  }

  return edition;
}

export function getAvailableBookLocales(book: Book) {
  return bookLocaleOrder.filter((locale) => Boolean(book.editions[locale]));
}

export function getBookFile(
  book: Book,
  locale: BookLocale,
  format: BookFormat,
) {
  return getBookEdition(book, locale).files[format];
}

export function getBookDownloadUrl(
  book: Book,
  locale: BookLocale,
  format: BookFormat,
) {
  const file = getBookFile(book, locale, format);
  if (!file) {
    throw new Error(`Book ${book.slug} does not provide ${format}.`);
  }

  return getPublicBookUrl(file.path);
}

export function getBookDownloadFilename(
  book: Book,
  locale: BookLocale,
  format: BookFormat,
) {
  const file = getBookFile(book, locale, format);
  if (!file) {
    throw new Error(`Book ${book.slug} does not provide ${format}.`);
  }

  return file.filename;
}

export function getBookBySlug(slug: string) {
  return books.find((book) => book.slug === slug);
}

import Image from "next/image";
import {
  BookOpen,
  ChevronLeft,
  Download,
  FileText,
  ListTree,
} from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  aiIsEatingTheWorldBook,
  getBookCoverUrl,
  getBookDownloadFilename,
  getBookDownloadUrl,
  getPublicBookUrl,
} from "@/lib/books";

type AppLocale = (typeof routing.locales)[number];

type TocSection = {
  title: string;
  chapters: string[];
};

type BookPageContent = {
  backToBooks: string;
  subtitle: string;
  authorLine: string;
  intro: string[];
  readPdf: string;
  viewToc: string;
  downloadManuscript: string;
  aboutLabel: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  contentsLabel: string;
  contentsTitle: string;
  readLabel: string;
  readTitle: string;
  openPdf: string;
  downloadPdf: string;
  downloadMarkdown: string;
  coverAlt: string;
  seoDescription: string;
  toc: TocSection[];
};

const book = aiIsEatingTheWorldBook;
const bookLocale = "zh-Hans";
const pdfUrl = getBookDownloadUrl(book, bookLocale, "pdf");
const pdfFilename = getBookDownloadFilename(book, bookLocale, "pdf");
const manuscriptUrl = book.manuscriptPath
  ? getPublicBookUrl(book.manuscriptPath)
  : "";

const pageContent: Record<AppLocale, BookPageContent> = {
  "zh-Hans": {
    backToBooks: "全部书籍",
    subtitle: "人工智能如何重写财富、工作、公司与世界秩序",
    authorLine: "MAGO 长期关注 AI、金融、Web3 与科技背后的结构性变化",
    intro: [
      "软件吞噬了旧世界，AI 正在吞噬软件。",
      "当智能变得便宜，工作、财富、公司、信任和价值都会被重新分配。",
      "这不是一本 AI 工具教程，也不是技术百科。它写的是智能变便宜以后，写作、编程、搜索、媒体、法律、金融、公司结构和信任会怎样被重新组织。",
    ],
    readPdf: "阅读 PDF",
    viewToc: "查看目录",
    downloadManuscript: "下载书稿",
    aboutLabel: "ABOUT",
    aboutTitle: "关于本书",
    aboutParagraphs: [
      "这不是一本 AI 工具教程，也不是技术百科。它关心的是智能成为可调用资源之后，工作、财富、公司、金融与信任结构如何被重新组织。",
      "书中从软件、写作、编程、搜索、媒体、法律和金融谈起，继续进入个人杠杆、工作流、Agent、AI 原生公司、算力、数据中心、能源、AI 主权与 Trust Premium。",
      "它的核心问题不是某个工具如何使用，而是当答案变多、内容过剩、判断稀缺时，个人和组织如何重新建立能力、边界与信任。",
    ],
    contentsLabel: "CONTENTS",
    contentsTitle: "目录",
    readLabel: "READ",
    readTitle: "阅读与下载",
    openPdf: "打开 PDF",
    downloadPdf: "下载 PDF",
    downloadMarkdown: "下载 Markdown",
    coverAlt: "AI is eating the world 书籍封面",
    seoDescription:
      "《AI is eating the world》是 MAGO 关于 AI、金融、Web3 与科技结构变化的第二本书，讨论人工智能如何重写工作、财富、公司、金融、信任与世界秩序",
    toc: [
      {
        title: "第一部分：智能变便宜了",
        chapters: [
          "第 1 章：Software ate the world",
          "第 2 章：AI is eating software",
          "第 3 章：智能第一次成为商品",
          "第 4 章：智能通胀",
        ],
      },
      {
        title: "第二部分：AI 正在吃掉旧工作方式",
        chapters: [
          "第 5 章：AI is eating writing",
          "第 6 章：AI is eating coding",
          "第 7 章：AI is eating search",
          "第 8 章：AI is eating learning",
          "第 9 章：AI is eating media",
          "第 10 章：AI is eating law and finance",
        ],
      },
      {
        title: "第三部分：新个人与新公司",
        chapters: [
          "第 11 章：个人的认知杠杆",
          "第 12 章：Workflow is the new software",
          "第 13 章：Agent is the new employee",
          "第 14 章：One-person company 的崛起",
          "第 15 章：AI 原生公司",
        ],
      },
      {
        title: "第四部分：新世界的新基础设施",
        chapters: [
          "第 16 章：Compute is the new oil",
          "第 17 章：Data center is the new factory",
          "第 18 章：Energy is eating AI",
          "第 19 章：AI sovereignty",
          "第 20 章：Trust Premium",
          "结语：站在 AI 背上",
        ],
      },
    ],
  },
  "zh-Hant": {
    backToBooks: "全部書籍",
    subtitle: "人工智慧如何重寫財富、工作、公司與世界秩序",
    authorLine: "MAGO 長期關注 AI、金融、Web3 與科技背後的結構性變化",
    intro: [
      "軟體吞噬了舊世界，AI 正在吞噬軟體。",
      "當智能變得便宜，工作、財富、公司、信任和價值都會被重新分配。",
      "這不是一本 AI 工具教程，也不是技術百科。它寫的是智能變便宜以後，寫作、程式設計、搜尋、媒體、法律、金融、公司結構和信任會如何被重新組織。",
    ],
    readPdf: "閱讀 PDF",
    viewToc: "查看目錄",
    downloadManuscript: "下載書稿",
    aboutLabel: "ABOUT",
    aboutTitle: "關於本書",
    aboutParagraphs: [
      "這不是一本 AI 工具教程，也不是技術百科。它關心的是智能成為可調用資源之後，工作、財富、公司、金融與信任結構如何被重新組織。",
      "書中從軟體、寫作、程式設計、搜尋、媒體、法律和金融談起，繼續進入個人槓桿、工作流、Agent、AI 原生公司、算力、數據中心、能源、AI 主權與 Trust Premium。",
      "它的核心問題不是某個工具如何使用，而是當答案變多、內容過剩、判斷稀缺時，個人和組織如何重新建立能力、邊界與信任。",
    ],
    contentsLabel: "CONTENTS",
    contentsTitle: "目錄",
    readLabel: "READ",
    readTitle: "閱讀與下載",
    openPdf: "開啟 PDF",
    downloadPdf: "下載 PDF",
    downloadMarkdown: "下載 Markdown",
    coverAlt: "AI is eating the world 書籍封面",
    seoDescription:
      "《AI is eating the world》是 MAGO 關於 AI、金融、Web3 與科技結構變化的第二本書，討論人工智慧如何重寫工作、財富、公司、金融、信任與世界秩序",
    toc: [
      {
        title: "第一部分：智能變便宜了",
        chapters: [
          "第 1 章：Software ate the world",
          "第 2 章：AI is eating software",
          "第 3 章：智能第一次成為商品",
          "第 4 章：智能通脹",
        ],
      },
      {
        title: "第二部分：AI 正在吃掉舊工作方式",
        chapters: [
          "第 5 章：AI is eating writing",
          "第 6 章：AI is eating coding",
          "第 7 章：AI is eating search",
          "第 8 章：AI is eating learning",
          "第 9 章：AI is eating media",
          "第 10 章：AI is eating law and finance",
        ],
      },
      {
        title: "第三部分：新個人與新公司",
        chapters: [
          "第 11 章：個人的認知槓桿",
          "第 12 章：Workflow is the new software",
          "第 13 章：Agent is the new employee",
          "第 14 章：One-person company 的崛起",
          "第 15 章：AI 原生公司",
        ],
      },
      {
        title: "第四部分：新世界的新基礎設施",
        chapters: [
          "第 16 章：Compute is the new oil",
          "第 17 章：Data center is the new factory",
          "第 18 章：Energy is eating AI",
          "第 19 章：AI sovereignty",
          "第 20 章：Trust Premium",
          "結語：站在 AI 背上",
        ],
      },
    ],
  },
  en: {
    backToBooks: "All books",
    subtitle: "How artificial intelligence rewrites wealth, work, companies, and world order",
    authorLine: "MAGO studies the structural changes behind AI, finance, Web3, and technology",
    intro: [
      "Software ate the old world. AI is now eating software.",
      "As intelligence gets cheaper, work, wealth, companies, trust, and value will be redistributed.",
      "This is not an AI tool manual or a technical encyclopedia. It is about how writing, coding, search, media, law, finance, company structure, and trust are reorganized when intelligence becomes cheap.",
    ],
    readPdf: "Read PDF",
    viewToc: "View contents",
    downloadManuscript: "Download manuscript",
    aboutLabel: "ABOUT",
    aboutTitle: "About the book",
    aboutParagraphs: [
      "This is not an AI tool tutorial or a technical encyclopedia. It asks what happens to work, wealth, companies, finance, and trust when intelligence becomes a callable resource.",
      "The book moves from software, writing, coding, search, media, law, and finance into cognitive leverage, workflows, agents, AI-native companies, compute, data centers, energy, AI sovereignty, and Trust Premium.",
      "The core question is not how to use a particular tool. It is how individuals and organizations rebuild capability, boundaries, and trust when answers multiply, content becomes abundant, and judgment becomes scarce.",
    ],
    contentsLabel: "CONTENTS",
    contentsTitle: "Contents",
    readLabel: "READ",
    readTitle: "Read and download",
    openPdf: "Open PDF",
    downloadPdf: "Download PDF",
    downloadMarkdown: "Download Markdown",
    coverAlt: "AI is eating the world book cover",
    seoDescription:
      "AI is eating the world is MAGO's second book on AI, finance, Web3, and structural change in technology, exploring how artificial intelligence rewrites work, wealth, companies, finance, trust, and world order.",
    toc: [
      {
        title: "Part I: Intelligence is getting cheap",
        chapters: [
          "Chapter 1: Software ate the world",
          "Chapter 2: AI is eating software",
          "Chapter 3: Intelligence becomes a commodity",
          "Chapter 4: Intelligence inflation",
        ],
      },
      {
        title: "Part II: AI is eating the old way of working",
        chapters: [
          "Chapter 5: AI is eating writing",
          "Chapter 6: AI is eating coding",
          "Chapter 7: AI is eating search",
          "Chapter 8: AI is eating learning",
          "Chapter 9: AI is eating media",
          "Chapter 10: AI is eating law and finance",
        ],
      },
      {
        title: "Part III: New individuals and new companies",
        chapters: [
          "Chapter 11: Cognitive leverage",
          "Chapter 12: Workflow is the new software",
          "Chapter 13: Agent is the new employee",
          "Chapter 14: The rise of the one-person company",
          "Chapter 15: AI-native companies",
        ],
      },
      {
        title: "Part IV: New infrastructure for a new world",
        chapters: [
          "Chapter 16: Compute is the new oil",
          "Chapter 17: Data center is the new factory",
          "Chapter 18: Energy is eating AI",
          "Chapter 19: AI sovereignty",
          "Chapter 20: Trust Premium",
          "Conclusion: Standing on the back of AI",
        ],
      },
    ],
  },
};

function getPageContent(locale: string) {
  if (locale === "en" || locale === "zh-Hans" || locale === "zh-Hant") {
    return pageContent[locale];
  }

  return pageContent["zh-Hans"];
}

function BookCover({
  className,
  sizes,
  alt,
}: {
  className: string;
  sizes: string;
  alt: string;
}) {
  return (
    <div className={className}>
      <div className="relative aspect-[5/8] overflow-hidden rounded-lg bg-[#0b1212] shadow-[0_34px_90px_rgba(0,0,0,0.58)] ring-1 ring-white/15">
        <Image
          src={getBookCoverUrl(book, bookLocale)}
          alt={alt}
          fill
          priority
          sizes={sizes}
          className="object-cover"
        />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getPageContent(locale);

  return {
    title: `${book.title} - MagoTalk`,
    description: content.seoDescription,
    openGraph: {
      title: book.title,
      description: content.seoDescription,
      type: "book",
      images: [
        {
          url: getBookCoverUrl(book, bookLocale),
          width: 1600,
          height: 2560,
          alt: content.coverAlt,
        },
      ],
    },
  };
}

export default async function AiIsEatingTheWorldPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);
  const content = getPageContent(locale);

  return (
    <main className="min-h-screen bg-[#F7F1E3] text-[#101312]">
      <section className="relative overflow-hidden bg-[#050808] text-white">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(49, 201, 226, 0.16), transparent 32%, rgba(197, 151, 71, 0.14) 72%, transparent), linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "auto, 48px 48px, 48px 48px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050808] to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:py-20">
          <div className="max-w-3xl">
            <Link
              href="/books"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/68 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              {content.backToBooks}
            </Link>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] text-white md:text-7xl">
              {book.title}
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-cyan-50/86 md:text-2xl">
              {content.subtitle}
            </p>
            <p className="mt-5 text-base font-semibold text-amber-200/88">
              {content.authorLine}
            </p>

            <BookCover
              className="mx-auto mt-8 w-full max-w-[190px] sm:max-w-[220px] lg:hidden"
              sizes="220px"
              alt={content.coverAlt}
            />

            <div className="mt-7 max-w-2xl space-y-3 text-base leading-relaxed text-white/70 md:text-lg">
              {content.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#read"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 text-sm font-bold text-[#051010] transition-colors hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              >
                <BookOpen className="h-4 w-4" aria-hidden />
                {content.readPdf}
              </a>
              <a
                href="#toc"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/18 bg-white/8 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-cyan-200/60 hover:bg-white/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              >
                <ListTree className="h-4 w-4" aria-hidden />
                {content.viewToc}
              </a>
              <a
                href={pdfUrl}
                download={pdfFilename}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-amber-200/36 bg-amber-200/10 px-5 py-3 text-sm font-bold text-amber-100 transition-colors hover:border-amber-200/70 hover:bg-amber-200/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
              >
                <Download className="h-4 w-4" aria-hidden />
                {content.downloadManuscript}
              </a>
            </div>
          </div>

          <BookCover
            className="mx-auto hidden w-full max-w-[380px] lg:block"
            sizes="380px"
            alt={content.coverAlt}
          />
        </div>
      </section>

      <section className="px-6 py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-semibold text-teal-700">
              {content.aboutLabel}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#111513] md:text-4xl">
              {content.aboutTitle}
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-[#343a36]">
            {content.aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section
        id="toc"
        className="scroll-mt-24 border-y border-[#d8cbb5] bg-[#EFE6D3] px-6 py-14 md:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-teal-800">
              {content.contentsLabel}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#111513] md:text-4xl">
              {content.contentsTitle}
            </h2>
          </div>

          <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {content.toc.map((section, index) => (
              <section
                key={section.title}
                className="border-t border-[#b7a98f] pt-5"
              >
                <p className="font-mono text-sm text-teal-800/78">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[#111513]">
                  {section.title}
                </h3>
                <ol className="mt-4 space-y-2 text-sm leading-relaxed text-[#50564f]">
                  {section.chapters.map((chapter) => (
                    <li key={chapter}>{chapter}</li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section id="read" className="scroll-mt-24 px-6 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-teal-700">
                {content.readLabel}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[#111513] md:text-4xl">
                {content.readTitle}
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#111513] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              >
                <BookOpen className="h-4 w-4" aria-hidden />
                {content.openPdf}
              </a>
              <a
                href={pdfUrl}
                download={pdfFilename}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#c5b89f] bg-white/48 px-4 py-2 text-sm font-semibold text-[#111513] transition-colors hover:border-teal-700 hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              >
                <Download className="h-4 w-4" aria-hidden />
                {content.downloadPdf}
              </a>
              {manuscriptUrl ? (
                <a
                  href={manuscriptUrl}
                  download="AI_is_eating_the_world_CN_full_manuscript.md"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#c5b89f] bg-white/48 px-4 py-2 text-sm font-semibold text-[#111513] transition-colors hover:border-teal-700 hover:text-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                >
                  <FileText className="h-4 w-4" aria-hidden />
                  {content.downloadMarkdown}
                </a>
              ) : null}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-[#d0c3ad] bg-[#0b0f0f] shadow-[0_18px_60px_rgba(28,24,16,0.2)]">
            <iframe
              src={pdfUrl}
              title="AI is eating the world PDF"
              className="h-[72vh] min-h-[440px] w-full bg-[#111513] md:min-h-[620px]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

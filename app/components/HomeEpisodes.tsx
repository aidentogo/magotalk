"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import {
  ArrowUpRight,
  Clock,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useState, useEffect, useRef, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  EPISODE_CATEGORIES,
  selectedFilterTags,
} from "@/lib/episodeCategories";
import {
  EPISODES_PAGE_SIZE,
  getEpisodesPage,
  getCoverImageUrl,
  type Episode,
  type EpisodesPageResult,
} from "@/lib/supabase";
import EpisodeGridSkeleton from "@/app/components/EpisodeGridSkeleton";

function shortEpisodeDate(value: string, locale: string) {
  const match = value.match(/(\d{4})[年/-](\d{1,2})[月/-](\d{1,2})/);
  if (!match) return value;
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))));
}

type HomeEpisodesProps = {
  initialData: EpisodesPageResult;
};

export default function HomeEpisodes({ initialData }: HomeEpisodesProps) {
  const t = useTranslations("Home");
  const locale = useLocale();
  const [episodes, setEpisodes] = useState<Episode[]>(initialData.episodes);
  const [totalCount, setTotalCount] = useState(initialData.total);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [headerActionsRoot, setHeaderActionsRoot] =
    useState<HTMLElement | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All Categories",
  ]);
  const skipInitialFetch = useRef(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const headerActionsRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.max(1, Math.ceil(totalCount / EPISODES_PAGE_SIZE));
  const hasActiveFilters = !selectedCategories.includes("All Categories");
  const hasActiveSearch = activeSearchQuery.length > 0;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    setHeaderActionsRoot(document.getElementById("home-header-actions"));
  }, []);

  useEffect(() => {
    if (!filtersOpen && !searchOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!headerActionsRef.current?.contains(event.target as Node)) {
        setFiltersOpen(false);
        setSearchOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFiltersOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [filtersOpen, searchOpen]);

  useEffect(() => {
    let cancelled = false;

    if (
      skipInitialFetch.current &&
      currentPage === 1 &&
      !selectedFilterTags(selectedCategories) &&
      !activeSearchQuery
    ) {
      skipInitialFetch.current = false;
      return;
    }
    skipInitialFetch.current = false;

    async function loadPage() {
      setIsLoading(true);
      try {
        const tags = selectedFilterTags(selectedCategories);
        const offset = (currentPage - 1) * EPISODES_PAGE_SIZE;
        const { episodes: page, total } = await getEpisodesPage({
          limit: EPISODES_PAGE_SIZE,
          offset,
          tags,
          search: activeSearchQuery,
        });

        if (!cancelled) {
          setEpisodes(page);
          setTotalCount(total);
        }
      } catch (error) {
        console.error("Failed to load episodes:", error);
        if (!cancelled) {
          setEpisodes([]);
          setTotalCount(0);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadPage();
    return () => {
      cancelled = true;
    };
  }, [selectedCategories, currentPage, activeSearchQuery]);

  const skipScrollOnMount = useRef(true);
  useEffect(() => {
    if (skipScrollOnMount.current) {
      skipScrollOnMount.current = false;
      return;
    }
    document.getElementById("episodes-list")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [currentPage]);

  const handleCategorySelect = (category: string) => {
    setCurrentPage(1);
    if (category === "All Categories") {
      setSelectedCategories(["All Categories"]);
    } else {
      setSelectedCategories((prev) => {
        const next = prev.filter((cat) => cat !== "All Categories");
        if (next.includes(category)) {
          const filtered = next.filter((cat) => cat !== category);
          return filtered.length === 0 ? ["All Categories"] : filtered;
        }
        return [...next, category];
      });
    }
  };

  const clearFilters = () => {
    setCurrentPage(1);
    setSelectedCategories(["All Categories"]);
    setFiltersOpen(false);
  };

  const toggleFilters = () => {
    setSearchOpen(false);
    setFiltersOpen((open) => !open);
  };

  const openSearch = () => {
    setFiltersOpen(false);
    setSearchInput(activeSearchQuery);
    setSearchOpen(true);
  };

  const closeSearch = () => {
    setSearchInput(activeSearchQuery);
    setSearchOpen(false);
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPage(1);
    setActiveSearchQuery(searchInput.trim());
    setSearchOpen(false);
  };

  const clearSearch = () => {
    setCurrentPage(1);
    setSearchInput("");
    setActiveSearchQuery("");
    setSearchOpen(false);
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage || isLoading) {
      return;
    }
    setCurrentPage(page);
  };

  const headerIconButtonClass = (active: boolean) =>
    `relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:text-base ${
      active
        ? "bg-brand/10 text-brand"
        : "text-[#315E5B] hover:bg-[#57B4BA]/10 hover:text-[#015551]"
    }`;

  const headerActions = (
    <div ref={headerActionsRef} className="relative flex items-center gap-1.5">
      <div className="hidden">
        <button
          type="button"
          onClick={toggleFilters}
          aria-expanded={filtersOpen}
          aria-label={t("filterToggle")}
          className={headerIconButtonClass(filtersOpen || hasActiveFilters)}
        >
          <SlidersHorizontal
            className="h-[18px] w-[18px]"
            strokeWidth={1.7}
            aria-hidden
          />
          {hasActiveFilters && (
            <span className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-brand" />
          )}
        </button>
      </div>

      <button
        type="button"
        onClick={openSearch}
        aria-expanded={searchOpen}
        aria-label={t("searchOpen")}
        className={headerIconButtonClass(searchOpen || hasActiveSearch)}
      >
        <Search
          className="h-[18px] w-[18px]"
          strokeWidth={1.8}
          aria-hidden
        />
        {hasActiveSearch && !searchOpen && (
          <span className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-brand" />
        )}
      </button>

      {filtersOpen && (
        <div className="fixed left-4 right-4 top-[7.25rem] z-[70] max-h-[70vh] overflow-auto rounded-xl border border-line bg-white p-3 shadow-[0_18px_50px_rgba(15,23,42,0.18)] lg:absolute lg:left-0 lg:right-auto lg:top-full lg:mt-2 lg:w-80">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-ink">
              {t("filterToggle")}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-semibold text-muted underline-offset-4 hover:text-brand hover:underline"
              >
                {t("filterClear")}
              </button>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {EPISODE_CATEGORIES.map((category) => {
              const selected = selectedCategories.includes(category);
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => handleCategorySelect(category)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    selected
                      ? "bg-brand text-white"
                      : "bg-[#FDFBEE] text-muted ring-1 ring-gray-200 hover:text-brand hover:ring-line"
                  }`}
                >
                  {category === "All Categories"
                    ? t("allCategories")
                    : category}
                </button>
              );
            })}
          </div>
          {hasActiveFilters && (
            <p className="mt-3 text-xs font-medium text-muted">
              {t("selectedCategories", {
                tags: selectedCategories.join(", "),
                count: totalCount,
              })}
            </p>
          )}
        </div>
      )}

      {searchOpen && (
        <form
          role="search"
          aria-label={t("searchLabel")}
          onSubmit={submitSearch}
          autoComplete="off"
          className="fixed left-4 right-4 top-[7.25rem] z-[70] rounded-xl border border-line bg-white p-2 shadow-[0_18px_50px_rgba(15,23,42,0.18)] lg:absolute lg:left-0 lg:right-auto lg:top-full lg:mt-2 lg:w-80"
        >
          <div className="flex h-11 overflow-hidden rounded-full border border-line bg-white transition-colors focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100">
            <label htmlFor="episode-search" className="sr-only">
              {t("searchLabel")}
            </label>
            <input
              ref={searchInputRef}
              id="episode-search"
              name="episode-search-query"
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder={t("searchPlaceholder")}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent px-4 text-base font-medium text-ink outline-none placeholder:text-muted"
            />
            <button
              type="button"
              onClick={closeSearch}
              aria-label={t("searchClose")}
              className="inline-flex h-full w-11 shrink-0 items-center justify-center text-muted transition-colors hover:bg-gray-50 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-gray-500"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="submit"
              disabled={isLoading}
              aria-label={t("searchSubmit")}
              className="inline-flex h-full w-12 shrink-0 items-center justify-center border-l border-line text-ink transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-gray-500"
            >
              <Search className="h-5 w-5" strokeWidth={2.5} aria-hidden />
            </button>
          </div>
          {hasActiveSearch && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label={t("searchClear")}
              className="mt-2 inline-flex max-w-full items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-muted ring-1 ring-gray-200 hover:text-brand hover:ring-line"
            >
              <span className="max-w-64 truncate">
                {t("searchActive", { query: activeSearchQuery })}
              </span>
              <X className="h-3 w-3 shrink-0" aria-hidden />
            </button>
          )}
        </form>
      )}
    </div>
  );

  return (
    <main>
      {headerActionsRoot ? createPortal(headerActions, headerActionsRoot) : null}

      <h1 className="sr-only">{t("heroTitle")}</h1>

      <div
        id="episodes-list"
        className="px-5 py-6 md:px-6 md:py-8 bg-background"
      >
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <EpisodeGridSkeleton />
          ) : episodes.length === 0 ? (
            <div className="text-center py-10 md:py-8">
              <p className="text-muted">{t("empty")}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {episodes.map((episode) => (
                  <Link
                    key={episode.slug}
                    href={`/episodes/${episode.slug}`}
                    aria-label={t("viewEpisode", {
                      episode: episode.slug.toUpperCase(),
                    })}
                    className="group block rounded-xl"
                  >
                    <div className="h-full bg-white rounded-xl border border-line hover:border-brand/40 transition-colors overflow-hidden">
                      <div className="aspect-square relative bg-gray-100 overflow-hidden">
                        <Image
                          src={getCoverImageUrl(episode.cover_image)}
                          alt={episode.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover"
                        />
                      </div>

                      <div className="p-4 flex flex-col">
                        <p className="mb-2 text-xs font-semibold tracking-wider text-brand">{episode.slug.toUpperCase()}</p>
                        <h2 className="text-base font-semibold text-ink mb-4 line-clamp-2 leading-relaxed min-h-[52px]">
                          {episode.title}
                        </h2>

                        <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-line">
                          <div className="min-w-0 flex items-center gap-1.5 text-sm text-muted">
                            <Clock className="h-3 w-3 shrink-0" />
                            <span>{shortEpisodeDate(episode.date, locale) || t("timeTbd")}</span>
                          </div>

                          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand">
                            {t("detailsCta")}
                            <ArrowUpRight className="h-4 w-4" aria-hidden />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  className="mt-8 flex flex-col items-center gap-4 md:mt-6"
                  aria-label={t("paginationStatus", {
                    page: currentPage,
                    totalPages,
                  })}
                >
                  <p className="text-sm text-muted">
                    {t("paginationStatus", { page: currentPage, totalPages })}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage <= 1 || isLoading}
                      className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:border-line hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden />
                      {t("paginationPrev")}
                    </button>

                    <div className="flex flex-wrap items-center justify-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            type="button"
                            onClick={() => goToPage(page)}
                            disabled={isLoading}
                            aria-current={
                              page === currentPage ? "page" : undefined
                            }
                            aria-label={t("paginationPage", { page })}
                            className={`min-w-9 rounded-lg px-2.5 py-2 text-sm font-semibold transition-colors ${
                              page === currentPage
                                ? "bg-brand text-white"
                                : "border border-line bg-white text-gray-800 hover:border-line hover:text-brand"
                            } disabled:cursor-not-allowed disabled:opacity-50`}
                          >
                            {page}
                          </button>
                        ),
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage >= totalPages || isLoading}
                      className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:border-line hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {t("paginationNext")}
                      <ChevronRight className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </nav>
              )}
            </>
          )}
        </div>
      </div>

    </main>
  );
}

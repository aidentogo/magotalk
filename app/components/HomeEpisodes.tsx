"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import {
  Play,
  Clock,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useState, useEffect, useRef, type FormEvent } from "react";
import { useTranslations } from "next-intl";
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

type HomeEpisodesProps = {
  initialData: EpisodesPageResult;
};

export default function HomeEpisodes({ initialData }: HomeEpisodesProps) {
  const t = useTranslations("Home");
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
    `relative inline-flex shrink-0 items-center justify-center rounded-md px-1.5 py-1 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 md:text-base ${
      active
        ? "text-orange-500"
        : "text-gray-600 hover:text-gray-900"
    }`;

  const headerActions = (
    <div ref={headerActionsRef} className="relative flex items-center gap-1.5">
      <button
        type="button"
        onClick={toggleFilters}
        aria-expanded={filtersOpen}
        aria-label={t("filterToggle")}
        className={headerIconButtonClass(filtersOpen || hasActiveFilters)}
      >
        <SlidersHorizontal
          className="h-[1em] w-[1em] opacity-70"
          strokeWidth={1.7}
          aria-hidden
        />
        {hasActiveFilters && (
          <span className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-orange-500" />
        )}
      </button>

      <button
        type="button"
        onClick={openSearch}
        aria-expanded={searchOpen}
        aria-label={t("searchOpen")}
        className={headerIconButtonClass(searchOpen || hasActiveSearch)}
      >
        <Search
          className="h-[1em] w-[1em] opacity-70"
          strokeWidth={1.8}
          aria-hidden
        />
        {hasActiveSearch && !searchOpen && (
          <span className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-orange-500" />
        )}
      </button>

      {filtersOpen && (
        <div className="fixed left-4 right-4 top-[4.5rem] z-[70] max-h-[70vh] overflow-auto rounded-xl border border-gray-200 bg-white p-3 shadow-[0_18px_50px_rgba(15,23,42,0.18)] md:absolute md:left-auto md:right-0 md:top-full md:mt-2 md:w-80">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-gray-900">
              {t("filterToggle")}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-semibold text-gray-500 underline-offset-4 hover:text-orange-600 hover:underline"
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
                      ? "bg-orange-500 text-white"
                      : "bg-[#FDFBEE] text-gray-600 ring-1 ring-gray-200 hover:text-orange-600 hover:ring-orange-300"
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
            <p className="mt-3 text-xs font-medium text-gray-500">
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
          className="fixed left-4 right-4 top-[4.5rem] z-[70] rounded-xl border border-gray-200 bg-white p-2 shadow-[0_18px_50px_rgba(15,23,42,0.18)] md:absolute md:left-auto md:right-0 md:top-full md:mt-2 md:w-80"
        >
          <div className="flex h-11 overflow-hidden rounded-full border border-gray-300 bg-white transition-colors focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100">
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
              className="min-w-0 flex-1 bg-transparent px-4 text-base font-medium text-gray-900 outline-none placeholder:text-gray-500"
            />
            <button
              type="button"
              onClick={closeSearch}
              aria-label={t("searchClose")}
              className="inline-flex h-full w-11 shrink-0 items-center justify-center text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-gray-500"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="submit"
              disabled={isLoading}
              aria-label={t("searchSubmit")}
              className="inline-flex h-full w-12 shrink-0 items-center justify-center border-l border-gray-300 text-gray-950 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-gray-500"
            >
              <Search className="h-5 w-5" strokeWidth={2.5} aria-hidden />
            </button>
          </div>
          {hasActiveSearch && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label={t("searchClear")}
              className="mt-2 inline-flex max-w-full items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200 hover:text-orange-600 hover:ring-orange-200"
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
    <div>
      {headerActionsRoot ? createPortal(headerActions, headerActionsRoot) : null}

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 flex items-center min-h-[140px] md:min-h-[160px] lg:min-h-[180px]">
        <div className="max-w-7xl mx-auto w-full py-5 md:py-6 lg:py-7">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-3/5 lg:w-1/2 text-white text-center md:text-left">
              <h1 className="font-extrabold tracking-tight">
                <span className="block text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-none">
                  {t("heroTitle")}
                </span>
                <span className="block text-lg sm:text-xl md:text-3xl lg:text-4xl leading-tight mt-0.5 md:mt-1">
                  {t("heroSubtitle")}
                </span>
              </h1>
              <p className="mt-3 max-w-xl mx-auto md:mx-0 text-sm sm:text-base md:text-lg text-orange-50/95 leading-snug">
                {t("heroDescription")}
              </p>
            </div>

            <div className="flex w-full md:w-auto justify-center md:justify-end">
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/95 p-2 shadow-sm">
                  <Image
                    src="/icons/coins/btc.svg"
                    alt="Bitcoin"
                    width={32}
                    height={32}
                    className="block h-full w-full object-contain"
                  />
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/95 p-2 shadow-sm">
                  <Image
                    src="/icons/coins/eth.svg"
                    alt="Ethereum"
                    width={32}
                    height={32}
                    className="block h-full w-full object-contain"
                  />
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/95 p-2 shadow-sm">
                  <Image
                    src="/icons/coins/usdt.svg"
                    alt="Tether (USDT)"
                    width={32}
                    height={32}
                    className="block h-full w-full object-contain"
                  />
                </div>
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/95 p-2 shadow-sm">
                  <Image
                    src="/icons/coins/usdc.svg"
                    alt="USD Coin"
                    width={32}
                    height={32}
                    className="block h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="episodes-list"
        className="px-6 pt-4 pb-8 md:pt-5 md:pb-6 lg:pb-5 bg-[#FDFBEE]"
      >
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <EpisodeGridSkeleton />
          ) : episodes.length === 0 ? (
            <div className="text-center py-10 md:py-8">
              <p className="text-gray-600">{t("empty")}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-5 lg:gap-4">
                {episodes.map((episode) => (
                  <Link
                    key={episode.slug}
                    href={`/episodes/${episode.slug}`}
                    aria-label={t("viewEpisode", {
                      episode: episode.slug.toUpperCase(),
                    })}
                    className="group block"
                  >
                    <div className="bg-white rounded-xl md:rounded-lg shadow-md md:shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-0.5">
                      <div className="aspect-square relative bg-gray-100 overflow-hidden">
                        <Image
                          src={getCoverImageUrl(episode.cover_image)}
                          alt={episode.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="px-4 pt-1 pb-3 md:px-3 md:pt-1 md:pb-2.5 flex flex-col">
                        <h3 className="text-base md:text-sm font-semibold text-gray-900 mb-2 md:mb-1.5 line-clamp-2 leading-snug md:leading-snug min-h-[48px] md:min-h-[40px]">
                          {episode.title}
                        </h3>

                        <div className="grid grid-cols-[minmax(0,1fr)_2.5rem] items-center gap-2 mt-auto pt-0.5 md:pt-0.5 border-t border-gray-100">
                          <div className="min-w-0 flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3 shrink-0" />
                            <span className="min-w-0 truncate">
                              {episode.date || t("timeTbd")}
                            </span>
                          </div>

                          <div
                            className="size-10 shrink-0 rounded-full bg-orange-500 text-white transition-colors group-hover:bg-orange-600 flex items-center justify-center"
                            aria-hidden
                          >
                            <Play className="ml-0.5 size-[17px]" />
                          </div>
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
                  <p className="text-sm text-gray-600">
                    {t("paginationStatus", { page: currentPage, totalPages })}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage <= 1 || isLoading}
                      className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
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
                                ? "bg-orange-500 text-white"
                                : "border border-gray-200 bg-white text-gray-800 hover:border-orange-300 hover:text-orange-600"
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
                      className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
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

    </div>
  );
}

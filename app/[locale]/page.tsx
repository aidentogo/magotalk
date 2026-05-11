"use client";

import Image from "next/image";
import { Play, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { contactEmail, contactEmailHref } from "@/lib/contact";
import { getEpisodes, getCoverImageUrl, type Episode } from "@/lib/supabase";

const categories = [
  "All Categories",
  "Bitcoin",
  "Ethereum",
  "DeFi",
  "Solana",
  "Avalanche",
  "Polygon",
  "Cardano",
  "NFT",
  "Layer 2",
  "MEME",
  "Lending",
  "Stablecoins",
  "GameFi",
  "SocialFi",
  "RWA",
  "DAO",
  "Wallets",
  "Chainlink",
  "Privacy",
  "Web3",
  "Regulation",
  "Cross-Chain",
  "Metaverse",
  "Staking",
  "Yield Farming",
  "BNB Chain",
];

export default function HomePage() {
  const t = useTranslations("Home");
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All Categories",
  ]);

  useEffect(() => {
    async function fetchEpisodes() {
      try {
        const data = await getEpisodes();
        setEpisodes(data);
      } catch (error) {
        console.error("Failed to load episodes:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEpisodes();
  }, []);

  const handleCategorySelect = (category: string) => {
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

  const filteredEpisodes = episodes.filter((episode) => {
    if (!selectedCategories.includes("All Categories")) {
      const hasMatchingTag =
        episode.tags &&
        episode.tags.some((tag) => selectedCategories.includes(tag));
      if (!hasMatchingTag) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FDFBEE]">
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

      <div className="hidden md:block px-6 pt-4 pb-2 md:pt-4 md:pb-2 lg:pt-3 lg:pb-2 bg-[#FDFBEE]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategories.includes(category)
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {selectedCategories.length > 0 &&
            !selectedCategories.includes("All Categories") && (
              <div className="mt-2 text-sm text-gray-600">
                {t("selectedCategories", {
                  tags: selectedCategories.join(", "),
                  count: filteredEpisodes.length,
                })}
              </div>
            )}
        </div>
      </div>

      <div className="px-6 pt-2 pb-8 md:pt-2 md:pb-6 lg:pt-2 lg:pb-5 bg-[#FDFBEE]">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="text-center py-10 md:py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
              <p className="mt-4 text-gray-600">{t("loading")}</p>
            </div>
          ) : filteredEpisodes.length === 0 ? (
            <div className="text-center py-10 md:py-8">
              <p className="text-gray-600">{t("empty")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-5 lg:gap-4">
              {filteredEpisodes.map((episode) => (
                <Link
                  key={episode.slug}
                  href={`/episodes/${episode.slug}`}
                  className="block"
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
                      <h3 className="text-base md:text-sm font-semibold text-gray-900 mb-1 md:mb-0.5 line-clamp-2 leading-snug md:leading-snug min-h-[48px] md:min-h-[40px]">
                        {episode.title}
                      </h3>

                      {episode.tags && episode.tags.length > 0 && (
                        <div className="flex w-full justify-start items-center text-left flex-nowrap overflow-hidden whitespace-nowrap gap-1 md:gap-0.5 mt-0 mb-1 md:mb-0.5 min-h-[24px]">
                          {episode.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="pl-0 pr-1.5 md:pr-1 py-0.5 md:py-0.5 bg-gray-100 md:bg-transparent text-gray-500 md:text-gray-400 text-xs leading-none shrink-0"
                            >
                              {tag}
                            </span>
                          ))}
                          {episode.tags.length > 3 && (
                            <span className="pl-0 pr-1.5 md:pr-1 py-0.5 md:py-0.5 bg-gray-100 md:bg-transparent text-gray-400 text-xs leading-none shrink-0">
                              +{episode.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-auto pt-0.5 md:pt-0.5 border-t border-gray-100">
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span className="truncate">
                            {episode.date || t("timeTbd")}
                          </span>
                        </div>

                        <div className="w-6 h-6 md:w-6 md:h-6 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center text-white transition-colors">
                          <Play className="w-3 h-3 md:w-2.5 md:h-2.5 ml-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="bg-[#FDFBEE] border-t border-gray-200 py-6 md:py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-3">
          <p className="text-sm text-gray-500">
            {t("footerCopyright", { year: new Date().getFullYear() })}
          </p>
          <a
            href={contactEmailHref}
            className="text-sm font-medium text-gray-700 underline-offset-4 hover:text-orange-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            {contactEmail}
          </a>
        </div>
      </footer>
    </div>
  );
}

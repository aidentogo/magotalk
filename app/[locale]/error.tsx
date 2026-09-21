"use client";

import { useTranslations } from "next-intl";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <h1 className="text-3xl font-bold text-red-600 mb-4">{t("title")}</h1>
      <p className="text-muted mb-2 max-w-md">{error.message}</p>
      <p className="text-sm text-muted mb-6">{t("hint")}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="px-4 py-2 rounded-lg bg-brand text-white font-medium hover:bg-brand transition-colors"
      >
        {t("retry")}
      </button>
    </div>
  );
}

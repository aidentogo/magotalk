"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { localeNativeLabels, type AppLocale } from "@/i18n/localeDisplay";
import { routing } from "@/i18n/routing";

type LocaleSwitcherProps = {
  showLabel?: boolean;
};

export default function LocaleSwitcher({
  showLabel = false,
}: LocaleSwitcherProps) {
  const t = useTranslations("Nav");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const details = detailsRef.current;
      if (!details || !details.open) return;
      if (!details.contains(event.target as Node)) {
        details.open = false;
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <details ref={detailsRef} className="group relative">
      <summary
        className={`list-none cursor-pointer items-center gap-2 rounded-full text-sm font-semibold text-[#315E5B] transition-colors hover:bg-[#57B4BA]/10 hover:text-[#015551] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FE4F2D] group-open:text-[#FE4F2D] ${
          showLabel
            ? "inline-flex min-h-9 px-3 py-2"
            : "inline-flex h-9 w-9 justify-center"
        }`}
        aria-label={t("language")}
      >
        <Globe
          className="h-4 w-4 shrink-0"
          strokeWidth={1.8}
          aria-hidden
        />
        {showLabel ? <span>{t("language")}</span> : null}
      </summary>
      <div
        role="listbox"
        aria-label={t("language")}
        className="absolute right-0 z-[60] mt-1.5 min-w-[11rem] overflow-hidden rounded-xl border border-[#315E5B]/10 bg-[#FFFDF4] py-1 shadow-[0_14px_36px_rgba(1,85,81,0.16)]"
      >
        {routing.locales.map((l) => {
          const active = l === locale;
          return (
            <Link
              key={l}
              href={pathname}
              locale={l}
              prefetch={false}
              role="option"
              aria-selected={active}
              className={`flex w-full items-center px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                active
                  ? "bg-[#FE4F2D]/10 text-[#D83D1E]"
                  : "text-[#315E5B] hover:bg-[#57B4BA]/10 hover:text-[#015551]"
              }`}
            >
              {localeNativeLabels[l]}
            </Link>
          );
        })}
      </div>
    </details>
  );
}

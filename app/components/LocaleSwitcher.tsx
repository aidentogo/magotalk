"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { localeNativeLabels, type AppLocale } from "@/i18n/localeDisplay";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
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
        className="list-none cursor-pointer inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 text-sm md:text-base text-gray-600 transition-colors hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 group-open:text-orange-500"
        aria-label={t("language")}
      >
        <Globe
          className="h-[1em] w-[1em] shrink-0 opacity-70"
          strokeWidth={1.5}
          aria-hidden
        />
      </summary>
      <div
        role="listbox"
        aria-label={t("language")}
        className="absolute right-0 z-[60] mt-1.5 min-w-[11rem] overflow-hidden rounded-lg border border-gray-200/90 bg-white py-1 shadow-md"
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
                  ? "bg-orange-50 text-orange-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
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

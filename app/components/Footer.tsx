"use client";

import { useTranslations } from "next-intl";
import XIcon from "@/app/components/XIcon";
import { contactEmail, xHandle, xProfileUrl } from "@/lib/contact";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="mt-auto border-t border-gray-200 bg-[#FDFBEE] px-6 py-6 md:py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-3">
        <p className="text-sm text-gray-500">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span className="text-sm font-medium text-gray-700">
            {contactEmail}
          </span>
          <a
            href={xProfileUrl}
            aria-label={`Open ${xHandle} on X`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 underline-offset-4 transition-colors hover:text-orange-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            <XIcon className="h-3.5 w-3.5 shrink-0" />
            <span>{xHandle}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

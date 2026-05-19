"use client";

import { useTranslations } from "next-intl";
import { contactEmail, contactEmailHref } from "@/lib/contact";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="mt-auto border-t border-gray-200 bg-[#FDFBEE] px-6 py-6 md:py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-3">
        <p className="text-sm text-gray-500">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
        <a
          href={contactEmailHref}
          className="text-sm font-medium text-gray-700 underline-offset-4 transition-colors hover:text-orange-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          {contactEmail}
        </a>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/app/components/LocaleSwitcher";

export default function Nav() {
  const pathname = usePathname();
  const t = useTranslations("Nav");

  return (
    <nav className="bg-[#FDFBEE] border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo-magotalk.svg"
            alt="MagoTalk Logo"
            width={120}
            height={40}
            className="object-contain h-auto"
          />
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
          <div className="flex items-center space-x-3 md:space-x-8 text-sm md:text-base">
            <Link
              href="/"
              className={`transition-colors whitespace-nowrap ${
                pathname === "/"
                  ? "text-orange-500 font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t("home")}
            </Link>
            <Link
              href="/books"
              className={`transition-colors whitespace-nowrap ${
                pathname === "/books"
                  ? "text-orange-500 font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t("books")}
            </Link>
            <Link
              href="/about"
              className={`transition-colors whitespace-nowrap ${
                pathname === "/about"
                  ? "text-orange-500 font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t("about")}
            </Link>
            <Link
              href="/contact"
              className={`transition-colors whitespace-nowrap ${
                pathname === "/contact"
                  ? "text-orange-500 font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t("contact")}
            </Link>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}

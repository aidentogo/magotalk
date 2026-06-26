"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LocaleSwitcher from "@/app/components/LocaleSwitcher";

const navLinks = [
  { href: "/", key: "home" as const },
  { href: "/books", key: "books" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

export default function Nav() {
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClass = (href: string) =>
    `block rounded-lg px-3 py-2.5 text-base font-medium transition-colors md:inline-block md:px-0 md:py-0 md:text-sm lg:text-base ${
      pathname === href
        ? "bg-orange-50 text-orange-600 md:bg-transparent md:font-bold"
        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 md:text-gray-600 md:hover:bg-transparent md:hover:text-gray-900"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/55 bg-[#FDFBEE]/78 px-4 py-3 shadow-[0_1px_0_rgba(23,23,23,0.06)] backdrop-blur-xl backdrop-saturate-150 md:border-gray-200/70 md:bg-[#FDFBEE]/86 md:px-6 md:py-4">
      <div className="relative z-50 mx-auto flex max-w-7xl items-center justify-between gap-3">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo-magotalk.svg"
            alt="MagoTalk Logo"
            width={120}
            height={40}
            className="h-auto object-contain"
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-6 lg:gap-8">
            {navLinks.map(({ href, key }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                {t(key)}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div
            id="home-header-actions"
            className="flex items-center gap-1.5 empty:hidden md:gap-2"
          />
          <LocaleSwitcher />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/70 bg-white/58 text-gray-800 shadow-[0_4px_18px_rgba(15,23,42,0.14)] backdrop-blur-xl transition-colors hover:border-orange-300/70 hover:bg-white/78 hover:text-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 md:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? t("menuClose") : t("menuOpen")}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px] md:hidden"
            aria-label={t("menuClose")}
            onClick={() => setMenuOpen(false)}
          />
          <div
            id={menuId}
            className="relative z-50 mt-3 overflow-hidden rounded-lg border border-white/60 bg-[#FDFBEE]/88 px-2 py-2 shadow-[0_18px_50px_rgba(15,23,42,0.16)] backdrop-blur-2xl backdrop-saturate-150 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map(({ href, key }) => (
                <Link
                  key={href}
                  href={href}
                  className={linkClass(href)}
                  onClick={() => setMenuOpen(false)}
                >
                  {t(key)}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

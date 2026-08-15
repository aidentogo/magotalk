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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 8);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

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

  const isActiveLink = (href: string) =>
    href === "/"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  const navLinkClass = (href: string) => {
    const isActive = isActiveLink(href);
    return `relative flex h-8 items-center whitespace-nowrap px-3 text-xs font-semibold transition-colors lg:h-10 lg:px-5 lg:text-sm ${
      isActive
        ? "text-[#FE4F2D] after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:rounded-full after:bg-[#FE4F2D] lg:after:inset-x-4"
        : "text-[#315E5B]/75 hover:text-[#015551]"
    }`;
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-[#FDFBEE]/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled
          ? "shadow-[0_4px_12px_rgba(1,85,81,0.12)]"
          : "shadow-[0_1px_2px_rgba(1,85,81,0.07)]"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-3 sm:px-4 lg:px-6">
        <div className="grid h-[60px] grid-cols-[1fr_auto_1fr] items-center lg:h-[76px]">
          <div className="flex min-w-0 items-center justify-start">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#163F3C] transition-colors hover:bg-[#57B4BA]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FE4F2D] lg:hidden"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? t("menuClose") : t("menuOpen")}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X className="h-5 w-5" strokeWidth={2} aria-hidden />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={2} aria-hidden />
              )}
            </button>
          </div>

          <Link
            href="/"
            className="col-start-2 flex items-center justify-center transition-opacity hover:opacity-80 focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FE4F2D]"
          >
            <Image
              src="/logo-magotalk.svg"
              alt="MagoTalk"
              width={208}
              height={69}
              priority
              className="h-auto w-[180px] object-contain sm:w-[190px] lg:w-[208px]"
            />
          </Link>

          <div className="flex min-w-0 items-center justify-end">
            <div className="hidden lg:block">
              <LocaleSwitcher />
            </div>
          </div>
        </div>

        <nav
          className="flex h-[38px] items-center justify-center gap-0.5 overflow-x-auto lg:h-[42px] lg:gap-1"
          aria-label={t("mainNavigation")}
        >
          {navLinks.map(({ href, key }) => {
            const active = isActiveLink(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={navLinkClass(href)}
              >
                {t(key)}
              </Link>
            );
          })}
          <div
            id="home-header-actions"
            className="flex h-9 items-center empty:hidden lg:h-10"
          />
        </nav>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 top-[98px] z-40 bg-[#163F3C]/10 backdrop-blur-[1px] lg:hidden"
            aria-label={t("menuClose")}
            onClick={() => setMenuOpen(false)}
          />
          <div
            id={menuId}
            className="absolute left-3 right-3 top-[60px] z-50 overflow-hidden rounded-2xl border border-[#315E5B]/10 bg-[#FDFBEE]/98 p-2 shadow-[0_18px_50px_rgba(1,85,81,0.18)] backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map(({ href, key }) => {
                const active = isActiveLink(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-[#FE4F2D]/10 text-[#FE4F2D]"
                        : "text-[#315E5B] hover:bg-[#57B4BA]/10 hover:text-[#015551]"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t(key)}
                  </Link>
                );
              })}
            </div>
            <div className="mt-2 flex items-center justify-end border-t border-[#315E5B]/10 px-2 pt-2">
              <LocaleSwitcher showLabel />
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}

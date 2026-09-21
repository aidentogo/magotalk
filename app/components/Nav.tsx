"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LocaleSwitcher from "@/app/components/LocaleSwitcher";

const navLinks = [
  { href: "/", key: "home" as const },
  { href: "/news", key: "news" as const },
  { href: "/books", key: "books" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

export default function Nav() {
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 8);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur-md ${scrolled ? "shadow-sm" : ""}`}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6">
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-[72px]">
          <div id="home-header-actions" className="flex min-w-0 items-center" />
          <Link href="/" className="col-start-2 flex items-center justify-center rounded-md hover:opacity-80">
            <Image src="/logo-magotalk.svg" alt="MagoTalk" width={248} height={83} priority className="h-auto w-[180px] object-contain md:w-[220px]" />
          </Link>
          <div className="flex min-w-0 justify-end"><LocaleSwitcher /></div>
        </div>
        <div className="flex min-h-11 items-center justify-center">
          <nav className="flex min-w-0 items-center overflow-x-auto" aria-label={t("mainNavigation")}>
            {navLinks.map(({ href, key }) => {
              const active = href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link key={href} href={href} aria-current={active ? "page" : undefined}
                  className={`relative flex min-h-11 shrink-0 items-center whitespace-nowrap px-2 text-sm font-semibold sm:px-4 lg:px-5 ${active ? "text-accent after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-accent" : "text-muted hover:text-brand"}`}>
                  {t(key)}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

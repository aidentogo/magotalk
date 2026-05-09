import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

type AppLocale = (typeof routing.locales)[number];

const intlMiddleware = createMiddleware(routing);

function hasLocalePrefix(pathname: string) {
  return routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

function parseAcceptLanguage(header: string | null) {
  if (!header) return [];

  return header
    .split(",")
    .map((part, index) => {
      const [languageRange, ...params] = part.trim().split(";");
      const qParam = params.find((param) => param.trim().startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.split("=")[1]) : 1;

      return {
        languageRange: languageRange.toLowerCase(),
        q: Number.isFinite(q) ? q : 0,
        index,
      };
    })
    .filter(({ languageRange, q }) => languageRange && languageRange !== "*" && q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);
}

function getLocaleFromAcceptLanguage(header: string | null): AppLocale {
  for (const { languageRange } of parseAcceptLanguage(header)) {
    if (languageRange === "zh-hant" || languageRange.startsWith("zh-hant-")) {
      return "zh-Hant";
    }

    if (["zh-tw", "zh-hk", "zh-mo"].includes(languageRange)) {
      return "zh-Hant";
    }

    if (languageRange === "zh-hans" || languageRange.startsWith("zh-hans-")) {
      return "zh-Hans";
    }

    if (["zh-cn", "zh-sg", "zh-my"].includes(languageRange)) {
      return "zh-Hans";
    }

    if (languageRange === "zh" || languageRange.startsWith("zh-")) {
      return "zh-Hans";
    }

    if (languageRange === "en" || languageRange.startsWith("en-")) {
      return "en";
    }
  }

  return routing.defaultLocale;
}

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!hasLocalePrefix(pathname)) {
    const locale = getLocaleFromAcceptLanguage(request.headers.get("accept-language"));
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

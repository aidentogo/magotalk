import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

type AppLocale = (typeof routing.locales)[number];

function isAppLocale(locale: string): locale is AppLocale {
  return routing.locales.includes(locale as AppLocale);
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const appLocale = isAppLocale(locale) ? locale : routing.defaultLocale;
  const t = await getTranslations({ locale: appLocale, namespace: "metadata" });

  const ogLocaleMap: Record<AppLocale, string> = {
    en: "en_US",
    "zh-Hans": "zh_Hans",
    "zh-Hant": "zh_Hant",
  };
  const ogLocale = ogLocaleMap[appLocale];

  return {
    title: t("title"),
    description: t("description"),
    authors: [{ name: "MAGO" }],
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      type: "website",
      locale: ogLocale,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-screen flex-col bg-[#FDFBEE] text-gray-900">
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}

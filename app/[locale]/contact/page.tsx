import { Mail } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import XIcon from "@/app/components/XIcon";
import {
  contactEmail,
  contactEmailHref,
  xHandle,
  xProfileUrl,
} from "@/lib/contact";

type AppLocale = (typeof routing.locales)[number];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);
  const t = await getTranslations("Contact");

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 md:py-16">
      <h1 className="text-4xl font-bold tracking-tight text-ink md:text-5xl">{t("title")}</h1>
      <div className="mt-10 divide-y divide-line border-t border-line">
        <a href={contactEmailHref} className="flex items-center gap-4 py-5 hover:text-brand-strong">
          <Mail className="h-5 w-5 shrink-0 text-brand" strokeWidth={2} aria-hidden />
          <span className="min-w-0">
            <span className="block text-sm text-muted">{t("emailLabel")}</span>
            <span className="mt-1 block break-all text-lg font-semibold text-ink">{contactEmail}</span>
          </span>
        </a>
        <a href={xProfileUrl} className="flex items-center gap-4 py-5 hover:text-brand-strong">
          <XIcon className="h-4 w-4 shrink-0 text-ink" />
          <span className="min-w-0">
            <span className="block text-sm text-muted">{t("xLabel")}</span>
            <span className="mt-1 block text-lg font-semibold text-ink">{xHandle}</span>
          </span>
        </a>
      </div>
    </main>
  );
}

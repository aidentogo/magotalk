import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function LocaleNotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-[#FDFBEE]">
      <h1 className="text-2xl font-bold text-ink mb-3">{t("title")}</h1>
      <p className="text-muted mb-8 max-w-md">{t("body")}</p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-lg bg-brand text-white font-medium hover:bg-brand transition-colors"
      >
        {t("homeLink")}
      </Link>
    </div>
  );
}

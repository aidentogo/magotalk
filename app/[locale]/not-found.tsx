import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function LocaleNotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-[#FDFBEE]">
      <h1 className="text-2xl font-bold text-gray-900 mb-3">{t("title")}</h1>
      <p className="text-gray-600 mb-8 max-w-md">{t("body")}</p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
      >
        {t("homeLink")}
      </Link>
    </div>
  );
}

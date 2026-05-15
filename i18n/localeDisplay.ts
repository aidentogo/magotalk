import { routing } from "./routing";

export type AppLocale = (typeof routing.locales)[number];

/** Native-language labels for the locale menu (shown in the globe dropdown). */
export const localeNativeLabels: Record<AppLocale, string> = {
  en: "English",
  "zh-Hans": "简体",
  "zh-Hant": "繁體",
};

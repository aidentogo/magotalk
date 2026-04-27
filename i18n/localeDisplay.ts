import { routing } from "./routing";

export type AppLocale = (typeof routing.locales)[number];

/** Native-language labels for the locale menu (shown in the globe dropdown). */
export const localeNativeLabels: Record<AppLocale, string> = {
  en: "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  ja: "日本語",
  ko: "한국어",
  es: "Español",
  fr: "Français",
};

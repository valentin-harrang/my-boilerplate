import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { DEFAULT_LOCALE } from "@/constants/i18n";
import { Locale } from "@/types/i18n";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (
      await (locale === DEFAULT_LOCALE
        ? import("../../messages/fr.json")
        : import(`../../messages/${locale}.json`))
    ).default,
  };
});

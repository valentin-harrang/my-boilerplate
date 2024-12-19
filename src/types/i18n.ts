import { AVAILABLE_LOCALES } from "@/constants/i18n";

export type Locale = (typeof AVAILABLE_LOCALES)[number];
export enum LocaleEnum {
  EN = "en",
  FR = "fr",
}

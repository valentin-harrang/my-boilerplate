import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from "@/constants/i18n";
import { PATHNAMES } from "@/constants/routing";

export const routing = defineRouting({
  locales: AVAILABLE_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  pathnames: PATHNAMES,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

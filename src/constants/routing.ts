import { LocaleEnum } from "@/types/i18n";

export const PATHNAMES = {
  "/": {
    [LocaleEnum.EN]: "/",
    [LocaleEnum.FR]: "/",
  },
  "/a-propos": {
    [LocaleEnum.EN]: "/about",
    [LocaleEnum.FR]: "/a-propos",
  },
  "/connexion": {
    [LocaleEnum.EN]: "/sign-in",
    [LocaleEnum.FR]: "/connexion",
  },
  "/inscription": {
    [LocaleEnum.EN]: "/sign-up",
    [LocaleEnum.FR]: "/inscription",
  },
  "/parametres": {
    [LocaleEnum.EN]: "/settings",
    [LocaleEnum.FR]: "/parametres",
  },
  "/reinitialisation-mot-de-passe": {
    [LocaleEnum.EN]: "/reset-password",
    [LocaleEnum.FR]: "/reinitialisation-mot-de-passe",
  },
  "/tableau-de-bord": {
    [LocaleEnum.EN]: "/dashboard",
    [LocaleEnum.FR]: "/tableau-de-bord",
  },
  "/mot-de-passe-oublie": {
    [LocaleEnum.EN]: "/forgot-password",
    [LocaleEnum.FR]: "/mot-de-passe-oublie",
  },
  "/fonctionnalites": {
    [LocaleEnum.EN]: "/features",
    [LocaleEnum.FR]: "/fonctionnalites",
  },
};

export const FORBIDDEN_PATHNAMES_FOR_AUTHENTICATED_USERS = {
  [LocaleEnum.FR]: ["/", "/connexion", "/inscription", "/mot-de-passe-oublie"],
  [LocaleEnum.EN]: ["/", "/sign-in", "/sign-up", "/forgot-password"],
};

export const ROUTES = {
  DASHBOARD: "/tableau-de-bord",
  HOME: "/",
  SIGN_IN: "/connexion",
  PASSWORD_FORGOTTEN: "/mot-de-passe-oublie",
  SIGN_UP: "/inscription",
  RESET_PASSWORD: "/reinitialisation-du-mot-de-passe",
};

export const PROTECTED_ROUTES = [ROUTES.DASHBOARD, ROUTES.RESET_PASSWORD];

export const DEFAULT_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";
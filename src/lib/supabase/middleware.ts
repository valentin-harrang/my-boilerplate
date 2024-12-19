import { DEFAULT_LOCALE } from "@/constants/i18n";
import { FORBIDDEN_PATHNAMES_FOR_AUTHENTICATED_USERS } from "@/constants/routing";
import { Locale } from "@/types/i18n";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

// Create a Supabase client
function createSupabaseClient(request: NextRequest, response: NextResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );
}

// Extract the locale from the pathname
function extractLocaleFromPathname(pathname: string): string {
  const segments = pathname.split("/");
  return segments[1] || DEFAULT_LOCALE;
}

// Remove the locale from the pathname
function stripLocaleFromPathname(pathname: string, locale: string): string {
  const stripped = pathname.replace(`/${locale}`, "");
  return stripped === "/" ? "" : stripped; // Normalize `/{locale}` to `""` for easier handling
}

// Check if the route is forbidden for authenticated users
function isForbiddenRoute(locale: string, strippedPathname: string): boolean {
  const forbiddenRoutes =
    FORBIDDEN_PATHNAMES_FOR_AUTHENTICATED_USERS[locale as Locale] || [];

  // Explicitly check for the homepage
  if (strippedPathname === "" && forbiddenRoutes.includes("/")) {
    return true;
  }

  return forbiddenRoutes.includes(strippedPathname);
}

// Update session and redirect if necessary
export async function updateSession(
  request: NextRequest,
  response: NextResponse,
): Promise<NextResponse> {
  const supabase = createSupabaseClient(request, response);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const pathname = request.nextUrl.pathname;
    const locale = extractLocaleFromPathname(pathname);
    const strippedPathname = stripLocaleFromPathname(pathname, locale);

    if (isForbiddenRoute(locale, strippedPathname)) {
      return NextResponse.redirect(
        new URL(`/${locale}/tableau-de-bord`, request.url),
      );
    }
  }

  return response;
}

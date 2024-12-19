import { type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);

  return await updateSession(request, response);
}

export const config = {
  matcher: ["/", "/(fr|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};

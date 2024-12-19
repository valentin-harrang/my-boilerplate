import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { getLocale } from "next-intl/server";
import { Locale } from "@/types/i18n";
import { PATHNAMES } from "@/constants/routing";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();
  const locale = (await getLocale()) as Locale;

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  if (redirectTo) {
    return NextResponse.redirect(
      `${origin}${PATHNAMES[redirectTo as keyof typeof PATHNAMES][locale]}`,
    );
  }

  return NextResponse.redirect(
    `${origin}${PATHNAMES["/tableau-de-bord"][locale]}`,
  );
}

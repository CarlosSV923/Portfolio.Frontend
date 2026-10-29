import { NextResponse, type NextRequest } from "next/server";

import { isLanguage, languageCookie, matchLanguage } from "@/i18n/config";

// Sends "/" to the saved language, or to the browser's preferred one.
export function proxy(request: NextRequest) {
  const saved = request.cookies.get(languageCookie)?.value;
  const language =
    saved && isLanguage(saved)
      ? saved
      : matchLanguage(request.headers.get("accept-language"));

  return NextResponse.redirect(new URL(`/${language}`, request.url));
}

export const config = {
  matcher: "/",
};

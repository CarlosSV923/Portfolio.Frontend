"use client";
import { useEffect, useState } from "react";
import { faviconId, faviconPaths } from "@/constants/favicon";
import { storageKeys, darkModeQuery } from "@/constants/preferences";
import type { Language, Theme } from "@/types/portfolio";
export function usePreferences() {
  const [language, setLanguage] = useState<Language>("es");
  const [theme, setTheme] = useState<Theme>("system");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const l = localStorage.getItem(storageKeys.language);
      const th = localStorage.getItem(storageKeys.theme);
      if (l === "es" || l === "en") setLanguage(l);
      if (th === "light" || th === "dark" || th === "system") setTheme(th);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const media = matchMedia(darkModeQuery);
    const apply = () => {
      const activeTheme =
        theme === "system" ? (media.matches ? "dark" : "light") : theme;
      document.documentElement.dataset.theme = activeTheme;
      document
        .getElementById(faviconId)
        ?.setAttribute("href", faviconPaths[activeTheme]);
    };
    apply();
    try {
      localStorage.setItem(storageKeys.theme, theme);
    } catch {}
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme, ready]);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = language;
    try {
      localStorage.setItem(storageKeys.language, language);
    } catch {}
  }, [language, ready]);

  return { language, theme, setLanguage, setTheme };
}

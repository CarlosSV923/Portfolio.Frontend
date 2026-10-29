export const languages = ["es", "en"] as const;
export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "es";

// Remembers the visitor's choice so "/" redirects to the same language.
export const languageCookie = "portfolio-language";

export const ogLocales: Record<Language, string> = {
  es: "es_EC",
  en: "en_US",
};

export function isLanguage(value: string): value is Language {
  return (languages as readonly string[]).includes(value);
}

export function otherLanguage(language: Language): Language {
  return language === "es" ? "en" : "es";
}

/**
 * Picks the first supported language from an Accept-Language header,
 * ignoring regions ("en-US" matches "en") and honoring q-weights.
 */
export function matchLanguage(acceptLanguage: string | null): Language {
  const preferred = (acceptLanguage ?? "")
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((param) => param.trim().startsWith("q="));
      return {
        base: tag.toLowerCase().split("-")[0],
        weight: q ? Number(q.trim().slice(2)) : 1,
      };
    })
    .filter(({ weight }) => weight > 0)
    .sort((a, b) => b.weight - a.weight);

  return preferred.map(({ base }) => base).find(isLanguage) ?? defaultLanguage;
}

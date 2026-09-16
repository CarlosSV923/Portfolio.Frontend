export const languages = ["es", "en"] as const;
export const themes = ["light", "dark", "system"] as const;
export const storageKeys = {
  language: "portfolio-language",
  theme: "portfolio-theme",
} as const;
export const darkModeQuery = "(prefers-color-scheme: dark)";

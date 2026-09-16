import { darkModeQuery, storageKeys } from "./preferences";

// Apply saved preferences before the first paint to avoid a theme flash.
export const themeScript = `
  try {
    const theme = localStorage.getItem('${storageKeys.theme}') || 'system';
    const systemTheme = matchMedia('${darkModeQuery}').matches ? 'dark' : 'light';

    document.documentElement.dataset.theme = theme === 'system' ? systemTheme : theme;
    document.documentElement.lang = localStorage.getItem('${storageKeys.language}') || 'es';
  } catch {}
`;

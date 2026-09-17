import { faviconId, faviconPaths } from "./favicon";
import { darkModeQuery, storageKeys } from "./preferences";

// Apply saved preferences before the first paint to avoid a theme flash.
export const themeScript = `
  try {
    const theme = localStorage.getItem('${storageKeys.theme}') || 'system';
    const systemTheme = matchMedia('${darkModeQuery}').matches ? 'dark' : 'light';

    const activeTheme = theme === 'system' ? systemTheme : theme;
    document.documentElement.dataset.theme = activeTheme;
    const favicon = document.getElementById('${faviconId}');
    if (favicon) favicon.setAttribute('href', activeTheme === 'light' ? '${faviconPaths.light}' : '${faviconPaths.dark}');
    document.documentElement.lang = localStorage.getItem('${storageKeys.language}') || 'es';
  } catch {}
`;

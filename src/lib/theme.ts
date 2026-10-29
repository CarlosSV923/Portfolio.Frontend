import { faviconId, faviconPaths } from "@/constants/favicon";

export const themes = ["light", "dark", "system"] as const;
type Theme = (typeof themes)[number];

export const themeStorageKey = "portfolio-theme";
export const darkModeQuery = "(prefers-color-scheme: dark)";

const changeEvent = "portfolio-theme-change";

function isTheme(value: string | null): value is Theme {
  return themes.includes(value as Theme);
}

export function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(themeStorageKey);
    return isTheme(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

/** Applies a preference to <html> and the favicon. */
export function applyTheme(theme: Theme) {
  const active =
    theme === "system"
      ? matchMedia(darkModeQuery).matches
        ? "dark"
        : "light"
      : theme;

  document.documentElement.dataset.theme = active;
  document
    .getElementById(faviconId)
    ?.setAttribute("href", faviconPaths[active]);
}

export function setStoredTheme(theme: Theme) {
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {}
  applyTheme(theme);
  window.dispatchEvent(new Event(changeEvent));
}

/** Notifies on preference changes from this tab, other tabs, or the OS. */
export function subscribeToTheme(onChange: () => void) {
  const media = matchMedia(darkModeQuery);
  const onSystemChange = () => {
    if (getStoredTheme() === "system") applyTheme("system");
    onChange();
  };

  window.addEventListener(changeEvent, onChange);
  window.addEventListener("storage", onChange);
  media.addEventListener("change", onSystemChange);

  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("storage", onChange);
    media.removeEventListener("change", onSystemChange);
  };
}

/** Runs in <head> before the first paint, so the saved theme never flashes. */
export const themeScript = `(function(){try{
  var t = localStorage.getItem(${JSON.stringify(themeStorageKey)});
  if (t !== "light" && t !== "dark") t = matchMedia(${JSON.stringify(darkModeQuery)}).matches ? "dark" : "light";
  document.documentElement.dataset.theme = t;
  var f = document.getElementById(${JSON.stringify(faviconId)});
  if (f) f.setAttribute("href", t === "light" ? ${JSON.stringify(faviconPaths.light)} : ${JSON.stringify(faviconPaths.dark)});
}catch(e){}})()`;

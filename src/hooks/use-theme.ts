"use client";

import { useSyncExternalStore } from "react";

import { getStoredTheme, setStoredTheme, subscribeToTheme } from "@/lib/theme";
import type { Theme } from "@/types/portfolio";

// The server cannot read localStorage; "system" matches the default render.
const getServerTheme = (): Theme => "system";

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getStoredTheme,
    getServerTheme,
  );

  return { theme, setTheme: setStoredTheme };
}

"use client";

import { useEffect, useEffectEvent } from "react";

/** The games need a keyboard and a wide stage. */
export const gameScreenQuery = "(min-width: 900px)";

/** Calls `onHidden` when the tab is hidden or the window loses focus. */
export function usePauseWhenHidden(onHidden: () => void, active = true) {
  const pause = useEffectEvent(onHidden);

  useEffect(() => {
    if (!active) return;
    const pauseWhenHidden = () => {
      if (document.visibilityState === "hidden" || !document.hasFocus()) {
        pause();
      }
    };

    window.addEventListener("blur", pauseWhenHidden);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      window.removeEventListener("blur", pauseWhenHidden);
      document.removeEventListener("visibilitychange", pauseWhenHidden);
    };
  }, [active]);
}

/** Leaves the game if the screen is, or becomes, too small to play. */
export function useExitOnSmallScreen(onExit: () => void) {
  const exit = useEffectEvent(onExit);

  useEffect(() => {
    const mediaQuery = window.matchMedia(gameScreenQuery);
    const exitWhenSmall = () => {
      if (!mediaQuery.matches) exit();
    };

    exitWhenSmall();
    mediaQuery.addEventListener("change", exitWhenSmall);
    return () => mediaQuery.removeEventListener("change", exitWhenSmall);
  }, []);
}

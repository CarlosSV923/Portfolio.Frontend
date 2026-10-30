"use client";

import { useEffect, useEffectEvent } from "react";

export type KeyBindings = Partial<
  Record<string, (event: KeyboardEvent) => void>
>;

/**
 * Normalises a key so bindings can use lowercase letters ("w") for both
 * cases, and names ("ArrowUp", " ") for everything else.
 */
export function bindingKey(key: string) {
  return key.length === 1 ? key.toLowerCase() : key;
}

/**
 * Whether the focused element already handles this key: Space and Enter
 * activate buttons and links, and form fields take every key.
 */
export function isHandledByTarget(key: string, target: EventTarget | null) {
  const element = target as Partial<Pick<Element, "closest">> | null;
  if (typeof element?.closest !== "function") return false;
  if (element.closest("input, textarea, select, [contenteditable]")) {
    return true;
  }
  return (key === " " || key === "Enter") && !!element.closest("button, a");
}

/** Window-level game controls, active only while `active` is true. */
export function useGameKeys(bindings: KeyBindings, active: boolean) {
  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    const action = bindings[bindingKey(event.key)];
    if (!action || isHandledByTarget(event.key, event.target)) return;

    event.preventDefault();
    action(event);
  });

  useEffect(() => {
    if (!active) return;
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);
}

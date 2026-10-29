"use client";

import { useEffect, useEffectEvent, useRef } from "react";

/**
 * Calls `onFrame` on every animation frame while `active`, with the seconds
 * since the previous frame (0 on the first one). Return `false` to stop.
 */
export function useAnimationFrame(
  onFrame: (seconds: number) => boolean | void,
  active: boolean,
) {
  const frameCallback = useEffectEvent(onFrame);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    let previous: number | null = null;

    const loop = (time: number) => {
      const seconds = previous === null ? 0 : (time - previous) / 1000;
      previous = time;
      if (frameCallback(seconds) === false) return;
      frame = window.requestAnimationFrame(loop);
    };

    frame = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(frame);
  }, [active]);
}

/** Calls `onStep` every `interval` milliseconds while `active`. */
export function useFixedStep(
  onStep: () => void,
  interval: number,
  active: boolean,
) {
  const elapsed = useRef(0);

  useAnimationFrame((seconds) => {
    elapsed.current += seconds * 1000;
    if (elapsed.current < interval) return;
    elapsed.current %= interval;
    onStep();
  }, active);

  // Each run starts with a full interval before the first step.
  useEffect(() => {
    if (active) elapsed.current = 0;
  }, [active]);
}

"use client";

import { ArrowUp, RotateCcw, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { GameLabel } from "@/components/games/shared/game-dialog";
import { useGameKeys } from "@/components/games/shared/use-game-keys";
import {
  useExitOnSmallScreen,
  usePauseWhenHidden,
} from "@/components/games/shared/use-game-lifecycle";
import { useAnimationFrame } from "@/components/games/shared/use-game-loop";
import { TechIcon } from "@/components/tech-icon";
import { Button } from "@/components/ui/button";
import type { Technology } from "@/content/types";
import { cn } from "@/lib/utils";

import {
  advance,
  createFlight,
  flap,
  getGameMetrics,
  resizeFlight,
  shipTilt,
  type Flight,
} from "./logic";
import { SpaceDialog, type DialogPhase, type SpaceCopy } from "./space-dialog";

type Phase = DialogPhase | "ready" | "running";

const blockClass =
  "absolute left-0 flex w-full flex-col items-center gap-2.5 overflow-hidden border border-border bg-card px-2 py-4 text-center shadow-[0_8px_22px_rgb(5_11_22/12%)]";

function GateBlock({
  name,
  position,
}: Readonly<{ name: string; position: "top" | "bottom" }>) {
  return (
    <div
      className={cn(
        blockClass,
        position === "top"
          ? "top-0 justify-end rounded-b-xl border-b-3 border-b-primary"
          : "bottom-0 justify-start rounded-t-xl border-t-3 border-t-primary",
      )}
    >
      <TechIcon name={name} className="size-10.5" />
      <strong className="max-w-full text-xs leading-tight wrap-anywhere">
        {name}
      </strong>
    </div>
  );
}

export function TechSpace({
  technologies,
  copy,
  onExit,
}: Readonly<{
  technologies: readonly Technology[];
  copy: SpaceCopy;
  onExit: () => void;
}>) {
  const stageRef = useRef<HTMLDivElement>(null);
  const shipRef = useRef<HTMLImageElement>(null);
  const gateRefs = useRef<(HTMLDivElement | null)[]>([]);
  const controlRef = useRef<HTMLButtonElement>(null);
  const flightRef = useRef<Flight | null>(null);
  const [phase, setPhase] = useState<Phase>("welcome");
  const [score, setScore] = useState(0);
  const [crashedTechnology, setCrashedTechnology] = useState<string>();

  // Positions change every frame, so they go straight to the DOM.
  const draw = useCallback(() => {
    const flight = flightRef.current;
    const ship = shipRef.current;
    if (!flight || !ship) return;

    const { metrics } = flight;
    const half = metrics.shipSize / 2;
    ship.style.width = `${metrics.shipSize}px`;
    ship.style.transform = `translate3d(${metrics.shipX - half}px, ${flight.shipY - half}px, 0) rotate(${90 + shipTilt(flight.velocity)}deg)`;

    flight.gates.forEach((gate, index) => {
      const element = gateRefs.current[index];
      if (!element) return;

      const [top, bottom] = element.children as HTMLCollectionOf<HTMLElement>;
      element.style.width = `${metrics.gateWidth}px`;
      element.style.transform = `translate3d(${gate.x}px, 0, 0)`;
      top.style.height = `${gate.gapCenter - metrics.gapHeight / 2}px`;
      bottom.style.height = `${metrics.height - gate.gapCenter - metrics.gapHeight / 2}px`;
    });
  }, []);

  const resetFlight = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    flightRef.current = createFlight(
      technologies.length,
      getGameMetrics(stage.clientWidth, stage.clientHeight),
    );
    setScore(0);
    setCrashedTechnology(undefined);
    draw();
  }, [draw, technologies.length]);

  useLayoutEffect(() => {
    resetFlight();
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new ResizeObserver(() => {
      if (!flightRef.current) return;
      resizeFlight(
        flightRef.current,
        getGameMetrics(stage.clientWidth, stage.clientHeight),
      );
      draw();
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, [draw, resetFlight]);

  const isFlyable = phase === "ready" || phase === "running";

  const flapShip = () => {
    if (!flightRef.current || !isFlyable) return;
    flap(flightRef.current);
    if (phase === "ready") setPhase("running");
  };

  const restart = () => {
    resetFlight();
    setPhase("ready");
    controlRef.current?.focus();
  };

  useAnimationFrame((seconds) => {
    const flight = flightRef.current;
    if (!flight) return false;

    const status = advance(flight, seconds);
    setScore(flight.score);
    draw();

    if (status === "crashed") {
      setCrashedTechnology(
        flight.crashedGate === null
          ? undefined
          : technologies[flight.crashedGate]?.name,
      );
      setPhase("lost");
      return false;
    }
    if (status === "won") {
      setPhase("won");
      return false;
    }
  }, phase === "running");

  const flapOnce = (event: KeyboardEvent) => {
    if (!event.repeat) flapShip();
  };
  useGameKeys(
    { " ": flapOnce, ArrowUp: flapOnce, w: flapOnce, Escape: onExit },
    isFlyable,
  );
  // Hold the ship in place; the next flap carries on.
  usePauseWhenHidden(() =>
    setPhase((current) => (current === "running" ? "ready" : current)),
  );
  useExitOnSmallScreen(onExit);

  return (
    <div
      ref={stageRef}
      className="absolute inset-y-0 left-1/2 z-2 w-screen -translate-x-1/2 overflow-hidden border-y border-border bg-background bg-[radial-gradient(circle_at_20%_28%,var(--primary-soft),transparent_34%)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--primary)_1px,transparent_1px)] bg-size-[54px_54px] opacity-35 mask-[linear-gradient(90deg,transparent,black_20%,black_80%,transparent)]"
      />

      <div className="absolute inset-x-0 top-4 z-4">
        <div className="container-page flex items-center justify-between gap-4">
          <div className="grid gap-0.5">
            <GameLabel>{copy.play}</GameLabel>
            <strong aria-live="polite" className="text-sm tabular-nums">
              {copy.score}: {score} / {technologies.length}
            </strong>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon-lg"
              className="text-primary"
              onClick={restart}
              aria-label={copy.restart}
              title={copy.restart}
            >
              <RotateCcw />
            </Button>
            <Button
              variant="outline"
              size="icon-lg"
              className="text-primary"
              onClick={onExit}
              aria-label={copy.exit}
              title={copy.exit}
            >
              <X />
            </Button>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-0 touch-manipulation overflow-hidden select-none"
        onPointerDown={(event) => {
          if (!(event.target as HTMLElement).closest("button")) flapShip();
        }}
      >
        {technologies.map((technology, index) => (
          <div
            key={technology.name}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 will-change-transform"
            ref={(element) => {
              gateRefs.current[index] = element;
            }}
          >
            <GateBlock name={technology.name} position="top" />
            <GateBlock name={technology.name} position="bottom" />
          </div>
        ))}
        <Image
          ref={shipRef}
          src="/icons/icon_spaceship.png"
          alt={copy.shipAlt}
          width={58}
          height={58}
          priority
          draggable={false}
          className="pointer-events-none absolute top-0 left-0 z-2 max-w-none drop-shadow-[0_0_12px_var(--primary)] will-change-transform"
        />
        {phase === "ready" && (
          <p className="absolute top-1/2 left-1/2 z-3 w-[min(420px,calc(100vw-120px))] -translate-1/2 rounded-lg border border-border bg-card px-4 py-3 text-center text-sm font-bold">
            {copy.ready}
          </p>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-4 z-4">
        <div className="container-page">
          <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-3 py-2.5">
            <p className="text-xs text-muted-foreground">
              {phase === "running" ? copy.running : copy.ready}
            </p>
            <Button
              ref={controlRef}
              size="lg"
              className="min-w-36"
              onClick={flapShip}
              disabled={!isFlyable}
            >
              <ArrowUp />
              {copy.flap}
            </Button>
          </div>
        </div>
      </div>

      <SpaceDialog
        phase={isFlyable ? null : phase}
        copy={copy}
        score={score}
        total={technologies.length}
        crashedTechnology={crashedTechnology}
        onReady={() => setPhase("ready")}
        onRestart={restart}
        onExit={onExit}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          controlRef.current?.focus();
        }}
      />
    </div>
  );
}

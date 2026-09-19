"use client";

import { ArrowUp, RotateCcw, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { TechIcon } from "../tech-icon";
import {
  createGates,
  getGameMetrics,
  hitsGate,
  type Gate,
  type GameMetrics,
} from "./game";
import { SpaceModal } from "./space-modal";
import type { PortfolioText } from "@/types/portfolio";

type Phase = "welcome" | "ready" | "running" | "lost" | "won";
type SpaceCopy = PortfolioText["space"];

type Game = {
  metrics: GameMetrics;
  gates: Gate[];
  shipY: number;
  velocity: number;
  lastTime: number;
  score: number;
};

export function TechSpace({
  technologies,
  copy,
  onExit,
}: Readonly<{
  technologies: readonly { readonly name: string }[];
  copy: SpaceCopy;
  onExit: () => void;
}>) {
  const stageRef = useRef<HTMLDivElement>(null);
  const shipRef = useRef<HTMLImageElement>(null);
  const gateRefs = useRef<(HTMLDivElement | null)[]>([]);
  const controlRef = useRef<HTMLButtonElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [phase, setPhase] = useState<Phase>("welcome");
  const [score, setScore] = useState(0);
  const [crashedTechnology, setCrashedTechnology] = useState<string>();

  const draw = useCallback(() => {
    const game = gameRef.current;
    const ship = shipRef.current;
    if (!game || !ship) return;

    const { metrics } = game;
    ship.style.width = `${metrics.shipSize}px`;
    const flightTilt = Math.max(-22, Math.min(55, game.velocity * 0.065));
    ship.style.transform = `translate3d(${metrics.shipX - metrics.shipSize / 2}px, ${game.shipY - metrics.shipSize / 2}px, 0) rotate(${90 + flightTilt}deg)`;

    game.gates.forEach((gate, index) => {
      const element = gateRefs.current[index];
      if (!element) return;

      const [top, bottom] = element.children as HTMLCollectionOf<HTMLElement>;
      element.style.width = `${metrics.gateWidth}px`;
      element.style.transform = `translate3d(${gate.x}px, 0, 0)`;
      top.style.height = `${gate.gapCenter - metrics.gapHeight / 2}px`;
      bottom.style.height = `${metrics.height - gate.gapCenter - metrics.gapHeight / 2}px`;
    });
  }, []);

  const resetGame = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const metrics = getGameMetrics(stage.clientWidth, stage.clientHeight);
    gameRef.current = {
      metrics,
      gates: createGates(technologies.length, metrics),
      shipY: metrics.height / 2,
      velocity: 0,
      lastTime: 0,
      score: 0,
    };
    setScore(0);
    setCrashedTechnology(undefined);
    draw();
  }, [draw, technologies.length]);

  useLayoutEffect(() => {
    resetGame();
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new ResizeObserver(() => {
      const game = gameRef.current;
      if (!game) return;
      const previous = game.metrics;
      const next = getGameMetrics(stage.clientWidth, stage.clientHeight);
      game.shipY = (game.shipY / previous.height) * next.height;
      game.gates.forEach((gate) => {
        gate.gapCenter = (gate.gapCenter / previous.height) * next.height;
      });
      game.metrics = next;
      draw();
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, [draw, resetGame]);

  const flap = useCallback(() => {
    const game = gameRef.current;
    if (!game || phase === "welcome" || phase === "lost" || phase === "won") {
      return;
    }

    game.velocity = -330;
    if (phase === "ready") {
      game.lastTime = 0;
      setPhase("running");
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "ready" && phase !== "running") return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onExit();
        return;
      }
      if (![" ", "ArrowUp", "w", "W"].includes(event.key)) return;

      event.preventDefault();
      if (!event.repeat) flap();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [flap, onExit, phase]);

  useEffect(() => {
    if (phase !== "running") return;
    let frame = 0;

    const step = (time: number) => {
      const game = gameRef.current;
      if (!game) return;

      const seconds = game.lastTime
        ? Math.min((time - game.lastTime) / 1000, 0.04)
        : 0;
      game.lastTime = time;
      game.velocity = Math.min(520, game.velocity + 840 * seconds);
      game.shipY += game.velocity * seconds;

      const { metrics } = game;
      const shipRadius = metrics.shipSize * 0.3;
      if (
        game.shipY - shipRadius < 0 ||
        game.shipY + shipRadius > metrics.height
      ) {
        setPhase("lost");
        draw();
        return;
      }

      for (const [index, gate] of game.gates.entries()) {
        gate.x -= metrics.speed * seconds;
        if (hitsGate(game.shipY, gate, metrics)) {
          setCrashedTechnology(technologies[index]?.name);
          setPhase("lost");
          draw();
          return;
        }
        if (
          !gate.passed &&
          gate.x + metrics.gateWidth < metrics.shipX - shipRadius
        ) {
          gate.passed = true;
          game.score += 1;
          setScore(game.score);
        }
      }

      draw();
      if (game.score === game.gates.length) {
        setPhase("won");
        return;
      }
      frame = window.requestAnimationFrame(step);
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [draw, phase]);

  useEffect(() => {
    if (phase !== "running") return;

    const pauseWhenHidden = () => {
      if (document.visibilityState === "hidden") {
        gameRef.current && (gameRef.current.lastTime = 0);
        setPhase("ready");
      }
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () =>
      document.removeEventListener("visibilitychange", pauseWhenHidden);
  }, [phase]);

  const restart = () => {
    resetGame();
    setPhase("ready");
    window.requestAnimationFrame(() => controlRef.current?.focus());
  };

  return (
    <div className="tech-space" ref={stageRef}>
      <div className="tech-space-hud">
        <div>
          <span className="micro-label">TECH-SPACE</span>
          <strong aria-live="polite">
            {copy.score}: {score} / {technologies.length}
          </strong>
        </div>
        <div className="tech-space-hud-actions">
          <button
            type="button"
            onClick={restart}
            aria-label={copy.restart}
            title={copy.restart}
          >
            <RotateCcw size={18} />
          </button>
          <button
            type="button"
            onClick={onExit}
            aria-label={copy.exit}
            title={copy.exit}
          >
            <X size={19} />
          </button>
        </div>
      </div>

      <div
        className="tech-space-field"
        onPointerDown={(event) => {
          if (!(event.target as HTMLElement).closest("button")) flap();
        }}
      >
        {technologies.map((technology, index) => (
          <div
            className="tech-space-gate"
            key={technology.name}
            aria-hidden="true"
            ref={(element) => {
              gateRefs.current[index] = element;
            }}
          >
            <div className="tech-space-block tech-space-block--top">
              <TechIcon name={technology.name} />
              <strong>{technology.name}</strong>
            </div>
            <div className="tech-space-block tech-space-block--bottom">
              <TechIcon name={technology.name} />
              <strong>{technology.name}</strong>
            </div>
          </div>
        ))}
        <img
          className="tech-space-ship"
          ref={shipRef}
          src="/icons/icon_spaceship.png"
          alt={copy.shipAlt}
          width={58}
          height={58}
          draggable={false}
        />
        {phase === "ready" && <p className="tech-space-ready">{copy.ready}</p>}
      </div>

      <div className="tech-space-footer">
        <p>{phase === "running" ? copy.running : copy.ready}</p>
        <button
          ref={controlRef}
          className="snake-button tech-space-flap"
          type="button"
          onClick={flap}
          disabled={phase === "welcome" || phase === "lost" || phase === "won"}
        >
          <ArrowUp size={19} />
          {copy.flap}
        </button>
      </div>

      {(phase === "welcome" || phase === "lost" || phase === "won") && (
        <SpaceModal
          copy={copy}
          result={phase}
          score={score}
          total={technologies.length}
          crashedTechnology={crashedTechnology}
          onReady={() => {
            setPhase("ready");
            window.requestAnimationFrame(() => controlRef.current?.focus());
          }}
          onRestart={restart}
          onExit={onExit}
        />
      )}
    </div>
  );
}

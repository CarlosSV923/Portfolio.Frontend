"use client";

import { Pause, Play, RotateCcw, X } from "lucide-react";
import { useRef, useState } from "react";

import { GameLabel } from "@/components/games/shared/game-dialog";
import { useGameKeys } from "@/components/games/shared/use-game-keys";
import {
  useExitOnSmallScreen,
  usePauseWhenHidden,
} from "@/components/games/shared/use-game-lifecycle";
import { useFixedStep } from "@/components/games/shared/use-game-loop";
import { Button } from "@/components/ui/button";

import {
  board,
  createGame,
  directions,
  pause,
  step,
  stepInterval,
  togglePause,
  turn,
} from "./logic";
import { SnakeBoard } from "./snake-board";
import { SnakeControls } from "./snake-controls";
import { ResultDialog, WelcomeDialog } from "./snake-dialogs";
import type { Direction, SnakeCopy, Technology } from "./types";

/** Mounted only while playing; unmounting ends the game. */
export function TechSnake({
  technologies,
  copy,
  onExit,
}: Readonly<{
  technologies: readonly Technology[];
  copy: SnakeCopy;
  onExit: () => void;
}>) {
  const [game, setGame] = useState(() => createGame(technologies));
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  const boardRef = useRef<HTMLDivElement>(null);

  const hasEnded = game.status === "game-over" || game.status === "won";
  const isActive = game.status === "running" || game.status === "paused";
  const steer = (direction: Direction) =>
    setGame((current) => turn(current, direction));

  // Dialogs hand focus back to the board so the keys reach the game.
  const focusBoard = (event: Event) => {
    event.preventDefault();
    boardRef.current?.focus();
  };

  const restart = () => setGame(createGame(technologies));

  useFixedStep(
    () => setGame((current) => step(current)),
    stepInterval,
    game.status === "running",
  );
  useGameKeys(
    {
      ArrowUp: () => steer(directions.up),
      w: () => steer(directions.up),
      ArrowDown: () => steer(directions.down),
      s: () => steer(directions.down),
      ArrowLeft: () => steer(directions.left),
      a: () => steer(directions.left),
      ArrowRight: () => steer(directions.right),
      d: () => steer(directions.right),
      " ": () => setGame(togglePause),
      Escape: onExit,
    },
    !isWelcomeOpen && !hasEnded,
  );
  usePauseWhenHidden(() => setGame(pause));
  useExitOnSmallScreen(onExit);

  const statusMessage = {
    "game-over": copy.gameOver,
    won: copy.won,
    paused: copy.paused,
    running: copy.instructions,
    ready: copy.instructions,
  }[game.status];

  return (
    <div
      ref={boardRef}
      tabIndex={-1}
      className="relative rounded-2xl border border-border bg-secondary p-4 shadow-lg outline-none"
    >
      <div className="mb-3.5 grid min-h-12 grid-cols-[1fr_minmax(0,540px)_1fr] items-center gap-4">
        <div className="flex flex-col">
          <GameLabel>{copy.score}</GameLabel>
          <strong className="font-heading text-2xl leading-none text-primary tabular-nums">
            {game.unlocked.length}
          </strong>
        </div>
        <p aria-live="polite" className="text-center text-sm">
          {statusMessage}
        </p>
        <div className="flex justify-end gap-1.5">
          {isActive && (
            <Button
              variant="outline"
              size="icon"
              title={game.status === "running" ? copy.pause : copy.resume}
              aria-label={game.status === "running" ? copy.pause : copy.resume}
              onClick={() => setGame(togglePause)}
            >
              {game.status === "running" ? <Pause /> : <Play />}
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            title={copy.restart}
            aria-label={copy.restart}
            onClick={restart}
          >
            <RotateCcw />
          </Button>
          <Button
            variant="outline"
            size="icon"
            title={copy.exit}
            aria-label={copy.exit}
            onClick={onExit}
          >
            <X />
          </Button>
        </div>
      </div>

      <SnakeControls
        copy={copy}
        disabled={hasEnded}
        onDirectionChange={steer}
      />
      <SnakeBoard
        size={board}
        snake={game.snake}
        food={game.food}
        foodLabel={copy.food}
        label={copy.gameTitle}
      />

      <WelcomeDialog
        open={isWelcomeOpen}
        copy={copy}
        onStart={() => setIsWelcomeOpen(false)}
        onCloseAutoFocus={focusBoard}
      />
      <ResultDialog
        open={hasEnded}
        copy={copy}
        isWon={game.status === "won"}
        unlocked={game.unlocked}
        onRestart={restart}
        onExit={onExit}
        onCloseAutoFocus={focusBoard}
      />
    </div>
  );
}

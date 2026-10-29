"use client";

import { Pause, Play, RotateCcw, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  boardColumns,
  boardRows,
  createFoodAfterCapture,
  createGame,
  directions,
  gameSpeed,
  isOpposite,
} from "./tech-snake/game";
import { SnakeBoard } from "./tech-snake/snake-board";
import { SnakeControls } from "./tech-snake/snake-controls";
import { ResultModal, WelcomeModal } from "./tech-snake/snake-modals";
import type {
  Direction,
  GameState,
  SnakeCopy,
  Technology,
} from "./tech-snake/types";

/** Mounted only while playing; unmounting ends the game. */
export function TechnologySnake({
  technologies,
  copy,
  onExit,
}: Readonly<{
  technologies: readonly Technology[];
  copy: SnakeCopy;
  onExit: () => void;
}>) {
  const [initialGame] = useState(() =>
    createGame(technologies, boardColumns, boardRows),
  );
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  const [game, setGame] = useState<GameState>(initialGame.state);
  const directionRef = useRef<Direction>(initialGame.direction);
  const nextDirectionRef = useRef<Direction>(initialGame.direction);

  const resetGame = useCallback(() => {
    const nextGame = createGame(technologies, boardColumns, boardRows);

    directionRef.current = nextGame.direction;
    nextDirectionRef.current = nextGame.direction;
    setGame(nextGame.state);
  }, [technologies]);

  const changeDirection = useCallback((nextDirection: Direction) => {
    if (!isOpposite(directionRef.current, nextDirection)) {
      nextDirectionRef.current = nextDirection;
      setGame((currentGame) => ({
        ...currentGame,
        status: currentGame.status === "ready" ? "running" : currentGame.status,
      }));
    }
  }, []);

  // The board needs a wide screen; leave the game if the window shrinks.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 900px)");
    const exitOnSmallScreen = () => {
      if (!mediaQuery.matches) onExit();
    };

    mediaQuery.addEventListener("change", exitOnSmallScreen);
    return () => mediaQuery.removeEventListener("change", exitOnSmallScreen);
  }, [onExit]);

  useEffect(() => {
    if (game.status !== "running") {
      return;
    }

    const timer = window.setInterval(() => {
      setGame((currentGame) => {
        directionRef.current = nextDirectionRef.current;
        const head = currentGame.snake[0];
        const nextHead = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y,
        };
        const ateFood =
          currentGame.food?.x === nextHead.x &&
          currentGame.food.y === nextHead.y;
        const collisionBody = ateFood
          ? currentGame.snake
          : currentGame.snake.slice(0, -1);
        const hitWall =
          nextHead.x < 0 ||
          nextHead.x >= boardColumns ||
          nextHead.y < 0 ||
          nextHead.y >= boardRows;
        const hitSelf = collisionBody.some(
          (segment) => segment.x === nextHead.x && segment.y === nextHead.y,
        );

        if (hitWall || hitSelf) {
          return { ...currentGame, status: "game-over" };
        }

        if (ateFood && currentGame.food) {
          const movedSnake = [
            { ...currentGame.snake[0], ...nextHead },
            ...currentGame.snake,
          ].map((segment, index) => ({
            ...segment,
            name:
              index < currentGame.snake.length
                ? currentGame.snake[index].name
                : currentGame.food!.name,
          }));
          const unlocked = [...currentGame.unlocked, currentGame.food.name];
          const food = createFoodAfterCapture(
            movedSnake,
            unlocked,
            boardColumns,
            boardRows,
          );

          return {
            snake: movedSnake,
            food,
            unlocked,
            status: food ? "running" : "won",
          };
        }

        return {
          ...currentGame,
          snake: currentGame.snake.map((segment, index) => ({
            ...segment,
            ...(index === 0
              ? nextHead
              : {
                  x: currentGame.snake[index - 1].x,
                  y: currentGame.snake[index - 1].y,
                }),
          })),
        };
      });
    }, gameSpeed);

    return () => window.clearInterval(timer);
  }, [game.status]);

  useEffect(() => {
    if (isWelcomeOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (target?.closest("button, a, input, textarea, select")) {
        return;
      }

      const keyDirections: Record<string, Direction> = {
        ArrowUp: directions.up,
        w: directions.up,
        W: directions.up,
        ArrowDown: directions.down,
        s: directions.down,
        S: directions.down,
        ArrowLeft: directions.left,
        a: directions.left,
        A: directions.left,
        ArrowRight: directions.right,
        d: directions.right,
        D: directions.right,
      };
      const nextDirection = keyDirections[event.key];

      if (nextDirection) {
        event.preventDefault();
        changeDirection(nextDirection);
      }

      if (event.key === " ") {
        event.preventDefault();
        setGame((currentGame) => ({
          ...currentGame,
          status:
            currentGame.status === "running"
              ? "paused"
              : currentGame.status === "paused"
                ? "running"
                : currentGame.status,
        }));
      }

      if (event.key === "Escape") {
        onExit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection, isWelcomeOpen, onExit]);

  useEffect(() => {
    const pauseGame = () => {
      if (document.visibilityState === "hidden" || !document.hasFocus()) {
        setGame((currentGame) => ({
          ...currentGame,
          status:
            currentGame.status === "running" ? "paused" : currentGame.status,
        }));
      }
    };

    window.addEventListener("blur", pauseGame);
    document.addEventListener("visibilitychange", pauseGame);

    return () => {
      window.removeEventListener("blur", pauseGame);
      document.removeEventListener("visibilitychange", pauseGame);
    };
  }, []);

  const gameHasEnded = game.status === "game-over" || game.status === "won";
  const statusMessage =
    game.status === "game-over"
      ? copy.gameOver
      : game.status === "won"
        ? copy.won
        : game.status === "paused"
          ? copy.paused
          : copy.instructions;

  return (
    <div className="snake-game">
      <div className="snake-game-header">
        <div>
          <span className="micro-label">{copy.score}</span>
          <strong>{game.unlocked.length}</strong>
        </div>
        <p aria-live="polite">{statusMessage}</p>
        <div className="snake-actions">
          {(game.status === "running" || game.status === "paused") && (
            <button
              type="button"
              title={game.status === "running" ? copy.pause : copy.resume}
              aria-label={game.status === "running" ? copy.pause : copy.resume}
              onClick={() =>
                setGame((currentGame) => ({
                  ...currentGame,
                  status:
                    currentGame.status === "running" ? "paused" : "running",
                }))
              }
            >
              {game.status === "running" ? (
                <Pause size={17} />
              ) : (
                <Play size={17} />
              )}
            </button>
          )}
          <button
            type="button"
            title={copy.restart}
            aria-label={copy.restart}
            onClick={resetGame}
          >
            <RotateCcw size={17} />
          </button>
          <button
            type="button"
            title={copy.exit}
            aria-label={copy.exit}
            onClick={onExit}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <SnakeControls
        copy={copy}
        disabled={gameHasEnded}
        onDirectionChange={changeDirection}
      />
      <SnakeBoard
        columns={boardColumns}
        rows={boardRows}
        snake={game.snake}
        food={game.food}
        foodLabel={copy.food}
      />

      {isWelcomeOpen && (
        <WelcomeModal copy={copy} onClose={() => setIsWelcomeOpen(false)} />
      )}
      {gameHasEnded && (
        <ResultModal
          copy={copy}
          isWon={game.status === "won"}
          unlocked={game.unlocked}
          onRestart={resetGame}
          onExit={onExit}
        />
      )}
    </div>
  );
}

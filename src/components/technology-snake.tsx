"use client";

import { Gamepad2, Pause, Play, RotateCcw, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { TechIcon } from "./tech-icon";
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

export function TechnologySnake({
  technologies,
  copy,
  onActiveChange,
}: Readonly<{
  technologies: readonly Technology[];
  copy: SnakeCopy;
  onActiveChange: (isActive: boolean) => void;
}>) {
  const [isActive, setIsActive] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [game, setGame] = useState<GameState>({
    snake: [],
    food: null,
    unlocked: [],
    status: "ready",
  });
  const directionRef = useRef<Direction>(directions.right);
  const nextDirectionRef = useRef<Direction>(directions.right);

  useEffect(() => {
    onActiveChange(isActive);
  }, [isActive, onActiveChange]);

  const resetGame = useCallback(() => {
    const nextGame = createGame(technologies, boardColumns, boardRows);

    directionRef.current = nextGame.direction;
    nextDirectionRef.current = nextGame.direction;
    setGame(nextGame.state);
  }, [technologies]);

  const startGame = useCallback(() => {
    resetGame();
    setIsWelcomeOpen(true);
    setIsActive(true);
  }, [resetGame]);

  const changeDirection = useCallback((nextDirection: Direction) => {
    if (!isOpposite(directionRef.current, nextDirection)) {
      nextDirectionRef.current = nextDirection;
      setGame((currentGame) => ({
        ...currentGame,
        status: currentGame.status === "ready" ? "running" : currentGame.status,
      }));
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 900px)");
    const updateAvailability = () => {
      setIsLargeScreen(mediaQuery.matches);

      if (!mediaQuery.matches) {
        setIsActive(false);
      }
    };

    updateAvailability();
    mediaQuery.addEventListener("change", updateAvailability);

    return () => mediaQuery.removeEventListener("change", updateAvailability);
  }, []);

  useEffect(() => {
    if (!isActive || isWelcomeOpen) {
      return;
    }

    resetGame();
  }, [isActive, isWelcomeOpen, resetGame]);

  useEffect(() => {
    if (!isActive || game.status !== "running") {
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
  }, [game.status, isActive]);

  useEffect(() => {
    if (!isActive || isWelcomeOpen) {
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
        setIsActive(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection, isActive, isWelcomeOpen]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

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
  }, [isActive]);

  if (!isActive) {
    return (
      <>
        <div
          className={`snake-launchbar ${
            isLargeScreen ? "" : "snake-launchbar--mobile"
          }`}
        >
          <p>{isLargeScreen ? copy.intro : copy.mobileIntro}</p>
          {isLargeScreen && (
            <button className="snake-button" type="button" onClick={startGame}>
              <Gamepad2 size={18} />
              {copy.play}
            </button>
          )}
        </div>
        <div className="skills-grid">
          {technologies.map((technology) => (
            <article className="skill-card" key={technology.name}>
              <TechIcon name={technology.name} />
              <span>{technology.name}</span>
            </article>
          ))}
        </div>
      </>
    );
  }

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
            onClick={() => setIsActive(false)}
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
          onExit={() => setIsActive(false)}
        />
      )}
    </div>
  );
}

"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Gamepad2,
  Pause,
  Play,
  RotateCcw,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { TechIcon } from "./tech-icon";

type Technology = { readonly name: string };
type Point = { readonly x: number; readonly y: number };
type Direction = Point;
type Segment = Technology & Point;
type GameStatus = "ready" | "running" | "paused" | "game-over" | "won";

type SnakeCopy = {
  readonly gameTitle: string;
  readonly play: string;
  readonly intro: string;
  readonly instructions: string;
  readonly score: string;
  readonly pause: string;
  readonly paused: string;
  readonly resume: string;
  readonly restart: string;
  readonly exit: string;
  readonly gameOver: string;
  readonly won: string;
  readonly food: string;
  readonly moveUp: string;
  readonly moveDown: string;
  readonly moveLeft: string;
  readonly moveRight: string;
};

type GameState = {
  readonly snake: Segment[];
  readonly food: Segment | null;
  readonly unlocked: string[];
  readonly status: GameStatus;
};

const extraTechnologies = [
  "Redis",
  "Kubernetes",
  "AWS",
  "Go",
  "Rust",
  "Vue.js",
] as const;

const boardColumns = 12;
const boardRows = 4;
const gameSpeed = 430;

const directions = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
} as const;

function createPath(columns: number, rows: number) {
  return Array.from({ length: rows }, (_, y) =>
    Array.from({ length: columns }, (_, index) => ({
      x: y % 2 === 0 ? index : columns - index - 1,
      y,
    })),
  ).flat();
}

function createFood(
  occupied: readonly Point[],
  availableNames: readonly string[],
  columns: number,
  rows: number,
): Segment | null {
  if (availableNames.length === 0) {
    return null;
  }

  const openCells = createPath(columns, rows).filter(
    (cell) =>
      !occupied.some((point) => point.x === cell.x && point.y === cell.y),
  );

  if (openCells.length === 0) {
    return null;
  }

  const position = openCells[Math.floor(Math.random() * openCells.length)];
  const name =
    availableNames[Math.floor(Math.random() * availableNames.length)];

  return { ...position, name };
}

function createGame(
  technologies: readonly Technology[],
  columns: number,
  rows: number,
) {
  const path = createPath(columns, rows);
  const snakeLength = Math.min(technologies.length, path.length - 1);
  const firstOpenEvenRow = Math.ceil((snakeLength - 1) / columns / 2) * 2;
  const headIndex = Math.min(firstOpenEvenRow * columns, path.length - 2);
  const positions = path
    .slice(headIndex - snakeLength + 1, headIndex + 1)
    .reverse();
  const snake = technologies
    .slice(0, snakeLength)
    .map((technology, index) => ({ ...technology, ...positions[index] }));
  const nextPoint = path[headIndex + 1];
  const head = positions[0];
  const direction = {
    x: nextPoint.x - head.x,
    y: nextPoint.y - head.y,
  };

  return {
    direction,
    state: {
      snake,
      food: createFood(snake, extraTechnologies, columns, rows),
      unlocked: [],
      status: "ready" as const,
    },
  };
}

function isOpposite(current: Direction, next: Direction) {
  return current.x + next.x === 0 && current.y + next.y === 0;
}

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
  const columns = boardColumns;
  const rows = boardRows;
  const directionRef = useRef<Direction>(directions.right);
  const nextDirectionRef = useRef<Direction>(directions.right);
  const [game, setGame] = useState<GameState>({
    snake: [],
    food: null,
    unlocked: [],
    status: "ready",
  });

  useEffect(() => {
    onActiveChange(isActive);
  }, [isActive, onActiveChange]);

  const startGame = useCallback(() => {
    const nextGame = createGame(technologies, columns, rows);

    directionRef.current = nextGame.direction;
    nextDirectionRef.current = nextGame.direction;
    setGame(nextGame.state);
    setIsActive(true);
  }, [columns, rows, technologies]);

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
    if (!isActive) {
      return;
    }

    const nextGame = createGame(technologies, columns, rows);
    directionRef.current = nextGame.direction;
    nextDirectionRef.current = nextGame.direction;
    setGame(nextGame.state);
  }, [columns, isActive, rows, technologies]);

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
          nextHead.x >= columns ||
          nextHead.y < 0 ||
          nextHead.y >= rows;
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
          const remainingTechnologies = extraTechnologies.filter(
            (name) => !unlocked.includes(name),
          );
          const food = createFood(
            movedSnake,
            remainingTechnologies,
            columns,
            rows,
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
  }, [columns, game.status, isActive, rows]);

  useEffect(() => {
    if (!isActive) {
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
  }, [changeDirection, isActive]);

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
        {isLargeScreen && (
          <div className="snake-launchbar">
            <p>{copy.intro}</p>
            <button className="snake-button" type="button" onClick={startGame}>
              <Gamepad2 size={18} />
              {copy.play}
            </button>
          </div>
        )}
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

  const statusMessage =
    game.status === "game-over"
      ? copy.gameOver
      : game.status === "won"
        ? copy.won
        : game.status === "paused"
          ? copy.paused
          : copy.instructions;
  const gameHasEnded = game.status === "game-over" || game.status === "won";

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
            onClick={startGame}
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

      <div className="snake-controls" aria-label={copy.instructions}>
        <button
          className="control-up"
          type="button"
          aria-label={copy.moveUp}
          disabled={gameHasEnded}
          onClick={() => changeDirection(directions.up)}
        >
          <ChevronUp />
        </button>
        <button
          className="control-left"
          type="button"
          aria-label={copy.moveLeft}
          disabled={gameHasEnded}
          onClick={() => changeDirection(directions.left)}
        >
          <ChevronLeft />
        </button>
        <button
          className="control-down"
          type="button"
          aria-label={copy.moveDown}
          disabled={gameHasEnded}
          onClick={() => changeDirection(directions.down)}
        >
          <ChevronDown />
        </button>
        <button
          className="control-right"
          type="button"
          aria-label={copy.moveRight}
          disabled={gameHasEnded}
          onClick={() => changeDirection(directions.right)}
        >
          <ChevronRight />
        </button>
      </div>

      <div
        className="snake-board"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          aspectRatio: `${columns} / ${rows}`,
        }}
      >
        {game.snake.map((segment, index) => (
          <article
            className={`skill-card snake-card ${index === 0 ? "snake-head" : ""}`}
            key={`${segment.name}-${index}`}
            style={{ gridColumn: segment.x + 1, gridRow: segment.y + 1 }}
          >
            <TechIcon name={segment.name} />
            <span>{segment.name}</span>
          </article>
        ))}

        {game.food && (
          <article
            className="skill-card snake-card snake-food"
            style={{ gridColumn: game.food.x + 1, gridRow: game.food.y + 1 }}
          >
            <span className="snake-food-label">{copy.food}</span>
            <TechIcon name={game.food.name} />
            <span>{game.food.name}</span>
          </article>
        )}
      </div>
    </div>
  );
}

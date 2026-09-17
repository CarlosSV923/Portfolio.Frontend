import type { Direction, GameState, Point, Segment, Technology } from "./types";

const extraTechnologies = [
  "Redis",
  "Kubernetes",
  "AWS",
  "Go",
  "Rust",
  "RabbitMQ",
] as const;

export const boardColumns = 12;
export const boardRows = 4;
export const gameSpeed = 430;

export const directions = {
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

function getSecureRandomIndex(length: number) {
  const randomValues = new Uint32Array(1);
  globalThis.crypto.getRandomValues(randomValues);
  return randomValues[0] % length;
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

  const position = openCells[getSecureRandomIndex(openCells.length)];
  const name = availableNames[getSecureRandomIndex(availableNames.length)];

  return { ...position, name };
}

export function createGame(
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

  return {
    direction: {
      x: nextPoint.x - head.x,
      y: nextPoint.y - head.y,
    },
    state: {
      snake,
      food: createFood(snake, extraTechnologies, columns, rows),
      unlocked: [],
      status: "ready" as const,
    } satisfies GameState,
  };
}

export function createFoodAfterCapture(
  snake: readonly Segment[],
  unlocked: readonly string[],
  columns: number,
  rows: number,
) {
  const remainingTechnologies = extraTechnologies.filter(
    (name) => !unlocked.includes(name),
  );

  return createFood(snake, remainingTechnologies, columns, rows);
}

export function isOpposite(current: Direction, next: Direction) {
  return current.x + next.x === 0 && current.y + next.y === 0;
}

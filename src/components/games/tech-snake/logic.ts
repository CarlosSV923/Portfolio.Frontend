import type {
  Board,
  Direction,
  GameState,
  Point,
  Segment,
  Technology,
} from "./types";

/** Technologies the snake can capture; each one becomes a new segment. */
export const extraTechnologies = [
  "Redis",
  "Kubernetes",
  "AWS",
  "Go",
  "Rust",
  "RabbitMQ",
] as const;

export const board: Board = { columns: 12, rows: 4 };

/** Milliseconds between steps. */
export const stepInterval = 430;

export const directions = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
} as const;

/** Picks an index in [0, length); injectable so tests can be deterministic. */
export type RandomIndex = (length: number) => number;

const secureRandomIndex: RandomIndex = (length) => {
  const values = new Uint32Array(1);
  globalThis.crypto.getRandomValues(values);
  return values[0] % length;
};

const samePoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

/** Every cell, row by row, alternating direction like a snake. */
function createPath({ columns, rows }: Board): Point[] {
  return Array.from({ length: rows }, (_, y) =>
    Array.from({ length: columns }, (_, index) => ({
      x: y % 2 === 0 ? index : columns - index - 1,
      y,
    })),
  ).flat();
}

/** A random remaining technology on a random free cell, or null if none. */
export function placeFood(
  occupied: readonly Point[],
  unlocked: readonly string[],
  size: Board = board,
  randomIndex: RandomIndex = secureRandomIndex,
): Segment | null {
  const names = extraTechnologies.filter((name) => !unlocked.includes(name));
  const openCells = createPath(size).filter(
    (cell) => !occupied.some((point) => samePoint(point, cell)),
  );

  if (names.length === 0 || openCells.length === 0) return null;

  return {
    ...openCells[randomIndex(openCells.length)],
    name: names[randomIndex(names.length)],
  };
}

/** The snake laid along the path, its head facing a free cell. */
export function createGame(
  technologies: readonly Technology[],
  size: Board = board,
  randomIndex: RandomIndex = secureRandomIndex,
): GameState {
  const path = createPath(size);
  const snakeLength = Math.min(technologies.length, path.length - 1);
  const firstOpenEvenRow = Math.ceil((snakeLength - 1) / size.columns / 2) * 2;
  const headIndex = Math.min(firstOpenEvenRow * size.columns, path.length - 2);
  const positions = path
    .slice(headIndex - snakeLength + 1, headIndex + 1)
    .reverse();
  const snake = technologies
    .slice(0, snakeLength)
    .map((technology, index) => ({ ...technology, ...positions[index] }));
  const head = positions[0];
  const next = path[headIndex + 1];
  const direction = { x: next.x - head.x, y: next.y - head.y };

  return {
    snake,
    food: placeFood(snake, [], size, randomIndex),
    unlocked: [],
    status: "ready",
    direction,
    nextDirection: direction,
  };
}

export function isOpposite(current: Direction, next: Direction) {
  return current.x + next.x === 0 && current.y + next.y === 0;
}

/** Queues a turn (reversing is ignored); the first turn starts the game. */
export function turn(state: GameState, direction: Direction): GameState {
  const playable = state.status === "ready" || state.status === "running";
  if (!playable || isOpposite(state.direction, direction)) return state;

  return { ...state, nextDirection: direction, status: "running" };
}

export function togglePause(state: GameState): GameState {
  if (state.status === "running") return { ...state, status: "paused" };
  if (state.status === "paused") return { ...state, status: "running" };
  return state;
}

export function pause(state: GameState): GameState {
  return state.status === "running" ? { ...state, status: "paused" } : state;
}

/** Moves the snake one cell: it may crash, eat (and grow) or win. */
export function step(
  state: GameState,
  size: Board = board,
  randomIndex: RandomIndex = secureRandomIndex,
): GameState {
  if (state.status !== "running") return state;

  const direction = state.nextDirection;
  const [head] = state.snake;
  const nextHead = { x: head.x + direction.x, y: head.y + direction.y };
  const eats = state.food !== null && samePoint(state.food, nextHead);
  // The tail moves away this step unless the snake grows.
  const body = eats ? state.snake : state.snake.slice(0, -1);
  const hitsWall =
    nextHead.x < 0 ||
    nextHead.x >= size.columns ||
    nextHead.y < 0 ||
    nextHead.y >= size.rows;

  if (hitsWall || body.some((segment) => samePoint(segment, nextHead))) {
    return { ...state, direction, status: "game-over" };
  }

  // Names stay in place and positions shift towards the head, so the
  // captured technology joins at the tail.
  const positions = [nextHead, ...body];
  const names = eats
    ? [...state.snake.map((segment) => segment.name), state.food!.name]
    : state.snake.map((segment) => segment.name);
  const snake = names.map((name, index) => {
    const { x, y } = positions[index];
    return { name, x, y };
  });

  if (!eats) return { ...state, direction, snake };

  const unlocked = [...state.unlocked, state.food!.name];
  const food = placeFood(snake, unlocked, size, randomIndex);

  return {
    ...state,
    direction,
    snake,
    unlocked,
    food,
    status: food ? "running" : "won",
  };
}

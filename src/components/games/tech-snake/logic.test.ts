import { describe, expect, it } from "vitest";

import {
  board,
  createGame,
  directions,
  extraTechnologies,
  isOpposite,
  placeFood,
  step,
  togglePause,
  turn,
  type RandomIndex,
} from "./logic";
import type { GameState, Point } from "./types";

const technologies = ["NestJS", "Node.js", "TypeScript", "MongoDB"].map(
  (name) => ({ name }),
);

const first: RandomIndex = () => 0;
const samePoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

/** A running game with the snake heading right along the top row. */
function runningGame(overrides: Partial<GameState> = {}): GameState {
  return {
    snake: [
      { name: "A", x: 2, y: 0 },
      { name: "B", x: 1, y: 0 },
      { name: "C", x: 0, y: 0 },
    ],
    food: null,
    unlocked: [],
    status: "running",
    direction: directions.right,
    nextDirection: directions.right,
    ...overrides,
  };
}

describe("createGame", () => {
  it("builds one segment per technology, in order, ready to start", () => {
    const state = createGame(technologies);

    expect(state.snake.map((segment) => segment.name)).toEqual(
      technologies.map((technology) => technology.name),
    );
    expect(state.status).toBe("ready");
    expect(state.unlocked).toEqual([]);
  });

  it("places every segment inside the board, each next to the previous", () => {
    const state = createGame(technologies);

    state.snake.forEach((segment, index) => {
      expect(segment.x).toBeGreaterThanOrEqual(0);
      expect(segment.x).toBeLessThan(board.columns);
      expect(segment.y).toBeGreaterThanOrEqual(0);
      expect(segment.y).toBeLessThan(board.rows);

      const next = state.snake[index + 1];
      if (next) {
        expect(
          Math.abs(segment.x - next.x) + Math.abs(segment.y - next.y),
        ).toBe(1);
      }
    });
  });

  it("faces a free cell and puts the food on another free cell", () => {
    const state = createGame(technologies);
    const head = state.snake[0];
    const ahead = {
      x: head.x + state.direction.x,
      y: head.y + state.direction.y,
    };

    expect(state.snake.some((segment) => samePoint(segment, ahead))).toBe(
      false,
    );
    expect(state.food).not.toBeNull();
    expect(state.snake.some((segment) => samePoint(segment, state.food!))).toBe(
      false,
    );
  });
});

describe("placeFood", () => {
  it("only offers technologies that are still locked", () => {
    const unlocked = extraTechnologies.slice(0, -1);

    for (let attempt = 0; attempt < 20; attempt++) {
      expect(placeFood([], unlocked)?.name).toBe("RabbitMQ");
    }
  });

  it("returns null once every technology is unlocked", () => {
    expect(placeFood([], extraTechnologies)).toBeNull();
  });
});

describe("turn", () => {
  it("starts the game on the first turn", () => {
    const ready = createGame(technologies);
    const turned = turn(ready, directions.down);

    expect(turned.status).toBe("running");
    expect(turned.nextDirection).toEqual(directions.down);
  });

  it("ignores reversing into the body", () => {
    const state = runningGame();

    expect(turn(state, directions.left)).toBe(state);
  });

  it("ignores turns while paused or finished", () => {
    for (const status of ["paused", "game-over", "won"] as const) {
      const state = runningGame({ status });
      expect(turn(state, directions.down)).toBe(state);
    }
  });
});

describe("step", () => {
  it("moves every segment towards the head", () => {
    const moved = step(runningGame());

    expect(moved.snake).toEqual([
      { name: "A", x: 3, y: 0 },
      { name: "B", x: 2, y: 0 },
      { name: "C", x: 1, y: 0 },
    ]);
  });

  it("applies the queued direction", () => {
    const moved = step(turn(runningGame(), directions.down));

    expect(moved.snake[0]).toMatchObject({ x: 2, y: 1 });
    expect(moved.direction).toEqual(directions.down);
  });

  it("ends the game when the snake hits a wall", () => {
    const atEdge = runningGame({
      snake: [{ name: "A", x: board.columns - 1, y: 0 }],
    });

    expect(step(atEdge).status).toBe("game-over");
  });

  it("ends the game when the snake hits itself", () => {
    // Head at (1,1) moving up into (1,0), which the body still occupies.
    const curled = runningGame({
      snake: [
        { name: "A", x: 1, y: 1 },
        { name: "B", x: 2, y: 1 },
        { name: "C", x: 2, y: 0 },
        { name: "D", x: 1, y: 0 },
        { name: "E", x: 0, y: 0 },
      ],
      direction: directions.up,
      nextDirection: directions.up,
    });

    expect(step(curled).status).toBe("game-over");
  });

  it("lets the head follow the tail, which moves away", () => {
    const loop = runningGame({
      snake: [
        { name: "A", x: 0, y: 1 },
        { name: "B", x: 1, y: 1 },
        { name: "C", x: 1, y: 0 },
        { name: "D", x: 0, y: 0 },
      ],
      direction: directions.up,
      nextDirection: directions.up,
    });

    expect(step(loop).status).toBe("running");
  });

  it("grows by the captured technology and places new food", () => {
    const state = runningGame({ food: { name: "Redis", x: 3, y: 0 } });
    const fed = step(state, board, first);

    expect(fed.snake.map((segment) => segment.name)).toEqual([
      "A",
      "B",
      "C",
      "Redis",
    ]);
    expect(fed.snake[0]).toMatchObject({ x: 3, y: 0 });
    expect(fed.unlocked).toEqual(["Redis"]);
    expect(fed.food?.name).not.toBe("Redis");
    expect(fed.status).toBe("running");
  });

  it("wins after capturing the last technology", () => {
    const state = runningGame({
      food: { name: "RabbitMQ", x: 3, y: 0 },
      unlocked: extraTechnologies.slice(0, -1),
    });
    const won = step(state);

    expect(won.status).toBe("won");
    expect(won.food).toBeNull();
  });

  it("does nothing unless the game is running", () => {
    const paused = runningGame({ status: "paused" });

    expect(step(paused)).toBe(paused);
  });
});

describe("togglePause", () => {
  it("pauses and resumes a running game", () => {
    const paused = togglePause(runningGame());

    expect(paused.status).toBe("paused");
    expect(togglePause(paused).status).toBe("running");
  });

  it("leaves ready and finished games alone", () => {
    const ready = createGame(technologies);

    expect(togglePause(ready)).toBe(ready);
  });
});

describe("isOpposite", () => {
  it("detects reversing direction", () => {
    expect(isOpposite(directions.left, directions.right)).toBe(true);
    expect(isOpposite(directions.up, directions.down)).toBe(true);
  });

  it("allows turning and keeping the same direction", () => {
    expect(isOpposite(directions.left, directions.up)).toBe(false);
    expect(isOpposite(directions.right, directions.right)).toBe(false);
  });
});

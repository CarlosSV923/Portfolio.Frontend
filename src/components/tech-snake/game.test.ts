import { describe, expect, it } from "vitest";

import {
  boardColumns,
  boardRows,
  createFoodAfterCapture,
  createGame,
  directions,
  isOpposite,
} from "./game";

const technologies = ["NestJS", "Node.js", "Typescript", "MongoDB"].map(
  (name) => ({ name }),
);

const samePoint = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  a.x === b.x && a.y === b.y;

describe("createGame", () => {
  it("builds one snake segment per technology, in order", () => {
    const { state } = createGame(technologies, boardColumns, boardRows);

    expect(state.snake.map((segment) => segment.name)).toEqual(
      technologies.map((technology) => technology.name),
    );
    expect(state.status).toBe("ready");
    expect(state.unlocked).toEqual([]);
  });

  it("places every segment inside the board and adjacent to the next one", () => {
    const { state } = createGame(technologies, boardColumns, boardRows);

    state.snake.forEach((segment, index) => {
      expect(segment.x).toBeGreaterThanOrEqual(0);
      expect(segment.x).toBeLessThan(boardColumns);
      expect(segment.y).toBeGreaterThanOrEqual(0);
      expect(segment.y).toBeLessThan(boardRows);

      const next = state.snake[index + 1];
      if (next) {
        expect(
          Math.abs(segment.x - next.x) + Math.abs(segment.y - next.y),
        ).toBe(1);
      }
    });
  });

  it("starts moving towards a free cell", () => {
    const { direction, state } = createGame(
      technologies,
      boardColumns,
      boardRows,
    );
    const head = state.snake[0];
    const next = { x: head.x + direction.x, y: head.y + direction.y };

    expect(Math.abs(direction.x) + Math.abs(direction.y)).toBe(1);
    expect(state.snake.some((segment) => samePoint(segment, next))).toBe(false);
  });

  it("places the first food on a free cell", () => {
    const { state } = createGame(technologies, boardColumns, boardRows);

    expect(state.food).not.toBeNull();
    expect(state.snake.some((segment) => samePoint(segment, state.food!))).toBe(
      false,
    );
  });
});

describe("createFoodAfterCapture", () => {
  const { state } = createGame(technologies, boardColumns, boardRows);

  it("never offers a technology that was already unlocked", () => {
    const unlocked = ["Redis", "Kubernetes", "AWS", "Go", "Rust"];

    for (let attempt = 0; attempt < 20; attempt++) {
      const food = createFoodAfterCapture(
        state.snake,
        unlocked,
        boardColumns,
        boardRows,
      );
      expect(food?.name).toBe("RabbitMQ");
    }
  });

  it("returns null once every extra technology is unlocked", () => {
    const unlocked = ["Redis", "Kubernetes", "AWS", "Go", "Rust", "RabbitMQ"];

    expect(
      createFoodAfterCapture(state.snake, unlocked, boardColumns, boardRows),
    ).toBeNull();
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

import type { Technology } from "@/content/types";
import type { PortfolioText } from "@/types/portfolio";

export type { Technology };

export type Point = { readonly x: number; readonly y: number };

export type Direction = Point;

export type Segment = Technology & Point;

export type GameStatus = "ready" | "running" | "paused" | "game-over" | "won";

export type GameState = {
  readonly snake: readonly Segment[];
  readonly food: Segment | null;
  readonly unlocked: readonly string[];
  readonly status: GameStatus;
  /** Direction applied on the last step. */
  readonly direction: Direction;
  /** Direction queued by the player for the next step. */
  readonly nextDirection: Direction;
};

export type Board = { readonly columns: number; readonly rows: number };

export type SnakeCopy = PortfolioText["snake"];

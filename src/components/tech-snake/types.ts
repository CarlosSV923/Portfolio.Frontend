export type Technology = { readonly name: string };

export type Point = { readonly x: number; readonly y: number };

export type Direction = Point;

export type Segment = Technology & Point;

export type GameStatus = "ready" | "running" | "paused" | "game-over" | "won";

export type GameState = {
  readonly snake: Segment[];
  readonly food: Segment | null;
  readonly unlocked: string[];
  readonly status: GameStatus;
};

export type SnakeCopy = {
  readonly gameTitle: string;
  readonly play: string;
  readonly intro: string;
  readonly mobileIntro: string;
  readonly welcomeTitle: string;
  readonly welcomeBody: string;
  readonly welcomeAction: string;
  readonly resultWonTitle: string;
  readonly resultWonBody: string;
  readonly resultLostTitle: string;
  readonly resultLostBody: string;
  readonly resultEmpty: string;
  readonly resultCaptured: string;
  readonly technologyDescriptions: Readonly<Record<string, string>>;
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

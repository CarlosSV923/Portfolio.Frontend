"use client";

import { TechIcon } from "../tech-icon";

import type { Segment, SnakeCopy } from "./types";

export function SnakeBoard({
  columns,
  rows,
  snake,
  food,
  foodLabel,
}: Readonly<{
  columns: number;
  rows: number;
  snake: readonly Segment[];
  food: Segment | null;
  foodLabel: SnakeCopy["food"];
}>) {
  return (
    <div
      className="snake-board"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        aspectRatio: `${columns} / ${rows}`,
      }}
    >
      {snake.map((segment, index) => (
        <article
          className={`skill-card snake-card ${index === 0 ? "snake-head" : ""}`}
          key={`${segment.name}-${index}`}
          style={{ gridColumn: segment.x + 1, gridRow: segment.y + 1 }}
        >
          <TechIcon name={segment.name} />
          <span>{segment.name}</span>
        </article>
      ))}

      {food && (
        <article
          className="skill-card snake-card snake-food"
          style={{ gridColumn: food.x + 1, gridRow: food.y + 1 }}
        >
          <span className="snake-food-label">{foodLabel}</span>
          <TechIcon name={food.name} />
          <span>{food.name}</span>
        </article>
      )}
    </div>
  );
}

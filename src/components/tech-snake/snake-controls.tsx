"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

import { directions } from "./game";
import type { Direction, SnakeCopy } from "./types";

export function SnakeControls({
  copy,
  disabled,
  onDirectionChange,
}: Readonly<{
  copy: SnakeCopy;
  disabled: boolean;
  onDirectionChange: (direction: Direction) => void;
}>) {
  return (
    <div className="snake-controls" aria-label={copy.instructions}>
      <button
        className="control-up"
        type="button"
        aria-label={copy.moveUp}
        disabled={disabled}
        onClick={() => onDirectionChange(directions.up)}
      >
        <ChevronUp />
      </button>
      <button
        className="control-left"
        type="button"
        aria-label={copy.moveLeft}
        disabled={disabled}
        onClick={() => onDirectionChange(directions.left)}
      >
        <ChevronLeft />
      </button>
      <button
        className="control-down"
        type="button"
        aria-label={copy.moveDown}
        disabled={disabled}
        onClick={() => onDirectionChange(directions.down)}
      >
        <ChevronDown />
      </button>
      <button
        className="control-right"
        type="button"
        aria-label={copy.moveRight}
        disabled={disabled}
        onClick={() => onDirectionChange(directions.right)}
      >
        <ChevronRight />
      </button>
    </div>
  );
}

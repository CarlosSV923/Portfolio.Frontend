import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { directions } from "./logic";
import type { Direction, SnakeCopy } from "./types";

// Arrow-key layout: up on top, left/down/right below.
const controls = [
  {
    direction: directions.up,
    Icon: ChevronUp,
    label: "moveUp",
    area: "col-start-2",
  },
  {
    direction: directions.left,
    Icon: ChevronLeft,
    label: "moveLeft",
    area: "col-start-1 row-start-2",
  },
  {
    direction: directions.down,
    Icon: ChevronDown,
    label: "moveDown",
    area: "col-start-2 row-start-2",
  },
  {
    direction: directions.right,
    Icon: ChevronRight,
    label: "moveRight",
    area: "col-start-3 row-start-2",
  },
] as const;

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
    <div
      role="group"
      aria-label={copy.instructions}
      className="mx-auto mb-3.5 grid w-fit grid-cols-3 grid-rows-2 gap-1.5"
    >
      {controls.map(({ direction, Icon, label, area }) => (
        <Button
          key={label}
          variant="outline"
          size="icon"
          className={area}
          aria-label={copy[label]}
          disabled={disabled}
          onClick={() => onDirectionChange(direction)}
        >
          <Icon />
        </Button>
      ))}
    </div>
  );
}

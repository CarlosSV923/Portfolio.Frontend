import { TechIcon } from "@/components/tech-icon";
import { cn } from "@/lib/utils";

import type { Board, Point, Segment } from "./types";

const cellPosition = ({ x, y }: Point) => ({
  gridColumn: x + 1,
  gridRow: y + 1,
});

function Cell({
  segment,
  className,
  children,
}: Readonly<{
  segment: Segment;
  className?: string;
  children?: React.ReactNode;
}>) {
  return (
    <li
      className={cn(
        "relative flex min-h-0 min-w-0 flex-col items-center justify-center gap-1 rounded-lg border border-border bg-card px-0.5 py-1 text-center shadow-sm",
        className,
      )}
      style={cellPosition(segment)}
    >
      {children}
      <TechIcon
        name={segment.name}
        className="size-[clamp(22px,3vw,32px)] text-[clamp(8px,1vw,11px)]"
      />
      <span className="max-w-full truncate text-[clamp(7px,0.8vw,9px)] font-semibold">
        {segment.name}
      </span>
    </li>
  );
}

export function SnakeBoard({
  size,
  snake,
  food,
  foodLabel,
  label,
}: Readonly<{
  size: Board;
  snake: readonly Segment[];
  food: Segment | null;
  foodLabel: string;
  label: string;
}>) {
  return (
    <ol
      aria-label={label}
      className="grid w-full gap-1.5 overflow-hidden rounded-xl border border-border bg-background bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-size-[24px_24px] p-2"
      style={{
        gridTemplateColumns: `repeat(${size.columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${size.rows}, minmax(0, 1fr))`,
        aspectRatio: `${size.columns} / ${size.rows}`,
      }}
    >
      {snake.map((segment, index) => (
        <Cell
          key={segment.name}
          segment={segment}
          className={cn(
            "animate-in fade-in-40 zoom-in-90 duration-150 motion-reduce:animate-none",
            index === 0 && "border-primary ring-2 ring-primary-soft",
          )}
        >
          {index === 0 && (
            <span
              className="absolute top-1.5 left-1.5 size-1.5 rounded-full bg-primary"
              aria-hidden="true"
            />
          )}
        </Cell>
      ))}

      {food && (
        <Cell
          key={`food-${food.name}`}
          segment={food}
          className="animate-food-pulse border-dashed border-primary bg-primary-soft motion-reduce:animate-none"
        >
          <span className="absolute top-1 right-1 text-[6px] font-semibold tracking-wider text-primary">
            {foodLabel}
          </span>
        </Cell>
      )}
    </ol>
  );
}

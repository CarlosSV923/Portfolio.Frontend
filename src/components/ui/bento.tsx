import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** 12-column grid on large screens; cards choose their span. */
export function BentoGrid({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12",
        className,
      )}
      {...props}
    />
  );
}

export function BentoCard({ className, ...props }: ComponentProps<"article">) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-card-foreground sm:p-7",
        className,
      )}
      {...props}
    />
  );
}

/** Small accent label above a card or section title. */
export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("text-sm font-semibold text-primary", className)}
      {...props}
    />
  );
}

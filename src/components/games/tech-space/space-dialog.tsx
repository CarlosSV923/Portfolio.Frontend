"use client";

import { ArrowUp, RotateCcw, X } from "lucide-react";

import { GameDialog } from "@/components/games/shared/game-dialog";
import { TechIcon } from "@/components/tech-icon";
import { Button } from "@/components/ui/button";
import type { PortfolioText } from "@/types/portfolio";

export type SpaceCopy = PortfolioText["space"];
export type DialogPhase = "welcome" | "lost" | "won";

const launchKeys = ["SPACE", "↑", "W"];

export function SpaceDialog({
  phase,
  copy,
  score,
  total,
  crashedTechnology,
  onReady,
  onRestart,
  onExit,
  onCloseAutoFocus,
}: Readonly<{
  phase: DialogPhase | null;
  copy: SpaceCopy;
  score: number;
  total: number;
  crashedTechnology?: string;
  onReady: () => void;
  onRestart: () => void;
  onExit: () => void;
  onCloseAutoFocus: (event: Event) => void;
}>) {
  const descriptions: Readonly<Record<string, string>> =
    copy.technologyDescriptions;
  const shared = {
    open: phase !== null,
    label: copy.play,
    onDismiss: onExit,
    onCloseAutoFocus,
  };

  if (phase === "welcome" || phase === null) {
    return (
      <GameDialog
        {...shared}
        title={copy.welcomeTitle}
        description={copy.welcomeBody}
      >
        <div
          className="flex flex-wrap items-center justify-center gap-2"
          aria-hidden="true"
        >
          {launchKeys.map((key) => (
            <kbd
              key={key}
              className="min-w-9 rounded-md border border-border bg-secondary px-2 py-1 text-xs font-bold"
            >
              {key}
            </kbd>
          ))}
          <span className="text-xs text-subtle-foreground">{copy.orTap}</span>
        </div>
        <Button size="lg" className="mx-auto" onClick={onReady}>
          <ArrowUp />
          {copy.welcomeAction}
        </Button>
      </GameDialog>
    );
  }

  const isWon = phase === "won";

  return (
    <GameDialog
      {...shared}
      title={isWon ? copy.wonTitle : copy.lostTitle}
      description={isWon ? copy.wonBody : copy.lostBody}
    >
      {!isWon && crashedTechnology && (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary px-3 py-2.5 text-left">
          <TechIcon name={crashedTechnology} className="size-10.5" />
          <div className="grid gap-0.5">
            <strong className="text-sm">{crashedTechnology}</strong>
            <span className="text-xs leading-snug text-muted-foreground">
              {descriptions[crashedTechnology]}
            </span>
          </div>
        </div>
      )}
      <p className="font-heading text-3xl font-extrabold text-primary tabular-nums">
        {score} / {total}
        <span className="block text-xs font-semibold text-muted-foreground">
          {copy.score}
        </span>
      </p>
      <div className="flex flex-wrap justify-center gap-2.5">
        <Button onClick={onRestart}>
          <RotateCcw />
          {copy.restart}
        </Button>
        <Button variant="outline" onClick={onExit}>
          <X />
          {copy.exit}
        </Button>
      </div>
    </GameDialog>
  );
}

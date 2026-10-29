"use client";

import { Gamepad2, RotateCcw, X } from "lucide-react";

import { GameDialog } from "@/components/games/shared/game-dialog";
import { TechIcon } from "@/components/tech-icon";
import { Button } from "@/components/ui/button";

import type { SnakeCopy } from "./types";

type FocusProps = { readonly onCloseAutoFocus: (event: Event) => void };

export function WelcomeDialog({
  open,
  copy,
  onStart,
  onCloseAutoFocus,
}: Readonly<{
  open: boolean;
  copy: SnakeCopy;
  onStart: () => void;
}> &
  FocusProps) {
  return (
    <GameDialog
      open={open}
      label={copy.play}
      title={copy.welcomeTitle}
      description={copy.welcomeBody}
      onDismiss={onStart}
      onCloseAutoFocus={onCloseAutoFocus}
    >
      <Button size="lg" className="mx-auto" onClick={onStart}>
        <Gamepad2 />
        {copy.welcomeAction}
      </Button>
    </GameDialog>
  );
}

export function ResultDialog({
  open,
  copy,
  isWon,
  unlocked,
  onRestart,
  onExit,
  onCloseAutoFocus,
}: Readonly<{
  open: boolean;
  copy: SnakeCopy;
  isWon: boolean;
  unlocked: readonly string[];
  onRestart: () => void;
  onExit: () => void;
}> &
  FocusProps) {
  const message = isWon ? copy.resultWonBody : copy.resultLostBody;
  const descriptions: Readonly<Record<string, string>> =
    copy.technologyDescriptions;

  return (
    <GameDialog
      open={open}
      label={copy.play}
      title={isWon ? copy.resultWonTitle : copy.resultLostTitle}
      description={unlocked.length > 0 ? message : copy.resultEmpty}
      onDismiss={onExit}
      onCloseAutoFocus={onCloseAutoFocus}
      className="sm:max-w-lg"
    >
      {unlocked.length > 0 && (
        <section className="rounded-xl border border-border bg-secondary p-4 text-left">
          <h3 className="mb-3 text-sm font-bold">{copy.resultCaptured}</h3>
          <ul className="grid gap-2.5">
            {unlocked.map((name) => (
              <li key={name} className="flex items-center gap-3">
                <TechIcon name={name} className="size-8.5 text-[10px]" />
                <div className="grid gap-0.5">
                  <strong className="text-xs">{name}</strong>
                  <span className="text-xs leading-snug text-subtle-foreground">
                    {descriptions[name]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="flex justify-center gap-2.5">
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

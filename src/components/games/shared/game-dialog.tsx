"use client";

import type { ComponentProps, ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/** Small uppercase label used in the game HUDs and dialogs. */
export function GameLabel({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-[10px] font-semibold tracking-[0.1em] text-subtle-foreground uppercase",
        className,
      )}
      {...props}
    />
  );
}

type GameDialogProps = Readonly<{
  open: boolean;
  label: string;
  title: string;
  description: ReactNode;
  /** Escape key: each game decides whether it starts, retries or exits. */
  onDismiss: () => void;
  /** Where focus goes when the dialog closes, so the game gets the keys. */
  onCloseAutoFocus?: (event: Event) => void;
  className?: string;
  children?: ReactNode;
}>;

/** Welcome and result dialog shared by both games. */
export function GameDialog({
  open,
  label,
  title,
  description,
  onDismiss,
  onCloseAutoFocus,
  className,
  children,
}: GameDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onDismiss()}>
      <DialogContent
        showCloseButton={false}
        // Clicking the board behind it must not count as an answer.
        onInteractOutside={(event) => event.preventDefault()}
        onCloseAutoFocus={onCloseAutoFocus}
        // Closes instantly: the content changes as soon as the game resets.
        className={cn(
          "max-h-[calc(100dvh-2rem)] gap-5 overflow-y-auto rounded-2xl bg-card p-7 text-center data-[state=closed]:animate-none! sm:max-w-md",
          className,
        )}
      >
        <DialogHeader className="items-center gap-3 text-center sm:text-center">
          <GameLabel>{label}</GameLabel>
          <DialogTitle className="text-2xl leading-tight font-bold sm:text-3xl">
            {title}
          </DialogTitle>
          <DialogDescription className="max-w-sm leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

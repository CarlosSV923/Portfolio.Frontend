"use client";

import { ArrowUp, RotateCcw, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { TechIcon } from "../tech-icon";
import type { PortfolioText } from "@/types/portfolio";

type SpaceCopy = PortfolioText["space"];

export function SpaceModal({
  copy,
  result,
  score,
  total,
  crashedTechnology,
  onReady,
  onRestart,
  onExit,
}: Readonly<{
  copy: SpaceCopy;
  result: "welcome" | "lost" | "won";
  score: number;
  total: number;
  crashedTechnology?: string;
  onReady: () => void;
  onRestart: () => void;
  onExit: () => void;
}>) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    dialog?.querySelector<HTMLButtonElement>("button")?.focus();

    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="space-modal"
      aria-labelledby="space-modal-title"
      onCancel={(event) => {
        event.preventDefault();
        onExit();
      }}
    >
      <span className="micro-label">TECH-SPACE</span>
      {result === "welcome" ? (
        <>
          <h2 id="space-modal-title">{copy.welcomeTitle}</h2>
          <p>{copy.welcomeBody}</p>
          <div className="space-modal-controls" aria-hidden="true">
            <kbd>SPACE</kbd>
            <kbd>↑</kbd>
            <kbd>W</kbd>
            <span>{copy.orTap}</span>
          </div>
          <button
            className="snake-button space-modal-primary"
            onClick={onReady}
          >
            <ArrowUp size={17} />
            {copy.welcomeAction}
          </button>
        </>
      ) : (
        <>
          <h2 id="space-modal-title">
            {result === "won" ? copy.wonTitle : copy.lostTitle}
          </h2>
          <p>{result === "won" ? copy.wonBody : copy.lostBody}</p>
          {result === "lost" && crashedTechnology && (
            <div className="space-modal-collision">
              <TechIcon name={crashedTechnology} />
              <div>
                <strong>{crashedTechnology}</strong>
                <span>
                  {
                    copy.technologyDescriptions[
                      crashedTechnology as keyof typeof copy.technologyDescriptions
                    ]
                  }
                </span>
              </div>
            </div>
          )}
          <strong className="space-modal-score">
            {score} / {total} <span>{copy.score}</span>
          </strong>
          <div className="space-modal-actions">
            <button
              className="snake-button space-modal-primary"
              onClick={onRestart}
            >
              <RotateCcw size={17} />
              {copy.restart}
            </button>
            <button className="snake-button" onClick={onExit}>
              <X size={17} />
              {copy.exit}
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}

"use client";

import { Gamepad2, RotateCcw, X } from "lucide-react";

import { TechIcon } from "../tech-icon";

import type { SnakeCopy } from "./types";

export function WelcomeModal({
  copy,
  onClose,
}: Readonly<{
  copy: SnakeCopy;
  onClose: () => void;
}>) {
  return (
    <div className="snake-welcome-backdrop">
      <section
        aria-labelledby="snake-welcome-title"
        aria-modal="true"
        className="snake-welcome-modal"
        role="dialog"
      >
        <span className="micro-label">TECH-SNAKE</span>
        <h3 id="snake-welcome-title">{copy.welcomeTitle}</h3>
        <p>{copy.welcomeBody}</p>
        <button
          autoFocus
          className="snake-button"
          type="button"
          onClick={onClose}
        >
          <Gamepad2 size={18} />
          {copy.welcomeAction}
        </button>
      </section>
    </div>
  );
}

export function ResultModal({
  copy,
  isWon,
  unlocked,
  onRestart,
  onExit,
}: Readonly<{
  copy: SnakeCopy;
  isWon: boolean;
  unlocked: readonly string[];
  onRestart: () => void;
  onExit: () => void;
}>) {
  const title = isWon ? copy.resultWonTitle : copy.resultLostTitle;
  const message = isWon ? copy.resultWonBody : copy.resultLostBody;

  return (
    <div className="snake-result-backdrop">
      <section
        aria-labelledby="snake-result-title"
        aria-modal="true"
        className="snake-result-modal"
        role="dialog"
      >
        <span className="micro-label">TECH-SNAKE</span>
        <h3 id="snake-result-title">{title}</h3>
        <p className="snake-result-message">
          {unlocked.length > 0 ? message : copy.resultEmpty}
        </p>

        {unlocked.length > 0 && (
          <div className="snake-result-captured">
            <h4>{copy.resultCaptured}</h4>
            <ul>
              {unlocked.map((name) => (
                <li key={name}>
                  <TechIcon name={name} />
                  <div>
                    <strong>{name}</strong>
                    <span>{copy.technologyDescriptions[name]}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="snake-result-actions">
          <button
            autoFocus
            className="snake-result-action snake-result-action--primary"
            type="button"
            onClick={onRestart}
          >
            <RotateCcw size={17} />
            {copy.restart}
          </button>
          <button
            className="snake-result-action"
            type="button"
            onClick={onExit}
          >
            <X size={18} />
            {copy.exit}
          </button>
        </div>
      </section>
    </div>
  );
}

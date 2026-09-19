"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
};

type Flight = {
  start: Point;
  end: Point;
  startedAt: number;
  duration: number;
  waveAmplitude: number;
  waveCount: number;
};

const edgeCount = 4;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pointOnEdge(
  edge: number,
  width: number,
  height: number,
  margin: number,
): Point {
  switch (edge) {
    case 0:
      return { x: randomBetween(0, width), y: -margin };
    case 1:
      return { x: width + margin, y: randomBetween(0, height) };
    case 2:
      return { x: randomBetween(0, width), y: height + margin };
    default:
      return { x: -margin, y: randomBetween(0, height) };
  }
}

function createFlight(
  time: number,
  width: number,
  height: number,
  shipSize: number,
): Flight {
  const entryEdge = Math.floor(Math.random() * edgeCount);
  const oppositeEdge = (entryEdge + 2) % edgeCount;
  const adjacentEdge = (entryEdge + (Math.random() > 0.5 ? 1 : 3)) % edgeCount;
  const exitEdge = Math.random() < 0.72 ? oppositeEdge : adjacentEdge;
  const margin = shipSize * 0.9;
  const start = pointOnEdge(entryEdge, width, height, margin);
  const end = pointOnEdge(exitEdge, width, height, margin);
  const distance = Math.hypot(end.x - start.x, end.y - start.y);
  const speed = randomBetween(58, 88);
  const isStraightFlight = Math.random() < 0.34;

  return {
    start,
    end,
    startedAt: time,
    duration: Math.max(8_000, (distance / speed) * 1_000),
    waveAmplitude: isStraightFlight
      ? 0
      : randomBetween(18, Math.min(62, height * 0.11)),
    waveCount: [1, 1.5, 2][Math.floor(Math.random() * 3)],
  };
}

export function SpaceshipBackground({
  paused = false,
}: Readonly<{ paused?: boolean }>) {
  const layerRef = useRef<HTMLDivElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const ship = shipRef.current;
    if (!layer || !ship) return;
    if (paused) {
      ship.style.opacity = "0";
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let flight: Flight | undefined;
    let nextFlightAt = 0;
    let width = layer.clientWidth;
    let height = layer.clientHeight;
    let shipSize = ship.offsetWidth;

    const resetFlight = () => {
      width = layer.clientWidth;
      height = layer.clientHeight;
      shipSize = ship.offsetWidth;
      flight = undefined;
      nextFlightAt = 0;
      ship.style.opacity = "0";
    };

    const animate = (time: number) => {
      if (reducedMotion.matches) {
        ship.style.opacity = "0";
        frame = 0;
        return;
      }

      if (width === 0 || height === 0) {
        frame = window.requestAnimationFrame(animate);
        return;
      }

      if (!flight && time >= nextFlightAt) {
        flight = createFlight(time, width, height, shipSize);
      }

      if (flight) {
        const progress = Math.min(
          1,
          (time - flight.startedAt) / flight.duration,
        );
        const deltaX = flight.end.x - flight.start.x;
        const deltaY = flight.end.y - flight.start.y;
        const distance = Math.max(1, Math.hypot(deltaX, deltaY));
        const perpendicularX = -deltaY / distance;
        const perpendicularY = deltaX / distance;
        const waveRadians = progress * Math.PI * 2 * flight.waveCount;
        const waveOffset = Math.sin(waveRadians) * flight.waveAmplitude;
        const x =
          flight.start.x + deltaX * progress + perpendicularX * waveOffset;
        const y =
          flight.start.y + deltaY * progress + perpendicularY * waveOffset;
        const waveSlope =
          Math.cos(waveRadians) *
          flight.waveAmplitude *
          Math.PI *
          2 *
          flight.waveCount;
        const directionX = deltaX + perpendicularX * waveSlope;
        const directionY = deltaY + perpendicularY * waveSlope;
        const rotation =
          (Math.atan2(directionY, directionX) * 180) / Math.PI + 90;
        const fade = Math.min(1, progress / 0.07, (1 - progress) / 0.07);

        ship.style.opacity = `${Math.max(0, fade)}`;
        ship.style.transform = `translate3d(${x - shipSize / 2}px, ${y - shipSize / 2}px, 0) rotate(${rotation}deg)`;

        if (progress === 1) {
          flight = undefined;
          ship.style.opacity = "0";
          nextFlightAt = time + randomBetween(700, 1_900);
        }
      }

      frame = window.requestAnimationFrame(animate);
    };

    const handleMotionPreference = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      resetFlight();

      if (!reducedMotion.matches) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const observer = new ResizeObserver(resetFlight);
    observer.observe(layer);
    resetFlight();
    reducedMotion.addEventListener("change", handleMotionPreference);
    handleMotionPreference();

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", handleMotionPreference);
      window.cancelAnimationFrame(frame);
    };
  }, [paused]);

  return (
    <div className="hero-spaceship-layer" ref={layerRef} aria-hidden="true">
      <div className="hero-spaceship" ref={shipRef}>
        <img
          src="/icons/icon_spaceship.png"
          alt=""
          width={512}
          height={512}
          draggable={false}
        />
      </div>
    </div>
  );
}

import { describe, expect, it } from "vitest";

import {
  advance,
  createFlight,
  createGates,
  flap,
  getGameMetrics,
  hitsGate,
  physics,
  resizeFlight,
  type Gate,
} from "./logic";

describe("getGameMetrics", () => {
  it("uses the compact layout below 600px", () => {
    expect(getGameMetrics(500, 600)).toMatchObject({
      shipSize: 46,
      gateWidth: 96,
      gateSpacing: 265,
      speed: 145,
    });
  });

  it("keeps gap, spacing and speed within their bounds on wide stages", () => {
    const metrics = getGameMetrics(4000, 2000);

    expect(metrics.shipX).toBe(230);
    expect(metrics.gapHeight).toBe(240);
    expect(metrics.gateSpacing).toBe(400);
    expect(metrics.speed).toBe(190);
  });
});

describe("createGates", () => {
  const metrics = getGameMetrics(1200, 600);

  it("spaces gates evenly from the right edge", () => {
    const gates = createGates(4, metrics);

    expect(gates).toHaveLength(4);
    gates.forEach((gate, index) => {
      expect(gate.x).toBeCloseTo(
        metrics.width - metrics.gateWidth / 2 + index * metrics.gateSpacing,
      );
      expect(gate.passed).toBe(false);
    });
  });

  it("keeps every gap fully inside the stage", () => {
    for (const gate of createGates(50, metrics)) {
      expect(gate.gapCenter - metrics.gapHeight / 2).toBeGreaterThan(0);
      expect(gate.gapCenter + metrics.gapHeight / 2).toBeLessThan(
        metrics.height,
      );
    }
  });
});

describe("hitsGate", () => {
  const metrics = getGameMetrics(1200, 600);
  const gateAtShip: Gate = {
    x: metrics.shipX - metrics.gateWidth / 2,
    gapCenter: 300,
    passed: false,
  };

  it("does not collide while the ship flies through the gap", () => {
    expect(hitsGate(300, gateAtShip, metrics)).toBe(false);
  });

  it("collides with the top and bottom of the gate", () => {
    expect(hitsGate(300 - metrics.gapHeight / 2, gateAtShip, metrics)).toBe(
      true,
    );
    expect(hitsGate(300 + metrics.gapHeight / 2, gateAtShip, metrics)).toBe(
      true,
    );
  });

  it("ignores gates that are not in the ship's column", () => {
    const farGate = { ...gateAtShip, x: metrics.shipX + 500 };

    expect(hitsGate(0, farGate, metrics)).toBe(false);
  });
});

describe("advance", () => {
  const metrics = getGameMetrics(1200, 600);
  // Gaps centred on the ship's starting height.
  const centred = () => 0.5;

  it("pulls the ship down with gravity, capped at the max fall speed", () => {
    const flight = createFlight(1, metrics, centred);

    advance(flight, 0.02);
    expect(flight.velocity).toBeCloseTo(physics.gravity * 0.02);
    expect(flight.shipY).toBeGreaterThan(metrics.height / 2);

    flight.velocity = physics.maxFallSpeed;
    advance(flight, 0.02);
    expect(flight.velocity).toBe(physics.maxFallSpeed);
  });

  it("clamps long frames so a lag spike can't skip through a gate", () => {
    const flight = createFlight(1, metrics, centred);
    const startX = flight.gates[0].x;

    advance(flight, 5);
    expect(startX - flight.gates[0].x).toBeCloseTo(
      metrics.speed * physics.maxStep,
    );
  });

  it("makes the ship climb after a flap", () => {
    const flight = createFlight(1, metrics, centred);

    flap(flight);
    advance(flight, 0.02);
    expect(flight.shipY).toBeLessThan(metrics.height / 2);
  });

  it("crashes when the ship leaves the stage", () => {
    const flight = createFlight(1, metrics, centred);
    flight.shipY = metrics.height - 1;

    expect(advance(flight, 0.02)).toBe("crashed");
    expect(flight.crashedGate).toBeNull();
  });

  it("records the gate the ship crashed into", () => {
    const flight = createFlight(2, metrics, centred);
    flight.gates[1].x = metrics.shipX - metrics.gateWidth / 2;
    flight.gates[1].gapCenter = 120;

    expect(advance(flight, 0.01)).toBe("crashed");
    expect(flight.crashedGate).toBe(1);
  });

  it("scores each gate once and wins after the last one", () => {
    const flight = createFlight(1, metrics, centred);
    flight.gates[0].x = metrics.shipX - metrics.gateWidth - 30;

    expect(advance(flight, 0.01)).toBe("won");
    expect(flight.score).toBe(1);
    expect(flight.gates[0].passed).toBe(true);
  });
});

describe("resizeFlight", () => {
  it("keeps the ship and gaps at the same relative height", () => {
    const flight = createFlight(1, getGameMetrics(1200, 600), () => 0.5);
    const gap = flight.gates[0].gapCenter;

    resizeFlight(flight, getGameMetrics(1200, 300));
    expect(flight.shipY).toBe(150);
    expect(flight.gates[0].gapCenter).toBeCloseTo(gap / 2);
    expect(flight.metrics.height).toBe(300);
  });
});

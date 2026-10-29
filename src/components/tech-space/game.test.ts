import { describe, expect, it } from "vitest";

import { createGates, getGameMetrics, hitsGate, type Gate } from "./game";

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

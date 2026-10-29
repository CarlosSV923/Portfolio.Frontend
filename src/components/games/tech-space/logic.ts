export type Gate = {
  x: number;
  gapCenter: number;
  passed: boolean;
};

export type GameMetrics = {
  width: number;
  height: number;
  shipX: number;
  shipSize: number;
  gateWidth: number;
  gapHeight: number;
  gateSpacing: number;
  speed: number;
};

/** Mutable flight state, advanced in place on every animation frame. */
export type Flight = {
  metrics: GameMetrics;
  gates: Gate[];
  shipY: number;
  velocity: number;
  score: number;
  /** Index of the gate the ship crashed into, if any. */
  crashedGate: number | null;
};

export type FlightStatus = "flying" | "crashed" | "won";

export const physics = {
  gravity: 840,
  maxFallSpeed: 520,
  flapVelocity: -330,
  /** Longest frame the simulation accepts, in seconds, so lag can't tunnel. */
  maxStep: 0.04,
} as const;

export function getGameMetrics(width: number, height: number): GameMetrics {
  const compact = width < 600;

  return {
    width,
    height,
    shipX: Math.min(width * 0.25, 230),
    shipSize: compact ? 46 : 58,
    gateWidth: compact ? 96 : 132,
    gapHeight: Math.min(240, Math.max(196, height * 0.4)),
    gateSpacing: compact ? 265 : Math.min(400, Math.max(310, width * 0.31)),
    speed: compact ? 145 : Math.min(190, Math.max(155, width * 0.15)),
  };
}

export function createGates(
  count: number,
  metrics: GameMetrics,
  random: () => number = Math.random,
): Gate[] {
  const halfGap = metrics.gapHeight / 2;
  const minCenter = halfGap + 105;
  const maxCenter = metrics.height - halfGap - 105;

  return Array.from({ length: count }, (_, index) => ({
    x: metrics.width - metrics.gateWidth / 2 + index * metrics.gateSpacing,
    gapCenter: minCenter + random() * Math.max(0, maxCenter - minCenter),
    passed: false,
  }));
}

export function createFlight(
  gateCount: number,
  metrics: GameMetrics,
  random?: () => number,
): Flight {
  return {
    metrics,
    gates: createGates(gateCount, metrics, random),
    shipY: metrics.height / 2,
    velocity: 0,
    score: 0,
    crashedGate: null,
  };
}

const shipRadius = (metrics: GameMetrics) => metrics.shipSize * 0.3;

export function hitsGate(shipY: number, gate: Gate, metrics: GameMetrics) {
  const radius = shipRadius(metrics);
  const gapTop = gate.gapCenter - metrics.gapHeight / 2;
  const gapBottom = gate.gapCenter + metrics.gapHeight / 2;
  const insideColumn =
    metrics.shipX + radius > gate.x + 6 &&
    metrics.shipX - radius < gate.x + metrics.gateWidth - 6;

  return (
    insideColumn && (shipY - radius < gapTop || shipY + radius > gapBottom)
  );
}

export function flap(flight: Flight) {
  flight.velocity = physics.flapVelocity;
}

/** Moves the ship and the gates forward by `seconds`. */
export function advance(flight: Flight, seconds: number): FlightStatus {
  const dt = Math.min(seconds, physics.maxStep);
  const { metrics } = flight;
  const radius = shipRadius(metrics);

  flight.velocity = Math.min(
    physics.maxFallSpeed,
    flight.velocity + physics.gravity * dt,
  );
  flight.shipY += flight.velocity * dt;

  if (flight.shipY - radius < 0 || flight.shipY + radius > metrics.height) {
    return "crashed";
  }

  for (const [index, gate] of flight.gates.entries()) {
    gate.x -= metrics.speed * dt;

    if (hitsGate(flight.shipY, gate, metrics)) {
      flight.crashedGate = index;
      return "crashed";
    }
    if (!gate.passed && gate.x + metrics.gateWidth < metrics.shipX - radius) {
      gate.passed = true;
      flight.score += 1;
    }
  }

  return flight.score === flight.gates.length ? "won" : "flying";
}

/** Keeps the ship and the gaps at the same relative height after a resize. */
export function resizeFlight(flight: Flight, metrics: GameMetrics) {
  const ratio = metrics.height / flight.metrics.height;

  flight.shipY *= ratio;
  for (const gate of flight.gates) gate.gapCenter *= ratio;
  flight.metrics = metrics;
}

/** Nose-up when climbing, nose-down when falling, in degrees. */
export function shipTilt(velocity: number) {
  return Math.max(-22, Math.min(55, velocity * 0.065));
}

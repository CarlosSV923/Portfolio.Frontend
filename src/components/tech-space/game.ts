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

export function createGates(count: number, metrics: GameMetrics): Gate[] {
  const halfGap = metrics.gapHeight / 2;
  const minCenter = halfGap + 105;
  const maxCenter = metrics.height - halfGap - 105;

  return Array.from({ length: count }, (_, index) => ({
    x: metrics.width - metrics.gateWidth / 2 + index * metrics.gateSpacing,
    gapCenter: minCenter + Math.random() * Math.max(0, maxCenter - minCenter),
    passed: false,
  }));
}

export function hitsGate(shipY: number, gate: Gate, metrics: GameMetrics) {
  const radius = metrics.shipSize * 0.3;
  const gapTop = gate.gapCenter - metrics.gapHeight / 2;
  const gapBottom = gate.gapCenter + metrics.gapHeight / 2;
  const insideColumn =
    metrics.shipX + radius > gate.x + 6 &&
    metrics.shipX - radius < gate.x + metrics.gateWidth - 6;

  return (
    insideColumn && (shipY - radius < gapTop || shipY + radius > gapBottom)
  );
}

export type Particle = {
  element: HTMLButtonElement;
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  visible: boolean;
};

const bounceStrength = 0.82;

export function keepInside(particle: Particle, width: number, height: number) {
  const maxX = Math.max(0, width - particle.width);
  const maxY = Math.max(0, height - particle.height);

  if (particle.x < 0) {
    particle.x = 0;
    particle.vx = Math.abs(particle.vx) * bounceStrength;
  } else if (particle.x > maxX) {
    particle.x = maxX;
    particle.vx = -Math.abs(particle.vx) * bounceStrength;
  }

  if (particle.y < 0) {
    particle.y = 0;
    particle.vy = Math.abs(particle.vy) * bounceStrength;
  } else if (particle.y > maxY) {
    particle.y = maxY;
    particle.vy = -Math.abs(particle.vy) * bounceStrength;
  }
}

export function collide(first: Particle, second: Particle) {
  const dx = first.x + first.width / 2 - second.x - second.width / 2;
  const dy = first.y + first.height / 2 - second.y - second.height / 2;
  const overlapX = (first.width + second.width) / 2 - Math.abs(dx);
  const overlapY = (first.height + second.height) / 2 - Math.abs(dy);

  if (overlapX <= 0 || overlapY <= 0) return;

  if (overlapX < overlapY) {
    const direction = Math.sign(dx) || 1;
    first.x += (direction * overlapX) / 2;
    second.x -= (direction * overlapX) / 2;

    if ((first.vx - second.vx) * direction < 0) {
      [first.vx, second.vx] = [
        second.vx * bounceStrength,
        first.vx * bounceStrength,
      ];
    }
  } else {
    const direction = Math.sign(dy) || 1;
    first.y += (direction * overlapY) / 2;
    second.y -= (direction * overlapY) / 2;

    if ((first.vy - second.vy) * direction < 0) {
      [first.vy, second.vy] = [
        second.vy * bounceStrength,
        first.vy * bounceStrength,
      ];
    }
  }
}

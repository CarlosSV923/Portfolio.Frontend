"use client";

import { useEffect, useRef } from "react";
import { collide, keepInside, type Particle } from "./floating-code-physics";

const glyphCount = 16;
const stopSpeed = 12;

export function FloatingCode({
  hint,
  actionLabel,
}: Readonly<{ hint: string; actionLabel: string }>) {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const hero = field?.parentElement;
    if (!field || !hero) return;

    const elements = Array.from(
      field.querySelectorAll<HTMLButtonElement>(".hero-code-glyph"),
    );
    let particles: Particle[] = [];
    let frame = 0;
    let previousTime = 0;
    let width = 0;
    let height = 0;

    const draw = (particle: Particle) => {
      particle.element.style.left = `${particle.x}px`;
      particle.element.style.top = `${particle.y}px`;
    };

    const layout = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      width = field.clientWidth;
      height = field.clientHeight;

      particles = elements.map((element) => {
        element.classList.remove("is-flying");
        element.style.left = "";
        element.style.top = "";
        element.style.right = "";
        element.style.bottom = "";

        const particle = {
          element,
          x: element.offsetLeft,
          y: element.offsetTop,
          width: element.offsetWidth,
          height: element.offsetHeight,
          vx: 0,
          vy: 0,
          visible: element.offsetWidth > 0,
        };

        element.style.right = "auto";
        element.style.bottom = "auto";
        draw(particle);
        return particle;
      });
    };

    const animate = (time: number) => {
      const seconds = previousTime
        ? Math.min((time - previousTime) / 1000, 0.04)
        : 1 / 60;
      previousTime = time;
      const friction = Math.pow(0.991, seconds * 60);

      for (const particle of particles) {
        if (!particle.visible) continue;
        particle.x += particle.vx * seconds;
        particle.y += particle.vy * seconds;
        particle.vx *= friction;
        particle.vy *= friction;
      }

      for (let i = 0; i < particles.length; i++) {
        if (!particles[i].visible) continue;
        for (let j = i + 1; j < particles.length; j++) {
          if (particles[j].visible) collide(particles[i], particles[j]);
        }
      }

      let moving = false;
      for (const particle of particles) {
        if (!particle.visible) continue;
        keepInside(particle, width, height);

        if (Math.hypot(particle.vx, particle.vy) < stopSpeed) {
          particle.vx = 0;
          particle.vy = 0;
          particle.element.classList.remove("is-flying");
        } else {
          particle.element.classList.add("is-flying");
          moving = true;
        }

        draw(particle);
      }

      frame = moving ? window.requestAnimationFrame(animate) : 0;
    };

    const launch = (index: number) => {
      const particle = particles[index];
      if (!particle?.visible) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        particle.x = Math.random() * Math.max(0, width - particle.width);
        particle.y = Math.random() * Math.max(0, height - particle.height);
        draw(particle);
        return;
      }

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.min(650, Math.max(380, width * 0.68));
      particle.vx = Math.cos(angle) * speed;
      particle.vy = Math.sin(angle) * speed;
      particle.element.classList.add("is-flying");

      if (!frame) {
        previousTime = 0;
        frame = window.requestAnimationFrame(animate);
      }
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      if (target.closest(".hero-code-hint")) {
        const visible = particles.flatMap((particle, index) =>
          particle.visible ? [index] : [],
        );
        if (visible.length)
          launch(visible[Math.floor(Math.random() * visible.length)]);
        return;
      }

      const glyph = target.closest<HTMLButtonElement>(".hero-code-glyph");
      if (glyph) {
        launch(elements.indexOf(glyph));
        return;
      }

      if (target.closest("a, button, .portrait-frame, .code-card")) return;

      const index = particles.findIndex((particle) => {
        if (!particle.visible) return false;
        const rect = particle.element.getBoundingClientRect();
        return (
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        );
      });

      if (index !== -1) launch(index);
    };

    const observer = new ResizeObserver(layout);
    observer.observe(field);
    hero.addEventListener("click", handleClick);
    layout();

    return () => {
      observer.disconnect();
      hero.removeEventListener("click", handleClick);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="hero-code-background" ref={fieldRef}>
      {Array.from({ length: glyphCount }, (_, index) => (
        <button
          className="hero-code-glyph"
          type="button"
          key={index}
          tabIndex={-1}
          aria-label={`${actionLabel} ${index + 1}`}
        >
          <span className="hero-code-glyph-mark" aria-hidden="true">
            &lt;/&gt;
          </span>
        </button>
      ))}
      <button className="hero-code-hint" type="button">
        {hint}
      </button>
    </div>
  );
}

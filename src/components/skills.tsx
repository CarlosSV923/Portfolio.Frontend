"use client";

import { Code2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { SectionHeading } from "./section-heading";
import { TechnologySnake } from "./technology-snake";
import type { SectionProps } from "@/types/portfolio";

export function Skills({ data, text }: Readonly<SectionProps>) {
  const [isGameActive, setIsGameActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isGameActive) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [isGameActive]);

  return (
    <section ref={sectionRef} id="skills" className="container section">
      {isGameActive ? (
        <div className="section-heading snake-active-heading">
          <h2>{text.snake.gameTitle}</h2>
          <span className="heading-rule" />
        </div>
      ) : (
        <SectionHeading
          eyebrow={text.skills}
          title={text.skillsTitle}
          text={text.skillsText}
        />
      )}
      <div className="skills-group">
        <h3 className="column-title">
          <Code2 size={20} />
          {text.tech}
        </h3>
        <TechnologySnake
          technologies={data.skills.tech}
          copy={text.snake}
          onActiveChange={setIsGameActive}
        />
      </div>
    </section>
  );
}

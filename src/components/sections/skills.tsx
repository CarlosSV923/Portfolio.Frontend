"use client";

import { Gamepad2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { TechIcon } from "@/components/tech-icon";
import { TechnologySnake } from "@/components/technology-snake";
import { BentoCard, BentoGrid, Eyebrow } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { allTechnologies } from "@/content/technologies";
import { cn } from "@/lib/utils";
import type { SectionProps } from "@/types/portfolio";

// Group cards on a 12-column row: wide groups first, the game card fills the rest.
const groupSpans = ["lg:col-span-6", "lg:col-span-6", "lg:col-span-5"];

export function Skills({ content }: Readonly<SectionProps>) {
  const text = content.ui;
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const exitGame = useCallback(() => setIsPlaying(false), []);

  useEffect(() => {
    if (!isPlaying) return;

    const animationFrame = window.requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [isPlaying]);

  return (
    <Section ref={sectionRef} id="skills">
      {isPlaying ? (
        <>
          <SectionHeading
            eyebrow={text.snake.play}
            title={text.snake.gameTitle}
          />
          <TechnologySnake
            technologies={allTechnologies(content)}
            copy={text.snake}
            onExit={exitGame}
          />
        </>
      ) : (
        <>
          <SectionHeading
            eyebrow={text.skills}
            title={text.skillsTitle}
            description={text.skillsText}
          />
          <BentoGrid>
            {content.skills.groups.map((group, i) => (
              <BentoCard
                key={group.name}
                className={cn("md:col-span-6", groupSpans[i])}
              >
                <h3 className="text-lg font-bold">{group.name}</h3>
                <ul className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-3">
                  {group.tech.map((technology) => (
                    <li
                      key={technology.name}
                      className="flex flex-col items-center gap-2 rounded-xl border border-border bg-secondary px-2 py-4 text-center text-xs font-semibold"
                    >
                      <TechIcon name={technology.name} className="size-9" />
                      {technology.name}
                    </li>
                  ))}
                </ul>
              </BentoCard>
            ))}

            <BentoCard className="flex flex-col justify-between gap-5 border-primary/40 bg-primary-soft/40 md:col-span-6 lg:col-span-7">
              <div>
                <Eyebrow className="flex items-center gap-2">
                  <Gamepad2 className="size-4" />
                  {text.snake.play}
                </Eyebrow>
                <p className="mt-2 font-heading text-xl font-bold max-[899px]:hidden">
                  {text.snake.intro}
                </p>
                <p className="mt-2 text-muted-foreground min-[900px]:hidden">
                  {text.snake.mobileIntro}
                </p>
              </div>
              <Button
                size="lg"
                className="self-start max-[899px]:hidden"
                onClick={() => setIsPlaying(true)}
              >
                <Gamepad2 />
                {text.snake.play}
              </Button>
            </BentoCard>
          </BentoGrid>
        </>
      )}
    </Section>
  );
}

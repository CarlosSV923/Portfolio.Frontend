"use client";

import { ArrowUpRight, Gamepad2, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { CodeCard } from "@/components/hero/code-card";
import { CvDownload } from "@/components/hero/cv-download";
import { DegreeCard } from "@/components/hero/degree-card";
import { SpaceshipBackground } from "@/components/hero/spaceship-background";
import { SocialLinks } from "@/components/social-links";
import { gameScreenQuery } from "@/components/games/shared/use-game-lifecycle";
import { TechSpace } from "@/components/games/tech-space/tech-space";
import { BentoCard, BentoGrid, Eyebrow } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { allTechnologies } from "@/content/technologies";
import { cn } from "@/lib/utils";
import type { Language, SectionProps } from "@/types/portfolio";

type HeroProps = SectionProps & { readonly language: Language };

const openingDelay = 300;

export function Hero({ content, language }: Readonly<HeroProps>) {
  const text = content.ui;
  const [isOpening, setIsOpening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const openingTimer = useRef<number | null>(null);

  const closeGame = () => {
    if (openingTimer.current) window.clearTimeout(openingTimer.current);
    openingTimer.current = null;
    setIsPlaying(false);
    setIsOpening(false);
  };

  const openGame = () => {
    if (isOpening || !window.matchMedia(gameScreenQuery).matches) return;
    setIsOpening(true);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    openingTimer.current = window.setTimeout(
      () => {
        setIsPlaying(true);
        openingTimer.current = null;
      },
      reducedMotion ? 0 : openingDelay,
    );
  };

  // TechSpace leaves by itself on small screens; only the timer needs cleanup.
  useEffect(
    () => () => {
      if (openingTimer.current) window.clearTimeout(openingTimer.current);
    },
    [],
  );

  if (isPlaying) {
    return (
      <section
        id="home"
        className="relative h-[clamp(540px,calc(100dvh-4rem),720px)]"
      >
        <TechSpace
          technologies={allTechnologies(content)}
          copy={text.space}
          onExit={closeGame}
        />
      </section>
    );
  }

  return (
    <section id="home" className="container-page pt-6 pb-4 sm:pt-10">
      <BentoGrid
        className={cn(
          "transition duration-300 ease-out motion-reduce:transition-none",
          isOpening && "pointer-events-none scale-[0.98] opacity-0",
        )}
      >
        <BentoCard className="flex flex-col justify-center gap-6 md:col-span-6 lg:col-span-7 lg:p-10">
          <div>
            <Eyebrow>{text.hello}</Eyebrow>
            <h1 className="mt-2 text-5xl font-extrabold tracking-tight sm:text-6xl">
              {content.general.firstName} {content.general.lastName}
            </h1>
            <p className="mt-3 font-heading text-xl font-semibold text-primary sm:text-2xl">
              {content.general.profession}
            </p>
          </div>
          <p className="max-w-xl text-lg text-muted-foreground">{text.intro}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#projects">
                {text.work}
                <ArrowUpRight />
              </a>
            </Button>
            <CvDownload
              language={language}
              label={text.cv}
              menuLabel={text.cvMenu}
              otherLabel={text.cvOther}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{text.contactMe}</span>
            <SocialLinks
              contact={content.contact}
              emailLabel={text.emailLabel}
            />
          </div>
        </BentoCard>

        <BentoCard className="min-h-80 p-0 sm:p-0 md:col-span-6 lg:col-span-5">
          <Image
            src={content.general.avatarPicture}
            alt="Carlos Sesme"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <p className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full border border-border bg-background/85 px-3 py-1.5 text-sm font-medium backdrop-blur">
            <MapPin className="size-4 text-primary" />
            {content.contact.address}
          </p>
        </BentoCard>

        <BentoCard className="md:col-span-3 lg:col-span-3">
          <CodeCard />
        </BentoCard>

        <BentoCard className="md:col-span-3 lg:col-span-5">
          <DegreeCard education={content.education} label={text.education} />
        </BentoCard>

        <BentoCard className="flex min-h-64 flex-col justify-between gap-4 md:col-span-6 lg:col-span-4">
          <SpaceshipBackground paused={isOpening} />
          <div className="relative">
            <Eyebrow className="flex items-center gap-2">
              <Gamepad2 className="size-4" />
              {text.space.play}
            </Eyebrow>
            <p className="mt-2 font-heading text-xl font-bold">
              {text.heroPlayPrompt}
            </p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              {text.space.teaser}
            </p>
          </div>
          <div className="relative">
            <Button size="lg" className="max-[899px]:hidden" onClick={openGame}>
              <Gamepad2 />
              {text.space.play}
            </Button>
            <p className="text-sm text-subtle-foreground min-[900px]:hidden">
              {text.space.mobileIntro}
            </p>
          </div>
        </BentoCard>
      </BentoGrid>
    </section>
  );
}

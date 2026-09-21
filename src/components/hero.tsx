"use client";

import { ArrowUpRight, Gamepad2, MapPin, Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CvDownload } from "./cv-download";
import { SpaceshipBackground } from "./spaceship-background";
import { SocialLinks } from "./social-links";
import { TechSpace } from "./tech-space/tech-space";
import type { Language, SectionProps } from "@/types/portfolio";

type HeroProps = SectionProps & { readonly language: Language };

export function Hero({ content, language }: Readonly<HeroProps>) {
  const text = content.ui;
  const [isOpening, setIsOpening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const openingTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (openingTimer.current) window.clearTimeout(openingTimer.current);
    };
  }, []);

  const openGame = () => {
    if (isOpening || !window.matchMedia("(min-width: 900px)").matches) {
      return;
    }
    setIsOpening(true);
    openingTimer.current = window.setTimeout(
      () => {
        setIsPlaying(true);
        openingTimer.current = null;
      },
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 440,
    );
  };

  const closeGame = () => {
    setIsPlaying(false);
    setIsOpening(false);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 900px)");
    const closeOnSmallScreen = () => {
      if (!mediaQuery.matches) {
        if (openingTimer.current) window.clearTimeout(openingTimer.current);
        openingTimer.current = null;
        setIsPlaying(false);
        setIsOpening(false);
      }
    };

    closeOnSmallScreen();
    mediaQuery.addEventListener("change", closeOnSmallScreen);
    return () => mediaQuery.removeEventListener("change", closeOnSmallScreen);
  }, []);

  return (
    <section
      className={`hero container${isOpening ? " is-opening" : ""}${isPlaying ? " is-playing" : ""}`}
      id="home"
    >
      <SpaceshipBackground paused={isOpening} />
      <div className="hero-copy" aria-hidden={isOpening} inert={isOpening}>
        <p className="hero-greeting">{text.hello}</p>
        <h1 className="hero-name">
          {content.general.firstName} {content.general.lastName}
        </h1>
        <p className="hero-role">{content.general.profession}</p>
        <p className="hero-experience">{text.heroExperience}</p>
        <p className="hero-intro">{text.intro}</p>
        <div className="actions">
          <a className="button primary" href="#projects">
            {text.work}
            <ArrowUpRight size={18} />
          </a>
          <CvDownload
            language={language}
            label={text.cv}
            menuLabel={text.cvMenu}
            otherLabel={text.cvOther}
          />
        </div>
        <div className="hero-contact">
          <span>{text.contactMe}</span>
          <SocialLinks contact={content.contact} emailLabel={text.emailLabel} />
        </div>
        <div className="hero-play">
          <p className="hero-play-prompt">{text.heroPlayPrompt}</p>
          <button
            className="snake-button hero-play-button"
            type="button"
            onClick={openGame}
          >
            <Gamepad2 size={18} />
            {text.space.play}
          </button>
          <p className="hero-play-mobile">{text.space.mobileIntro}</p>
        </div>
      </div>
      <div className="hero-visual" aria-hidden={isOpening} inert={isOpening}>
        <div className="dot-field" />
        <div className="portrait-orbit" />
        <div className="portrait-frame">
          <img
            src={content.general.avatarPicture}
            alt="Carlos Sesme"
            fetchPriority="high"
            width={480}
            height={480}
          />
        </div>
        <div className="location-tag">
          <MapPin size={15} />
          {content.contact.address}
        </div>
        <div className="code-card">
          <div className="code-title">
            <span>
              <Terminal size={13} /> carlos-sesme.ts
            </span>
            <span className="status-dot" />
          </div>
          <pre>
            <span className="code-key">const</span>
            {" developer = {\n"}
            {"  stack: ["}
            <span className="code-string">'NestJS'</span>
            {",\n          "}
            <span className="code-string">'Apache Kafka'</span>
            {",\n          "}
            <span className="code-string">'.Net'</span>
            {"],\n  mindset: ["}
            <span className="code-string">'Learn'</span>
            {",\n            "}
            <span className="code-string">'Build'</span>
            {",\n            "}
            <span className="code-string">'Improve'</span>
            {",\n            "}
            <span className="code-string">'Coffee'</span>
            {",\n            "}
            <span className="code-string">'Play Video Games'</span>
            {",\n            "}
            <span className="code-string">'Repeat'</span>
            {"]\n};"}
          </pre>
        </div>
        <span className="visual-caption">&lt; building with purpose /&gt;</span>
      </div>
      {isPlaying && (
        <TechSpace
          technologies={content.skills.tech}
          copy={text.space}
          onExit={closeGame}
        />
      )}
    </section>
  );
}

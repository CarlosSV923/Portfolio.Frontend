"use client";
import { usePreferences } from "@/hooks/use-preferences";
import { es } from "@/data/es";
import { en } from "@/data/en";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Journey } from "@/components/journey";
import { Interests } from "@/components/interests";
import { Contact } from "@/components/contact";

export default function Portfolio() {
  const preferences = usePreferences();
  const content = preferences.language === "es" ? es : en;
  return (
    <>
      <a className="skip-link" href="#main">
        {content.ui.skip}
      </a>
      <Header {...preferences} text={content.ui} />
      <main id="main">
        <Hero content={content} language={preferences.language} />
        <About content={content} />
        <Skills content={content} />
        <Projects content={content} />
        <Journey content={content} />
        <Interests content={content} />
        <Contact content={content} />
      </main>
      <Footer text={content.ui} />
    </>
  );
}

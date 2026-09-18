"use client";
import { labels } from "@/constants/labels";
import { usePreferences } from "@/hooks/use-preferences";
import es from "@/data/es.json";
import en from "@/data/en.json";
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
  const data = preferences.language === "es" ? es : en;
  const text = labels[preferences.language];
  return (
    <>
      <a className="skip-link" href="#main">
        {text.skip}
      </a>
      <Header {...preferences} text={text} />
      <main id="main">
        <Hero data={data} text={text} language={preferences.language} />
        <About data={data} text={text} />
        <Skills data={data} text={text} />
        <Projects data={data} text={text} />
        <Journey data={data} text={text} />
        <Interests data={data} text={text} />
        <Contact data={data} text={text} />
      </main>
      <Footer text={text} />
    </>
  );
}

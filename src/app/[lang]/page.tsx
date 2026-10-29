import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Interests } from "@/components/sections/interests";
import { Journey } from "@/components/sections/journey";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { getContent } from "@/content";
import { isLanguage } from "@/i18n/config";

export default async function Portfolio({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const content = getContent(lang);

  return (
    <>
      <a
        className="sr-only z-50 rounded-lg bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        href="#main"
      >
        {content.ui.skip}
      </a>
      <Header language={lang} text={content.ui} />
      <main id="main">
        <Hero content={content} language={lang} />
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

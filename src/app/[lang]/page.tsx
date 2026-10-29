import { notFound } from "next/navigation";

import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Interests } from "@/components/interests";
import { Journey } from "@/components/journey";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { getContent } from "@/content";
import { isLanguage } from "@/i18n/config";

export default async function Portfolio({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const content = getContent(lang);

  return (
    <>
      <a className="skip-link" href="#main">
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

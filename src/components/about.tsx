import Image from "next/image";

import { statisticIcons } from "@/constants/icons";
import type { SectionProps } from "@/types/portfolio";

export function About({ data, text }: Readonly<SectionProps>) {
  const paragraphs = data.about.description
    .split(". ")
    .reduce<string[]>((parts, sentence, index) => {
      const paragraphIndex = index < 2 ? 0 : 1;
      const punctuation = sentence.endsWith(".") ? "" : ".";

      parts[paragraphIndex] = `${parts[paragraphIndex] ?? ""}${
        parts[paragraphIndex] ? " " : ""
      }${sentence}${punctuation}`;

      return parts;
    }, []);

  return (
    <section id="about" className="band">
      <div className="container about-grid">
        <div className="about-heading">
          <span className="eyebrow">{text.about}</span>
        </div>

        <div className="about-content">
          <div className="about-copy">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="stats-grid">
          {statisticIcons.map((Icon, i) => (
            <div className="stat" key={text.stats[i]}>
              <span className="stat-icon">
                <Icon size={23} />
              </span>
              <div>
                <strong>
                  {
                    [
                      `${String(data.experience.length).padStart(2, "0")}+`,
                      String(
                        data.skills.tech.filter((s) => s.name !== "Ingles")
                          .length,
                      ),
                      "ESPOL",
                      String(data.projects.length).padStart(2, "0"),
                    ][i]
                  }
                </strong>
                <span>{text.stats[i]}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="about-media">
          <h2>
            {text.aboutTitle}
            <br />
            <span className="muted">{text.aboutAccent}</span>
          </h2>
          <div className="about-photo-frame">
            <Image
              src={data.about.aboutPicture}
              alt="Carlos Sesme"
              fill
              sizes="(max-width: 700px) calc(100vw - 40px), 52vw"
              className="about-photo"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

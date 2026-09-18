import Image from "next/image";

import { statisticIcons } from "@/constants/icons";
import type { SectionProps } from "@/types/portfolio";

export function About({ content }: Readonly<SectionProps>) {
  const text = content.ui;

  return (
    <section id="about" className="band">
      <div className="container about-grid">
        <div className="about-heading">
          <span className="eyebrow">{text.about}</span>
        </div>

        <div className="about-content">
          <div className="about-copy">
            {content.about.paragraphs.map((paragraph) => (
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
                      `${String(content.experience.length).padStart(2, "0")}+`,
                      String(
                        content.skills.tech.filter((s) => s.name !== "Ingles")
                          .length,
                      ),
                      "ESPOL",
                      String(content.projects.length).padStart(2, "0"),
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
              src={content.about.aboutPicture}
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

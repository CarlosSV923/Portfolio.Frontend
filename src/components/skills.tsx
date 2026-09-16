import { Code2 } from "lucide-react";

import { TechIcon } from "./tech-icon";
import { SectionHeading } from "./section-heading";
import type { SectionProps } from "@/types/portfolio";

export function Skills({ data, text }: Readonly<SectionProps>) {
  return (
    <section id="skills" className="container section">
      <SectionHeading
        eyebrow={text.skills}
        title={text.skillsTitle}
        text={text.skillsText}
      />
      <div className="skills-group">
        <h3 className="column-title">
          <Code2 size={20} />
          {text.tech}
        </h3>
        <div className="skills-grid">
          {data.skills.tech.map((skill) => (
            <article className="skill-card" key={skill.name}>
              <TechIcon name={skill.name} />
              <span>{skill.name === "Ingles" ? text.english : skill.name}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

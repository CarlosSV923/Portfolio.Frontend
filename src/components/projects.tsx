import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import type { SectionProps } from "@/types/portfolio";

export function Projects({ data, text }: Readonly<SectionProps>) {
  return (
    <section id="projects" className="band section">
      <div className="container">
        <SectionHeading
          eyebrow={text.projects}
          title={text.projectsTitle}
          text={text.projectsText}
        />
        <div className="project-grid">
          {data.projects.map((p, i) => (
            <article className="project-card" key={p.name}>
              <div className="project-image">
                <img
                  src={p.backgroundPicture}
                  alt={p.name}
                  loading="lazy"
                  width={800}
                  height={460}
                />
                <span className="project-number">0{i + 1}</span>
                <span className="project-type">{p.type}</span>
              </div>
              <div className="project-content">
                <div className="project-heading">
                  <h3>{p.name}</h3>
                  <span>{p.owner}</span>
                </div>
                <p>{p.description}</p>
                <div className="tags">
                  {p.technologies.map((tech) => (
                    <span key={tech.name}>{tech.name}</span>
                  ))}
                </div>
                <a
                  className="project-link"
                  href={p.repositoryUrl || p.companyUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {p.repositoryUrl ? text.repo : text.company}
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { BriefcaseBusiness, GraduationCap, ChevronDown } from "lucide-react";
import { SectionHeading } from "./section-heading";
import type { SectionProps } from "@/types/portfolio";

export function Journey({ content }: Readonly<SectionProps>) {
  const text = content.ui;

  return (
    <section id="journey" className="container section">
      <SectionHeading eyebrow={text.career} title={text.careerTitle} />
      <div className="journey-grid">
        <div>
          <h3 className="column-title">
            <BriefcaseBusiness size={20} />
            {text.experience}
          </h3>
          <div className="timeline">
            {[...content.experience].reverse().map((e, i) => (
              <details
                className="experience-item"
                key={e.company + e.position}
                open={i === 0 ? true : undefined}
              >
                <summary>
                  <span className="timeline-dot" />
                  <span className="experience-summary">
                    <span className="date">
                      {e.dateFrom} — {e.dateTo}
                    </span>
                    <strong>{e.position}</strong>
                    <span>{e.company}</span>
                  </span>
                  <ChevronDown size={17} />
                </summary>
                <div className="experience-body">
                  <span className="micro-label">
                    {e.mode} · {e.location}
                  </span>
                  <ul>
                    {e.achievements.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                  <div className="tags">
                    {e.attitudes.map((a) => (
                      <span key={a.name}>{a.name}</span>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
        <div>
          <h3 className="column-title">
            <GraduationCap size={21} />
            {text.education}
          </h3>
          <div className="education-list">
            {[...content.education].reverse().map((e) => (
              <article key={`${e.degree}-${e.institution}`}>
                <span className="date">
                  {e.dateFrom} — {e.dateTo}
                </span>
                <h4>{e.degree}</h4>
                <p>{e.institution}</p>
                <span className="micro-label">{e.location}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

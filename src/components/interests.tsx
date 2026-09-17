import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import type { SectionProps } from "@/types/portfolio";

export function Interests({ data, text }: Readonly<SectionProps>) {
  return (
    <section className="band section">
      <div className="container">
        <SectionHeading eyebrow={text.interests} title={text.interestsTitle} />
        <div className="interest-grid">
          {data.interests.map((item) => (
            <article className="interest-card" key={item.name}>
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                width={500}
                height={300}
              />
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                {item.url && (
                  <a href={item.url} target="_blank" rel="noreferrer">
                    Instagram <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

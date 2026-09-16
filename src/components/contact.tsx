import { ArrowUpRight } from "lucide-react";
import { SocialLinks } from "./social-links";
import type { SectionProps } from "@/types/portfolio";

export function Contact({ data, text }: Readonly<SectionProps>) {
  return (
    <section id="contact" className="container contact-section">
      <div>
        <span className="eyebrow">{text.contact}</span>
        <h2>{text.contactTitle}</h2>
        <p>{text.contactText}</p>
        <a className="button primary" href={`mailto:${data.contact.email}`}>
          {text.contactButton}
          <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="contact-links">
        <span className="micro-label">{text.social}</span>
        <SocialLinks
          contact={data.contact}
          emailLabel={text.emailLabel}
          variant="text"
        />
        <span>{data.contact.address}</span>
      </div>
    </section>
  );
}

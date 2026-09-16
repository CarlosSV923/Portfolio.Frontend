import { ArrowUpRight, Download, MapPin, Terminal } from "lucide-react";
import { SocialLinks } from "./social-links";
import type { SectionProps } from "@/types/portfolio";

export function Hero({ data, text }: Readonly<SectionProps>) {
  return (
    <section className="hero container" id="home">
      <div className="hero-copy">
        <span className="eyebrow role-label">
          <span className="status-dot" />
          {data.general.profession}
        </span>
        <h1>
          {text.hello}{" "}
          <span className="accent">
            {data.general.firstName}
            <span className="name-dot">.</span>
          </span>
        </h1>
        <h2>
          {text.headline}
          <br />
          {text.highlight}
        </h2>
        <p className="hero-intro">{text.intro}</p>
        <div className="actions">
          <a className="button primary" href="#projects">
            {text.work}
            <ArrowUpRight size={18} />
          </a>
          <a
            className="button secondary"
            href={`/${data.about.urlCurriculum}`}
            download
          >
            {text.cv}
            <Download size={17} />
          </a>
        </div>
        <div className="hero-contact">
          <span>{text.contactMe}</span>
          <SocialLinks contact={data.contact} emailLabel={text.emailLabel} />
        </div>
      </div>
      <div className="hero-visual">
        <div className="dot-field" />
        <div className="portrait-orbit" />
        <div className="portrait-frame">
          <img
            src={data.general.avatarPicture}
            alt="Carlos Sesme"
            fetchPriority="high"
            width={480}
            height={480}
          />
        </div>
        <div className="location-tag">
          <MapPin size={15} />
          {data.contact.address}
        </div>
        <div className="code-card">
          <div className="code-title">
            <span>
              <Terminal size={13} /> developer.ts
            </span>
            <span className="status-dot" />
          </div>
          <pre>
            <span className="code-key">const</span>
            {" developer = {\n"}
            {"  name: "}
            <span className="code-string">'Carlos Sesme'</span>
            {",\n  roles: ["}
            <span className="code-string">'Full Stack'</span>
            {", "}
            <span className="code-string">'Back-End'</span>
            {"]"}
            {",\n  stack: ["}
            <span className="code-string">'NestJS'</span>
            {",\n          "}
            <span className="code-string">'Node.js'</span>
            {", "}
            <span className="code-string">'C#'</span>
            {"],\n  mindset: ["}
            <span className="code-string">'Always learning'</span>
            {",\n            "}
            <span className="code-string">'Play Video Games'</span>
            {",\n            "}
            <span className="code-string">'Coffee'</span>
            {"]\n};"}
          </pre>
        </div>
        <span className="visual-caption">&lt; building with purpose /&gt;</span>
      </div>
    </section>
  );
}

import type { PortfolioData } from "@/types/portfolio";

import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons.svg";

type SocialLinksProps = {
  readonly contact: PortfolioData["contact"];
  readonly emailLabel: string;
  readonly variant?: "icons" | "text";
};

const socialIcons = {
  github: GithubIcon,
  email: MailIcon,
  linkedin: LinkedinIcon,
} as const;

function SocialIcon({
  name,
  size,
}: {
  readonly name: keyof typeof socialIcons;
  readonly size: number;
}) {
  const Icon = socialIcons[name];

  return <Icon size={size} />;
}

export function SocialLinks({
  contact,
  emailLabel,
  variant = "icons",
}: SocialLinksProps) {
  if (variant === "text") {
    return (
      <div className="social-links text-links">
        <a href={contact.github} target="_blank" rel="noopener noreferrer">
          <SocialIcon name="github" size={22} />
          GitHub
        </a>
        <a href={`mailto:${contact.email}`}>
          <SocialIcon name="email" size={22} />
          {contact.email}
        </a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
          <SocialIcon name="linkedin" size={22} />
          LinkedIn
        </a>
      </div>
    );
  }

  return (
    <div className="social-links">
      <a
        href={contact.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        title="GitHub"
      >
        <SocialIcon name="github" size={19} />
      </a>
      <a
        href={`mailto:${contact.email}`}
        aria-label={emailLabel}
        title={emailLabel}
      >
        <SocialIcon name="email" size={19} />
      </a>
      <a
        href={contact.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        title="LinkedIn"
      >
        <SocialIcon name="linkedin" size={19} />
      </a>
    </div>
  );
}

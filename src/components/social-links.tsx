import { cn } from "@/lib/utils";
import type { PortfolioContent } from "@/types/portfolio";

import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons.svg";

type SocialLinksProps = {
  readonly contact: PortfolioContent["contact"];
  readonly emailLabel: string;
  readonly variant?: "icons" | "text";
  readonly className?: string;
};

function socialLinks(contact: PortfolioContent["contact"], emailLabel: string) {
  return [
    { label: "GitHub", text: "GitHub", href: contact.github, Icon: GithubIcon },
    {
      label: emailLabel,
      text: contact.email,
      href: `mailto:${contact.email}`,
      Icon: MailIcon,
    },
    {
      label: "LinkedIn",
      text: "LinkedIn",
      href: contact.linkedin,
      Icon: LinkedinIcon,
    },
  ];
}

export function SocialLinks({
  contact,
  emailLabel,
  variant = "icons",
  className,
}: SocialLinksProps) {
  const links = socialLinks(contact, emailLabel);

  if (variant === "text") {
    return (
      <ul className={cn("grid gap-1", className)}>
        {links.map(({ text, href, Icon }) => (
          <li key={href}>
            <a
              href={href}
              {...(href.startsWith("http") && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
              className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-2 break-all text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Icon size={20} />
              {text}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn("flex gap-2", className)}>
      {links.map(({ label, href, Icon }) => (
        <li key={href}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(href.startsWith("http") && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
            className="grid size-11 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Icon size={19} />
          </a>
        </li>
      ))}
    </ul>
  );
}

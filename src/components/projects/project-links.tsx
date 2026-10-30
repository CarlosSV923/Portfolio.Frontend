import { ArrowUpRight, Download, FolderGit2, Network } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Project } from "@/content/types";
import type { PortfolioText } from "@/types/portfolio";

type Link = {
  readonly href: string;
  readonly label: string;
  readonly Icon: typeof ArrowUpRight;
};

/** The project's links, most useful first: try it, then read its code. */
function projectLinks(project: Project, text: PortfolioText): Link[] {
  const { demo, releases, company, repository, architecture } = project.links;

  return [
    demo && { href: demo, label: text.demo, Icon: ArrowUpRight },
    releases && { href: releases, label: text.releases, Icon: Download },
    company && { href: company, label: text.company, Icon: ArrowUpRight },
    repository && { href: repository, label: text.repo, Icon: FolderGit2 },
    architecture && {
      href: architecture,
      label: text.architectureLink,
      Icon: Network,
    },
  ].filter((link): link is Link => Boolean(link));
}

export function ProjectLinks({
  project,
  text,
  limit,
}: Readonly<{ project: Project; text: PortfolioText; limit?: number }>) {
  return projectLinks(project, text)
    .slice(0, limit)
    .map(({ href, label, Icon }, i) => (
      <Button
        key={href}
        asChild
        variant={i === 0 ? "default" : "outline"}
        size="sm"
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          {label}
          <Icon />
        </a>
      </Button>
    ));
}

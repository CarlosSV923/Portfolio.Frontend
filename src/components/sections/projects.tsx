import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { BentoCard, BentoGrid } from "@/components/ui/bento";
import { Section, SectionHeading } from "@/components/ui/section";
import type { SectionProps } from "@/types/portfolio";

export function Projects({ content }: Readonly<SectionProps>) {
  const text = content.ui;

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow={text.projects}
        title={text.projectsTitle}
        description={text.projectsText}
      />
      <BentoGrid>
        {content.projects.map((project) => (
          <BentoCard
            key={project.name}
            className="grid p-0 sm:p-0 md:col-span-6 md:grid-cols-2 lg:col-span-12"
          >
            <div className="relative aspect-[16/10] bg-secondary md:aspect-auto md:min-h-72">
              <Image
                src={project.backgroundPicture}
                alt={project.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="flex flex-col gap-4 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant="secondary">{project.type}</Badge>
                <span className="text-sm text-subtle-foreground">
                  {project.owner}
                </span>
              </div>
              <h3 className="text-2xl font-bold">{project.name}</h3>
              <p className="text-muted-foreground">{project.description}</p>
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech.name}>
                    <Badge variant="outline">{tech.name}</Badge>
                  </li>
                ))}
              </ul>
              <a
                href={project.repositoryUrl || project.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1 self-start pt-2 text-sm font-semibold text-primary hover:underline"
              >
                {project.repositoryUrl ? text.repo : text.company}
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </BentoCard>
        ))}
      </BentoGrid>
    </Section>
  );
}

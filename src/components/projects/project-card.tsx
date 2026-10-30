import Image from "next/image";

import { TechnologyBadges } from "@/components/technology-badges";
import { BentoCard } from "@/components/ui/bento";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";
import type { PortfolioText } from "@/types/portfolio";

import { hasDetails, ProjectDetails } from "./project-details";
import { ProjectLinks } from "./project-links";

/** Links that fit on the card; the dialog lists them all. */
const cardLinks = 2;

function ProjectCover({
  project,
  wide,
}: Readonly<{ project: Project; wide: boolean }>) {
  const { cover } = project.media;

  if (cover.kind === "icon") {
    return (
      <div className="grid h-full place-items-center bg-primary-soft bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--primary)_30%,transparent),transparent_65%)]">
        <Image
          src={cover.src}
          alt=""
          width={128}
          height={128}
          unoptimized
          className="size-28 drop-shadow-[0_14px_30px_rgb(5_11_22/35%)]"
        />
      </div>
    );
  }

  return (
    <Image
      src={cover.src}
      alt={project.name}
      fill
      sizes={
        wide
          ? "(min-width: 768px) 50vw, 100vw"
          : "(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
      }
      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
    />
  );
}

/**
 * `wide` lays the image beside the text, for a project alone in its
 * category; otherwise the image sits on top.
 */
export function ProjectCard({
  project,
  text,
  wide,
}: Readonly<{ project: Project; text: PortfolioText; wide: boolean }>) {
  return (
    <BentoCard
      className={cn(
        "group grid p-0 sm:p-0",
        wide
          ? "md:col-span-6 md:grid-cols-2 lg:col-span-12"
          : "grid-rows-[auto_1fr] md:col-span-3 lg:col-span-6",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden border-border bg-secondary",
          wide
            ? "aspect-16/10 border-b md:aspect-auto md:min-h-80 md:border-r md:border-b-0"
            : "aspect-16/10 border-b",
        )}
      >
        <ProjectCover project={project} wide={wide} />
      </div>
      <div className="flex flex-col gap-4 p-6 sm:p-7">
        <div>
          {project.owner && (
            <p className="text-sm font-medium text-subtle-foreground">
              {project.owner}
            </p>
          )}
          <h4 className="text-2xl font-bold">{project.name}</h4>
        </div>
        <p className="text-muted-foreground">{project.summary}</p>
        <TechnologyBadges technologies={project.technologies} />
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <ProjectLinks project={project} text={text} limit={cardLinks} />
          {hasDetails(project) && (
            <ProjectDetails project={project} text={text} />
          )}
        </div>
      </div>
    </BentoCard>
  );
}

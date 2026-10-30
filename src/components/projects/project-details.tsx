import { Info } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { TechnologyBadges } from "@/components/technology-badges";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Project } from "@/content/types";
import type { PortfolioText } from "@/types/portfolio";

import { ProjectLinks } from "./project-links";

export function hasDetails(project: Project) {
  const { demo, gallery, architecture } = project.media;
  return (
    project.highlights.length > 0 || Boolean(demo || gallery || architecture)
  );
}

function DetailSection({
  title,
  action,
  children,
}: Readonly<{ title: string; action?: ReactNode; children: ReactNode }>) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-primary">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

function Gallery({
  project,
  text,
}: Readonly<{ project: Project; text: PortfolioText }>) {
  const shots = project.media.gallery ?? [];

  return (
    <Carousel aria-label={`${text.screenshots}: ${project.name}`}>
      <DetailSection
        title={text.screenshots}
        action={
          <div className="flex gap-2">
            <CarouselPrevious
              label={text.previous}
              className="static translate-y-0"
            />
            <CarouselNext label={text.next} className="static translate-y-0" />
          </div>
        }
      >
        <CarouselContent>
          {shots.map(({ src, caption }, i) => (
            <CarouselItem key={src}>
              <figure className="space-y-2">
                <Image
                  src={src}
                  alt={caption}
                  width={1500}
                  height={1020}
                  sizes="(min-width: 640px) 704px, 100vw"
                  className="h-auto w-full rounded-xl border border-border"
                />
                <figcaption className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground tabular-nums">
                    {i + 1}/{shots.length}
                  </span>{" "}
                  {caption}
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </DetailSection>
    </Carousel>
  );
}

/**
 * Walkthrough, screenshots, highlights and architecture; images load only
 * when opened.
 */
export function ProjectDetails({
  project,
  text,
}: Readonly<{ project: Project; text: PortfolioText }>) {
  const { demo, architecture } = project.media;
  const category = text.projectCategories[project.category].title;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={`${text.details}: ${project.name}`}
        >
          <Info />
          {text.details}
        </Button>
      </DialogTrigger>
      <DialogContent
        closeLabel={text.close}
        className="max-h-[90dvh] gap-6 overflow-y-auto rounded-2xl bg-card p-6 sm:max-w-3xl sm:p-8"
      >
        <DialogHeader className="text-left">
          <p className="text-sm font-medium text-primary">
            {project.owner ? `${category} · ${project.owner}` : category}
          </p>
          <DialogTitle className="text-2xl font-bold sm:text-3xl">
            {project.name}
          </DialogTitle>
          <DialogDescription className="text-base">
            {project.summary}
          </DialogDescription>
        </DialogHeader>

        {demo && (
          <DetailSection title={text.walkthrough}>
            <Image
              src={demo}
              alt={`${text.walkthrough}: ${project.name}`}
              width={960}
              height={600}
              unoptimized
              className="h-auto w-full rounded-xl border border-border"
            />
          </DetailSection>
        )}

        {project.media.gallery && <Gallery project={project} text={text} />}

        {project.highlights.length > 0 && (
          <DetailSection title={text.highlights}>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground marker:text-primary">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </DetailSection>
        )}

        {architecture && (
          <DetailSection title={text.architecture}>
            <Image
              src={architecture}
              alt={`${text.architecture}: ${project.name}`}
              width={1360}
              height={600}
              unoptimized
              className="h-auto w-full rounded-xl border border-border"
            />
          </DetailSection>
        )}

        <TechnologyBadges technologies={project.technologies} />
        <div className="flex flex-wrap gap-2">
          <ProjectLinks project={project} text={text} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

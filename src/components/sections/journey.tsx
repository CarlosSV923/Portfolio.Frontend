import { ArrowUpRight, BriefcaseBusiness, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { BentoCard } from "@/components/ui/bento";
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
import { Section, SectionHeading } from "@/components/ui/section";
import { isOngoing, sortExperience } from "@/content/experience";
import type { Experience } from "@/content/types";
import { cn } from "@/lib/utils";
import type { PortfolioText, SectionProps } from "@/types/portfolio";

const visibleTechnologies = 3;

type JobProps = Readonly<{ job: Experience; text: PortfolioText }>;

function TechnologyBadges({
  technologies,
  limit,
}: Readonly<{ technologies: Experience["attitudes"]; limit?: number }>) {
  const shown = technologies.slice(0, limit);
  const hidden = technologies.length - shown.length;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((tech) => (
        <li key={tech.name}>
          <Badge variant="secondary">{tech.name}</Badge>
        </li>
      ))}
      {hidden > 0 && (
        <li>
          <Badge variant="outline">+{hidden}</Badge>
        </li>
      )}
    </ul>
  );
}

function ExperienceDetails({ job, text }: JobProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full"
          aria-label={`${text.details}: ${job.position}`}
        >
          {text.details}
          <ArrowUpRight />
        </Button>
      </DialogTrigger>
      <DialogContent
        closeLabel={text.close}
        className="max-h-[85dvh] overflow-y-auto rounded-2xl bg-card p-6 sm:max-w-xl sm:p-8"
      >
        <DialogHeader className="text-left">
          <p className="text-sm font-medium text-primary">
            {job.dateFrom} — {job.dateTo}
          </p>
          <DialogTitle className="text-2xl leading-tight font-bold">
            {job.position}
          </DialogTitle>
          <DialogDescription>
            {job.company} · {job.mode} · {job.location}
          </DialogDescription>
        </DialogHeader>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground marker:text-primary">
          {job.achievements.map((achievement) => (
            <li key={achievement}>{achievement}</li>
          ))}
        </ul>
        <TechnologyBadges technologies={job.attitudes} />
      </DialogContent>
    </Dialog>
  );
}

function ExperienceCard({ job, text }: JobProps) {
  return (
    <BentoCard className="flex flex-1 flex-col gap-4 p-6 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-medium text-primary">
          <span className="grid size-9 place-items-center rounded-xl bg-primary-soft">
            <BriefcaseBusiness className="size-4.5" />
          </span>
          {job.dateFrom} — {job.dateTo}
        </span>
        {isOngoing(job) && <Badge>{text.current}</Badge>}
      </div>

      <div>
        <h3 className="text-lg leading-snug font-bold">{job.position}</h3>
        <p className="text-sm text-muted-foreground">{job.company}</p>
      </div>

      <p className="line-clamp-3 text-sm text-muted-foreground">
        {job.achievements[0]}
      </p>

      <div className="mt-auto space-y-4">
        <p className="flex items-center gap-1.5 text-sm text-subtle-foreground">
          <MapPin className="size-3.5 shrink-0" />
          {job.location} · {job.mode}
        </p>
        <TechnologyBadges
          technologies={job.attitudes}
          limit={visibleTechnologies}
        />
        <ExperienceDetails job={job} text={text} />
      </div>
    </BentoCard>
  );
}

/** Dot on the horizontal line; the line runs into the next slide's gutter. */
function TimelineMarker({
  isCurrent,
  isLast,
}: Readonly<{ isCurrent: boolean; isLast: boolean }>) {
  return (
    <div className="relative mb-4 h-3" aria-hidden="true">
      <span
        className={cn(
          "absolute top-1/2 left-0 h-px bg-border",
          isLast ? "w-9" : "-right-4",
        )}
      />
      <span className="absolute top-0 left-6 size-3 rounded-full bg-primary ring-4 ring-background">
        {isCurrent && (
          <span className="absolute inset-0 animate-ping rounded-full bg-primary motion-reduce:hidden" />
        )}
      </span>
    </div>
  );
}

export function Journey({ content }: Readonly<SectionProps>) {
  const text = content.ui;
  const jobs = sortExperience(content.experience);

  return (
    <Section id="journey">
      <Carousel opts={{ align: "start" }} aria-label={text.careerTitle}>
        <SectionHeading
          eyebrow={text.career}
          title={text.careerTitle}
          action={
            <div className="flex gap-2">
              <CarouselPrevious
                label={text.previous}
                className="static size-10 translate-y-0"
              />
              <CarouselNext
                label={text.next}
                className="static size-10 translate-y-0"
              />
            </div>
          }
        />
        {/* The viewport covers the first slide's gutter so no sliver of the
            previous card shows at the end. */}
        <CarouselContent viewportClassName="-ml-4" className="ml-0">
          {jobs.map((job, i) => (
            <CarouselItem
              key={`${job.company}-${job.dateFrom}`}
              className="flex basis-[85%] flex-col sm:basis-1/2 lg:basis-1/3"
            >
              <TimelineMarker
                isCurrent={isOngoing(job)}
                isLast={i === jobs.length - 1}
              />
              <ExperienceCard job={job} text={text} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Section>
  );
}

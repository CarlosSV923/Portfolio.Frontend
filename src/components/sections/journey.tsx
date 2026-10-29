import { BriefcaseBusiness, ChevronDown, GraduationCap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { BentoCard, BentoGrid } from "@/components/ui/bento";
import { Section, SectionHeading } from "@/components/ui/section";
import type { SectionProps } from "@/types/portfolio";

function CardTitle({
  icon: Icon,
  children,
}: Readonly<{ icon: typeof BriefcaseBusiness; children: string }>) {
  return (
    <h3 className="mb-6 flex items-center gap-2 text-lg font-bold">
      <Icon className="size-5 text-primary" />
      {children}
    </h3>
  );
}

export function Journey({ content }: Readonly<SectionProps>) {
  const text = content.ui;
  const experience = [...content.experience].reverse();
  const education = [...content.education].reverse();

  return (
    <Section id="journey">
      <SectionHeading eyebrow={text.career} title={text.careerTitle} />
      <BentoGrid>
        <BentoCard className="md:col-span-6 lg:col-span-8">
          <CardTitle icon={BriefcaseBusiness}>{text.experience}</CardTitle>
          <ol className="border-l border-border">
            {experience.map((job, i) => (
              <li key={job.company + job.position} className="relative pl-6">
                <span
                  className="absolute top-2 -left-[5px] size-2.5 rounded-full border-2 border-card bg-primary"
                  aria-hidden="true"
                />
                <details className="group pb-6" open={i === 0 || undefined}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-lg [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="block text-sm font-medium text-primary">
                        {job.dateFrom} — {job.dateTo}
                      </span>
                      <span className="mt-1 block font-heading font-bold">
                        {job.position}
                      </span>
                      <span className="block text-sm text-muted-foreground">
                        {job.company}
                      </span>
                    </span>
                    <ChevronDown className="mt-1 size-5 shrink-0 text-subtle-foreground transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="mt-4 space-y-4">
                    <p className="text-sm text-subtle-foreground">
                      {job.mode} · {job.location}
                    </p>
                    <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground marker:text-primary">
                      {job.achievements.map((achievement) => (
                        <li key={achievement}>{achievement}</li>
                      ))}
                    </ul>
                    <ul className="flex flex-wrap gap-2">
                      {job.attitudes.map((skill) => (
                        <li key={skill.name}>
                          <Badge variant="secondary">{skill.name}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </BentoCard>

        <BentoCard className="md:col-span-6 lg:col-span-4">
          <CardTitle icon={GraduationCap}>{text.education}</CardTitle>
          <ul className="space-y-6">
            {education.map((item) => (
              <li key={`${item.degree}-${item.institution}`}>
                <p className="text-sm font-medium text-primary">
                  {item.dateFrom} — {item.dateTo}
                </p>
                <h4 className="mt-1 font-bold">{item.degree}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.institution}
                </p>
                <p className="mt-1 text-sm text-subtle-foreground">
                  {item.location}
                </p>
              </li>
            ))}
          </ul>
        </BentoCard>
      </BentoGrid>
    </Section>
  );
}

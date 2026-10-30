import { ProjectCard } from "@/components/projects/project-card";
import { BentoGrid } from "@/components/ui/bento";
import { Section, SectionHeading } from "@/components/ui/section";
import { groupProjects } from "@/content/projects";
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
      <div className="space-y-12">
        {groupProjects(content).map(({ category, projects }) => {
          const { title, description } = text.projectCategories[category];
          const headingId = `projects-${category}`;

          return (
            <section key={category} aria-labelledby={headingId}>
              <header className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-border pb-3">
                <h3 id={headingId} className="text-xl font-bold">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground">{description}</p>
                <span className="ml-auto text-sm font-medium text-subtle-foreground tabular-nums max-sm:hidden">
                  {String(projects.length).padStart(2, "0")}
                </span>
              </header>
              <BentoGrid>
                {projects.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    text={text}
                    wide={projects.length === 1}
                  />
                ))}
              </BentoGrid>
            </section>
          );
        })}
      </div>
    </Section>
  );
}

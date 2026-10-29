import Image from "next/image";

import { BentoCard, BentoGrid, Eyebrow } from "@/components/ui/bento";
import { Section } from "@/components/ui/section";
import { statisticIcons } from "@/constants/icons";
import { allTechnologies } from "@/content/technologies";
import type { SectionProps } from "@/types/portfolio";

export function About({ content }: Readonly<SectionProps>) {
  const text = content.ui;
  const stats = [
    `${content.general.yearsOfExperience}+`,
    String(allTechnologies(content).length),
    content.about.school,
  ].map((value, i) => ({
    value,
    label: text.stats[i],
    Icon: statisticIcons[i],
  }));

  return (
    <Section id="about">
      <BentoGrid>
        <BentoCard className="md:col-span-6 lg:col-span-7 lg:p-10">
          <Eyebrow>{text.about}</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {text.aboutTitle}
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            {content.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </BentoCard>

        <BentoCard className="min-h-80 p-0 sm:p-0 md:col-span-6 lg:col-span-5 lg:row-span-2">
          <Image
            src={content.about.aboutPicture}
            alt="Carlos Sesme"
            fill
            sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </BentoCard>

        <ul className="grid gap-4 sm:grid-cols-3 md:col-span-6 lg:col-span-7">
          {stats.map(({ value, label, Icon }) => (
            <li key={label}>
              <BentoCard className="flex h-full flex-col gap-4 p-5 sm:p-5">
                <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="font-heading text-3xl font-extrabold">
                    {value}
                  </p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </BentoCard>
            </li>
          ))}
        </ul>
      </BentoGrid>
    </Section>
  );
}

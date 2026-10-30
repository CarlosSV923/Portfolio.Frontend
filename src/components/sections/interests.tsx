import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { BentoCard, BentoGrid } from "@/components/ui/bento";
import { Section, SectionHeading } from "@/components/ui/section";
import type { SectionProps } from "@/types/portfolio";

export function Interests({ content }: Readonly<SectionProps>) {
  const text = content.ui;

  return (
    <Section>
      <SectionHeading eyebrow={text.interests} title={text.interestsTitle} />
      <BentoGrid>
        {content.interests.map((item) => (
          <BentoCard
            key={item.name}
            className="flex flex-col p-0 sm:p-0 md:col-span-3 lg:col-span-6"
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-6">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-muted-foreground">{item.description}</p>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1 self-start pt-2 text-sm font-semibold text-primary hover:underline"
                >
                  Instagram <ArrowUpRight className="size-4" />
                </a>
              )}
            </div>
          </BentoCard>
        ))}
      </BentoGrid>
    </Section>
  );
}

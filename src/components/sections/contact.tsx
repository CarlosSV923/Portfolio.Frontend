import { ArrowUpRight, MapPin } from "lucide-react";

import { SocialLinks } from "@/components/social-links";
import { BentoCard, BentoGrid, Eyebrow } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import type { SectionProps } from "@/types/portfolio";

export function Contact({ content }: Readonly<SectionProps>) {
  const text = content.ui;

  return (
    <Section id="contact">
      <BentoGrid>
        <BentoCard className="flex flex-col items-start gap-5 border-primary/40 bg-primary-soft/40 md:col-span-6 lg:col-span-8 lg:p-10">
          <Eyebrow>{text.contact}</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {text.contactTitle}
          </h2>
          <p className="max-w-xl text-muted-foreground">{text.contactText}</p>
          <Button asChild size="lg">
            <a href={`mailto:${content.contact.email}`}>
              {text.contactButton}
              <ArrowUpRight />
            </a>
          </Button>
        </BentoCard>

        <BentoCard className="flex flex-col gap-4 md:col-span-6 lg:col-span-4">
          <h3 className="text-sm font-semibold text-subtle-foreground">
            {text.social}
          </h3>
          <SocialLinks
            contact={content.contact}
            emailLabel={text.emailLabel}
            variant="text"
          />
          <p className="mt-auto flex items-center gap-2 text-sm text-subtle-foreground">
            <MapPin className="size-4" />
            {content.contact.address}
          </p>
        </BentoCard>
      </BentoGrid>
    </Section>
  );
}

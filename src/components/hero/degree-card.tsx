import { GraduationCap, MapPin } from "lucide-react";

import { Eyebrow } from "@/components/ui/bento";
import type { Education } from "@/content/types";

export function DegreeCard({
  education,
  label,
}: Readonly<{ education: Education; label: string }>) {
  return (
    <div className="flex h-full flex-col gap-4">
      <Eyebrow className="flex items-center gap-2">
        <GraduationCap className="size-4" />
        {label}
      </Eyebrow>
      <div>
        <p className="font-heading text-xl leading-snug font-bold sm:text-2xl">
          {education.degree}
        </p>
        <p className="mt-2 text-muted-foreground">{education.institution}</p>
      </div>
      <div className="mt-auto space-y-1 text-sm">
        <p className="font-medium text-primary">
          {education.dateFrom} — {education.dateTo}
        </p>
        <p className="flex items-center gap-1.5 text-subtle-foreground">
          <MapPin className="size-3.5 shrink-0" />
          {education.location}
        </p>
      </div>
    </div>
  );
}

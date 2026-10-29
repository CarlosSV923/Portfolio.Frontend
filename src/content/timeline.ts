import type { Education, Experience, Profile } from "./types";

export type TimelineItem =
  | ({ readonly kind: "work" } & Experience)
  | ({ readonly kind: "education" } & Education);

/**
 * Sortable value for "MM/YYYY" or "YYYY". Anything else ("Actualidad",
 * "Present") means the item is ongoing and sorts first.
 */
export function dateValue(date: string): number {
  const match = /^(?:(\d{1,2})\/)?(\d{4})$/.exec(date.trim());
  if (!match) return Number.POSITIVE_INFINITY;
  const [, month = "12", year] = match;
  return Number(year) * 12 + Number(month);
}

export function isOngoing(item: Pick<TimelineItem, "dateTo">): boolean {
  return dateValue(item.dateTo) === Number.POSITIVE_INFINITY;
}

/** Work and education merged, most recent (or ongoing) first. */
export function buildTimeline(
  profile: Pick<Profile, "experience" | "education">,
): TimelineItem[] {
  return [
    ...profile.experience.map((item) => ({ kind: "work" as const, ...item })),
    ...profile.education.map((item) => ({
      kind: "education" as const,
      ...item,
    })),
  ].sort(
    (a, b) =>
      dateValue(b.dateTo) - dateValue(a.dateTo) ||
      dateValue(b.dateFrom) - dateValue(a.dateFrom),
  );
}

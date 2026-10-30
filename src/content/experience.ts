import type { Experience } from "./types";

/**
 * Sortable value for "MM/YYYY" or "YYYY". Anything else ("Actualidad",
 * "Present") means the job is ongoing and sorts first.
 */
export function dateValue(date: string): number {
  const match = /^(?:(\d{1,2})\/)?(\d{4})$/.exec(date.trim());
  if (!match) return Number.POSITIVE_INFINITY;
  const [, month = "12", year] = match;
  return Number(year) * 12 + Number(month);
}

export function isOngoing(item: Pick<Experience, "dateTo">): boolean {
  return dateValue(item.dateTo) === Number.POSITIVE_INFINITY;
}

/** Jobs ordered most recent (or ongoing) first. */
export function sortExperience(
  experience: readonly Experience[],
): Experience[] {
  return [...experience].sort(
    (a, b) =>
      dateValue(b.dateTo) - dateValue(a.dateTo) ||
      dateValue(b.dateFrom) - dateValue(a.dateFrom),
  );
}

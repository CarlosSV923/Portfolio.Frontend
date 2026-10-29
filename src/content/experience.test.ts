import { describe, expect, it } from "vitest";

import { en } from "./en";
import { es } from "./es";
import { dateValue, isOngoing, sortExperience } from "./experience";

describe("dateValue", () => {
  it("orders months within a year", () => {
    expect(dateValue("05/2019")).toBeLessThan(dateValue("06/2019"));
  });

  it("treats a bare year as its last month", () => {
    expect(dateValue("2019")).toBe(dateValue("12/2019"));
  });

  it("treats non-dates as ongoing", () => {
    expect(dateValue("Actualidad")).toBe(Number.POSITIVE_INFINITY);
    expect(isOngoing({ dateTo: "Present" })).toBe(true);
    expect(isOngoing({ dateTo: "2021" })).toBe(false);
  });
});

describe("sortExperience", () => {
  it("puts the current job first and keeps every job", () => {
    for (const content of [es, en]) {
      const jobs = sortExperience(content.experience);
      expect(jobs).toHaveLength(content.experience.length);
      expect(isOngoing(jobs[0])).toBe(true);
    }
  });

  it("sorts by end date, newest first", () => {
    const ends = sortExperience(es.experience).map((job) =>
      dateValue(job.dateTo),
    );
    expect(ends).toEqual([...ends].sort((a, b) => b - a));
  });

  it("orders both languages the same way", () => {
    const starts = (jobs: ReturnType<typeof sortExperience>) =>
      jobs.map((job) => job.dateFrom);
    expect(starts(sortExperience(en.experience))).toEqual(
      starts(sortExperience(es.experience)),
    );
  });
});

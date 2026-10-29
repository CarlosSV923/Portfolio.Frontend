import { describe, expect, it } from "vitest";

import { en } from "./en";
import { es } from "./es";
import { buildTimeline, dateValue, isOngoing } from "./timeline";

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

describe("buildTimeline", () => {
  it("puts the current job first and keeps every item", () => {
    for (const content of [es, en]) {
      const timeline = buildTimeline(content);
      expect(timeline).toHaveLength(
        content.experience.length + content.education.length,
      );
      expect(isOngoing(timeline[0])).toBe(true);
    }
  });

  it("sorts by end date, newest first", () => {
    const ends = buildTimeline(es).map((item) => dateValue(item.dateTo));
    expect(ends).toEqual([...ends].sort((a, b) => b - a));
  });

  it("orders both languages the same way", () => {
    const kinds = (items: ReturnType<typeof buildTimeline>) =>
      items.map((item) => `${item.kind}:${item.dateFrom}`);
    expect(kinds(buildTimeline(en))).toEqual(kinds(buildTimeline(es)));
  });
});

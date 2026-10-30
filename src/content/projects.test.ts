import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { en } from "./en";
import { es } from "./es";
import { groupProjects, projectCatalog } from "./projects";
import { projectCategories } from "./types";

describe("groupProjects", () => {
  it("keeps the category order and every project once", () => {
    const groups = groupProjects(es);

    expect(groups.map((group) => group.category)).toEqual(projectCategories);
    expect(
      groups.flatMap((group) => group.projects).map((p) => p.slug),
    ).toEqual(projectCatalog.map((p) => p.slug));
  });

  it("pairs each project with the text of its language", () => {
    const [english] = groupProjects(en).flatMap((group) => group.projects);

    expect(english.summary).toBe(en.projects[english.slug].summary);
  });
});

describe("project media", () => {
  it("points at files that exist in public/", () => {
    for (const content of [es, en]) {
      for (const { media } of Object.values(content.projects)) {
        const files = [media.cover.src, media.demo, media.architecture];
        for (const file of files.filter(Boolean)) {
          expect(existsSync(join("public", file!)), file).toBe(true);
        }
      }
    }
  });
});

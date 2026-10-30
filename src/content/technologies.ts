import type { PortfolioContent, Technology } from "./types";

/** Every technology across groups, in display order. */
export function allTechnologies(content: PortfolioContent): Technology[] {
  return content.skills.groups.flatMap((group) => group.tech);
}

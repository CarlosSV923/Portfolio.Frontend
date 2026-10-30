import type { Language } from "@/i18n/config";

import { en } from "./en";
import { es } from "./es";
import type { PortfolioContent } from "./types";

const content: Record<Language, PortfolioContent> = { es, en };

export function getContent(language: Language): PortfolioContent {
  return content[language];
}

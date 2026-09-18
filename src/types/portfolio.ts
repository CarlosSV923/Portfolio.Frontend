import type { es } from "@/data/es";
import type { en } from "@/data/en";
import type { languages, themes } from "@/constants/preferences";

export type Language = (typeof languages)[number];
export type Theme = (typeof themes)[number];
export type PortfolioContent = typeof es | typeof en;
export type PortfolioText = PortfolioContent["ui"];
export type SectionProps = { readonly content: PortfolioContent };

import type es from "@/data/es.json";
import type en from "@/data/en.json";
import type { labels } from "@/constants/labels";
import type { languages, themes } from "@/constants/preferences";
export type Language = (typeof languages)[number];
export type Theme = (typeof themes)[number];
export type PortfolioData = typeof es | typeof en;
export type PortfolioText = (typeof labels)[Language];
export type SectionProps = { data: PortfolioData; text: PortfolioText };

import type { PortfolioContent } from "@/content/types";
import type { themes } from "@/lib/theme";

export type { Language } from "@/i18n/config";
export type { PortfolioContent } from "@/content/types";

export type Theme = (typeof themes)[number];
export type PortfolioText = PortfolioContent["ui"];
export type SectionProps = { readonly content: PortfolioContent };

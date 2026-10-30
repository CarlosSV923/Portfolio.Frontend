import type { MetadataRoute } from "next";

import { languages } from "@/i18n/config";
import { siteUrl } from "@/lib/site";

const pageUrl = (path: string) => new URL(path, siteUrl).toString();

/** One entry per language, each listing the others as alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const alternates = {
    languages: Object.fromEntries(
      languages.map((language) => [language, pageUrl(`/${language}`)]),
    ),
  };

  return languages.map((language) => ({
    url: pageUrl(`/${language}`),
    changeFrequency: "monthly",
    priority: 1,
    alternates,
  }));
}

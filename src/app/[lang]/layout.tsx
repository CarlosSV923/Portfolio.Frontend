import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { notFound } from "next/navigation";

import { faviconId, faviconPaths } from "@/constants/favicon";
import { getContent } from "@/content";
import { isLanguage, languages, ogLocales } from "@/i18n/config";
import { themeScript } from "@/lib/theme";
import { siteUrl } from "@/lib/site";
import "../globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const dynamicParams = false;

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const { ui } = getContent(lang);

  return {
    metadataBase: siteUrl,
    title: ui.metaTitle,
    description: ui.metaDescription,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...Object.fromEntries(languages.map((l) => [l, `/${l}`])),
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      title: ui.metaTitle,
      description: ui.metaDescription,
      locale: ogLocales[lang],
      alternateLocale: languages
        .filter((l) => l !== lang)
        .map((l) => ogLocales[l]),
    },
    // The image itself comes from ./opengraph-image.tsx.
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${dmSans.variable} ${manrope.variable}`}
      // Lets Next.js turn off smooth scrolling while it scrolls after a
      // navigation; otherwise its scroll calls animate and fight each other.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link
          id={faviconId}
          rel="icon"
          type="image/png"
          sizes="64x64"
          href={faviconPaths.dark}
          suppressHydrationWarning
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

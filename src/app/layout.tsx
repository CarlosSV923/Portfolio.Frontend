import { faviconId, faviconPaths } from "@/constants/favicon";
import { themeScript } from "@/constants/theme-script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carlos Sesme | Full Stack Developer",
  description:
    "Personal portfolio of Carlos Sesme, a Full Stack Developer based in Guayaquil, Ecuador. Explore my projects, experience, and technologies.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
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

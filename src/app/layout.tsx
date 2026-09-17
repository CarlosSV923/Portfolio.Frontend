import { faviconId, faviconPaths } from "@/constants/favicon";
import { themeScript } from "@/constants/theme-script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carlos Sesme | Full Stack Developer",
  description:
    "Portafolio de Carlos Sesme. Desarrollo full stack, microservicios y experiencias web. Guayaquil, Ecuador.",
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

import { themeScript } from "@/constants/theme-script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carlos Sesme | Software Developer",
  description:
    "Portafolio de Carlos Sesme. Desarrollo full stack, microservicios y experiencias web. Guayaquil, Ecuador.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

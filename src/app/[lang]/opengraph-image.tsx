import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { faviconPaths } from "@/constants/favicon";
import { getContent } from "@/content";
import { allTechnologies } from "@/content/technologies";
import { isLanguage, languages } from "@/i18n/config";

// Fixed colours: link previews have no theme, so they use the dark one.
const colors = {
  background: "#050b16",
  card: "#0d1627",
  border: "#1d2a44",
  text: "#eef3ff",
  muted: "#9aa8c4",
  primary: "#779dff",
};

export const alt = "Carlos Sesme";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const shownTechnologies = 6;

// Rendered at build time: the avatar is read from public/, which isn't
// guaranteed to ship with a serverless function.
export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function OpengraphImage({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  const content = getContent(lang);
  const { general, contact, ui } = content;
  const [avatar, logo] = await Promise.all([
    readFile(join(process.cwd(), "public", general.avatarPicture)),
    // The dark-theme tab icon, as the header shows on this dark background.
    readFile(join(process.cwd(), "public", faviconPaths.dark)),
  ]);
  const technologies = allTechnologies(content).slice(0, shownTechnologies);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        gap: 64,
        padding: "0 80px",
        background: `radial-gradient(circle at 18% 20%, #142a5c 0%, ${colors.background} 55%)`,
        color: colors.text,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered to a PNG by ImageResponse, not the browser */}
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          alt=""
          width={64}
          height={64}
        />
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 76,
            fontWeight: 800,
            letterSpacing: -2,
          }}
        >
          {`${general.firstName} ${general.lastName}`}
        </div>
        <div style={{ display: "flex", fontSize: 40, color: colors.primary }}>
          {general.profession}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 26,
            color: colors.muted,
          }}
        >
          {`${contact.address} · ${general.yearsOfExperience}+ ${ui.stats[0].toLowerCase()}`}
        </div>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 40 }}
        >
          {technologies.map(({ name }) => (
            <div
              key={name}
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 999,
                border: `1px solid ${colors.border}`,
                background: colors.card,
                fontSize: 22,
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element -- rendered to a PNG by ImageResponse, not the browser */}
      <img
        src={`data:image/jpeg;base64,${avatar.toString("base64")}`}
        alt=""
        width={340}
        height={340}
        style={{
          borderRadius: 999,
          border: `6px solid ${colors.primary}`,
          objectFit: "cover",
        }}
      />
    </div>,
    size,
  );
}

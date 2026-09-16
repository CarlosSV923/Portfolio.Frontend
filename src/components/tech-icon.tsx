"use client";

import { useEffect, useState } from "react";

import { techIcons } from "@/constants/technologies";

export function TechIcon({ name }: Readonly<{ name: string }>) {
  const iconName = techIcons[name];
  const [source, setSource] = useState<"svg" | "png" | "monogram">("png");

  useEffect(() => {
    if (!iconName) {
      return;
    }

    let isCurrent = true;
    const svgIcon = new Image();

    setSource("png");
    svgIcon.onload = () => {
      if (isCurrent) {
        setSource("svg");
      }
    };
    svgIcon.src = `/icons/icon_${iconName}.svg`;

    return () => {
      isCurrent = false;
    };
  }, [iconName]);

  if (!iconName || source === "monogram") {
    return (
      <span className="tech-monogram" aria-hidden="true">
        {name.slice(0, 2)}
      </span>
    );
  }

  return (
    <img
      className="tech-icon"
      src={`/icons/icon_${iconName}.${source}`}
      alt=""
      onError={() => setSource(source === "svg" ? "png" : "monogram")}
    />
  );
}

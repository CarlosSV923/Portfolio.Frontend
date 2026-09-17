"use client";

import { useEffect, useState } from "react";

import { techIcons } from "@/constants/technologies";

type IconSource = "svg" | "png" | "monogram";

type IconState = {
  iconName: string;
  source: IconSource;
  ready: boolean;
};

function nextSource(source: IconSource): IconSource {
  return source === "svg" ? "png" : "monogram";
}

export function TechIcon({ name }: Readonly<{ name: string }>) {
  const iconName = techIcons[name];
  const [iconState, setIconState] = useState<IconState>({
    iconName: "",
    source: "svg",
    ready: false,
  });

  useEffect(() => {
    if (!iconName) {
      return;
    }

    if (iconState.iconName !== iconName) {
      setIconState({ iconName, source: "svg", ready: false });
      return;
    }

    if (iconState.ready || iconState.source === "monogram") {
      return;
    }

    let isCurrent = true;
    const candidate = new Image();

    candidate.onload = () => {
      if (isCurrent) {
        setIconState({ iconName, source: iconState.source, ready: true });
      }
    };
    candidate.onerror = () => {
      if (isCurrent) {
        setIconState({
          iconName,
          source: nextSource(iconState.source),
          ready: false,
        });
      }
    };
    candidate.src = `/icons/icon_${iconName}.${iconState.source}`;

    return () => {
      isCurrent = false;
      candidate.onload = null;
      candidate.onerror = null;
    };
  }, [iconName, iconState]);

  if (
    !iconName ||
    (iconState.iconName === iconName && iconState.source === "monogram")
  ) {
    return (
      <span className="tech-monogram" aria-hidden="true">
        {name.slice(0, 2)}
      </span>
    );
  }

  if (iconState.iconName !== iconName || !iconState.ready) {
    return <span className="tech-icon tech-icon-loading" aria-hidden="true" />;
  }

  return (
    <img
      className="tech-icon"
      src={`/icons/icon_${iconName}.${iconState.source}`}
      alt=""
      onError={() =>
        setIconState({
          iconName,
          source: nextSource(iconState.source),
          ready: false,
        })
      }
    />
  );
}

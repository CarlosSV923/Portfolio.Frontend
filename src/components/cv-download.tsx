"use client";

import { ChevronDown, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cvFiles } from "@/constants/cv";
import type { Language } from "@/types/portfolio";

type CvDownloadProps = {
  readonly language: Language;
  readonly label: string;
  readonly menuLabel: string;
  readonly otherLabel: string;
};

export function CvDownload({
  language,
  label,
  menuLabel,
  otherLabel,
}: CvDownloadProps) {
  const [open, setOpen] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);
  const otherLanguage = language === "es" ? "en" : "es";

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (!downloadRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", closeMenu);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className="cv-download" ref={downloadRef}>
      <a
        className="button secondary cv-download-main"
        href={cvFiles[language]}
        download
      >
        {label} ({language.toUpperCase()})
        <Download size={17} />
      </a>
      <button
        className="cv-download-toggle"
        type="button"
        aria-label={menuLabel}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen(!open)}
      >
        <ChevronDown size={17} aria-hidden="true" />
      </button>
      {open && (
        <div className="cv-download-menu" role="menu">
          <a
            href={cvFiles[otherLanguage]}
            download
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            {otherLabel} ({otherLanguage.toUpperCase()})
            <Download size={15} aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}

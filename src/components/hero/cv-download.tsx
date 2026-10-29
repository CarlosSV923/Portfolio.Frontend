"use client";

import { ChevronDown, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cvFiles } from "@/constants/cv";
import { otherLanguage } from "@/i18n/config";
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
  const other = otherLanguage(language);

  return (
    <div className="flex">
      <Button asChild variant="outline" size="lg" className="rounded-r-none">
        <a href={cvFiles[language]} download>
          {label} ({language.toUpperCase()})
          <Download />
        </a>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="rounded-l-none border-l-0 px-3"
            aria-label={menuLabel}
          >
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <a href={cvFiles[other]} download>
              <Download />
              {otherLabel} ({other.toUpperCase()})
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

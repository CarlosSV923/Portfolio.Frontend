"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { faviconPaths } from "@/constants/favicon";
import { ids, sectionObserverOptions } from "@/constants/navigation";
import { themeIcons } from "@/constants/icons";
import { useTheme } from "@/hooks/use-theme";
import { languageCookie, languages } from "@/i18n/config";
import { themes } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Language, PortfolioText, Theme } from "@/types/portfolio";

type HeaderProps = {
  readonly language: Language;
  readonly text: PortfolioText;
};

function rememberLanguage(language: Language) {
  document.cookie = `${languageCookie}=${language}; path=/; max-age=31536000; SameSite=Lax`;
}

function ThemeMenu({ text }: { readonly text: PortfolioText }) {
  const { theme, setTheme } = useTheme();
  const ActiveIcon = themeIcons[themes.indexOf(theme)];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={text.theme}>
          <ActiveIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{text.theme}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value as Theme)}
        >
          {themes.map((th, i) => {
            const Icon = themeIcons[i];
            return (
              <DropdownMenuRadioItem key={th} value={th}>
                <Icon />
                {text.themes[i]}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header({ language, text }: HeaderProps) {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, sectionObserverOptions);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const navLinks = ids.map((id, i) => (
    <a
      key={id}
      href={`#${id}`}
      aria-current={active === id ? "location" : undefined}
      onClick={() => setMenu(false)}
      className={cn(
        "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
        active === id && "bg-accent text-accent-foreground",
      )}
    >
      {text.nav[i]}
    </a>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a
          href="#home"
          className="shrink-0 rounded-lg"
          aria-label={`Carlos Sesme — ${text.nav[0]}`}
        >
          {/* Same pair as the browser tab icon, switched with the theme. */}
          <Image
            src={faviconPaths.light}
            alt=""
            width={36}
            height={36}
            className="size-9 dark:hidden"
          />
          <Image
            src={faviconPaths.dark}
            alt=""
            width={36}
            height={36}
            className="hidden size-9 dark:block"
          />
        </a>

        <nav
          aria-label={text.navLabel}
          className="hidden items-center gap-1 lg:flex"
        >
          {navLinks}
        </nav>

        <div className="flex items-center gap-1">
          <div
            role="group"
            aria-label={text.language}
            className="flex rounded-lg border border-border p-0.5 text-xs font-bold"
          >
            {languages.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                hrefLang={l}
                lang={l}
                aria-current={language === l ? "page" : undefined}
                onClick={() => rememberLanguage(l)}
                className={cn(
                  "grid h-8 w-9 place-items-center rounded-md text-subtle-foreground transition-colors hover:text-foreground",
                  language === l &&
                    "bg-primary text-primary-foreground hover:text-primary-foreground",
                )}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <ThemeMenu text={text} />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={text.menu}
            aria-expanded={menu}
            aria-controls="mobile-navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {menu && (
        <nav
          id="mobile-navigation"
          aria-label={text.navLabel}
          className="container-page grid gap-1 border-t border-border pt-2 pb-4 lg:hidden"
        >
          {navLinks}
        </nav>
      )}
    </header>
  );
}

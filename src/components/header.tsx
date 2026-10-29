"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Code2, Menu, X } from "lucide-react";
import { ids, sectionObserverOptions } from "@/constants/navigation";
import { themeIcons } from "@/constants/icons";
import { useTheme } from "@/hooks/use-theme";
import { languageCookie, languages } from "@/i18n/config";
import { themes } from "@/lib/theme";
import type { Language, PortfolioText } from "@/types/portfolio";
type HeaderProps = {
  readonly language: Language;
  readonly text: PortfolioText;
};

function rememberLanguage(language: Language) {
  document.cookie = `${languageCookie}=${language}; path=/; max-age=31536000; SameSite=Lax`;
}

export function Header({ language, text }: HeaderProps) {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");
  const { theme, setTheme } = useTheme();
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

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          href="#home"
          className="brand"
          aria-label={`Carlos Sesme — ${text.nav[0]}`}
        >
          <Code2 />
          <span>
            carlos<span className="accent">.</span>sesme
          </span>
        </a>
        <nav
          id="navigation"
          className={menu ? "navigation open" : "navigation"}
          aria-label={text.navLabel}
        >
          {ids.map((id, i) => (
            <a
              key={id}
              className={active === id ? "active" : ""}
              href={`#${id}`}
              onClick={() => setMenu(false)}
            >
              {text.nav[i]}
            </a>
          ))}
        </nav>
        <div className="preferences">
          <div
            className="language-switch"
            role="group"
            aria-label={text.language}
          >
            {languages.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                hrefLang={l}
                lang={l}
                aria-current={language === l ? "page" : undefined}
                onClick={() => rememberLanguage(l)}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <div className="theme-switch" role="group" aria-label={text.theme}>
            {themes.map((th, i) => {
              const Icon = themeIcons[i];
              return (
                <button
                  key={th}
                  title={text.themes[i]}
                  aria-label={text.themes[i]}
                  aria-pressed={theme === th}
                  onClick={() => setTheme(th)}
                >
                  <Icon size={16} />
                </button>
              );
            })}
          </div>
          <button
            className="menu-button"
            aria-label={text.menu}
            aria-expanded={menu}
            aria-controls="navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}

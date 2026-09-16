"use client";
import { useEffect, useState } from "react";
import { Code2, Menu, X } from "lucide-react";
import { ids, sectionObserverOptions } from "@/constants/navigation";
import { languages, themes } from "@/constants/preferences";
import { themeIcons } from "@/constants/icons";
import type { Language, Theme, PortfolioText } from "@/types/portfolio";
type HeaderProps = {
  readonly language: Language;
  readonly theme: Theme;
  readonly text: PortfolioText;
  readonly setLanguage: (language: Language) => void;
  readonly setTheme: (theme: Theme) => void;
};
export function Header({
  language,
  theme,
  text,
  setLanguage,
  setTheme,
}: HeaderProps) {
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

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#home" className="brand" aria-label="Carlos Sesme — Home">
          <Code2 />
          <span>
            carlos<span className="accent">.</span>sesme
          </span>
        </a>
        <nav
          id="navigation"
          className={menu ? "navigation open" : "navigation"}
          aria-label={
            language === "es" ? "Navegación principal" : "Main navigation"
          }
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
              <button
                key={l}
                onClick={() => setLanguage(l)}
                aria-pressed={language === l}
                lang={l}
              >
                {l.toUpperCase()}
              </button>
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

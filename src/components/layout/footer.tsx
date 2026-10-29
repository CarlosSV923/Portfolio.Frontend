import { ArrowUp, Code2 } from "lucide-react";

import type { PortfolioText } from "@/types/portfolio";

export function Footer({ text }: { readonly text: PortfolioText }) {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col items-center justify-between gap-3 py-8 text-sm text-subtle-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} Carlos Sesme. {text.rights}
        </p>
        <p className="flex items-center gap-1.5">
          {text.made} <Code2 className="size-4 text-primary" />
        </p>
        <a
          href="#home"
          aria-label={text.nav[0]}
          className="grid size-10 place-items-center rounded-xl border border-border transition-colors hover:border-primary hover:text-primary"
        >
          <ArrowUp className="size-4" />
        </a>
      </div>
    </footer>
  );
}

import { ArrowDown, Code2 } from "lucide-react";
import type { PortfolioText } from "@/types/portfolio";
export function Footer({ text }: { readonly text: PortfolioText }) {
  return (
    <footer className="container footer">
      <span>
        © {new Date().getFullYear()} Carlos Sesme. {text.rights}
      </span>
      <span>
        {text.made} <Code2 size={15} />
      </span>
      <a href="#home" aria-label={text.nav[0]}>
        <ArrowDown size={17} style={{ transform: "rotate(180deg)" }} />
      </a>
    </footer>
  );
}

import Image from "next/image";

import { darkThemeIconClasses, techIcons } from "@/constants/technologies";
import { cn } from "@/lib/utils";

export function TechIcon({
  name,
  className,
}: Readonly<{ name: string; className?: string }>) {
  const file = techIcons[name];

  if (!file) {
    return (
      <span
        className={cn(
          "grid size-6.5 shrink-0 place-items-center rounded-md border border-primary font-mono text-xs font-extrabold text-primary",
          className,
        )}
        aria-hidden="true"
      >
        {name.slice(0, 2)}
      </span>
    );
  }

  return (
    <Image
      className={cn(
        "size-6.5 shrink-0 object-contain",
        darkThemeIconClasses[name],
        className,
      )}
      src={`/icons/${file}`}
      alt=""
      width={48}
      height={48}
      unoptimized={file.endsWith(".svg")}
    />
  );
}

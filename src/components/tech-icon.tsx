import Image from "next/image";

import { techIcons } from "@/constants/technologies";
import { cn } from "@/lib/utils";

export function TechIcon({
  name,
  className,
}: Readonly<{ name: string; className?: string }>) {
  const file = techIcons[name];

  if (!file) {
    return (
      <span className={cn("tech-monogram", className)} aria-hidden="true">
        {name.slice(0, 2)}
      </span>
    );
  }

  return (
    <Image
      className={cn("tech-icon", className)}
      src={`/icons/${file}`}
      alt=""
      width={48}
      height={48}
      unoptimized={file.endsWith(".svg")}
    />
  );
}

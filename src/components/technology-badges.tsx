import { Badge } from "@/components/ui/badge";
import type { Technology } from "@/content/types";

/** Technology names as badges; past `limit`, the rest collapse into "+N". */
export function TechnologyBadges({
  technologies,
  limit,
}: Readonly<{ technologies: readonly Technology[]; limit?: number }>) {
  const shown = technologies.slice(0, limit);
  const hidden = technologies.length - shown.length;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((tech) => (
        <li key={tech.name}>
          <Badge variant="secondary">{tech.name}</Badge>
        </li>
      ))}
      {hidden > 0 && (
        <li>
          <Badge variant="outline">+{hidden}</Badge>
        </li>
      )}
    </ul>
  );
}

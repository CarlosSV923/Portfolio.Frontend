import {
  projectCategories,
  type PortfolioContent,
  type Project,
  type ProjectCategory,
  type ProjectInfo,
} from "./types";

const github = (repo: string) => `https://github.com/CarlosSV923/${repo}`;
const pages = (repo: string) => `https://carlossv923.github.io/${repo}/`;
const tech = (...names: string[]) => names.map((name) => ({ name }));

/** Display order within each category follows this list. */
export const projectCatalog: readonly ProjectInfo[] = [
  {
    slug: "aurora",
    name: "Aurora",
    category: "professional",
    owner: "Siigo S.A.",
    technologies: tech("React.js", "NestJS", "MongoDB", "C#", "Azure"),
    links: { company: "https://siigo.com" },
  },
  {
    slug: "gamebook",
    name: "GameBook",
    category: "web",
    technologies: tech(
      "Next.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Docker",
    ),
    links: {
      demo: "https://gamebook-frontend.vercel.app",
      repository: github("GameBook.System"),
      architecture: pages("GameBook.System"),
    },
  },
  {
    slug: "gameexplorer",
    name: "GameExplorer",
    category: "nas",
    technologies: tech("Go", "React", "TypeScript", "SQLite", "Docker"),
    links: {
      demo: "https://game-explorer-gold.vercel.app",
      repository: github("GameExplorer"),
      architecture: pages("GameExplorer"),
    },
  },
  {
    slug: "videoexplorer",
    name: "VideoExplorer",
    category: "nas",
    technologies: tech("Go", "React", "TypeScript", "SQLite", "Docker"),
    links: {
      demo: "https://video-explorer-sepia.vercel.app",
      repository: github("VideoExplorer"),
      architecture: pages("VideoExplorer"),
    },
  },
  {
    slug: "winclonerx",
    name: "WinClonerX",
    category: "desktop",
    technologies: tech("C#", ".NET", "WPF"),
    links: {
      repository: github("WinClonerX"),
      releases: `${github("WinClonerX")}/releases`,
      architecture: pages("WinClonerX"),
    },
  },
];

export type ProjectGroup = {
  readonly category: ProjectCategory;
  readonly projects: readonly Project[];
};

/** Projects with their text for this language, grouped by category. */
export function groupProjects(content: PortfolioContent): ProjectGroup[] {
  return projectCategories
    .map((category) => ({
      category,
      projects: projectCatalog
        .filter((project) => project.category === category)
        .map((project) => ({ ...project, ...content.projects[project.slug] })),
    }))
    .filter((group) => group.projects.length > 0);
}

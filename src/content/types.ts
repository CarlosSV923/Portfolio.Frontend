import type { es } from "./es";

/** Interface copy. Spanish is the reference; English must match its keys. */
export type UiText = (typeof es)["ui"];

export type Technology = { readonly name: string };

export type General = {
  readonly firstName: string;
  readonly lastName: string;
  readonly avatarPicture: string;
  readonly profession: string;
  readonly yearsOfExperience: number;
};

export type Contact = {
  readonly email: string;
  readonly address: string;
  readonly github: string;
  readonly linkedin: string;
};

export type About = {
  readonly aboutPicture: string;
  /** Short name of the school shown in the education stat. */
  readonly school: string;
  readonly paragraphs: readonly string[];
};

export type Education = {
  readonly degree: string;
  readonly institution: string;
  readonly dateFrom: string;
  readonly dateTo: string;
  readonly location: string;
};

export type Experience = {
  readonly position: string;
  readonly company: string;
  readonly dateFrom: string;
  readonly dateTo: string;
  readonly achievements: readonly string[];
  readonly attitudes: readonly Technology[];
  readonly mode: string;
  readonly location: string;
};

export const projectCategories = [
  "professional",
  "web",
  "nas",
  "desktop",
] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectSlug =
  "aurora" | "gamebook" | "gameexplorer" | "videoexplorer" | "winclonerx";

/** Language-neutral facts about a project; see `projects.ts`. */
export type ProjectInfo = {
  readonly slug: ProjectSlug;
  readonly name: string;
  readonly category: ProjectCategory;
  /** Company the project was built for, if any. */
  readonly owner?: string;
  readonly technologies: readonly Technology[];
  readonly links: {
    readonly demo?: string;
    readonly repository?: string;
    /** Interactive architecture diagrams. */
    readonly architecture?: string;
    readonly releases?: string;
    readonly company?: string;
  };
};

/** Per-language text and images of a project. */
export type ProjectText = {
  readonly summary: string;
  /** Bullet points for the details dialog. */
  readonly highlights: readonly string[];
  readonly media: {
    /** A screenshot, or an app icon drawn on a brand background. */
    readonly cover: {
      readonly src: string;
      readonly kind: "screenshot" | "icon";
    };
    /** Animated walkthrough; only loaded when the dialog opens. */
    readonly demo?: string;
    /** Static architecture diagram (SVG). */
    readonly architecture?: string;
  };
};

export type Project = ProjectInfo & ProjectText;

export type TechnologyGroup = {
  readonly name: string;
  readonly tech: readonly Technology[];
};

export type Interest = {
  readonly name: string;
  readonly description: string;
  readonly image: string;
  readonly url?: string;
};

/** Everything except the interface copy; shared by both languages. */
export type Profile = {
  readonly general: General;
  readonly contact: Contact;
  readonly about: About;
  /** Highest degree, shown as a card in the hero. */
  readonly education: Education;
  readonly experience: readonly Experience[];
  readonly skills: { readonly groups: readonly TechnologyGroup[] };
  readonly projects: Readonly<Record<ProjectSlug, ProjectText>>;
  readonly interests: readonly Interest[];
};

export type PortfolioContent = Profile & { readonly ui: UiText };

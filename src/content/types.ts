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

export type Project = {
  readonly name: string;
  readonly type: string;
  readonly owner: string;
  readonly description: string;
  readonly repositoryUrl: string;
  readonly companyUrl: string;
  readonly backgroundPicture: string;
  readonly technologies: readonly Technology[];
};

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
  readonly education: readonly Education[];
  readonly experience: readonly Experience[];
  readonly skills: { readonly groups: readonly TechnologyGroup[] };
  readonly projects: readonly Project[];
  readonly interests: readonly Interest[];
};

export type PortfolioContent = Profile & { readonly ui: UiText };

export type Lang = "es" | "en";

export type Localized = Record<Lang, string>;

export type ProjectCategory = "frontend" | "backend" | "fullstack";

export type Project = {
  id: string;
  file: string;
  title: string;
  description: Localized;
  image: string;
  tags: string[];
  category: ProjectCategory;
  role: Localized;
  highlight: Localized;
  githubUrl: string;
  demoUrl?: string;
  problem?: Localized;
  solution?: Localized;
};

export type Skill = {
  name: string;
  icon?: string;
  category: string;
};

export type FocusItem = {
  icon: string;
  title: Localized;
  text: Localized;
};

export type FileKind =
  | "home"
  | "about"
  | "projects"
  | "project"
  | "skills"
  | "focus"
  | "contact"
  | "activity";

export type FileEntry = {
  path: string;
  kind: FileKind;
  projectId?: string;
};
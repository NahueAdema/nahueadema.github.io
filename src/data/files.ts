import { projects } from "./projects";
import type { FileEntry, Project } from "./types";

export const files: FileEntry[] = [
  { path: "README.md", kind: "home" },
  { path: "about.md", kind: "about" },
  { path: "projects.md", kind: "projects" },
  ...projects.map(
    (p) =>
      ({
        path: `projects/${p.file}`,
        kind: "project",
        projectId: p.id,
      }) satisfies FileEntry,
  ),
  { path: "skills.json", kind: "skills" },
  { path: "focus.md", kind: "focus" },
  { path: "activity.md", kind: "activity" },
  { path: "contact.md", kind: "contact" },
];

export const fileByPath = (path: string): FileEntry | undefined =>
  files.find((f) => f.path === path);

export const projectById = (id: string): Project | undefined =>
  projects.find((p) => p.id === id);

export const projectByPath = (path: string): Project | undefined => {
  const entry = fileByPath(path);
  return entry?.projectId ? projectById(entry.projectId) : undefined;
};

export const projectFolders = projects.map((p) => ({
  path: `projects/${p.file}`,
  title: p.title,
}));
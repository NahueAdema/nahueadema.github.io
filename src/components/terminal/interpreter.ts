import type { Dictionary } from "../../i18n/en";
import { files } from "../../data/files";
import { projects } from "../../data/projects";
import type { Lang } from "../../data/types";
import { ask } from "../../copilot/engine";

export type LineKind =
  | "cmd"
  | "out"
  | "err"
  | "ok"
  | "accent"
  | "dim"
  | "ascii";

export type TermLine = {
  text: string;
  kind: LineKind;
};

export type ExecAction =
  | { type: "open"; path: string }
  | { type: "url"; href: string }
  | { type: "clear" }
  | { type: "cv" };

export type ExecResult = {
  lines: TermLine[];
  action?: ExecAction;
};

type ExecContext = {
  t: Dictionary;
  history: string[];
  lang: Lang;
};

const sectionPaths: Record<string, string> = {
  "": "README.md",
  home: "README.md",
  readme: "README.md",
  "readme.md": "README.md",
  about: "about.md",
  "about.md": "about.md",
  projects: "projects.md",
  "projects.md": "projects.md",
  skills: "skills.json",
  "skills.json": "skills.json",
  focus: "focus.md",
  "focus.md": "focus.md",
  activity: "activity.md",
  "activity.md": "activity.md",
  github: "activity.md",
  live: "activity.md",
  contact: "contact.md",
  "contact.md": "contact.md",
  contacto: "contact.md",
};

const projectPaths: Record<string, string> = {};
projects.forEach((p) => {
  projectPaths[p.id] = `projects/${p.file}`;
  projectPaths[p.file] = `projects/${p.file}`;
  projectPaths[p.title.toLowerCase()] = `projects/${p.file}`;
});

const resolvePath = (arg: string): string | undefined => {
  const key = arg.trim().toLowerCase();
  if (sectionPaths[key]) return sectionPaths[key];
  if (projectPaths[key]) return projectPaths[key];
  const exact = files.find(
    (f) => f.path.toLowerCase() === key || `./${f.path}`.toLowerCase() === key,
  );
  return exact?.path;
};

const line = (text: string, kind: LineKind = "out"): TermLine => ({
  text,
  kind,
});

export function runCommand(raw: string, ctx: ExecContext): ExecResult {
  const { t } = ctx;
  if (!raw.trim()) return { lines: [] };

  const parts = raw.trim().split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const arg = parts.slice(1).join(" ");

  const openSection = (path: string): ExecResult => ({
    lines: [line(`${t.terminal.opened} ${path}`, "ok")],
    action: { type: "open", path },
  });

  switch (cmd) {
    case "help":
      return {
        lines: [
          line(t.terminal.helpTitle, "accent"),
          ...t.terminal.help.map((h) => line(h, "out")),
        ],
      };

    case "whoami":
    case "who":
      return { lines: t.terminal.who.map((w) => line(w, "out")) };

    case "about":
      return openSection("about.md");
    case "projects":
      return openSection("projects.md");
    case "skills":
      return openSection("skills.json");
    case "focus":
      return openSection("focus.md");
    case "activity":
      return openSection("activity.md");
    case "contact":
      return openSection("contact.md");

    case "ask":
    case "copilot": {
      const reply = ask(arg.trim() || "help", { t, lang: ctx.lang });
      const result: ExecResult = {
        lines: reply.text.map((s) => line(s, "out")),
      };
      const first = reply.actions?.[0];
      if (first?.kind === "open") {
        result.action = { type: "open", path: first.path };
      } else if (first?.kind === "url") {
        result.action = { type: "url", href: first.href };
      } else if (first?.kind === "cv") {
        result.action = { type: "cv" };
      }
      return result;
    }
    case "open": {
      if (!arg) {
        return {
          lines: [
            line("open <file>", "err"),
            line(t.terminal.useHelp, "dim"),
          ],
        };
      }
      const path = resolvePath(arg);
      if (path) return openSection(path);
      return {
        lines: [
          line(`'${arg}' ${t.terminal.notFound}`, "err"),
          line(files.map((f) => f.path).join("  "), "dim"),
        ],
      };
    }

    case "ls": {
      const root = [
        ...new Set(
          files.map((f) => {
            const parts = f.path.split("/");
            return parts.length > 1 ? `${parts[0]}/` : f.path;
          }),
        ),
      ];
      const lines = root.map((p) =>
        line(p.endsWith("/") ? `${p}` : p, p.endsWith("/") ? "accent" : "out"),
      );
      return { lines };
    }

    case "social":
      return { lines: t.terminal.social.map((s) => line(s, "accent")) };

    case "cv":
      return {
        lines: [line(t.terminal.cv, "ok")],
        action: { type: "cv" },
      };

    case "pwd":
      return { lines: [line(t.terminal.pwd, "dim")] };

    case "date":
      return { lines: [line(new Date().toString(), "out")] };

    case "echo": {
      const text = parts.slice(1).join(" ");
      return { lines: [line(text || "", "out")] };
    }

    case "neofetch":
      return {
        lines: [
          line(t.terminal.neofetchTitle, "accent"),
          ...t.terminal.neofetch.map((n) => line(n, "ascii")),
          line(`${t.terminal.prompt} => ${projectCount()} ${t.terminal.workdir}`, "dim"),
        ],
      };

    case "sudo":
      return { lines: [line(t.terminal.sudo, "accent")] };

    case "history": {
      const h = ctx.history
        .map((c, i) => `  ${i + 1}  ${c}`)
        .join("\n");
      return { lines: h ? [line(h, "out")] : [line("(empty)", "dim")] };
    }

    case "clear":
    case "cls":
      return { lines: [], action: { type: "clear" } };

    default:
      return {
        lines: [
          line(`${t.terminal.unknown} '${cmd}'`, "err"),
          line(t.terminal.useHelp, "dim"),
        ],
      };
  }
}

const projectCount = () => projects.length;
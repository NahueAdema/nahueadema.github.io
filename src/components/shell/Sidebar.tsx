import { useState } from "react";
import {
  Activity,
  ChevronDown,
  ChevronRight,
  FileText,
  FileTerminal,
  Folder,
  FolderOpen,
  RefreshCw,
} from "lucide-react";
import { useI18n } from "../../i18n/context";
import { files, projectFolders } from "../../data/files";
import { useWorkspace } from "./WorkspaceContext";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

const Sidebar = () => {
  const { t } = useI18n();
  const { activePath, openFile } = useWorkspace();
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [firstFoldersOpen, setFirstFoldersOpen] = useState(true);

  const topFiles = files.filter((f) => !f.path.startsWith("projects/"));
  const folders = projectFolders;

  const fileIcon = (path: string) => {
    if (path === "activity.md") {
      return <Activity className="h-4 w-4 shrink-0 text-cyan" />;
    }
    if (path.endsWith(".json")) {
      return <FileText className="h-4 w-4 shrink-0 text-yellow" />;
    }
    if (path.startsWith("projects")) {
      return <FileTerminal className="h-4 w-4 shrink-0 text-accent" />;
    }
    return <FileText className="h-4 w-4 shrink-0 text-muted" />;
  };

  return (
    <aside className="w-56 shrink-0 border-r border-border bg-panel flex flex-col">
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-[11px] font-semibold tracking-widest text-muted">
          {t.sidebar.explorer}
        </span>
        <button
          className="flex h-6 w-6 items-center justify-center rounded text-muted hover:bg-hover hover:text-fore"
          title="Refresh"
          aria-label="Refresh"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        <div className="flex items-center gap-1 px-1 py-1 text-[11px] font-semibold text-muted">
          <ChevronDown
            className="h-3.5 w-3.5"
            onClick={() => setFirstFoldersOpen((v) => !v)}
          />
          <span>{t.sidebar.root}</span>
        </div>

        {firstFoldersOpen && (
          <div className="ml-2 space-y-0.5">
            {topFiles.map((f) => {
              const label = (() => {
                if (f.path === "README.md") return t.sidebar.readme;
                if (f.path === "about.md") return t.sidebar.about;
                if (f.path === "projects.md") return t.sidebar.projects;
                if (f.path === "skills.json") return t.sidebar.skills;
                if (f.path === "focus.md") return t.sidebar.focus;
                if (f.path === "activity.md") return t.sidebar.activity;
                return t.sidebar.contact;
              })();
              return (
                <button
                  key={f.path}
                  onClick={() => openFile(f.path)}
                  className={`flex w-full items-center gap-1.5 rounded px-2 py-1 pr-2 text-left text-[13px] transition-colors ${
                    activePath === f.path
                      ? "bg-active text-bright"
                      : "text-muted hover:bg-hover hover:text-fore"
                  }`}
                >
                  {fileIcon(f.path)}
                  <span className="truncate">{label}</span>
                </button>
              );
            })}

            <div className="flex items-center gap-1 px-1 py-1 text-[13px] text-fore">
              <button
                onClick={() => setProjectsOpen((v) => !v)}
                className="flex items-center gap-1 text-fore"
              >
                {projectsOpen ? (
                  <ChevronDown className="h-3.5 w-3.5 text-muted" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-muted" />
                )}
                {projectsOpen ? (
                  <FolderOpen className="h-4 w-4 text-accent" />
                ) : (
                  <Folder className="h-4 w-4 text-accent" />
                )}
                <span className="font-medium">{t.sidebar.projectsFolder}</span>
              </button>
            </div>

            {projectsOpen && (
              <div className="ml-4 space-y-0.5">
                {folders.map((p) => (
                  <button
                    key={p.path}
                    onClick={() => openFile(p.path)}
                    className={`flex w-full items-center gap-1.5 rounded px-2 py-1 text-left text-[13px] transition-colors ${
                      activePath === p.path
                        ? "bg-active text-bright"
                        : "text-muted hover:bg-hover hover:text-fore"
                    }`}
                  >
                    {fileIcon(p.path)}
                    <span className="truncate">{p.path.split("/")[1]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-border px-3 py-3">
        <span className="text-[11px] font-semibold tracking-widest text-muted">
          {t.sidebar.extensions}
        </span>
        <div className="mt-2 rounded-md border border-border bg-panel2 p-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-purple to-accent text-sm font-bold text-white">
              NA
            </div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-fore">
                {t.sidebar.meName}
              </p>
              <p className="truncate text-[11px] text-muted">
                {t.sidebar.meRole}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5">
            <a
              href="https://github.com/NahueAdema"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded text-muted hover:bg-hover hover:text-fore"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/nahuel-adema-6627a3304/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded text-muted hover:bg-hover hover:text-fore"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
import { FileTerminal, Mail, X } from "lucide-react";
import { useI18n } from "../../i18n/context";
import { useWorkspace } from "./WorkspaceContext";

const iconFor = (path: string) => {
  if (path === "contact.md") return <Mail className="h-3.5 w-3.5 shrink-0" />;
  if (path.startsWith("projects"))
    return <FileTerminal className="h-3.5 w-3.5 shrink-0 text-accent" />;
  return null;
};

const labelFor = (path: string) => path.split("/").pop() ?? path;

const TabBar = () => {
  const { t } = useI18n();
  const { openFiles, activePath, setActivePath, closeFile } = useWorkspace();

  return (
    <div className="flex shrink-0 items-stretch overflow-x-auto border-b border-border bg-panel">
      {openFiles.map((f) => {
        const active = activePath === f.path;
        return (
          <div
            key={f.path}
            role="tab"
            aria-selected={active}
            onClick={() => setActivePath(f.path)}
            className={`group relative flex cursor-pointer select-none items-center gap-1.5 border-r border-border px-3 py-1.5 text-[13px] ${
              active
                ? "bg-editor text-fore"
                : "text-muted hover:bg-hover hover:text-fore"
            }`}
          >
            {active && (
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple via-accent to-cyan" />
            )}
            <span className={active ? "text-accent" : "text-faint"}>
              {iconFor(f.path)}
            </span>
            <span className="whitespace-nowrap">{labelFor(f.path)}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeFile(f.path);
              }}
              className="flex h-4 w-4 items-center justify-center rounded text-faint opacity-0 transition-opacity hover:bg-hover hover:text-fore group-hover:opacity-100"
              aria-label={t.tabs.close}
              title={t.tabs.close}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TabBar;
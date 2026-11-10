import { useMemo, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CornerDownLeft,
  Download,
  FileTerminal,
  Folder,
  FolderOpen,
  Languages,
  Mail,
  Search,
  SquareTerminal,
  User,
} from "lucide-react";
import { useI18n } from "../../i18n/context";
import { useTheme } from "../../theme/context";
import { themes } from "../../theme/themes";
import { files } from "../../data/files";
import { useWorkspace } from "./WorkspaceContext";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import cv from "../../assets/cv.pdf";

type Action = {
  id: string;
  label: string;
  hint: string;
  group: "file" | "action";
  icon?: ReactNode;
  run: () => void;
};

const CommandPalette = () => {
  const { paletteOpen, setPaletteOpen } = useWorkspace();

  return (
    <AnimatePresence>
      {paletteOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 p-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => setPaletteOpen(false)}
        >
          <motion.div
            className="relative w-full max-w-lg overflow-hidden rounded-lg border border-accent/25 bg-panel shadow-[0_24px_64px_-12px_rgba(0,0,0,0.8),0_0_40px_-8px_rgba(88,166,255,0.25)]"
            initial={{ y: -12, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -12, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-purple via-accent to-cyan" />
            <PaletteDialog onClose={() => setPaletteOpen(false)} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function PaletteDialog({ onClose }: { onClose: () => void }) {
  const { t, lang, setLang } = useI18n();
  const { setTheme } = useTheme();
  const {
    openFile,
    toggleTerminal,
    setSidebarOpen,
    sidebarOpen,
  } = useWorkspace();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const actions = useMemo<Action[]>(() => {
    const fileActions: Action[] = files.map((f) => {
      const label = f.path.split("/").pop() ?? f.path;
      return {
        id: `file-${f.path}`,
        label,
        hint: f.path,
        group: "file",
        icon:
          f.kind === "project" ? (
            <FileTerminal className="h-4 w-4 text-accent" />
          ) : (
            <FolderOpen className="h-4 w-4 text-muted" />
          ),
        run: () => {
          openFile(f.path);
          onClose();
        },
      };
    });

    const actionItems: Action[] = [
      {
        id: "terminal",
        label: t.activity.terminal,
        hint: "Terminal",
        group: "action",
        icon: <SquareTerminal className="h-4 w-4 text-green" />,
        run: () => {
          toggleTerminal();
          onClose();
        },
      },
      {
        id: "sidebar",
        label: t.sidebar.explorer,
        hint: sidebarOpen ? "Hide" : "Show",
        group: "action",
        icon: <Folder className="h-4 w-4 text-yellow" />,
        run: () => {
          setSidebarOpen(!sidebarOpen);
          onClose();
        },
      },
      {
        id: "lang",
        label:
          lang === "es"
            ? "Change language to English"
            : "Cambiar idioma a Español",
        hint: "ES / EN",
        group: "action",
        icon: <Languages className="h-4 w-4 text-purple" />,
        run: () => {
          setLang(lang === "es" ? "en" : "es");
          onClose();
        },
      },
      {
        id: "cv",
        label: t.home.ctaCv,
        hint: "cv.pdf",
        group: "action",
        icon: <Download className="h-4 w-4 text-cyan" />,
        run: () => {
          window.open(cv, "_blank");
          onClose();
        },
      },
      {
        id: "github",
        label: "GitHub",
        hint: "github.com/NahueAdema",
        group: "action",
        icon: <GithubIcon className="h-4 w-4 text-fore" />,
        run: () => {
          window.open("https://github.com/NahueAdema", "_blank");
          onClose();
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        hint: "linkedin.com/in/nahuel-adema-6627a3304",
        group: "action",
        icon: <LinkedinIcon className="h-4 w-4 text-accent" />,
        run: () => {
          window.open(
            "https://www.linkedin.com/in/nahuel-adema-6627a3304/",
            "_blank",
          );
          onClose();
        },
      },
      {
        id: "mail",
        label: t.contact.emailLabel,
        hint: "ademanahuel@gmail.com",
        group: "action",
        icon: <Mail className="h-4 w-4 text-pink" />,
        run: () => {
          window.location.href = "mailto:ademanahuel@gmail.com";
          onClose();
        },
      },
      {
        id: "website",
        label: t.sidebar.meName,
        hint: "open README.md",
        group: "action",
        icon: <User className="h-4 w-4 text-bright" />,
        run: () => {
          openFile("README.md");
          onClose();
        },
      },
      ...themes.map(
        (th): Action => ({
          id: `theme-${th.id}`,
          label: t.theme[th.labelKey],
          hint: "Color theme",
          group: "action",
          icon: (
            <span
              className="h-3.5 w-3.5 rounded-full border border-border"
              style={{ backgroundColor: th.swatch }}
            />
          ),
          run: () => {
            setTheme(th.id);
            onClose();
          },
        }),
      ),
    ];

    return [...fileActions, ...actionItems];
  }, [
    t,
    lang,
    setLang,
    setTheme,
    openFile,
    toggleTerminal,
    setSidebarOpen,
    sidebarOpen,
    onClose,
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.hint.toLowerCase().includes(q),
    );
  }, [actions, query]);

  const fileCount = filtered.filter((a) => a.group === "file").length;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => (s + 1) % Math.max(filtered.length, 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) =>
        (s - 1 + Math.max(filtered.length, 1)) %
        Math.max(filtered.length, 1),
      );
      return;
    }
    if (e.key === "Enter") {
      const action = filtered[selected];
      if (action) action.run();
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <Search className="h-4 w-4 text-muted" />
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(0);
          }}
          onKeyDown={onKeyDown}
          placeholder={t.palette.placeholder}
          className="w-full bg-transparent text-sm text-fore placeholder:text-faint focus:outline-none"
        />
      </div>

      <div className="max-h-80 overflow-y-auto p-1.5">
        {filtered.length === 0 && (
          <p className="px-3 py-6 text-center text-sm text-muted">
            {t.palette.noResults}
          </p>
        )}

        {filtered.some((a) => a.group === "file") && (
          <GroupLabel>{t.palette.open}</GroupLabel>
        )}
        {filtered
          .filter((a) => a.group === "file")
          .map((a, i) => (
            <Item
              key={a.id}
              action={a}
              active={selected === i}
              onHover={() => setSelected(i)}
              onRun={a.run}
            />
          ))}

        {filtered.some((a) => a.group === "action") && (
          <GroupLabel>{t.palette.actions}</GroupLabel>
        )}
        {filtered
          .filter((a) => a.group === "action")
          .map((a, i) => (
            <Item
              key={a.id}
              action={a}
              active={selected === fileCount + i}
              onHover={() => setSelected(fileCount + i)}
              onRun={a.run}
            />
          ))}
      </div>
    </>
  );
}

function GroupLabel({ children }: { children: ReactNode }) {
  return (
    <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-widest text-faint">
      {children}
    </p>
  );
}

function Item({
  action,
  active,
  onHover,
  onRun,
}: {
  action: Action;
  active: boolean;
  onHover: () => void;
  onRun: () => void;
}) {
  return (
    <button
      onClick={onRun}
      onMouseMove={onHover}
      className={`flex w-full cursor-pointer items-center gap-2.5 rounded px-3 py-2 text-left text-sm transition-colors ${
        active ? "bg-active text-fore" : "text-muted"
      }`}
    >
      <span className="shrink-0">{action.icon}</span>
      <span className="flex-1 truncate">{action.label}</span>
      <span className="hidden shrink-0 text-xs text-faint sm:block">
        {action.hint}
      </span>
      {active && (
        <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-accent" />
      )}
    </button>
  );
}

export default CommandPalette;
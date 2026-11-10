import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { fileByPath } from "../../data/files";
import type { FileEntry } from "../../data/types";
import { WorkspaceContext } from "./WorkspaceContext";
import type { ActivityId, WorkspaceValue } from "./WorkspaceContext";

const HOME_PATH = "README.md";

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [openFiles, setOpenFiles] = useState<FileEntry[]>([
    fileByPath(HOME_PATH)!,
  ]);
  const [activePath, setActivePath] = useState<string>(HOME_PATH);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activity, setActivity] = useState<ActivityId>("explorer");

  const openFile = useCallback((path: string) => {
    const entry = fileByPath(path);
    if (!entry) return;
    setOpenFiles((prev) => {
      if (prev.some((f) => f.path === path)) return prev;
      return [...prev, entry];
    });
    setActivePath(path);
  }, []);

  const closeFile = useCallback(
    (path: string) => {
      setOpenFiles((prev) => {
        const next = prev.filter((f) => f.path !== path);
        if (next.length === 0) {
          const home = fileByPath(HOME_PATH)!;
          setActivePath(home.path);
          return [home];
        }
        if (activePath === path) {
          const idx = prev.findIndex((f) => f.path === path);
          const fallback = next[Math.min(idx, next.length - 1)];
          setActivePath(fallback.path);
        }
        return next;
      });
    },
    [activePath],
  );

  const toggleTerminal = useCallback(
    () => setTerminalOpen((v) => !v),
    [],
  );

  const value = useMemo<WorkspaceValue>(
    () => ({
      openFiles,
      activePath,
      openFile,
      closeFile,
      setActivePath,
      isOpen: (path: string) => openFiles.some((f) => f.path === path),
      terminalOpen,
      setTerminalOpen,
      toggleTerminal,
      sidebarOpen,
      setSidebarOpen,
      paletteOpen,
      setPaletteOpen,
      chatOpen,
      setChatOpen,
      activity,
      setActivity,
    }),
    [
      openFiles,
      activePath,
      openFile,
      closeFile,
      terminalOpen,
      toggleTerminal,
      sidebarOpen,
      paletteOpen,
      chatOpen,
      activity,
    ],
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}
import { createContext, useContext } from "react";
import type { FileEntry } from "../../data/types";

export type ActivityId = "explorer" | "projects" | "contact";

export type WorkspaceValue = {
  openFiles: FileEntry[];
  activePath: string;
  openFile: (path: string) => void;
  closeFile: (path: string) => void;
  setActivePath: (path: string) => void;
  isOpen: (path: string) => boolean;
  terminalOpen: boolean;
  setTerminalOpen: (v: boolean) => void;
  toggleTerminal: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  paletteOpen: boolean;
  setPaletteOpen: (v: boolean) => void;
  chatOpen: boolean;
  setChatOpen: (v: boolean) => void;
  activity: ActivityId;
  setActivity: (a: ActivityId) => void;
};

export const WorkspaceContext = createContext<WorkspaceValue | null>(null);

export function useWorkspace(): WorkspaceValue {
  const value = useContext(WorkspaceContext);
  if (!value) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return value;
}
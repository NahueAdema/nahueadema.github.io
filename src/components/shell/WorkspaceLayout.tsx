import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWorkspace } from "./WorkspaceContext";
import TitleBar from "./TitleBar";
import ActivityBar from "./ActivityBar";
import Sidebar from "./Sidebar";
import TabBar from "./TabBar";
import EditorWindow from "./EditorWindow";
import StatusBar from "./StatusBar";
import CommandPalette from "./CommandPalette";
import CopilotPanel from "./CopilotPanel";
import BootScreen from "./BootScreen";
import TerminalPanel from "../terminal/TerminalPanel";

const SIDEBAR_WIDTH = 224;
const COPILOT_WIDTH = 300;

const shouldBoot = (): boolean => {
  try {
    if (window.sessionStorage.getItem("booted") === "1") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return false;
  } catch {
    /* ignore */
  }
  return true;
};

const WorkspaceLayout = () => {
  const {
    paletteOpen,
    setPaletteOpen,
    sidebarOpen,
    terminalOpen,
    chatOpen,
  } = useWorkspace();
  const [booting, setBooting] = useState<boolean>(shouldBoot);

  const finishBoot = useCallback(() => {
    try {
      window.sessionStorage.setItem("booted", "1");
    } catch {
      /* ignore */
    }
    setBooting(false);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [paletteOpen, setPaletteOpen]);

  return (
    <div className="flex h-screen select-none flex-col bg-editor font-sans text-fore">
      <TitleBar />

      <div className="flex min-h-0 flex-1">
        <ActivityBar />

        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: SIDEBAR_WIDTH, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="shrink-0 overflow-hidden"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex min-w-0 flex-1 flex-col">
          <TabBar />
          <EditorWindow />
          {terminalOpen && <TerminalPanel />}
        </div>

        <AnimatePresence initial={false}>
          {chatOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: COPILOT_WIDTH, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="shrink-0 overflow-hidden border-l border-border max-[820px]:hidden"
            >
              <div className="h-full w-[300px]">
                <CopilotPanel />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <StatusBar />
      <CommandPalette />
      {booting && <BootScreen onDone={finishBoot} />}
    </div>
  );
};

export default WorkspaceLayout;
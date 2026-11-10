import {
  Bot,
  Command,
  Files,
  FolderKanban,
  Mail,
  SquareTerminal,
} from "lucide-react";
import { useI18n } from "../../i18n/context";
import { useWorkspace } from "./WorkspaceContext";

const ActivityBar = () => {
  const { t } = useI18n();
  const {
    activity,
    setActivity,
    sidebarOpen,
    setSidebarOpen,
    terminalOpen,
    toggleTerminal,
    openFile,
    setPaletteOpen,
    chatOpen,
    setChatOpen,
  } = useWorkspace();

  const handleExplorer = () => {
    if (!sidebarOpen) {
      setSidebarOpen(true);
      setActivity("explorer");
    } else if (activity === "explorer") {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
      setActivity("explorer");
    }
  };

  const handleProjects = () => {
    openFile("projects.md");
  };

  const handleContact = () => {
    openFile("contact.md");
  };

  const item =
    "relative flex h-11 w-11 items-center justify-center text-muted hover:text-fore transition-colors";
  const activeMark =
    "absolute left-0 top-1/2 h-7 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-cyan via-accent to-purple shadow-[0_0_8px_rgba(88,166,255,0.8)]";

  return (
    <div className="flex w-11 shrink-0 flex-col items-center border-r border-border bg-panel py-1.5">
      <button
        onClick={handleExplorer}
        title={t.activity.explorer}
        className={item}
        aria-label={t.activity.explorer}
      >
        {activity === "explorer" && sidebarOpen && (
          <span className={activeMark} />
        )}
        <Files
          className={`h-5 w-5 ${activity === "explorer" && sidebarOpen ? "text-fore" : ""}`}
        />
      </button>

      <button
        onClick={handleProjects}
        title={t.activity.projects}
        className={item}
        aria-label={t.activity.projects}
      >
        <FolderKanban className="h-5 w-5" />
      </button>

      <button
        onClick={toggleTerminal}
        title={t.activity.terminal}
        className={item}
        aria-label={t.activity.terminal}
      >
        {terminalOpen && <span className={activeMark} />}
        <SquareTerminal
          className={`h-5 w-5 ${terminalOpen ? "text-fore" : ""}`}
        />
      </button>

      <button
        onClick={handleContact}
        title={t.activity.contact}
        className={item}
        aria-label={t.activity.contact}
      >
        <Mail className="h-5 w-5" />
      </button>

      <div className="mt-auto space-y-0">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          title={t.copilot.title}
          className={item}
          aria-label={t.copilot.title}
        >
          {chatOpen && <span className={activeMark} />}
          <Bot
            className={`h-5 w-5 ${chatOpen ? "text-fore" : ""}`}
          />
        </button>
        <button
          onClick={() => setPaletteOpen(true)}
          title={t.activity.palette}
          className={item}
          aria-label={t.activity.palette}
        >
          <Command className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ActivityBar;
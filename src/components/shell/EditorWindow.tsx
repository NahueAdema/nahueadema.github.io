import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { fileByPath, projectByPath } from "../../data/files";
import { useWorkspace } from "./WorkspaceContext";
import BackgroundFX from "./BackgroundFX";
import GrainOverlay from "./GrainOverlay";
import HomeView from "../views/HomeView";
import AboutView from "../views/AboutView";
import ProjectsView from "../views/ProjectsView";
import ProjectDetailView from "../views/ProjectDetailView";
import SkillsView from "../views/SkillsView";
import FocusView from "../views/FocusView";
import ContactView from "../views/ContactView";
import ActivityView from "./ActivityView";

const EditorWindow = () => {
  const { activePath } = useWorkspace();
  const entry = fileByPath(activePath);
  const project = projectByPath(activePath);

  let view: ReactNode;
  switch (entry?.kind) {
    case "about":
      view = <AboutView />;
      break;
    case "projects":
      view = <ProjectsView />;
      break;
    case "project":
      view = project ? <ProjectDetailView project={project} /> : null;
      break;
    case "skills":
      view = <SkillsView />;
      break;
    case "focus":
      view = <FocusView />;
      break;
    case "activity":
      view = <ActivityView />;
      break;
    case "contact":
      view = <ContactView />;
      break;
    default:
      view = <HomeView />;
  }

  return (
    <div className="relative min-h-0 flex-1 overflow-hidden bg-editor">
      <BackgroundFX />
      <GrainOverlay />
      <AnimatePresence mode="wait">
        <motion.div
          key={activePath}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="relative h-full"
        >
          {view}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EditorWindow;
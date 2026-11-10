import { I18nProvider } from "./i18n";
import { ThemeProvider } from "./theme/ThemeProvider";
import { WorkspaceProvider } from "./components/shell/WorkspaceProvider";
import WorkspaceLayout from "./components/shell/WorkspaceLayout";

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <WorkspaceProvider>
          <WorkspaceLayout />
        </WorkspaceProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;
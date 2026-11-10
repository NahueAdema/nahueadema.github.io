import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { useI18n } from "../../i18n/context";
import { useWorkspace } from "../shell/WorkspaceContext";
import { GithubIcon } from "../shell/SocialIcons";
import TiltCard from "../ui/TiltCard";
import type { Project } from "../../data/types";

const ProjectDetailView = ({ project }: { project: Project }) => {
  const { t, lang } = useI18n();
  const { openFile } = useWorkspace();

  return (
    <div className="h-full overflow-y-auto px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => openFile("projects.md")}
          className="mb-6 inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-fore"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          ../{t.sidebar.projects}
        </button>

        <div className="overflow-hidden rounded-xl border border-border">
          <img
            src={project.image}
            alt={project.title}
            className="max-h-96 w-full object-cover"
            onError={(e) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.src = `https://via.placeholder.com/800x450.png?text=${project.title.replace(/\s+/g, "+")}`;
            }}
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-bold">{project.title}</h2>
            <p className="mt-1 font-mono text-xs text-faint">
              ~/projects/{project.file}
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs transition-colors hover:bg-hover"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              {t.projects.code}
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-black transition-opacity hover:opacity-90"
              >
                {t.projects.demo}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
            {project.role[lang]}
          </span>
          <span className="rounded-full bg-panel2 px-3 py-1 text-xs text-muted">
            {t.projects.categories[project.category]}
          </span>
          <span className="rounded-full bg-panel2 px-3 py-1 text-xs text-muted">
            {project.tags.join(" · ")}
          </span>
        </div>

        <p className="mt-6 leading-relaxed text-muted">
          {project.description[lang]}
        </p>
        <p className="mt-4 text-sm text-faint">{project.highlight[lang]}</p>

        {project.problem && project.solution && (
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TiltCard className="group" maxTilt={5} scale={1.01}>
              <div
                className="relative rounded-lg border border-border bg-panel p-4 transition-all duration-300 group-hover:border-transparent group-hover:shadow-[0_12px_36px_-12px_rgba(88,166,255,0.4)]"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--color-panel), var(--color-panel)), linear-gradient(90deg, var(--grad-a), var(--grad-b), var(--grad-c))",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              >
                <p className="text-[11px] uppercase tracking-wider text-faint">
                  {t.projects.problem}
                </p>
                <p className="mt-1.5 text-sm text-fore">
                  {project.problem[lang]}
                </p>
              </div>
            </TiltCard>
            <TiltCard className="group" maxTilt={5} scale={1.01}>
              <div
                className="relative rounded-lg border border-border bg-panel p-4 transition-all duration-300 group-hover:border-transparent group-hover:shadow-[0_12px_36px_-12px_rgba(57,197,207,0.38)]"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--color-panel), var(--color-panel)), linear-gradient(90deg, var(--grad-b), var(--grad-c), var(--grad-a))",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              >
                <p className="text-[11px] uppercase tracking-wider text-faint">
                  {t.projects.solution}
                </p>
                <p className="mt-1.5 text-sm text-fore">
                  {project.solution[lang]}
                </p>
              </div>
            </TiltCard>
          </div>
        )}

        <TiltCard className="mt-8 group" maxTilt={4} scale={1.008}>
          <div
            className="relative overflow-hidden rounded-lg border border-border transition-all duration-300 group-hover:border-transparent group-hover:shadow-[0_16px_50px_-16px_rgba(88,166,255,0.4)]"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-panel), var(--color-panel)), linear-gradient(90deg, var(--grad-a), var(--grad-b), var(--grad-c))",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          >
            <div className="flex items-center gap-2 border-b border-border bg-panel px-3 py-1.5 text-[11px] text-faint">
              <ExternalLink className="h-3 w-3" />
              {project.file} — {t.projects.heading}
            </div>
            <pre className="overflow-x-auto bg-editor/80 p-4 font-mono text-[12px] leading-6 text-muted">
            <code>
              <span className="text-purple">const</span> {` `}
              <span className="text-cyan">project</span>
              <span className="text-muted"> = {"{"}</span>
              {"\n"}
              {"  "}
              <span className="text-yellow">name</span>
              <span className="text-muted">:</span>{" "}
              <span className="text-green">"{project.title}"</span>
              <span className="text-muted">,</span>
              {"\n"}
              {"  "}
              <span className="text-yellow">role</span>
              <span className="text-muted">:</span>{" "}
              <span className="text-green">"{project.role[lang]}"</span>
              <span className="text-muted">,</span>
              {"\n"}
              {"  "}
              <span className="text-yellow">category</span>
              <span className="text-muted">:</span>{" "}
              <span className="text-green">"{project.category}"</span>
              <span className="text-muted">,</span>
              {"\n"}
              {"  "}
              <span className="text-yellow">stack</span>
              <span className="text-muted">:</span>{" "}
              <span className="text-green">
                {JSON.stringify(project.tags.slice(0, 4))}
              </span>
              <span className="text-muted">,</span>
              {"\n"}
              {"  "}
              <span className="text-yellow">github</span>
              <span className="text-muted">:</span>{" "}
              <span className="text-green">"{project.githubUrl}"</span>
              <span className="text-muted">,</span>
              {"\n"}
              <span className="text-muted">{"};"}</span>
            </code>
            </pre>
          </div>
        </TiltCard>
      </div>
    </div>
  );
};

export default ProjectDetailView;
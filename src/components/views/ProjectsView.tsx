import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Code,
  Database,
  ExternalLink,
  Server,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "../../i18n/context";
import { useWorkspace } from "../shell/WorkspaceContext";
import { projects } from "../../data/projects";
import type { ProjectCategory } from "../../data/types";
import TiltCard from "../ui/TiltCard";

const tagColors: Record<string, string> = {
  react: "bg-sky-500/20 text-sky-300",
  nextjs: "bg-white/10 text-white",
  laravel: "bg-red-500/20 text-red-300",
  python: "bg-yellow-500/20 text-yellow-300",
  flask: "bg-gray-600/30 text-gray-200",
  fastapi: "bg-emerald-500/20 text-emerald-300",
  tensorflow: "bg-orange-500/20 text-orange-300",
  prisma: "bg-indigo-500/20 text-indigo-300",
  postgresql: "bg-blue-500/20 text-blue-300",
  tailwind: "bg-cyan-500/20 text-cyan-300",
  zustand: "bg-amber-500/20 text-amber-300",
  groq: "bg-green-500/20 text-green-300",
  ai: "bg-violet-500/20 text-violet-300",
};

const getTagColor = (tag: string) =>
  tagColors[tag.toLowerCase().replace(/\s+/g, "")] ||
  "bg-gray-700/50 text-gray-300";

type CatId = "all" | ProjectCategory;
type CatLabelKey = CatId;

const categoryList: { id: CatId; name: CatLabelKey; icon: LucideIcon }[] = [
  { id: "all", name: "all", icon: Code },
  { id: "frontend", name: "frontend", icon: Code },
  { id: "backend", name: "backend", icon: Server },
  { id: "fullstack", name: "fullstack", icon: Database },
];

const ProjectsView = () => {
  const { t, lang } = useI18n();
  const { openFile } = useWorkspace();
  const [activeCategory, setActiveCategory] = useState<CatId>("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const featured = projects[0];
  const regular = projects.slice(1);

  const filtered =
    activeCategory === "all"
      ? regular
      : regular.filter((p) => p.category === activeCategory);

  const toggleExpand = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="h-full overflow-y-auto px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-2 flex items-center gap-3 font-mono text-sm text-muted">
          <span className="text-accent">~/projects.md</span>
          <span className="text-faint">—</span>
          <span>{t.projects.heading}</span>
        </div>

        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted">
          {t.projects.intro}
        </p>

        <TiltCard className="group mb-10" maxTilt={5} scale={1.01}>
          <div
            className="relative overflow-hidden rounded-xl border border-border bg-panel transition-all duration-300 group-hover:border-transparent group-hover:shadow-[0_20px_60px_-20px_rgba(88,166,255,0.45)]"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-panel), var(--color-panel)), linear-gradient(90deg, var(--grad-a), var(--grad-b), var(--grad-c))",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative lg:col-span-7">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full max-h-80 w-full object-cover lg:max-h-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-xs text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                {t.projects.featured}
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 lg:col-span-5 lg:p-8">
              <span className="mb-3 w-fit rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                {featured.role[lang]}
              </span>
              <h3 className="mb-3 text-2xl font-bold">{featured.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted">
                {featured.description[lang]}
              </p>
              <p className="mb-6 text-xs text-faint">{featured.highlight[lang]}</p>

              <div className="mb-6 grid grid-cols-3 gap-3">
                <Box
                  label={t.projects.problem}
                  text={featured.problem?.[lang] ?? ""}
                />
                <Box
                  label={t.projects.solution}
                  text={featured.solution?.[lang] ?? ""}
                />
                <Box label={t.projects.stackLabel} text="Next.js · Prisma · Postgres" />
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={featured.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
                >
                  {t.projects.viewDemo}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={featured.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-hover"
                >
                  {t.projects.viewCode}
                </a>
                <button
                  onClick={() => openFile(`projects/${featured.file}`)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-hover hover:text-fore"
                >
                  {featured.file}
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            </div>
          </div>
        </TiltCard>

        <div className="mb-6 flex flex-wrap items-center justify-center gap-1 rounded-lg border border-border bg-panel p-1">
          {categoryList.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`inline-flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm transition-colors ${
                activeCategory === id
                  ? "bg-accent font-medium text-black"
                  : "text-muted hover:text-fore"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {t.projects.categories[name]}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            {filtered.map((project) => {
              const isExpanded = expanded.has(project.id);
              return (
                <TiltCard key={project.id} className="group h-full" maxTilt={7} scale={1.012}>
                  <article
                    className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-panel transition-all duration-300 group-hover:border-transparent group-hover:shadow-[0_16px_50px_-18px_rgba(88,166,255,0.4)]"
                    style={{
                      backgroundImage:
                        "linear-gradient(var(--color-panel), var(--color-panel)), linear-gradient(90deg, var(--grad-a), var(--grad-b), var(--grad-c))",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                    }}
                  >
                  <div
                    className="relative aspect-video cursor-pointer overflow-hidden"
                    onClick={() => openFile(`projects/${project.file}`)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = `https://via.placeholder.com/600x340.png?text=${project.title.replace(/\s+/g, "+")}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className={`rounded-full px-2 py-0.5 text-[11px] ${getTagColor(tag)}`}
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-bold">{project.title}</h3>
                      <button
                        onClick={() => openFile(`projects/${project.file}`)}
                        className="text-xs text-accent hover:underline"
                      >
                        {project.file}
                      </button>
                    </div>

                    <div className="mb-3 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] text-accent">
                        {project.role[lang]}
                      </span>
                      <span className="rounded-full bg-panel2 px-2 py-0.5 text-[11px] text-muted">
                        {t.projects.categories[project.category]}
                      </span>
                    </div>

                    <p
                      className={`mb-2 text-sm leading-relaxed text-muted ${
                        isExpanded ? "" : "line-clamp-3"
                      }`}
                    >
                      {project.description[lang]}
                    </p>
                    {project.description[lang].length > 100 && (
                      <button
                        onClick={() => toggleExpand(project.id)}
                        className="mb-3 block text-xs text-accent hover:underline"
                      >
                        {isExpanded ? t.projects.readLess : t.projects.readMore}
                      </button>
                    )}

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs transition-colors hover:bg-hover"
                      >
                        {t.projects.code}
                      </a>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs text-accent transition-colors hover:bg-accent/20"
                        >
                          {t.projects.demo}
                        </a>
                      )}
                    </div>
                    </div>
                  </article>
                </TiltCard>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-muted">{t.projects.empty}</p>
        )}
      </div>
    </div>
  );
};

function Box({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-lg bg-editor p-3">
      <p className="text-[10px] uppercase tracking-wider text-faint">{label}</p>
      <p className="mt-1 text-xs text-fore">{text}</p>
    </div>
  );
}

export default ProjectsView;
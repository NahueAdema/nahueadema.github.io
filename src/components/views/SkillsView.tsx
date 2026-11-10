import { useState } from "react";
import type { ReactNode } from "react";
import { Bot, Layers, Smartphone } from "lucide-react";
import { useI18n } from "../../i18n/context";
import { skillCategories, skills } from "../../data/skills";

const fallbackIcon = (name: string): ReactNode => {
  if (name === "React Native")
    return <Smartphone className="h-7 w-7 text-cyan" />;
  if (name === "Expo") return <Layers className="h-7 w-7 text-purple" />;
  return <Bot className="h-7 w-7 text-violet-300" />;
};

const SkillsView = () => {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState("Principal");

  const filtered =
    activeCategory === "Principal"
      ? skills.filter((s) => s.category === "Principal")
      : skills.filter((s) => s.category === activeCategory);

  return (
    <div className="h-full overflow-y-auto px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-2 flex items-center gap-3 font-mono text-sm text-muted">
          <span className="text-yellow">~/skills.json</span>
          <span className="text-faint">—</span>
          <span>{t.skills.heading}</span>
        </div>

        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted">
          {t.skills.intro}
        </p>

        <div className="mb-6 flex flex-wrap gap-1.5">
          {skillCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                activeCategory === category
                  ? "bg-accent font-medium text-black"
                  : "border border-border text-muted hover:bg-hover hover:text-fore"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
          {filtered.map((skill) => (
            <div
              key={`${skill.name}-${skill.category}`}
              className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-panel p-4 transition-colors hover:border-accent/40"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-editor p-2 transition-transform group-hover:scale-110">
                {skill.icon ? (
                  <img
                    src={skill.icon}
                    alt={`${skill.name} icon`}
                    className="h-full w-full object-contain p-1"
                    loading="lazy"
                  />
                ) : (
                  fallbackIcon(skill.name)
                )}
              </div>
              <p className="text-center text-[13px] text-fore">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsView;
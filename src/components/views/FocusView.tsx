import { BrainCircuit, Code2, DatabaseZap, Rocket } from "lucide-react";
import { useI18n } from "../../i18n/context";
import { focusItems } from "../../data/focus";

const icons = {
  product: Code2,
  ai: BrainCircuit,
  data: DatabaseZap,
  growth: Rocket,
} as const;

const FocusView = () => {
  const { t, lang } = useI18n();

  return (
    <div className="flex h-full overflow-y-auto px-6 py-10">
      <div className="m-auto w-full max-w-4xl">
        <div className="mb-2 flex items-center gap-3 font-mono text-sm text-muted">
          <span className="text-purple">~/focus.md</span>
          <span className="text-faint">—</span>
          <span>{t.focus.heading}</span>
        </div>

        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted">
          {t.focus.intro}
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {focusItems.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <div
                key={item.icon}
                className="group rounded-xl border border-border bg-panel p-6 transition-colors hover:border-accent/40"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-bold">{item.title[lang]}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {item.text[lang]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FocusView;
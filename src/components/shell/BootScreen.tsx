import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useI18n } from "../../i18n/context";

const BootScreen = ({ onDone }: { onDone: () => void }) => {
  const { t } = useI18n();
  const lines = t.boot.lines;
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const tick = window.setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= lines.length) {
        window.clearInterval(tick);
        window.setTimeout(onDone, 480);
      }
    }, 230);
    return () => window.clearInterval(tick);
  }, [lines.length, onDone]);

  const shown = lines.slice(0, count);
  const progress = Math.min((count / lines.length) * 100, 100);

  const kind = (raw: string) => {
    if (raw.startsWith("[ OK ]")) return "text-green";
    if (raw.startsWith("[INFO]")) return "text-accent";
    if (raw.startsWith("[WARN]")) return "text-yellow";
    return "text-muted";
  };

  return (
    <div className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-editor px-6">
      <button
        onClick={onDone}
        className="absolute right-4 top-4 rounded-md border border-border bg-panel px-3 py-1 text-xs text-muted transition-colors hover:bg-hover hover:text-fore"
      >
        {t.boot.skip} →
      </button>

      <div className="w-full max-w-md">
        <h1 className="font-mono text-4xl font-bold tracking-tight">
          <span className="gradient-text text-shimmer [filter:drop-shadow(0_0_40px_rgba(88,166,255,0.28))]">
            {t.boot.title}
          </span>
          <span className="anim-caret text-accent">▌</span>
        </h1>
        <p className="mt-1 font-mono text-xs text-faint">v2.0.6 — full stack</p>

        <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-panel">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple via-accent to-cyan transition-[width] duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-6 space-y-1.5 font-mono text-xs leading-5">
          {shown.map((l, i) => (
            <p key={i} className={`whitespace-pre-wrap ${kind(l)}`}>
              <ChevronRight className="mr-1 inline h-3 w-3 text-faint" />
              {l}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
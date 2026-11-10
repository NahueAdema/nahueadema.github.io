import { useEffect, useState } from "react";
import { GitBranch, Languages, Wifi } from "lucide-react";
import { useI18n } from "../../i18n/context";
import { useTheme } from "../../theme/context";
import { nextTheme } from "../../theme/themes";
import type { Lang } from "../../data/types";

const StatusBar = () => {
  const { lang, setLang, t } = useI18n();
  const { theme, setTheme } = useTheme();
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const switchLang = (l: Lang) => setLang(l);

  return (
    <div className="flex h-6 shrink-0 items-center justify-between bg-gradient-to-r from-[#0a4b8c] to-[#0078d4] px-2 text-[12px] text-white shadow-[0_-4px_16px_rgba(0,120,212,0.25)]">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <GitBranch className="h-3 w-3" />
          main*
        </span>
        <span className="flex items-center gap-1 opacity-90">
          <Wifi className="h-3 w-3" />
          online
        </span>
        <span className="hidden opacity-90 sm:inline">TS · React</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="opacity-90">{t.sidebar.meName}</span>
        <span className="hidden opacity-90 sm:inline">{time}</span>
        <span className="opacity-90">UTF-8</span>
        <button
          onClick={() => setTheme(nextTheme(theme))}
          title={t.theme[theme]}
          aria-label={t.theme[theme]}
          className="flex h-4 w-4 items-center justify-center rounded-sm border border-white/25 transition-opacity hover:opacity-80"
        >
          <span
            className="h-2.5 w-2.5 rounded-sm"
            style={{
              background:
                "linear-gradient(135deg, var(--grad-a), var(--grad-c))",
            }}
          />
        </button>
        <span className="flex items-center gap-1">
          <Languages className="h-3 w-3" />
          <button
            onClick={() => switchLang("es")}
            className={`px-1 font-semibold hover:opacity-80 ${lang === "es" ? "" : "opacity-60"}`}
            title="Español"
          >
            ES
          </button>
          <span className="opacity-60">|</span>
          <button
            onClick={() => switchLang("en")}
            className={`px-1 font-semibold hover:opacity-80 ${lang === "en" ? "" : "opacity-60"}`}
            title="English"
          >
            EN
          </button>
        </span>
      </div>
    </div>
  );
};

export default StatusBar;
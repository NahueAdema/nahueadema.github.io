import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { en } from "./en";
import { es } from "./es";
import { I18nContext } from "./context";
import type { Lang } from "../data/types";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  const t = lang === "es" ? es : en;

  const value = useMemo(
    () => ({
      lang,
      t,
      setLang,
      toggle: () => setLang(lang === "es" ? "en" : "es"),
    }),
    [lang, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
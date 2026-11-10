import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { useI18n } from "../../i18n/context";
import { useWorkspace } from "../shell/WorkspaceContext";
import { runCommand } from "./interpreter";
import type { LineKind, TermLine } from "./interpreter";
import cv from "../../assets/cv.pdf";

const kindColor: Record<LineKind, string> = {
  cmd: "text-fore",
  out: "text-muted",
  err: "text-red",
  ok: "text-green",
  accent: "text-accent",
  dim: "text-faint",
  ascii: "text-cyan",
};

const welcomeLines = (t: {
  terminal: { welcome: readonly string[] };
}): TermLine[] => t.terminal.welcome.map((w) => ({ text: w, kind: "out" }));

const TerminalPanel = () => {
  const { t, lang } = useI18n();
  const { openFile, setTerminalOpen } = useWorkspace();
  const [lines, setLines] = useState<TermLine[]>(() =>
    welcomeLines(t),
  );
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [value, setValue] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const execute = (raw: string) => {
    const trimmed = raw.trim();
    setLines((prev) => [...prev, { text: raw, kind: "cmd" }]);
    if (trimmed) setHistory((h) => [...h, trimmed]);

    const result = runCommand(trimmed || "", { t, history, lang });
    setLines((prev) => [...prev, ...result.lines]);

    const action = result.action;
    if (action) {
      if (action.type === "open") openFile(action.path);
      else if (action.type === "url") window.open(action.href, "_blank");
      else if (action.type === "clear") setLines([]);
      else if (action.type === "cv") window.open(cv, "_blank");
    }

    setValue("");
    setHistIdx(-1);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      execute(value);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = histIdx + 1;
      if (idx < history.length) {
        setHistIdx(idx);
        setValue(history[history.length - 1 - idx]);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = histIdx - 1;
      if (idx >= -1) {
        setHistIdx(idx);
        setValue(idx === -1 ? "" : history[history.length - 1 - idx]);
      }
    }
  };

  return (
    <div className="flex h-48 shrink-0 flex-col border-t border-border bg-panel">
      <div className="flex items-center justify-between border-b border-border px-3 py-1 text-[11px] uppercase tracking-wider text-faint">
        <span className="flex items-center gap-1 text-accent">
          <ChevronDown className="h-3 w-3" />
          terminal
        </span>
        <div className="flex items-center gap-1">
          <button
            className="flex h-5 w-5 items-center justify-center rounded hover:bg-hover hover:text-fore"
            aria-label="New terminal"
            title="New terminal"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setLines([])}
            className="flex h-5 w-5 items-center justify-center rounded hover:bg-hover hover:text-fore"
            aria-label="Clear"
            title="Clear"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setTerminalOpen(false)}
            className="flex h-5 w-5 items-center justify-center rounded hover:bg-hover hover:text-fore"
            aria-label="Close panel"
            title="Close panel"
          >
            <ChevronDown className="h-3.5 w-3.5 rotate-180" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto px-3 py-2 font-mono text-xs leading-5"
      >
        {lines.map((l, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap ${kindColor[l.kind]}`}
          >
            {l.kind === "cmd" ? (
              <span>
                <span className="text-green">{t.terminal.prompt}</span>
                <span className="text-muted">:~$ </span>
                {l.text}
              </span>
            ) : (
              l.text || "\u00A0"
            )}
          </div>
        ))}

        <div className="flex items-center gap-2">
          <span className="shrink-0">
            <span className="text-green">{t.terminal.prompt}</span>
            <span className="text-muted">:~$ </span>
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            className="w-full bg-transparent font-mono text-xs text-fore caret-accent focus:outline-none"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalPanel;
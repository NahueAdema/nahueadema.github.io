import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Bot, Send, Trash, X } from "lucide-react";
import { useI18n } from "../../i18n/context";
import { useWorkspace } from "./WorkspaceContext";
import { ask } from "../../copilot/engine";
import type { CopilotAction } from "../../copilot/engine";
import cv from "../../assets/cv.pdf";

type Msg = {
  id: number;
  role: "user" | "assistant";
  text: string;
  actions?: CopilotAction[];
};

let nextId = 1;

const CopilotPanel = () => {
  const { t, lang } = useI18n();
  const { openFile, setChatOpen } = useWorkspace();
  const [messages, setMessages] = useState<Msg[]>(() => [
    { id: nextId++, role: "assistant", text: t.copilot.welcome },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || thinking) return;
    setMessages((m) => [...m, { id: nextId++, role: "user", text }]);
    setInput("");
    setThinking(true);
    window.setTimeout(() => {
      const reply = ask(text, { t, lang });
      setMessages((m) => [
        ...m,
        {
          id: nextId++,
          role: "assistant",
          text: reply.text.join("\n"),
          actions: reply.actions,
        },
      ]);
      setThinking(false);
    }, 650);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const clear = () => {
    setThinking(false);
    setMessages([
      { id: nextId++, role: "assistant", text: t.copilot.welcome },
    ]);
  };

  const runAction = (action: CopilotAction) => {
    if (action.kind === "open") openFile(action.path);
    else if (action.kind === "url") window.open(action.href, "_blank");
    else window.open(cv, "_blank");
  };

  return (
    <div className="flex h-full w-[300px] flex-col bg-panel">
      <div className="flex items-center gap-2.5 border-b border-border px-3 py-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-purple via-accent to-cyan shadow-[0_0_18px_rgba(88,166,255,0.35)]">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-fore">
            NahuGPT
          </p>
          <p className="truncate text-[11px] text-muted">
            {t.copilot.subtitle}
          </p>
        </div>
        <button
          onClick={clear}
          title={t.copilot.clear}
          aria-label={t.copilot.clear}
          className="flex h-6 w-6 items-center justify-center rounded text-muted hover:bg-hover hover:text-fore"
        >
          <Trash className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => setChatOpen(false)}
          aria-label="Close"
          title="Close"
          className="flex h-6 w-6 items-center justify-center rounded text-muted hover:bg-hover hover:text-fore"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        <div className="flex flex-col gap-3">
          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[85%] rounded-lg rounded-br-sm bg-accent px-3 py-2 text-[13px] leading-relaxed text-black">
                  {m.text}
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex items-start gap-2">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-tr from-purple/25 to-accent/25">
                  <Bot className="h-3.5 w-3.5 text-accent" />
                </div>
                <div className="min-w-0 max-w-[85%] rounded-lg rounded-tl-sm border border-border bg-panel2 px-3 py-2">
                  <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-fore">
                    {m.text}
                  </p>
                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.actions.map((a, i) => (
                        <button
                          key={i}
                          onClick={() => runAction(a)}
                          className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent transition-colors hover:bg-accent/20"
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ),
          )}

          {thinking && (
            <div className="flex items-start gap-2">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-tr from-purple/25 to-accent/25">
                <Bot className="h-3.5 w-3.5 text-accent" />
              </div>
              <div className="flex h-8 items-center gap-1 rounded-lg border border-border bg-panel2 px-3">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      <div className="border-t border-border px-3 py-2">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {t.copilot.suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-border bg-panel2 px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-accent/40 hover:text-fore"
            >
              {s}
            </button>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.copilot.placeholder}
            className="w-full rounded-md border border-border bg-editor px-3 py-2 text-[13px] text-fore placeholder:text-faint focus:border-accent focus:outline-none"
            aria-label={t.copilot.placeholder}
          />
          <button
            type="submit"
            disabled={!input.trim() || thinking}
            className="flex h-8 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={t.copilot.send}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CopilotPanel;
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowRight, Bot, Code, Download, Server, Smartphone } from "lucide-react";
import { useI18n } from "../../i18n/context";
import { useWorkspace } from "../shell/WorkspaceContext";
import { GithubIcon, LinkedinIcon } from "../shell/SocialIcons";
import cv from "../../assets/cv.pdf";
import TiltCard from "../ui/TiltCard";

const FloatChip = ({
  className,
  delay,
  children,
}: {
  className: string;
  delay?: number;
  children: ReactNode;
}) => (
  <div
    className={`anim-float hidden 2xl:flex ${className}`}
    style={{ animationDelay: `${delay ?? 0}s` }}
  >
    {children}
  </div>
);

const HomeView = () => {
  const { t } = useI18n();
  const { openFile } = useWorkspace();

  const cards = [
    { label: t.home.cards.web, icon: Code, color: "text-accent" },
    { label: t.home.cards.mobile, icon: Smartphone, color: "text-cyan" },
    { label: t.home.cards.api, icon: Server, color: "text-purple" },
    { label: t.home.cards.ai, icon: Bot, color: "text-green" },
  ];

  return (
    <div className="relative flex h-full overflow-y-auto px-6 py-10">
      <FloatChip className="absolute right-10 top-16 gap-2 rounded-xl border border-accent/25 bg-panel/80 px-3 py-2 text-xs text-muted shadow-xl shadow-black/40 backdrop-blur">
        <Bot className="h-4 w-4 text-green" />
        Agentes de IA
      </FloatChip>
      <FloatChip className="absolute bottom-12 left-10 gap-2 rounded-xl border border-cyan/25 bg-panel/80 px-3 py-2 text-xs text-muted shadow-xl shadow-black/40 backdrop-blur" delay={1.2}>
        <Smartphone className="h-4 w-4 text-cyan" />
        React Native
      </FloatChip>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="m-auto w-full max-w-3xl"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-panel/70 px-3 py-1 text-xs text-muted backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
          </span>
          {t.home.badge}
        </div>

        <h1 className="font-mono text-5xl font-bold tracking-tight md:text-7xl">
          <span className="gradient-text text-shimmer [filter:drop-shadow(0_6px_40px_rgba(88,166,255,0.45))]">
            {t.home.title}
          </span>
        </h1>

        <p className="mt-3 max-w-xl font-mono text-lg leading-relaxed text-fore md:text-xl">
          <span className="gradient-text">{t.home.role}</span>
          <span className="anim-caret text-accent">▌</span>
        </p>

        <p className="mt-6 max-w-2xl leading-relaxed text-muted">
          {t.home.intro}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-faint">
          {t.home.hint}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => openFile("projects.md")}
            className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-purple via-accent to-cyan px-4 py-2 text-sm font-semibold text-black shadow-[0_0_24px_rgba(88,166,255,0.35)] transition-[box-shadow,filter] hover:brightness-110 hover:shadow-[0_0_32px_rgba(88,166,255,0.55)]"
          >
            {t.home.ctaProjects}
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => openFile("contact.md")}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-panel/70 px-4 py-2 text-sm font-medium text-fore transition-colors hover:bg-hover"
          >
            {t.home.ctaContact}
          </button>
          <a
            href={cv}
            download="cv-nahuel-adema.pdf"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-panel/70 px-4 py-2 text-sm font-medium text-fore transition-colors hover:bg-hover"
          >
            <Download className="h-4 w-4" />
            {t.home.ctaCv}
          </a>
        </div>

        <div className="mt-10 flex items-center gap-4">
          <a
            href="https://github.com/NahueAdema"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded border border-border text-muted transition-all hover:border-accent/40 hover:bg-hover hover:text-fore"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/nahuel-adema-6627a3304/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded border border-border text-muted transition-all hover:border-accent/40 hover:bg-hover hover:text-fore"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <span className="h-4 w-px bg-border" />
          <span className="font-mono text-xs text-faint">
            ctrl+K → {t.sidebar.explorer.toLowerCase()}
          </span>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cards.map(({ label, icon: Icon, color }) => (
            <TiltCard key={label} className="group" maxTilt={6} scale={1.015} glare>
              <div
                className={`relative rounded-lg border border-border bg-panel/70 p-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-transparent group-hover:shadow-[0_12px_40px_-10px_rgba(56,139,253,0.45)] backdrop-blur`}
                style={{
                  backgroundImage:
                    "linear-gradient(var(--color-panel), var(--color-panel)), linear-gradient(90deg, var(--grad-a), var(--grad-b), var(--grad-c))",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              >
                <span className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-purple via-accent to-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Icon
                  className={`mb-3 h-5 w-5 ${color} transition-transform duration-300 group-hover:scale-110`}
                />
                <p className="text-sm text-fore">{label}</p>
              </div>
            </TiltCard>
          ))}
        </div>

        <TiltCard className="mt-10 group" maxTilt={4} scale={1.008}>
          <div
            className="relative overflow-hidden rounded-lg border border-border bg-panel/70 backdrop-blur transition-all duration-300 group-hover:border-transparent group-hover:shadow-[0_16px_60px_-16px_rgba(88,166,255,0.4)]"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-panel), var(--color-panel)), linear-gradient(90deg, var(--grad-a), var(--grad-b), var(--grad-c))",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          >
            <div className="flex items-center gap-2 border-b border-border bg-panel2/80 px-3 py-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[11px] text-muted">
                nahuel.ts
              </span>
              <span className="ml-auto font-mono text-[10px] text-faint">
                web · mobile · ai
              </span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6">
            <code>
              <span className="text-purple">const</span>{" "}
              <span className="text-cyan">nahuel</span>{" "}
              <span className="text-muted">=</span> <span className="text-muted">{"{"}</span>
              {"\n"}
              {"  "}
              <span className="text-yellow">role</span>
              <span className="text-muted">:</span>{" "}
              <span className="text-green">"{t.app.tagline}"</span>
              <span className="text-muted">,</span>
              {"\n"}
              {"  "}
              <span className="text-yellow">stack</span>
              <span className="text-muted">:</span>{" "}
              <span className="text-muted">[</span>
              <span className="text-green">
                "React", "Next.js", "React Native", "TypeScript", "Python", "FastAPI"
              </span>
              <span className="text-muted">]</span>
              <span className="text-muted">,</span>
              {"\n"}
              {"  "}
              <span className="text-yellow">mobile</span>
              <span className="text-muted">:</span>{" "}
              <span className="text-orange">true</span>
              <span className="text-muted">,</span>
              {"\n"}
              {"  "}
              <span className="text-yellow">aiAgents</span>
              <span className="text-muted">:</span>{" "}
              <span className="text-orange">true</span>
              <span className="text-faint"> // LLMs, RAG, automatización</span>
              <span className="text-muted">,</span>
              {"\n"}
              {"  "}
              <span className="text-yellow">location</span>
              <span className="text-muted">:</span>{" "}
              <span className="text-green">"Buenos Aires, Argentina"</span>
              <span className="text-muted">,</span>
              {"\n"}
              {"  "}
              <span className="text-yellow">openToWork</span>
              <span className="text-muted">:</span>{" "}
              <span className="text-orange">true</span>{" "}
              <span className="text-faint">// {t.home.codeComment}</span>
              {"\n"}
              <span className="text-muted">{"};"}</span>
            </code>
            </pre>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
};

export default HomeView;
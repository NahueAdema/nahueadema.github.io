import { projects } from "../data/projects";
import { skills } from "../data/skills";
import { focusItems } from "../data/focus";
import type { Dictionary } from "../i18n/en";
import type { Lang } from "../data/types";

export type CopilotAction =
  | { kind: "open"; path: string; label: string }
  | { kind: "url"; href: string; label: string }
  | { kind: "cv"; label: string };

export type CopilotReply = {
  text: string[];
  actions?: CopilotAction[];
};

export type AskContext = {
  lang: Lang;
  t: Dictionary;
};

const GITHUB = "https://github.com/NahueAdema";
const LINKEDIN = "https://www.linkedin.com/in/nahuel-adema-6627a3304/";
const EMAIL = "ademanahuel@gmail.com";

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

type Intent =
  | "available"
  | "cv"
  | "contact"
  | "projects"
  | "stack"
  | "focus"
  | "location"
  | "lang"
  | "about"
  | "experience"
  | "help"
  | "greet";

const keywords: Record<Intent, string[]> = {
  experience: [
    "experiencia",
    "experience",
    "años",
    "anos",
    "year",
    "years",
    "cuanto",
    "cuantos",
    "how long",
    "tiempo",
    "trayectoria",
    "background",
    "senior",
    "junior",
    "nivel",
    "level",
  ],
  available: [
    "disponible",
    "available",
    "freelance",
    "contratar",
    "hire",
    "trabajo",
    "laburo",
    "oportunidad",
    "opportunit",
    "disponibil",
  ],
  cv: ["cv", "resume", "curriculum", "curriculo", "hoja de vida", "download"],
  contact: [
    "contacto",
    "contact",
    "email",
    "correo",
    "mail",
    "escribir",
    "hablemos",
    "message",
    "comunicar",
    "contactar",
  ],
  projects: [
    "proyecto",
    "project",
    "portfolio",
    "trabajo",
    "work",
    "demo",
    "producto",
    "product",
    "apps",
    "build",
    "herramientas",
  ],
  stack: [
    "stack",
    "tecnolog",
    "tech",
    "skill",
    "skills",
    "tools",
    "lenguaje",
    "lenguajes",
    "language",
    "react",
    "next",
    "python",
    "postgres",
    "tailwind",
    "framework",
    "backend",
    "frontend",
  ],
  focus: [
    "enfoque",
    "focus",
    "enfocado",
    "enfocas",
    "focused",
    "interes",
    "interesado",
    "objetiv",
  ],
  location: [
    "ubicacion",
    "location",
    "donde",
    "where",
    "lugar",
    "bsas",
    "buenos aires",
    "argentina",
    "ciudad",
  ],
  lang: [
    "idioma",
    "language",
    "español",
    "spanish",
    "ingles",
    "english",
    "traduc",
  ],
  about: [
    "quien",
    "who",
    "about",
    "bio",
    "biografia",
    "presentate",
    "presentar",
    "sos",
    "tell me",
  ],
  help: [
    "ayuda",
    "help",
    "comandos",
    "commands",
    "que puedo",
    "suggestion",
    "suggest",
  ],
  greet: [
    "hola",
    "hi",
    "hello",
    "hey",
    "buenas",
    "saludos",
    "que tal",
    "como estas",
    "how are",
  ],
};

const intentOrder: Intent[] = [
  "available",
  "cv",
  "contact",
  "experience",
  "projects",
  "stack",
  "focus",
  "location",
  "lang",
  "about",
  "help",
  "greet",
];

const detectIntent = (question: string): Intent => {
  const q = normalize(question);

  for (const p of projects) {
    if (
      q.includes(normalize(p.title)) ||
      q.includes(p.id) ||
      q.includes(p.file.replace(".md", ""))
    ) {
      return "projects";
    }
  }

  let best: Intent = "help";
  let bestScore = 0;
  for (const intent of intentOrder) {
    const score = keywords[intent].filter((k) => q.includes(k)).length;
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }
  if (q.length < 2) return "greet";
  if (bestScore === 0) return "help";
  return best;
};

const smallTalk: Record<Lang, string[]> = {
  es: [
    "jaja, dale. pregúntame lo que quieras.",
    "tranqui, yo sé todo lo que hay en este workspace.",
    "ahí voy, sin rodeos.",
    "listo, te ayudo con eso.",
  ],
  en: [
    "heh, go ahead.",
    "got you. ask away.",
    "let me think for a sec...",
    "on it.",
  ],
};

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export function ask(question: string, ctx: AskContext): CopilotReply {
  const { t, lang } = ctx;
  const intent = detectIntent(question);
  const open = (path: string, label: string): CopilotAction => ({
    kind: "open",
    path,
    label,
  });

  switch (intent) {
    case "greet":
      return {
        text: [
          lang === "es" ? "hola! yo soy NahuGPT. ¿de qué hablamos?" : "hey! i'm NahuGPT. what can i help with?",
          t.copilot.welcome,
        ],
        actions: [
          open("about.md", t.sidebar.about),
          open("projects.md", t.sidebar.projects),
          open("contact.md", t.sidebar.contact),
        ],
      };

    case "about":
      return {
        text: [
          lang === "es"
            ? "soy Nahuel Adema, Full Stack Developer desde Buenos Aires, Argentina."
            : "I'm Nahuel Adema, a Full Stack Developer based in Buenos Aires, Argentina.",
          lang === "es"
            ? "~4 años construyendo productos end-to-end: web, mobile, APIs y agentes IA."
            : "~4 years building end-to-end products: web, mobile, APIs and AI agent workflows.",
          `${t.about.info.focus}.`,
          t.about.p1,
        ],
        actions: [
          open("about.md", t.sidebar.about),
          { kind: "url", href: GITHUB, label: "GitHub" },
          { kind: "url", href: LINKEDIN, label: "LinkedIn" },
        ],
      };

    case "stack":
      return {
        text: [
          lang === "es" ? "core stack (lo que uso a diario):" : "core stack (daily driver):",
          skills
            .filter((s) => s.category === "Principal")
            .map((s) => s.name)
            .join(" · "),
          lang === "es"
            ? "Frontend: React, Next.js, TypeScript · Backend: Python, FastAPI · Mobile: React Native · DB: PostgreSQL · IA: agentes & automatizaciones"
            : "Frontend: React, Next.js, TypeScript · Backend: Python, FastAPI · Mobile: React Native · DB: PostgreSQL · AI: agents & automations",
          lang === "es" ? "también me gusta mantenerlo simple y escalable." : "I keep it pragmatic, clean and scalable.",
        ],
        actions: [open("skills.json", t.sidebar.skills)],
      };

    case "projects": {
      const q = normalize(question);
      const found = projects.find(
        (p) =>
          q.includes(normalize(p.title)) ||
          q.includes(p.id) ||
          q.includes(p.file.replace(".md", "")),
      );
      if (found) {
        return {
          text: [
            `${found.title} — ${found.role[lang]}`,
            found.description[lang],
            lang === "es" ? `Stack: ${found.tags.join(" · ")}` : `Stack: ${found.tags.join(" · ")}`,
            found.highlight[lang],
          ],
          actions: [
            open(`projects/${found.file}`, found.title),
            found.demoUrl ? { kind: "url", href: found.demoUrl, label: t.projects.demo } : undefined,
            { kind: "url", href: found.githubUrl, label: t.projects.code },
          ].filter(Boolean) as CopilotAction[],
        };
      }
      return {
        text: [
          lang === "es" ? "acá tenés mis proyectos destacados:" : "here are some of my projects:",
          ...projects.map(
            (p) => `• ${p.title} — ${p.role[lang]} · ${p.tags.slice(0, 3).join(", ")}`,
          ),
          lang === "es" ? "decime el nombre de alguno y te lo cuento con detalle." : "tell me the name of any and i'll walk you through it.",
        ],
        actions: [
          open("projects.md", t.sidebar.projects),
          { kind: "url", href: GITHUB, label: "GitHub" },
        ],
      };
    }

    case "contact":
      return {
        text: [
          `email · ${EMAIL}`,
          ...t.terminal.social.slice(0, 2),
        ],
        actions: [
          { kind: "url", href: `mailto:${EMAIL}`, label: t.contact.emailLabel },
          open("contact.md", t.sidebar.contact),
        ],
      };

    case "experience":
      return {
        text: [
          lang === "es"
            ? "~4 años de experiencia construyendo productos web y mobile de punta a punta."
            : "~4 years of experience building web & mobile products end-to-end.",
          lang === "es"
            ? "Empecé con frontend (React/Next.js), profundicé en backend con Python/FastAPI y hoy me enfoco en apps completas + agentes IA aplicados a casos reales."
            : "Started with frontend (React/Next.js), moved into backend with Python/FastAPI, now focused on complete apps + practical AI agent workflows.",
          lang === "es"
            ? "6+ proyectos publicados. Resultado: código limpio, UX cuidada y soluciones que realmente resuelven algo."
            : "6+ published projects. Clean code, thoughtful UX, and solutions that actually solve real problems.",
        ],
        actions: [
          open("projects.md", t.sidebar.projects),
          open("skills.json", t.sidebar.skills),
          open("about.md", t.sidebar.about),
        ],
      };

    case "available":
      return {
        text: [
          t.copilot.available,
          lang === "es"
            ? "Ideal para proyectos web/mobile, APIs o flujos con IA. Respondo rápido."
            : "Open for web/mobile projects, APIs or AI-powered workflows. I reply fast.",
          t.home.codeComment,
        ],
        actions: [
          { kind: "url", href: `mailto:${EMAIL}`, label: t.contact.emailLabel },
          open("contact.md", t.home.ctaContact),
        ],
      };

    case "location":
      return {
        text: [`${t.about.info.location} — ${t.contact.locationValue}.`],
        actions: [open("about.md", t.sidebar.about)],
      };

    case "cv":
      return {
        text: [t.terminal.cv],
        actions: [{ kind: "cv", label: t.home.ctaCv }],
      };

    case "focus":
      return {
        text: focusItems.map(
          (f) => `- ${f.title[lang]}: ${f.text[lang]}`,
        ),
        actions: [open("focus.md", t.sidebar.focus)],
      };

    case "lang":
      return {
        text: [
          lang === "es"
            ? "Podés cambiar el idioma con el toggle ES/EN en la barra inferior o desde la paleta con Ctrl+K."
            : "You can switch the language with the ES/EN toggle in the bottom bar or from the palette with Ctrl+K.",
        ],
      };

    default:
      return {
        text: [
          lang === "es" ? "podes preguntarme directo por:" : "you can ask me directly:",
          lang === "es"
            ? "• experiencia / años • stack / tecnologías • proyectos (nombre o 'ver todos') • disponible / contratar • contacto • cv • enfoque"
            : "• experience / years • stack / tech • projects (name or 'all') • available / hire • contact • cv • focus",
          pick(smallTalk[lang]),
        ],
      };
  }
}
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

const TitleBar = () => {
  return (
    <div className="relative flex h-9 shrink-0 items-center justify-between border-b border-border bg-panel px-3">
      <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[0_0_0_rgba(255,95,87,0)] transition-shadow hover:shadow-[0_0_10px_rgba(255,95,87,0.45)]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[0_0_0_rgba(254,188,46,0)] transition-shadow hover:shadow-[0_0_10px_rgba(254,188,46,0.4)]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-[0_0_0_rgba(40,200,64,0)] transition-shadow hover:shadow-[0_0_10px_rgba(40,200,64,0.4)]" />
      </div>

      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 text-xs text-muted">
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
        <span className="font-mono">
          Nahuel Adema — Full Stack Developer
        </span>
      </div>

      <div className="flex items-center gap-1 text-muted">
        <a
          href="https://github.com/NahueAdema"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-6 w-6 items-center justify-center rounded hover:bg-hover hover:text-fore"
          title="GitHub"
        >
          <GithubIcon className="h-3.5 w-3.5" />
        </a>
        <a
          href="https://www.linkedin.com/in/nahuel-adema-6627a3304/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-6 w-6 items-center justify-center rounded hover:bg-hover hover:text-fore"
          title="LinkedIn"
        >
          <LinkedinIcon className="h-3.5 w-3.5" />
        </a>
        <a
          href="mailto:ademanahuel@gmail.com"
          className="flex h-6 w-6 items-center justify-center rounded hover:bg-hover hover:text-fore"
          title="Email"
        >
          <Mail className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
};

export default TitleBar;
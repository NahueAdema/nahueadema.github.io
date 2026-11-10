import { Download, FileText } from "lucide-react";
import { useI18n } from "../../i18n/context";
import { GithubIcon, LinkedinIcon } from "../shell/SocialIcons";
import profile from "../../assets/profile.png";
import cv from "../../assets/cv.pdf";

const AboutView = () => {
  const { t } = useI18n();
  const info = t.about.info;

  return (
    <div className="mx-auto h-full max-w-3xl overflow-y-auto px-6 py-10">
      <div className="mb-8 flex items-center gap-3 font-mono text-sm text-muted">
        <span className="text-accent">~/about.md</span>
        <span className="text-faint">—</span>
        <span>{t.about.heading}</span>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="rounded-xl bg-gradient-to-tr from-purple to-accent p-1">
            <div className="overflow-hidden rounded-lg bg-editor">
              <img
                src={profile}
                alt={info.nameLabel}
                className="h-92 w-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://via.placeholder.com/500x500.png?text=Dev";
                }}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href="https://github.com/NahueAdema"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-hover hover:text-fore"
              aria-label="GitHub"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/nahuel-adema-6627a3304/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-hover hover:text-fore"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={cv}
              download="cv-nahuel-adema.pdf"
              className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
            >
              <Download className="h-4 w-4" />
              {t.about.downloadCv}
            </a>
          </div>
        </div>

        <div className="md:col-span-7">
          <h2 className="mb-4 text-2xl font-bold">
            {t.home.title}
            <span className="text-muted font-normal"> — {t.about.heading}</span>
          </h2>

          <p className="mb-3 leading-relaxed text-muted">{t.about.p1}</p>
          <p className="mb-6 leading-relaxed text-muted">{t.about.p2}</p>

          <div className="grid grid-cols-2 gap-3">
            <InfoCell label={info.nameLabel} value={info.name} />
            <InfoCell label={info.emailLabel} value={info.email} mono />
            <InfoCell label={info.locationLabel} value={info.location} />
            <InfoCell label={info.focusLabel} value={info.focus} />
          </div>

          <div className="mt-6 rounded-lg border border-border bg-panel p-4">
            <p className="font-mono text-xs leading-7 text-muted">
              <span className="text-purple">$</span>{" "}
              <span className="text-cyan">git</span> log --oneline
              <br />
              <span className="text-yellow">2022</span> →{" "}
              {t.about.timeline.y2022}
              <br />
              <span className="text-yellow">2024</span> →{" "}
              {t.about.timeline.y2024}
              <br />
              <span className="text-yellow">2025</span> →{" "}
              {t.about.timeline.y2025}
              <br />
              <span className="text-yellow">2026</span> →{" "}
              {t.about.timeline.y2026}
              <br />
              <span className="text-accent">HEAD</span> → {t.about.timeline.head}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function InfoCell({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-panel px-3 py-2">
      <p className="text-[11px] uppercase tracking-wider text-faint">
        <FileText className="mr-1 inline h-3 w-3" />
        {label}
      </p>
      <p
        className={`mt-1 truncate text-sm text-fore ${
          mono ? "font-mono text-[13px]" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default AboutView;
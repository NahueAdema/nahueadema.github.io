import { useCallback, useEffect, useState } from "react";
import { ExternalLink, ForkKnife, RefreshCw, Star } from "lucide-react";
import { useI18n } from "../../i18n/context";
import { projects } from "../../data/projects";
import type { Project } from "../../data/types";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
};

type RepoOwner = Repo & { fork: boolean };

type LangCount = { name: string; count: number; color: string };

const LANGS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Java: "#b07219",
};

const startOf = (p: Project): LangCount[] =>
  p.tags.slice(0, 3).map((name, i) => ({
    name,
    count: 3 - i,
    color: LANGS[name] ?? "#8b5cf6",
  }));

const ActivityView = () => {
  const { t, lang } = useI18n();
  const [repos, setRepos] = useState<RepoOwner[] | null>(null);
  const [offline, setOffline] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    setOffline(false);
    fetch(
      "https://api.github.com/users/NahueAdema/repos?sort=pushed&per_page=100",
    )
      .then((res) => {
        if (!res.ok) throw new Error("bad");
        return res.json() as Promise<RepoOwner[]>;
      })
      .then((list) => {
        const filtered = list
          .filter((r) => !r.fork && !/portfolio/i.test(r.name))
          .slice(0, 6);
        setRepos(filtered.length > 0 ? filtered : list.slice(0, 6));
        setLoading(false);
      })
      .catch(() => {
        setOffline(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const id = window.setTimeout(load, 0);
    return () => window.clearTimeout(id);
  }, [load]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex items-center gap-2 font-mono text-xs text-faint">
          <RefreshCw className="h-4 w-4 animate-spin text-accent" />
          {t.activityView.loading}
        </div>
      </div>
    );
  }

  if (offline || !repos) {
    const fallback = projects.slice(0, 3);
    const langCounts = fallback.flatMap(startOf).reduce<Record<string, LangCount>>(
      (acc, l) => {
        const cur = acc[l.name] ?? { name: l.name, count: 0, color: l.color };
        cur.count += 1;
        acc[l.name] = cur;
        return acc;
      },
      {},
    );
    const langs = Object.values(langCounts).sort((a, b) => b.count - a.count);
    const total = langs.reduce((acc, l) => acc + l.count, 0);

    return (
      <div className="mx-auto flex h-full max-w-3xl flex-col justify-center gap-4 px-8 py-10">
        <div>
          <h1 className="font-mono text-2xl font-bold text-fore">
            {t.activityView.heading}
          </h1>
          <p className="mt-1 text-[13px] text-muted">{t.activityView.intro}</p>
        </div>
        <div className="mb-1 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-wider text-faint">
            {t.activityView.languages}
          </p>
          <p className="text-[10px] text-faint">
            {t.activityView.offlineNote}
          </p>
        </div>
        <div>
          <div className="flex flex-wrap gap-1.5">
            {langs.map((l) => (
              <span
                key={l.name}
                className="flex items-center gap-1.5 rounded-full border border-border bg-panel px-2.5 py-1 text-[11px] text-muted"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: l.color }}
                />
                {l.name}
              </span>
            ))}
          </div>
          <div className="mt-3 flex h-2 w-full gap-[2px] overflow-hidden rounded-full bg-panel">
            {langs.map((l) => (
              <div
                key={l.name}
                className="h-full"
                style={{
                  width: `${(l.count / total) * 100}%`,
                  backgroundColor: l.color,
                }}
              />
            ))}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {fallback.map((p) => (
            <div
              key={p.id}
              className="group rounded-lg border border-border bg-panel/60 p-3 transition-colors hover:border-accent/40"
            >
              <h3 className="truncate text-[13px] font-semibold text-fore">
                {p.title}
              </h3>
              <p className="mt-1 line-clamp-3 text-[11px] leading-relaxed text-muted">
                {p.description[lang]}
              </p>
              <p className="mt-2 text-[10px] text-faint">{p.role[lang]}</p>
            </div>
          ))}
        </div>
        <button
          onClick={load}
          className="mx-auto flex items-center gap-1.5 rounded-md border border-border bg-panel px-3 py-1.5 text-xs text-muted transition-colors hover:bg-hover hover:text-fore"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          {t.activityView.retry}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col justify-center px-8 py-10">
      <div className="mb-6">
        <h1 className="font-mono text-2xl font-bold text-fore">
          {t.activityView.heading}
        </h1>
        <p className="mt-1 text-[13px] text-muted">{t.activityView.intro}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {repos.map((r) => (
          <a
            key={r.id}
            href={r.html_url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col rounded-lg border border-border bg-panel/60 p-3.5 transition-colors hover:border-accent/40 hover:bg-panel"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate font-mono text-[13px] font-semibold text-fore group-hover:text-accent">
                {r.name}
              </h3>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-faint group-hover:text-accent" />
            </div>
            <p className="mt-1 line-clamp-2 min-h-[2em] text-[11px] leading-relaxed text-muted">
              {r.description ?? "â€”"}
            </p>
            <div className="mt-3 flex items-center gap-3 text-[11px] text-muted">
              {r.language && (
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: LANGS[r.language] ?? "#8b5cf6",
                    }}
                  />
                  {r.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {r.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <ForkKnife className="h-3 w-3" />
                {r.forks_count}
              </span>
              <span className="ml-auto text-faint">
                {new Date(r.pushed_at).toLocaleDateString()}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ActivityView;

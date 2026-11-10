export type ThemeId =
  | "default"
  | "cobalt"
  | "sunset"
  | "matrix"
  | "gruvbox";

export type ThemeInfo = {
  id: ThemeId;
  labelKey: ThemeId;
  swatch: string;
};

export const themes: ThemeInfo[] = [
  { id: "default", labelKey: "default", swatch: "#0d1117" },
  { id: "cobalt", labelKey: "cobalt", swatch: "#111a32" },
  { id: "sunset", labelKey: "sunset", swatch: "#23121c" },
  { id: "matrix", labelKey: "matrix", swatch: "#07170c" },
  { id: "gruvbox", labelKey: "gruvbox", swatch: "#282828" },
];

export const isThemeId = (value: string): value is ThemeId =>
  themes.some((t) => t.id === value);

export const themeById = (id: ThemeId): ThemeInfo =>
  themes.find((t) => t.id === id) ?? themes[0];

export const nextTheme = (id: ThemeId): ThemeId => {
  const idx = themes.findIndex((t) => t.id === id);
  return themes[(idx + 1) % themes.length].id;
};
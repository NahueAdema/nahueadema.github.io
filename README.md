<div align="center">

<br />

```ts
const nahuel: Developer = {
  role: "Full Stack Developer",
  stack: ["React", "Next.js", "React Native", "TypeScript", "Python", "FastAPI"],
  location: "Buenos Aires, Argentina",
  openToWork: true, // still hiring
};
```

# 💻 Nahuel Adema — Portfolio Workspace

### *Un portfolio que no se lee: se usa como un IDE.*

Mi portfolio personal simulando un **editor de código estilo VS Code**, corriendo 100% en el browser.
Nada de PDFs ni PDFs disfrazados de landing: explorador de archivos, tabs, terminal interactiva,
command palette y hasta un copilot propio.

<br />

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-13-e64ce6?logo=framer&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-181717?logo=github&logoColor=white)

<br />

</div>

---

## 🧠 La idea

En vez de mostrar "otra landing de portfolio", el sitio **es un workspace**: la información vive
adentro de un falso sistema operativo tipo VS Code donde cada sección del portfolio es un archivo
que se abre, y todo se puede navegar como un desarrollador navega su editor todos los días.

```
~/portfolio
├── README.md        → Home
├── about.md         → Sobre mí + timeline
├── projects/        → Proyectos + case studies (problem → solution)
├── skills.json      → Stack agrupado por categorías
├── focus.md         → En qué estoy enfocado ahora
├── activity.md      → Actividad de GitHub, en vivo
└── contact.md       → Formulario de contacto (Formspree)
```

Todo **100% estático y client-side**: sin backend, sin API keys, deployable gratis en GitHub Pages.

---

## ✨ Features

| Feature | Qué hace |
|---|---|
| 🖥️ **Workspace real** | Activity bar, sidebar explorer, tabs, breadcrumbs y status bar, como cualquier editor |
| ⌨️ **Command Palette** | `Ctrl+K` abre la paleta con búsqueda instantánea, acciones y cambio de tema |
| 🐧 **Terminal interactiva** | Comandos reales: `help`, `projects`, `ask`, `neofetch`, `sudo`… con historial navegable con ↑/↓ |
| 🤖 **NahuGPT** | Copilot propio, chat 100% local (rule-based, ES/EN) que responde sobre stack, experiencia, proyectos y contacto |
| 🎨 **5 temas de color** | Default, Cobalt, Sunset, Matrix y Gruvbox — persistidos en localStorage |
| 🚀 **Boot screen** | "NahuelOS" arranca una vez por sesión (salteable, respeta `prefers-reduced-motion`) |
| 📡 **GitHub en vivo** | `activity.md` sincroniza repos reales desde la API de GitHub, con fallback offline |
| 🌐 **Bilingüe ES/EN** | Todo el contenido traducido, toggle en la status bar |
| ✨ **Microinteracciones** | Tilt 3D en cards, grain overlay, gradientes, shimmer y glow — todo con fallback para reduced-motion |

---

## 🛠️ Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite 8** con Tailwind CSS v4 (tokens CSS variables → temas)
- **Framer Motion** para las animaciones del shell
- **lucide-react** para iconos
- **Formspree** para el formulario de contacto

Sin estado global pesado: todo con Context + hooks, arquitectura simple y mantenible.

---

## 📂 Estructura del proyecto

```
src/
├── components/
│   ├── shell/          # TitleBar, ActivityBar, Sidebar, TabBar, StatusBar,
│   │                   # CommandPalette, CopilotPanel, BootScreen, BackgroundFX...
│   ├── terminal/       # TerminalPanel + interpreter (parser de comandos)
│   ├── views/           # Home, About, Projects, Skills, Focus, Contact, Activity
│   └── ui/             # Componentes reutilizables (TiltCard, etc.)
├── copilot/            # NahuGPT: motor rule-based ES/EN
├── data/               # projects, skills, focus, files (contenido del workspace)
├── i18n/               # Diccionarios es/en + context
└── theme/              # Sistema de temas (5 paletas)
```

---

## 🚀 Desarrollo local

```bash
# instalar dependencias
npm install

# levantar dev server (http://localhost:5173)
npm run dev

# lint + build de producción
npm run lint
npm run build

# preview del build
npm run preview

# deploy a GitHub Pages
npm run deploy
```

> Deploy: `vite.config.ts` usa `base: './'`, así que el build funciona en cualquier
> subdirectorio (ideal para `username.github.io/portfolio-nahu/`).

---

## 🐛 Comandos de la terminal (algunos)

| Comando | Descripción |
|---|---|
| `help` | Lista todos los comandos |
| `whoami` | Quién soy |
| `projects` | Abre los proyectos |
| `open <file>` | Abre cualquier archivo |
| `ask <pregunta>` | Le pregunta algo a NahuGPT |
| `activity` | Actividad de GitHub en vivo |
| `cv` | Descarga mi CV |
| `neofetch` | System info (fun) |
| `sudo` | Nice try 🚨 |

---

## 📬 Contacto

- **Email:** [ademanahuel@gmail.com](mailto:ademanahuel@gmail.com)
- **GitHub:** [@NahueAdema](https://github.com/NahueAdema)
- **LinkedIn:** [Nahuel Adema](https://www.linkedin.com/in/nahuel-adema-6627a3304/)
- **Ubicación:** Buenos Aires, Argentina — *open to work* ✅

---

<div align="center">

**Hecho con ☕ y muchas ganas de que un recluter pierda 10 minutos jugando con la terminal.**

```bash
$ git clone https://github.com/NahueAdema/portfolio-nahu.git
$ cd portfolio-nahu && npm install && npm run dev
```

</div>

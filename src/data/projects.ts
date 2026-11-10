import type { Project } from "./types";
import ZtockyImg from "../assets/ztocky.png";
import WebCriticImg from "../assets/webcritic.png";
import BolivarYaImg from "../assets/bolivarya.png";
import AiCvImg from "../assets/aicvclassifier.png";
import DealOrNoDealImg from "../assets/dealornodeal.png";

export const projects: Project[] = [
  {
    id: "ztocky",
    file: "ztocky.md",
    title: "Ztocky",
    description: {
      es: "Aplicacion full stack para ayudar a comercios a controlar stock, anticipar faltantes y tomar mejores decisiones de compra con alertas, proyecciones y sugerencias asistidas por IA.",
      en: "Full stack app to help businesses control stock, anticipate shortages and make better purchasing decisions with alerts, projections and AI-assisted suggestions.",
    },
    image: ZtockyImg,
    tags: [
      "nextjs",
      "react",
      "prisma",
      "postgresql",
      "tailwind",
      "fullstack",
      "zustand",
      "stock",
      "roles",
      "ai",
      "groq",
      "ui",
    ],
    category: "fullstack",
    role: { es: "Full Stack", en: "Full Stack" },
    highlight: {
      es: "Gestion de stock, roles, predicciones y reordenes inteligentes.",
      en: "Stock management, roles, predictions and smart reorders.",
    },
    problem: {
      es: "Stock y compras sin anticipacion.",
      en: "Stock and purchases without forecasting.",
    },
    solution: {
      es: "Alertas, roles y sugerencias con IA.",
      en: "Alerts, roles and AI suggestions.",
    },
    githubUrl: "https://github.com/NahueAdema/Ztocky",
    demoUrl: "https://ztocky.vercel.app/",
  },
  {
    id: "webcritic-ai",
    file: "webcritic-ai.md",
    title: "Web critic AI",
    description: {
      es: "Herramienta que analiza sitios web y genera feedback de UI mediante IA, pensada para detectar oportunidades de mejora visual, claridad y experiencia de usuario.",
      en: "Tool that analyzes websites and generates UI feedback using AI, designed to spot opportunities for visual improvement, clarity and user experience.",
    },
    image: WebCriticImg,
    tags: ["nextjs", "web", "ui", "critic", "ai", "groq"],
    category: "frontend",
    role: { es: "Frontend + IA", en: "Frontend + AI" },
    highlight: {
      es: "Criticas accionables sobre interfaces usando modelos de Groq.",
      en: "Actionable critiques about interfaces using Groq models.",
    },
    githubUrl: "https://github.com/NahueAdema/AI-Website-Critic",
    demoUrl: "https://ai-website-critic.netlify.app/",
  },
  {
    id: "bolivarya",
    file: "bolivarya.md",
    title: "BolivarYa",
    description: {
      es: "Plataforma grupal de delivery que conecta usuarios con restaurantes, supermercados, farmacias y tiendas, con flujo de pedidos, distintos tipos de comercios y experiencia pensada para uso cotidiano.",
      en: "Group delivery platform connecting users with restaurants, supermarkets, pharmacies and stores, with an order flow, different store types and an experience built for daily use.",
    },
    image: BolivarYaImg,
    tags: ["laravel", "react", "web", "ui", "delivery", "ecommerce", "roles"],
    category: "fullstack",
    role: { es: "Proyecto grupal", en: "Group project" },
    highlight: {
      es: "Marketplace de delivery con roles, comercios y pedidos.",
      en: "Delivery marketplace with roles, stores and orders.",
    },
    githubUrl: "https://github.com/fran5570/Bolivar-Ya",
  },
  {
    id: "aicv-api",
    file: "aicvclassifier-api.md",
    title: "Ai CV Classifier API",
    description: {
      es: "Backend para clasificar y analizar curriculums con inteligencia artificial, orientado a filtrar perfiles tecnicos y ayudar a reclutadores a identificar candidatos con mayor ajuste.",
      en: "Backend to classify and analyze resumes with AI, focused on filtering technical profiles and helping recruiters identify the best-matching candidates.",
    },
    image: AiCvImg,
    tags: ["python", "tensorflow", "fastapi", "backend", "ai", "analizar", "cvs"],
    category: "backend",
    role: { es: "Backend + IA", en: "Backend + AI" },
    highlight: {
      es: "Analisis de CVs, clasificacion y API para consumo externo.",
      en: "CV analysis, classification and an API for external use.",
    },
    githubUrl: "https://github.com/NahueAdema/AiCvClassifier",
  },
  {
    id: "aicv-ui",
    file: "aicvclassifier-ui.md",
    title: "Ai CV Classifier UI",
    description: {
      es: "Interfaz para utilizar el clasificador de CVs de forma simple: cargar informacion, revisar resultados y conectar una experiencia visual con el motor de analisis del backend.",
      en: "Interface to use the CV classifier simply: load information, review results and connect a visual experience with the backend analysis engine.",
    },
    image: AiCvImg,
    tags: ["python", "tensorflow", "fastapi", "backend", "ai", "analizar", "cvs"],
    category: "frontend",
    role: { es: "Frontend", en: "Frontend" },
    highlight: {
      es: "Pantalla de uso para consumir y visualizar resultados del modelo.",
      en: "Usage screen to consume and visualize model results.",
    },
    githubUrl: "https://github.com/NahueAdema/AiCvClassifierFE",
  },
  {
    id: "deal-or-no-deal",
    file: "deal-or-no-deal.md",
    title: "Deal or No Deal",
    description: {
      es: "Aplicacion web inspirada en el juego Deal or No Deal, con logica de partidas, seleccion de cajas, premios ocultos y negociacion con el banquero.",
      en: "Web app inspired by Deal or No Deal, with game logic, box selection, hidden prizes and banker negotiation.",
    },
    image: DealOrNoDealImg,
    tags: ["python", "flask", "ui", "juego", "backend", "frontend"],
    category: "fullstack",
    role: { es: "Full Stack", en: "Full Stack" },
    highlight: {
      es: "Juego web con reglas, estados de partida e interaccion dinamica.",
      en: "Web game with rules, match states and dynamic interaction.",
    },
    githubUrl: "https://github.com/NahueAdema/Deal-Or-No-Deal",
    demoUrl: "https://deal-or-no-deal2.onrender.com/",
  },
];
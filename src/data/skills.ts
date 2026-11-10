import type { Skill } from "./types";
import HTMLIcon from "../assets/icons/HTML.png";
import CSSIcon from "../assets/icons/CSS.png";
import JsIcon from "../assets/icons/Js.webp";
import TsIcon from "../assets/icons/Ts.png";
import ReactIcon from "../assets/icons/React.webp";
import NextJsIcon from "../assets/icons/NextJs.png";
import AstroIcon from "../assets/icons/astro.png";
import TailwindIcon from "../assets/icons/Tailwind.png";
import PyIcon from "../assets/icons/Py.webp";
import NestJsIcon from "../assets/icons/NestJs.png";
import FlaskIcon from "../assets/icons/Flask.webp";
import FastApiIcon from "../assets/icons/FastApi.png";
import ExpressIcon from "../assets/icons/express.webp";
import PostgreSQLIcon from "../assets/icons/PostgreSQL.png";
import MongoDBIcon from "../assets/icons/MongoDB.svg";
import MySQLIcon from "../assets/icons/MySQL.webp";
import LaravelIcon from "../assets/icons/Laravel.svg";
import DockerIcon from "../assets/icons/Docker.webp";
import AWSIcon from "../assets/icons/aws.png";

export const skills: Skill[] = [
  { name: "TypeScript", icon: TsIcon, category: "Principal" },
  { name: "React", icon: ReactIcon, category: "Principal" },
  { name: "Next.js", icon: NextJsIcon, category: "Principal" },
  { name: "Python", icon: PyIcon, category: "Principal" },
  { name: "FastAPI", icon: FastApiIcon, category: "Principal" },
  { name: "PostgreSQL", icon: PostgreSQLIcon, category: "Principal" },
  { name: "Tailwind", icon: TailwindIcon, category: "Principal" },
  { name: "Express", icon: ExpressIcon, category: "Principal" },
  { name: "MongoDB", icon: MongoDBIcon, category: "Principal" },
  { name: "JavaScript", icon: JsIcon, category: "Lenguaje" },
  { name: "React", icon: ReactIcon, category: "Frontend" },
  { name: "Next.js", icon: NextJsIcon, category: "Frontend" },
  { name: "Astro", icon: AstroIcon, category: "Frontend" },
  { name: "HTML", icon: HTMLIcon, category: "Frontend" },
  { name: "CSS", icon: CSSIcon, category: "Frontend" },
  { name: "Tailwind", icon: TailwindIcon, category: "Frontend" },
  { name: "TypeScript", icon: TsIcon, category: "Lenguaje" },
  { name: "Python", icon: PyIcon, category: "Lenguaje" },
  { name: "NestJS", icon: NestJsIcon, category: "Backend" },
  { name: "Flask", icon: FlaskIcon, category: "Backend" },
  { name: "Laravel", icon: LaravelIcon, category: "Backend" },
  { name: "FastAPI", icon: FastApiIcon, category: "Backend" },
  { name: "Express", icon: ExpressIcon, category: "Backend" },
  { name: "PostgreSQL", icon: PostgreSQLIcon, category: "Database" },
  { name: "MongoDB", icon: MongoDBIcon, category: "Database" },
  { name: "MySQL", icon: MySQLIcon, category: "Database" },
  { name: "Docker", icon: DockerIcon, category: "DevOps" },
  { name: "AWS", icon: AWSIcon, category: "DevOps" },
  { name: "React Native", category: "Mobile" },
  { name: "Expo", category: "Mobile" },
  { name: "Agentes IA / LLMs", category: "IA" },
];

export const skillCategories = [
  "Principal",
  "Lenguaje",
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Mobile",
  "IA",
];
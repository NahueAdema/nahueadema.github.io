import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import HTMLIcon from "../assets/icons/HTML.png";
import CSSIcon from "../assets/icons/CSS.png";
import JsIcon from "../assets/icons/Js.webp";
import TsIcon from "../assets/icons/Ts.png";
import DartIcon from "../assets/icons/dart.png";
import ReactIcon from "../assets/icons/React.webp";
import NextJsIcon from "../assets/icons/NextJs.png";
import AstroIcon from "../assets/icons/astro.png";
import TailwindIcon from "../assets/icons/Tailwind.png";
import PyIcon from "../assets/icons/Py.webp";
import NestJsIcon from "../assets/icons/NestJs.png";
import FlaskIcon from "../assets/icons/Flask.webp";
import FastApiIcon from "../assets/icons/FastApi.png";
import ExpressIcon from "../assets/icons/express.webp";
import FlutterIcon from "../assets/icons/flutter.png";
import ReactNativeIcon from "../assets/icons/React.webp";
import ExpoIcon from "../assets/icons/expo.png";
import PostgreSQLIcon from "../assets/icons/PostgreSQL.png";
import MongoDBIcon from "../assets/icons/MongoDB.svg";
import DockerIcon from "../assets/icons/Docker.webp";
import AWSIcon from "../assets/icons/aws.png";
import Placeholder from "../assets/placeholder.jpg";

const skills = [
  { name: "HTML", icon: HTMLIcon, category: "Frontend" },
  { name: "CSS", icon: CSSIcon, category: "Frontend" },
  { name: "JavaScript", icon: JsIcon, category: "Lenguaje" },
  { name: "TypeScript", icon: TsIcon, category: "Lenguaje" },
  { name: "Dart", icon: DartIcon, category: "Lenguaje" },
  { name: "React", icon: ReactIcon, category: "Frontend" },
  { name: "Next.js", icon: NextJsIcon, category: "Frontend" },
  { name: "Astro", icon: AstroIcon, category: "Frontend" },
  { name: "Tailwind", icon: TailwindIcon, category: "Frontend" },
  { name: "Python", icon: PyIcon, category: "Lenguaje" },
  { name: "NestJS", icon: NestJsIcon, category: "Backend" },
  { name: "Flask", icon: FlaskIcon, category: "Backend" },
  { name: "FastAPI", icon: FastApiIcon, category: "Backend" },
  { name: "Express", icon: ExpressIcon, category: "Backend" },
  { name: "Flutter", icon: FlutterIcon, category: "Mobile" },
  { name: "React-Native", icon: ReactNativeIcon, category: "Mobile" },
  { name: "Expo", icon: ExpoIcon, category: "Mobile" },
  { name: "PostgreSQL", icon: PostgreSQLIcon, category: "Database" },
  { name: "MongoDB", icon: MongoDBIcon, category: "Database" },
  { name: "Docker", icon: DockerIcon, category: "DevOps" },
  { name: "AWS", icon: AWSIcon, category: "DevOps" },
];

const categories = [
  "All",
  "Lenguaje",
  "Frontend",
  "Backend",
  "Database",
  "Mobile",
  "DevOps",
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="section-padding bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center gradient-text">
            Mis Habilidades
          </h2>

          <div className="flex justify-center flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gray-400 text-gray-800 dark:text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                className="flex flex-col items-center"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-24 h-24 mb-4 relative bg-white rounded-full shadow-lg p-4 transition-all duration-300 hover:shadow-xl">
                  {isBrowser && (
                    <img
                      src={skill.icon || Placeholder}
                      alt={`${skill.name} icon`}
                      className="w-full h-full object-contain p-2"
                    />
                  )}
                </div>
                <p className="text-center font-medium">{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

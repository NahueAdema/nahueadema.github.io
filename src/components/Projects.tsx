import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Code, Server, Database } from "lucide-react";
import WebCritic from "../assets/webcritic.png";
import BolivarYa from "../assets/bolivarya.png";
import AiCvClassifier from "../assets/aicvclassifier.png";
import DealOrNoDeal from "../assets/dealornodeal.png";
type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  githubUrl: string;
  demoUrl?: string;
};

const projects: Project[] = [
  {
    id: "1",
    title: "Web critic AI",
    description:
      "Web critic AI es un proyecto que utiliza el modelo Groq para generar críticas sobre la ui de un sitio web.",
    image: WebCritic,
    tags: ["nextjs", "web", "ui", "critic", "ai", "groq"],
    category: "frontend",
    githubUrl: "https://github.com/NahueAdema/AI-Website-Critic",
    demoUrl: "https://ai-website-critic.vercel.app/",
  },
  {
    id: "2",
    title: "BolivarYa",
    description:
      "Un proyecto grupal el cual es una plataforma de delivery que conecta a usuarios con restaurantes, supermercados, farmacias y tiendas, permitiéndoles pedir productos desde la web o el celular y recibirlos a domicilio de forma rápida y sencilla.",
    image: BolivarYa,
    tags: ["laravel", "react", "web", "ui", "delivery", "ecommerce", "roles"],
    category: "fullstack",
    githubUrl: "https://github.com/fran5570/Bolivar-Ya",
  },
  {
    id: "3",
    title: "AiCvClassifier",
    description:
      "Un proyecto el cual utiliza inteligencia artificial para clasificar y analizar currículums vitae, ayudando a los reclutadores a identificar rápidamente a los candidatos más adecuados para sus vacantes. Esta inspirado en devs y desarrolladores.",
    image: AiCvClassifier,
    tags: [
      "python",
      "tensorFlow",
      "fastAPI ",
      "backend",
      "ai",
      "analizar",
      "cvs",
    ],
    category: "backend",
    githubUrl: "https://github.com/NahueAdema/AiCvClassifier",
  },
  {
    id: "4",
    title: "AiCvClassifier",
    description:
      "El frontend sencillo para utilizar el proyecto el cual utiliza inteligencia artificial para clasificar y analizar currículums vitae, ayudando a los reclutadores a identificar rápidamente a los candidatos más adecuados para sus vacantes. Esta inspirado en devs y desarrolladores.",
    image: AiCvClassifier,
    tags: [
      "python",
      "tensorFlow",
      "fastAPI ",
      "backend",
      "ai",
      "analizar",
      "cvs",
    ],
    category: "frontend",
    githubUrl: "https://github.com/NahueAdema/AiCvClassifierFE",
  },
  {
    id: "5",
    title: "Deal or No Deal",
    description:
      "Un proyecto el cual es una aplicación web que simula el popular juego de televisión 'Deal or No Deal', donde los jugadores eligen entre varias cajas con premios ocultos y negocian con un banquero para maximizar sus ganancias.",
    image: DealOrNoDeal,
    tags: [
      "python",
      "flask",
      "ui",
      "juego",
      "deal or no deal",
      "backend",
      "frontend",
    ],
    category: "fullstack",
    githubUrl: "https://github.com/NahueAdema/AI-Website-Critic",
    demoUrl: "https://deal-or-no-deal2.onrender.com/",
  },
];

type Category = {
  id: string;
  name: string;
  icon?: React.ElementType;
};

const categories: Category[] = [
  { id: "all", name: "Todos" },
  { id: "frontend", name: "Frontend", icon: Code },
  { id: "backend", name: "Backend", icon: Server },
  { id: "fullstack", name: "Full Stack", icon: Database },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section
      id="projects"
      className="section-padding bg-gradient-to-b from-black to-dark"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center gradient-text">
            Mis Proyectos
          </h2>

          <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
            Explora algunos de mis proyectos más recientes y descubre cómo
            transformo ideas en soluciones digitales con tecnologías modernas.
          </p>

          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-full bg-gray-800/50 p-1">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category.id
                        ? "bg-primary-600 text-white shadow-lg"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center space-x-1">
                      {Icon && <Icon className="w-4 h-4 mr-1" />}
                      <span>{category.name}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform transition-transform hover:scale-110 duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://via.placeholder.com/600x340.png?text=${project.title.replace(
                          /\s+/g,
                          "+",
                        )}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                      <div>
                        <h3 className="text-lg font-bold">{project.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-800/80 rounded-full text-xs text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-800/80 rounded-full text-xs text-gray-300">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                        >
                          <Github className="w-5 h-5 text-white" />
                        </a>
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                        >
                          <ExternalLink className="w-5 h-5 text-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">
                No hay proyectos en esta categoría aún.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

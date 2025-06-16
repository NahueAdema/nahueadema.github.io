import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Code, Server, Database } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  githubUrl: string;
  demoUrl: string;
};

const projects: Project[] = [
  // Tus proyectos aquí
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
                          "+"
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

                      <a
                        href={`/projects/${project.id}`}
                        className="text-primary-400 hover:text-primary-300 font-medium text-sm transition-colors"
                      >
                        Ver detalles
                      </a>
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

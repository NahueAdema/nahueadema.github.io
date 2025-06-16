import { motion } from "framer-motion";
import { FileText, Coffee, Github, Linkedin, Mail } from "lucide-react";
import Profile from "../assets/profile.png";
import cv from "../assets/cv.pdf";
const About: React.FC = () => {
  return (
    <section
      id="about"
      className="section-padding bg-gradient-to-b from-dark to-black"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text">
            Sobre mí
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 fade-in">
              <div className="relative">
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-tr from-primary-600 to-secondary-600 p-1">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <img
                      src={Profile}
                      alt="Mi foto de perfil"
                      className="w-full h-96 object-cover"
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://via.placeholder.com/500x500.png?text=Dev+Profile";
                      }}
                    />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-dark p-4 rounded-full shadow-lg">
                  <Coffee className="w-8 h-8 text-primary-400" />
                </div>
              </div>

              <div className="flex justify-center mt-8 space-x-4">
                <a
                  href="https://github.com/NahueAdema"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <Github className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/in/nahuel-adema-6627a3304/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                <a
                  href="mailto:ademanahuel@gmail.com"
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <Mail className="w-5 h-5 text-white" />
                </a>
                <a
                  href={cv}
                  download="cv.pdf"
                  target="_blank"
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <FileText className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            <div className="md:col-span-7 fade-in">
              <h3 className="text-2xl font-bold mb-4">
                Hola, soy <span className="text-primary-400">Nahuel Adema</span>
              </h3>

              <p className="text-gray-300 mb-4">
                Soy un desarrollador Full Stack apasionado por crear soluciones
                web innovadoras y efectivas. Me destaco por ser puntual, atento,
                proactivo y comprometido con el aprendizaje continuo.
              </p>

              <p className="text-gray-300 mb-6">
                Mi objetivo es combinar habilidades técnicas sólidas con un
                fuerte enfoque en la experiencia del usuario para entregar
                productos digitales que no solo funcionen perfectamente, sino
                que también sean intuitivos y agradables de usar.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Nombre:</h4>
                  <p className="font-medium">Nahuel Adema</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Email:</h4>
                  <p className="font-medium">ademanahuel@gmail.com</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Ubicación:</h4>
                  <p className="font-medium">Prov de Bs As, Argentina</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">
                    Disponibilidad:
                  </h4>
                  <p className="font-medium">Freelance / Full-time</p>
                </div>
              </div>

              <a
                href={cv}
                download="cv.pdf"
                className="inline-flex items-center px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors"
              >
                <FileText className="w-5 h-5 mr-2" />
                Descargar CV
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

import { Github, Linkedin, Mail } from "lucide-react";

const currentYear = new Date().getFullYear();

const Footer = () => {
  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <a href="/portfolio/" className="text-3xl font-bold gradient-text">
              Nahu<span className="text-white">Portfolio</span>
            </a>
            <p className="text-gray-400 mt-2 max-w-md">
              Transformando ideas en experiencias digitales excepcionales con
              código limpio y diseño centrado en el usuario.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a
                href="https://github.com/NahueAdema"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://linkedin.com/in/nahuel-adema-6627a3304/"
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
            </div>

            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Mi Portfolio. Todos los derechos reservados.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6 md:mb-0">
            <a
              href="/portfolio/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Inicio
            </a>
            <a
              href="#about"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Sobre mí
            </a>
            <a
              href="#skills"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Habilidades
            </a>
            <a
              href="#projects"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Proyectos
            </a>
            <a
              href="#experience"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Experiencia
            </a>
            <a
              href="#contact"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contacto
            </a>
          </nav>

          <div>
            <a
              href="#"
              onClick={handleScrollTop}
              className="text-primary-400 hover:text-primary-300 transition-colors flex items-center"
            >
              <span className="mr-2">Volver arriba</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
